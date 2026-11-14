-- Lovable Cloud foundation + commercial core
-- This file is a versioned schema definition. Committing it does NOT apply it to the live Cloud database.
-- Apply through an authorized Lovable Cloud migration/deployment mechanism after reviewing the SQL.

do $$ begin
  create type public.app_role as enum ('owner', 'admin', 'manager', 'technician');
exception when duplicate_object then null; end $$;

do $$ begin
  create type public.lead_status as enum ('new', 'contacted', 'qualified', 'converted', 'lost');
exception when duplicate_object then null; end $$;

do $$ begin
  create type public.service_pricing_type as enum ('fixed', 'quote_required');
exception when duplicate_object then null; end $$;

do $$ begin
  create type public.quote_status as enum ('draft', 'sent', 'approved', 'rejected', 'expired', 'cancelled');
exception when duplicate_object then null; end $$;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  phone text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.companies (
  id uuid primary key default gen_random_uuid(),
  name text not null check (length(trim(name)) between 2 and 160),
  phone text,
  email text,
  created_by uuid not null references auth.users(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.company_members (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  role public.app_role not null,
  invited_by uuid references auth.users(id),
  created_at timestamptz not null default now(),
  unique (company_id, user_id),
  unique (id, company_id)
);

create table if not exists public.customers (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies(id) on delete cascade,
  name text not null check (length(trim(name)) between 2 and 160),
  email text,
  phone text,
  document text,
  postal_code text,
  street text,
  street_number text,
  address_complement text,
  neighborhood text,
  city text,
  state text,
  notes text,
  archived_at timestamptz,
  created_by uuid not null default auth.uid() references auth.users(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (id, company_id)
);

create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies(id) on delete cascade,
  customer_id uuid,
  title text not null check (length(trim(title)) between 2 and 180),
  contact_name text,
  email text,
  phone text,
  source text,
  description text,
  status public.lead_status not null default 'new',
  assigned_to uuid references public.profiles(id) on delete set null,
  next_contact_at timestamptz,
  created_by uuid not null default auth.uid() references auth.users(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (id, company_id),
  foreign key (customer_id, company_id)
    references public.customers(id, company_id)
);

create table if not exists public.services (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies(id) on delete cascade,
  name text not null check (length(trim(name)) between 2 and 160),
  description text,
  pricing_type public.service_pricing_type not null default 'quote_required',
  fixed_price numeric(12,2) check (fixed_price is null or fixed_price >= 0),
  estimated_duration_minutes integer check (estimated_duration_minutes is null or estimated_duration_minutes > 0),
  is_active boolean not null default true,
  created_by uuid not null default auth.uid() references auth.users(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (id, company_id),
  check (
    (pricing_type = 'fixed' and fixed_price is not null)
    or (pricing_type = 'quote_required' and fixed_price is null)
  )
);

create table if not exists public.quotes (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies(id) on delete cascade,
  customer_id uuid not null,
  quote_number text not null default (
    'ORC-' || upper(substr(replace(gen_random_uuid()::text, '-', ''), 1, 8))
  ),
  status public.quote_status not null default 'draft',
  valid_until date,
  notes text,
  subtotal numeric(12,2) not null default 0 check (subtotal >= 0),
  discount_amount numeric(12,2) not null default 0 check (discount_amount >= 0),
  tax_amount numeric(12,2) not null default 0 check (tax_amount >= 0),
  total_amount numeric(12,2) not null default 0 check (total_amount >= 0),
  created_by uuid not null default auth.uid() references auth.users(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (id, company_id),
  unique (company_id, quote_number),
  foreign key (customer_id, company_id)
    references public.customers(id, company_id)
);

create table if not exists public.quote_items (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies(id) on delete cascade,
  quote_id uuid not null,
  service_id uuid,
  description text not null check (length(trim(description)) between 1 and 500),
  quantity numeric(10,2) not null default 1 check (quantity > 0),
  unit_price numeric(12,2) not null check (unit_price >= 0),
  line_total numeric(12,2) generated always as (round(quantity * unit_price, 2)) stored,
  created_at timestamptz not null default now(),
  foreign key (quote_id, company_id)
    references public.quotes(id, company_id) on delete cascade,
  foreign key (service_id, company_id)
    references public.services(id, company_id)
);

create table if not exists public.audit_logs (
  id bigint generated always as identity primary key,
  company_id uuid not null references public.companies(id) on delete cascade,
  actor_user_id uuid references auth.users(id) on delete set null,
  entity_table text not null,
  entity_id uuid not null,
  action text not null check (action in ('INSERT', 'UPDATE', 'DELETE')),
  old_data jsonb,
  new_data jsonb,
  created_at timestamptz not null default now()
);

create index if not exists company_members_user_company_idx
  on public.company_members (user_id, company_id);
create index if not exists customers_company_name_idx
  on public.customers (company_id, lower(name));
create index if not exists leads_company_status_created_idx
  on public.leads (company_id, status, created_at desc);
create index if not exists services_company_active_idx
  on public.services (company_id, is_active);
create index if not exists quotes_company_status_created_idx
  on public.quotes (company_id, status, created_at desc);
create index if not exists quote_items_quote_idx
  on public.quote_items (quote_id);
create index if not exists audit_logs_company_created_idx
  on public.audit_logs (company_id, created_at desc);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
set search_path = public, pg_temp
as $$
begin
  new.updated_at := now();
  return new;
end;
$$;

create or replace function public.is_company_member(p_company_id uuid)
returns boolean
language sql
stable
security definer
set search_path = public, pg_temp
as $$
  select exists (
    select 1
    from public.company_members cm
    where cm.company_id = p_company_id
      and cm.user_id = (select auth.uid())
  );
$$;

create or replace function public.has_company_role(
  p_company_id uuid,
  p_roles public.app_role[]
)
returns boolean
language sql
stable
security definer
set search_path = public, pg_temp
as $$
  select exists (
    select 1
    from public.company_members cm
    where cm.company_id = p_company_id
      and cm.user_id = (select auth.uid())
      and cm.role = any(p_roles)
  );
$$;

create or replace function public.handle_new_auth_user()
returns trigger
language plpgsql
security definer
set search_path = public, pg_temp
as $$
begin
  insert into public.profiles (id, full_name)
  values (new.id, nullif(trim(new.raw_user_meta_data ->> 'full_name'), ''))
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created_profile on auth.users;
create trigger on_auth_user_created_profile
  after insert on auth.users
  for each row execute function public.handle_new_auth_user();

create or replace function public.create_company_for_current_user(
  p_name text,
  p_phone text default null,
  p_email text default null
)
returns uuid
language plpgsql
security definer
set search_path = public, auth, pg_temp
as $$
declare
  v_user_id uuid := auth.uid();
  v_company_id uuid;
begin
  if v_user_id is null then
    raise exception 'Authentication required' using errcode = '28000';
  end if;
  if p_name is null or length(trim(p_name)) < 2 or length(trim(p_name)) > 160 then
    raise exception 'Company name must contain between 2 and 160 characters'
      using errcode = '22023';
  end if;

  insert into public.profiles (id)
  values (v_user_id)
  on conflict (id) do nothing;

  insert into public.companies (name, phone, email, created_by)
  values (trim(p_name), nullif(trim(p_phone), ''), nullif(trim(p_email), ''), v_user_id)
  returning id into v_company_id;

  insert into public.company_members (company_id, user_id, role, invited_by)
  values (v_company_id, v_user_id, 'owner', v_user_id);

  return v_company_id;
end;
$$;

create or replace function public.add_company_member(
  p_company_id uuid,
  p_user_id uuid,
  p_role public.app_role
)
returns uuid
language plpgsql
security definer
set search_path = public, auth, pg_temp
as $$
declare
  v_member_id uuid;
begin
  if auth.uid() is null then
    raise exception 'Authentication required' using errcode = '28000';
  end if;
  if not public.has_company_role(p_company_id, array['owner', 'admin']::public.app_role[]) then
    raise exception 'Not authorized to manage company members' using errcode = '42501';
  end if;
  if p_role not in ('manager', 'technician') then
    raise exception 'Only manager or technician roles can be assigned through this function'
      using errcode = '22023';
  end if;
  if not exists (select 1 from auth.users u where u.id = p_user_id) then
    raise exception 'User does not exist' using errcode = '22023';
  end if;

  insert into public.company_members (company_id, user_id, role, invited_by)
  values (p_company_id, p_user_id, p_role, auth.uid())
  returning id into v_member_id;

  return v_member_id;
end;
$$;

create or replace function public.set_quote_total_amount()
returns trigger
language plpgsql
set search_path = public, pg_temp
as $
begin
  new.total_amount := greatest(new.subtotal - new.discount_amount, 0) + new.tax_amount;
  return new;
end;
$;

create or replace function public.recalculate_quote_totals()
returns trigger
language plpgsql
security definer
set search_path = public, pg_temp
as $$
declare
  v_quote_id uuid;
begin
  if tg_op = 'DELETE' then
    v_quote_id := old.quote_id;
  else
    v_quote_id := new.quote_id;
  end if;

  if tg_op = 'UPDATE' and old.quote_id is distinct from new.quote_id then
    update public.quotes q
    set subtotal = coalesce((
          select sum(qi.line_total) from public.quote_items qi where qi.quote_id = old.quote_id
        ), 0)
    where q.id = old.quote_id;
  end if;

  update public.quotes q
  set subtotal = coalesce((
        select sum(qi.line_total)
        from public.quote_items qi
        where qi.quote_id = v_quote_id
      ), 0),
      total_amount = greatest(
        coalesce((
          select sum(qi.line_total)
          from public.quote_items qi
          where qi.quote_id = v_quote_id
        ), 0) - q.discount_amount,
        0
      ) + q.tax_amount,
      updated_at = now()
  where q.id = v_quote_id;

  if tg_op = 'DELETE' then return old; end if;
  return new;
end;
$$;

create or replace function public.write_audit_log()
returns trigger
language plpgsql
security definer
set search_path = public, pg_temp
as $$
declare
  v_row jsonb;
begin
  if tg_op = 'DELETE' then
    v_row := to_jsonb(old);
  else
    v_row := to_jsonb(new);
  end if;

  insert into public.audit_logs (
    company_id, actor_user_id, entity_table, entity_id, action, old_data, new_data
  )
  values (
    (v_row ->> 'company_id')::uuid,
    auth.uid(),
    tg_table_name,
    (v_row ->> 'id')::uuid,
    tg_op,
    case when tg_op in ('UPDATE', 'DELETE') then to_jsonb(old) else null end,
    case when tg_op in ('INSERT', 'UPDATE') then to_jsonb(new) else null end
  );

  if tg_op = 'DELETE' then return old; end if;
  return new;
end;
$$;

drop trigger if exists profiles_set_updated_at on public.profiles;
create trigger profiles_set_updated_at before update on public.profiles
for each row execute function public.set_updated_at();
drop trigger if exists companies_set_updated_at on public.companies;
create trigger companies_set_updated_at before update on public.companies
for each row execute function public.set_updated_at();
drop trigger if exists customers_set_updated_at on public.customers;
create trigger customers_set_updated_at before update on public.customers
for each row execute function public.set_updated_at();
drop trigger if exists leads_set_updated_at on public.leads;
create trigger leads_set_updated_at before update on public.leads
for each row execute function public.set_updated_at();
drop trigger if exists services_set_updated_at on public.services;
create trigger services_set_updated_at before update on public.services
for each row execute function public.set_updated_at();
drop trigger if exists quotes_set_updated_at on public.quotes;
create trigger quotes_set_updated_at before update on public.quotes
for each row execute function public.set_updated_at();

drop trigger if exists quotes_set_total_amount on public.quotes;
create trigger quotes_set_total_amount
before insert or update of subtotal, discount_amount, tax_amount on public.quotes
for each row execute function public.set_quote_total_amount();

drop trigger if exists quote_items_recalculate_totals on public.quote_items;
create trigger quote_items_recalculate_totals
after insert or update or delete on public.quote_items
for each row execute function public.recalculate_quote_totals();

drop trigger if exists customers_audit on public.customers;
create trigger customers_audit after insert or update or delete on public.customers
for each row execute function public.write_audit_log();
drop trigger if exists leads_audit on public.leads;
create trigger leads_audit after insert or update or delete on public.leads
for each row execute function public.write_audit_log();
drop trigger if exists services_audit on public.services;
create trigger services_audit after insert or update or delete on public.services
for each row execute function public.write_audit_log();
drop trigger if exists quotes_audit on public.quotes;
create trigger quotes_audit after insert or update or delete on public.quotes
for each row execute function public.write_audit_log();

alter table public.profiles enable row level security;
alter table public.companies enable row level security;
alter table public.company_members enable row level security;
alter table public.customers enable row level security;
alter table public.leads enable row level security;
alter table public.services enable row level security;
alter table public.quotes enable row level security;
alter table public.quote_items enable row level security;
alter table public.audit_logs enable row level security;

drop policy if exists "profiles_read_own" on public.profiles;
create policy "profiles_read_own" on public.profiles
for select to authenticated
using (id = (select auth.uid()));

drop policy if exists "profiles_update_own" on public.profiles;
create policy "profiles_update_own" on public.profiles
for update to authenticated
using (id = (select auth.uid()))
with check (id = (select auth.uid()));

drop policy if exists "companies_read_members" on public.companies;
create policy "companies_read_members" on public.companies
for select to authenticated
using (public.is_company_member(id));

drop policy if exists "companies_update_admins" on public.companies;
create policy "companies_update_admins" on public.companies
for update to authenticated
using (public.has_company_role(id, array['owner', 'admin']::public.app_role[]))
with check (public.has_company_role(id, array['owner', 'admin']::public.app_role[]));

drop policy if exists "company_members_read_self_or_admin" on public.company_members;
create policy "company_members_read_self_or_admin" on public.company_members
for select to authenticated
using (
  user_id = (select auth.uid())
  or public.has_company_role(company_id, array['owner', 'admin']::public.app_role[])
);

drop policy if exists "customers_read_managers" on public.customers;
create policy "customers_read_managers" on public.customers
for select to authenticated
using (public.has_company_role(company_id, array['owner', 'admin', 'manager']::public.app_role[]));

drop policy if exists "customers_insert_managers" on public.customers;
create policy "customers_insert_managers" on public.customers
for insert to authenticated
with check (public.has_company_role(company_id, array['owner', 'admin', 'manager']::public.app_role[]));

drop policy if exists "customers_update_managers" on public.customers;
create policy "customers_update_managers" on public.customers
for update to authenticated
using (public.has_company_role(company_id, array['owner', 'admin', 'manager']::public.app_role[]))
with check (public.has_company_role(company_id, array['owner', 'admin', 'manager']::public.app_role[]));

drop policy if exists "customers_delete_admins" on public.customers;
create policy "customers_delete_admins" on public.customers
for delete to authenticated
using (public.has_company_role(company_id, array['owner', 'admin']::public.app_role[]));

drop policy if exists "leads_read_managers" on public.leads;
create policy "leads_read_managers" on public.leads
for select to authenticated
using (public.has_company_role(company_id, array['owner', 'admin', 'manager']::public.app_role[]));

drop policy if exists "leads_insert_managers" on public.leads;
create policy "leads_insert_managers" on public.leads
for insert to authenticated
with check (public.has_company_role(company_id, array['owner', 'admin', 'manager']::public.app_role[]));

drop policy if exists "leads_update_managers" on public.leads;
create policy "leads_update_managers" on public.leads
for update to authenticated
using (public.has_company_role(company_id, array['owner', 'admin', 'manager']::public.app_role[]))
with check (public.has_company_role(company_id, array['owner', 'admin', 'manager']::public.app_role[]));

drop policy if exists "leads_delete_admins" on public.leads;
create policy "leads_delete_admins" on public.leads
for delete to authenticated
using (public.has_company_role(company_id, array['owner', 'admin']::public.app_role[]));

drop policy if exists "services_read_members" on public.services;
create policy "services_read_members" on public.services
for select to authenticated
using (public.is_company_member(company_id));

drop policy if exists "services_insert_admins" on public.services;
create policy "services_insert_admins" on public.services
for insert to authenticated
with check (public.has_company_role(company_id, array['owner', 'admin']::public.app_role[]));

drop policy if exists "services_update_admins" on public.services;
create policy "services_update_admins" on public.services
for update to authenticated
using (public.has_company_role(company_id, array['owner', 'admin']::public.app_role[]))
with check (public.has_company_role(company_id, array['owner', 'admin']::public.app_role[]));

drop policy if exists "services_delete_admins" on public.services;
create policy "services_delete_admins" on public.services
for delete to authenticated
using (public.has_company_role(company_id, array['owner', 'admin']::public.app_role[]));

drop policy if exists "quotes_read_managers" on public.quotes;
create policy "quotes_read_managers" on public.quotes
for select to authenticated
using (public.has_company_role(company_id, array['owner', 'admin', 'manager']::public.app_role[]));

drop policy if exists "quotes_insert_managers" on public.quotes;
create policy "quotes_insert_managers" on public.quotes
for insert to authenticated
with check (public.has_company_role(company_id, array['owner', 'admin', 'manager']::public.app_role[]));

drop policy if exists "quotes_update_managers" on public.quotes;
create policy "quotes_update_managers" on public.quotes
for update to authenticated
using (public.has_company_role(company_id, array['owner', 'admin', 'manager']::public.app_role[]))
with check (public.has_company_role(company_id, array['owner', 'admin', 'manager']::public.app_role[]));

drop policy if exists "quotes_delete_admins" on public.quotes;
create policy "quotes_delete_admins" on public.quotes
for delete to authenticated
using (public.has_company_role(company_id, array['owner', 'admin']::public.app_role[]));

drop policy if exists "quote_items_read_managers" on public.quote_items;
create policy "quote_items_read_managers" on public.quote_items
for select to authenticated
using (public.has_company_role(company_id, array['owner', 'admin', 'manager']::public.app_role[]));

drop policy if exists "quote_items_insert_managers" on public.quote_items;
create policy "quote_items_insert_managers" on public.quote_items
for insert to authenticated
with check (public.has_company_role(company_id, array['owner', 'admin', 'manager']::public.app_role[]));

drop policy if exists "quote_items_update_managers" on public.quote_items;
create policy "quote_items_update_managers" on public.quote_items
for update to authenticated
using (public.has_company_role(company_id, array['owner', 'admin', 'manager']::public.app_role[]))
with check (public.has_company_role(company_id, array['owner', 'admin', 'manager']::public.app_role[]));

drop policy if exists "quote_items_delete_managers" on public.quote_items;
create policy "quote_items_delete_managers" on public.quote_items
for delete to authenticated
using (public.has_company_role(company_id, array['owner', 'admin', 'manager']::public.app_role[]));

drop policy if exists "audit_logs_read_admins" on public.audit_logs;
create policy "audit_logs_read_admins" on public.audit_logs
for select to authenticated
using (public.has_company_role(company_id, array['owner', 'admin']::public.app_role[]));

grant usage on schema public to authenticated;
grant select, insert, update, delete on
  public.profiles, public.companies, public.company_members, public.customers,
  public.leads, public.services, public.quotes, public.quote_items, public.audit_logs
  to authenticated;
revoke all on all tables in schema public from anon;
grant usage, select on sequence public.audit_logs_id_seq to authenticated;

revoke all on function public.set_updated_at() from public;
revoke all on function public.handle_new_auth_user() from public;
revoke all on function public.set_quote_total_amount() from public;
revoke all on function public.recalculate_quote_totals() from public;
revoke all on function public.write_audit_log() from public;
revoke all on function public.create_company_for_current_user(text, text, text) from public;
grant execute on function public.create_company_for_current_user(text, text, text) to authenticated;
revoke all on function public.add_company_member(uuid, uuid, public.app_role) from public;
grant execute on function public.add_company_member(uuid, uuid, public.app_role) to authenticated;
revoke all on function public.is_company_member(uuid) from public;
grant execute on function public.is_company_member(uuid) to authenticated;
revoke all on function public.has_company_role(uuid, public.app_role[]) from public;
grant execute on function public.has_company_role(uuid, public.app_role[]) to authenticated;
