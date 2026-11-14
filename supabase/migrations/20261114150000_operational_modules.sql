-- Operational modules: appointments, payments, expenses and inventory.
-- Apply only through the authorized Lovable Cloud migration/deployment mechanism.
-- The CI PostgreSQL database is disposable and is not the live Lovable Cloud database.

do $$ begin
  create type public.appointment_status as enum
    ('scheduled', 'confirmed', 'in_progress', 'completed', 'cancelled', 'no_show');
exception when duplicate_object then null; end $$;

do $$ begin
  create type public.payment_status as enum
    ('pending', 'paid', 'failed', 'refunded', 'cancelled');
exception when duplicate_object then null; end $$;

do $$ begin
  create type public.payment_method as enum
    ('pix', 'cash', 'credit_card', 'debit_card', 'bank_transfer', 'other');
exception when duplicate_object then null; end $$;

do $$ begin
  create type public.expense_status as enum
    ('pending', 'paid', 'cancelled');
exception when duplicate_object then null; end $$;

do $$ begin
  create type public.inventory_movement_type as enum
    ('entry', 'exit', 'adjustment');
exception when duplicate_object then null; end $$;

create table if not exists public.appointments (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies(id) on delete cascade,
  customer_id uuid not null,
  quote_id uuid,
  technician_id uuid not null references public.profiles(id),
  scheduled_start timestamptz not null,
  scheduled_end timestamptz not null,
  status public.appointment_status not null default 'scheduled',
  service_address text,
  customer_notes text,
  internal_notes text,
  created_by uuid not null default auth.uid() references auth.users(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (id, company_id),
  foreign key (customer_id, company_id)
    references public.customers(id, company_id),
  foreign key (quote_id, company_id)
    references public.quotes(id, company_id),
  check (scheduled_end > scheduled_start)
);

create table if not exists public.payments (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies(id) on delete cascade,
  customer_id uuid not null,
  quote_id uuid,
  appointment_id uuid,
  amount numeric(12,2) not null check (amount > 0),
  method public.payment_method not null,
  status public.payment_status not null default 'pending',
  due_date date,
  paid_at timestamptz,
  external_reference text,
  notes text,
  created_by uuid not null default auth.uid() references auth.users(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (id, company_id),
  foreign key (customer_id, company_id)
    references public.customers(id, company_id),
  foreign key (quote_id, company_id)
    references public.quotes(id, company_id),
  foreign key (appointment_id, company_id)
    references public.appointments(id, company_id),
  check ((status = 'paid' and paid_at is not null) or status <> 'paid')
);

create table if not exists public.expenses (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies(id) on delete cascade,
  description text not null check (length(trim(description)) between 2 and 240),
  category text not null check (length(trim(category)) between 2 and 80),
  amount numeric(12,2) not null check (amount > 0),
  status public.expense_status not null default 'pending',
  due_date date,
  paid_at timestamptz,
  method public.payment_method,
  supplier_name text,
  receipt_path text,
  notes text,
  created_by uuid not null default auth.uid() references auth.users(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (id, company_id),
  check ((status = 'paid' and paid_at is not null) or status <> 'paid')
);

create table if not exists public.inventory_items (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies(id) on delete cascade,
  name text not null check (length(trim(name)) between 2 and 160),
  sku text,
  description text,
  unit text not null default 'un',
  minimum_quantity numeric(12,3) not null default 0 check (minimum_quantity >= 0),
  unit_cost numeric(12,2) check (unit_cost is null or unit_cost >= 0),
  is_active boolean not null default true,
  created_by uuid not null default auth.uid() references auth.users(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (id, company_id),
  unique (company_id, sku)
);

create table if not exists public.inventory_movements (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies(id) on delete cascade,
  item_id uuid not null,
  movement_type public.inventory_movement_type not null,
  quantity_delta numeric(12,3) not null check (quantity_delta <> 0),
  unit_cost numeric(12,2) check (unit_cost is null or unit_cost >= 0),
  appointment_id uuid,
  reason text,
  created_by uuid not null default auth.uid() references auth.users(id),
  created_at timestamptz not null default now(),
  foreign key (item_id, company_id)
    references public.inventory_items(id, company_id),
  foreign key (appointment_id, company_id)
    references public.appointments(id, company_id),
  check (
    (movement_type = 'entry' and quantity_delta > 0)
    or (movement_type = 'exit' and quantity_delta < 0)
    or movement_type = 'adjustment'
  )
);

create index if not exists appointments_company_start_idx
  on public.appointments (company_id, scheduled_start);
create index if not exists appointments_technician_start_idx
  on public.appointments (company_id, technician_id, scheduled_start)
  where status in ('scheduled', 'confirmed', 'in_progress');
create index if not exists payments_company_status_due_idx
  on public.payments (company_id, status, due_date);
create index if not exists payments_quote_idx
  on public.payments (quote_id) where quote_id is not null;
create index if not exists expenses_company_status_due_idx
  on public.expenses (company_id, status, due_date);
create index if not exists inventory_items_company_name_idx
  on public.inventory_items (company_id, lower(name));
create index if not exists inventory_movements_item_created_idx
  on public.inventory_movements (company_id, item_id, created_at desc);

-- Serialize schedule writes per company/technician, then reject overlapping
-- active appointments. This is enforced in PostgreSQL, not in browser code.
create or replace function public.prevent_technician_appointment_overlap()
returns trigger
language plpgsql
security definer
set search_path = public, pg_temp
as $$
begin
  if new.status in ('scheduled', 'confirmed', 'in_progress') then
    if not exists (
      select 1
      from public.company_members cm
      where cm.company_id = new.company_id
        and cm.user_id = new.technician_id
        and cm.role = 'technician'
    ) then
      raise exception 'Assigned user must be a technician in this company'
        using errcode = '23514';
    end if;

    perform pg_advisory_xact_lock(
      hashtextextended(new.company_id::text || ':' || new.technician_id::text, 0)
    );

    if exists (
      select 1
      from public.appointments a
      where a.company_id = new.company_id
        and a.technician_id = new.technician_id
        and a.id is distinct from new.id
        and a.status in ('scheduled', 'confirmed', 'in_progress')
        and tstzrange(a.scheduled_start, a.scheduled_end, '[)')
            && tstzrange(new.scheduled_start, new.scheduled_end, '[)')
    ) then
      raise exception 'Technician already has an overlapping appointment'
        using errcode = '23P01';
    end if;
  end if;

  return new;
end;
$$;

drop trigger if exists appointments_prevent_overlap on public.appointments;
create trigger appointments_prevent_overlap
before insert or update of company_id, technician_id, scheduled_start, scheduled_end, status
on public.appointments
for each row execute function public.prevent_technician_appointment_overlap();

create or replace function public.validate_inventory_movement_balance()
returns trigger
language plpgsql
security definer
set search_path = public, pg_temp
as $$
declare
  current_quantity numeric(12,3);
begin
  perform pg_advisory_xact_lock(hashtextextended(new.company_id::text || ':' || new.item_id::text, 0));

  select coalesce(sum(im.quantity_delta), 0)
    into current_quantity
  from public.inventory_movements im
  where im.company_id = new.company_id
    and im.item_id = new.item_id
    and im.id is distinct from new.id;

  if current_quantity + new.quantity_delta < 0 then
    raise exception 'Inventory movement would make stock negative'
      using errcode = '23514';
  end if;

  return new;
end;
$$;

drop trigger if exists inventory_movements_validate_balance on public.inventory_movements;
create trigger inventory_movements_validate_balance
before insert or update of company_id, item_id, quantity_delta
on public.inventory_movements
for each row execute function public.validate_inventory_movement_balance();

create or replace view public.inventory_stock_balances
with (security_invoker = true)
as
select
  i.id as item_id,
  i.company_id,
  i.name,
  i.sku,
  i.unit,
  i.minimum_quantity,
  coalesce(sum(m.quantity_delta), 0)::numeric(12,3) as quantity_on_hand,
  (coalesce(sum(m.quantity_delta), 0) <= i.minimum_quantity) as is_low_stock
from public.inventory_items i
left join public.inventory_movements m
  on m.item_id = i.id and m.company_id = i.company_id
group by i.id, i.company_id, i.name, i.sku, i.unit, i.minimum_quantity;

drop trigger if exists appointments_set_updated_at on public.appointments;
create trigger appointments_set_updated_at before update on public.appointments
for each row execute function public.set_updated_at();
drop trigger if exists payments_set_updated_at on public.payments;
create trigger payments_set_updated_at before update on public.payments
for each row execute function public.set_updated_at();
drop trigger if exists expenses_set_updated_at on public.expenses;
create trigger expenses_set_updated_at before update on public.expenses
for each row execute function public.set_updated_at();
drop trigger if exists inventory_items_set_updated_at on public.inventory_items;
create trigger inventory_items_set_updated_at before update on public.inventory_items
for each row execute function public.set_updated_at();

drop trigger if exists appointments_audit on public.appointments;
create trigger appointments_audit after insert or update or delete on public.appointments
for each row execute function public.write_audit_log();
drop trigger if exists payments_audit on public.payments;
create trigger payments_audit after insert or update or delete on public.payments
for each row execute function public.write_audit_log();
drop trigger if exists expenses_audit on public.expenses;
create trigger expenses_audit after insert or update or delete on public.expenses
for each row execute function public.write_audit_log();
drop trigger if exists inventory_items_audit on public.inventory_items;
create trigger inventory_items_audit after insert or update or delete on public.inventory_items
for each row execute function public.write_audit_log();
drop trigger if exists inventory_movements_audit on public.inventory_movements;
create trigger inventory_movements_audit after insert or update or delete on public.inventory_movements
for each row execute function public.write_audit_log();

alter table public.appointments enable row level security;
alter table public.payments enable row level security;
alter table public.expenses enable row level security;
alter table public.inventory_items enable row level security;
alter table public.inventory_movements enable row level security;

create policy appointments_read_managers_or_assigned_technician
on public.appointments for select to authenticated
using (
  public.has_company_role(company_id, array['owner', 'admin', 'manager']::public.app_role[])
  or technician_id = (select auth.uid())
);

create policy appointments_insert_managers
on public.appointments for insert to authenticated
with check (
  public.has_company_role(company_id, array['owner', 'admin', 'manager']::public.app_role[])
);

create policy appointments_update_managers
on public.appointments for update to authenticated
using (
  public.has_company_role(company_id, array['owner', 'admin', 'manager']::public.app_role[])
)
with check (
  public.has_company_role(company_id, array['owner', 'admin', 'manager']::public.app_role[])
);

create policy appointments_delete_admins
on public.appointments for delete to authenticated
using (
  public.has_company_role(company_id, array['owner', 'admin']::public.app_role[])
);

create policy payments_read_managers
on public.payments for select to authenticated
using (
  public.has_company_role(company_id, array['owner', 'admin', 'manager']::public.app_role[])
);
create policy payments_insert_managers
on public.payments for insert to authenticated
with check (
  public.has_company_role(company_id, array['owner', 'admin', 'manager']::public.app_role[])
);
create policy payments_update_managers
on public.payments for update to authenticated
using (
  public.has_company_role(company_id, array['owner', 'admin', 'manager']::public.app_role[])
)
with check (
  public.has_company_role(company_id, array['owner', 'admin', 'manager']::public.app_role[])
);
create policy payments_delete_admins
on public.payments for delete to authenticated
using (
  public.has_company_role(company_id, array['owner', 'admin']::public.app_role[])
);

create policy expenses_read_managers
on public.expenses for select to authenticated
using (
  public.has_company_role(company_id, array['owner', 'admin', 'manager']::public.app_role[])
);
create policy expenses_insert_managers
on public.expenses for insert to authenticated
with check (
  public.has_company_role(company_id, array['owner', 'admin', 'manager']::public.app_role[])
);
create policy expenses_update_managers
on public.expenses for update to authenticated
using (
  public.has_company_role(company_id, array['owner', 'admin', 'manager']::public.app_role[])
)
with check (
  public.has_company_role(company_id, array['owner', 'admin', 'manager']::public.app_role[])
);
create policy expenses_delete_admins
on public.expenses for delete to authenticated
using (
  public.has_company_role(company_id, array['owner', 'admin']::public.app_role[])
);

create policy inventory_items_read_members
on public.inventory_items for select to authenticated
using (public.is_company_member(company_id));
create policy inventory_items_insert_managers
on public.inventory_items for insert to authenticated
with check (
  public.has_company_role(company_id, array['owner', 'admin', 'manager']::public.app_role[])
);
create policy inventory_items_update_managers
on public.inventory_items for update to authenticated
using (
  public.has_company_role(company_id, array['owner', 'admin', 'manager']::public.app_role[])
)
with check (
  public.has_company_role(company_id, array['owner', 'admin', 'manager']::public.app_role[])
);
create policy inventory_items_delete_admins
on public.inventory_items for delete to authenticated
using (
  public.has_company_role(company_id, array['owner', 'admin']::public.app_role[])
);

create policy inventory_movements_read_members
on public.inventory_movements for select to authenticated
using (public.is_company_member(company_id));
create policy inventory_movements_insert_managers
on public.inventory_movements for insert to authenticated
with check (
  public.has_company_role(company_id, array['owner', 'admin', 'manager']::public.app_role[])
);
create policy inventory_movements_update_managers
on public.inventory_movements for update to authenticated
using (
  public.has_company_role(company_id, array['owner', 'admin', 'manager']::public.app_role[])
)
with check (
  public.has_company_role(company_id, array['owner', 'admin', 'manager']::public.app_role[])
);
create policy inventory_movements_delete_admins
on public.inventory_movements for delete to authenticated
using (
  public.has_company_role(company_id, array['owner', 'admin']::public.app_role[])
);

revoke all on public.appointments, public.payments, public.expenses,
  public.inventory_items, public.inventory_movements from public, anon;
revoke all on public.inventory_stock_balances from public, anon;
grant select, insert, update, delete on
  public.appointments, public.payments, public.expenses,
  public.inventory_items, public.inventory_movements to authenticated;
grant select on public.inventory_stock_balances to authenticated;

revoke all on function public.prevent_technician_appointment_overlap() from public, anon, authenticated;
revoke all on function public.validate_inventory_movement_balance() from public, anon, authenticated;
