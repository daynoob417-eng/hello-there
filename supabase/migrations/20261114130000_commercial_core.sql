-- Central de Orçamentos — Fase 2: estrutura comercial inicial
-- Clientes, oportunidades e catálogo de serviços com isolamento multiempresa.
-- O acesso dos técnicos será liberado por políticas específicas quando os vínculos
-- de atendimento atribuídos existirem.

create table if not exists public.customers (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies (id) on delete cascade,
  full_name text not null check (length(trim(full_name)) between 2 and 180),
  phone text,
  whatsapp text,
  email text,
  tax_document text,
  postal_code text,
  state text,
  city text,
  neighborhood text,
  street text,
  street_number text,
  address_complement text,
  address_reference text,
  notes text,
  archived_at timestamptz,
  created_by uuid not null default auth.uid() references auth.users (id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (company_id, id)
);

create index if not exists customers_company_name_idx
  on public.customers (company_id, lower(full_name));
create index if not exists customers_company_phone_idx
  on public.customers (company_id, phone)
  where phone is not null;
create index if not exists customers_company_active_idx
  on public.customers (company_id, created_at desc)
  where archived_at is null;

create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies (id) on delete cascade,
  customer_id uuid,
  converted_customer_id uuid,
  name text not null check (length(trim(name)) between 2 and 180),
  phone text,
  whatsapp text,
  email text,
  source text,
  service_interest text,
  need_description text,
  stage text not null default 'new'
    check (stage in ('new', 'contacted', 'negotiating', 'quote_sent', 'won', 'lost')),
  assigned_to uuid references auth.users (id) on delete set null,
  entered_at timestamptz not null default now(),
  follow_up_at timestamptz,
  lost_reason text,
  notes text,
  created_by uuid not null default auth.uid() references auth.users (id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint leads_customer_same_company_fk
    foreign key (company_id, customer_id)
    references public.customers (company_id, id) on delete set null (customer_id),
  constraint leads_converted_customer_same_company_fk
    foreign key (company_id, converted_customer_id)
    references public.customers (company_id, id) on delete set null (converted_customer_id)
);

create index if not exists leads_company_stage_idx
  on public.leads (company_id, stage, entered_at desc);
create index if not exists leads_company_follow_up_idx
  on public.leads (company_id, follow_up_at)
  where follow_up_at is not null;
create index if not exists leads_assigned_to_idx
  on public.leads (assigned_to, company_id)
  where assigned_to is not null;

create table if not exists public.services (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies (id) on delete cascade,
  name text not null check (length(trim(name)) between 2 and 160),
  description text,
  category text,
  image_url text,
  pricing_mode text not null default 'quote'
    check (pricing_mode in ('fixed', 'quote')),
  price numeric(12, 2) check (price is null or price >= 0),
  estimated_duration_minutes integer
    check (estimated_duration_minutes is null or estimated_duration_minutes > 0),
  preparation_minutes integer not null default 0 check (preparation_minutes >= 0),
  travel_buffer_minutes integer not null default 0 check (travel_buffer_minutes >= 0),
  online_booking_enabled boolean not null default false,
  requires_assessment boolean not null default true,
  is_active boolean not null default true,
  created_by uuid not null default auth.uid() references auth.users (id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (company_id, id),
  constraint services_fixed_price_required
    check (pricing_mode <> 'fixed' or price is not null),
  constraint services_assessment_not_directly_bookable
    check (not requires_assessment or not online_booking_enabled)
);

create index if not exists services_company_active_idx
  on public.services (company_id, name)
  where is_active = true;
create index if not exists services_public_catalog_idx
  on public.services (company_id, online_booking_enabled)
  where is_active = true;

drop trigger if exists customers_set_updated_at on public.customers;
create trigger customers_set_updated_at
before update on public.customers
for each row execute function public.set_updated_at();

drop trigger if exists leads_set_updated_at on public.leads;
create trigger leads_set_updated_at
before update on public.leads
for each row execute function public.set_updated_at();

drop trigger if exists services_set_updated_at on public.services;
create trigger services_set_updated_at
before update on public.services
for each row execute function public.set_updated_at();

alter table public.customers enable row level security;
alter table public.leads enable row level security;
alter table public.services enable row level security;

drop policy if exists "customers_select_admins" on public.customers;
create policy "customers_select_admins"
on public.customers for select
to authenticated
using (public.has_company_role(company_id, array['owner', 'admin']));

drop policy if exists "customers_insert_admins" on public.customers;
create policy "customers_insert_admins"
on public.customers for insert
to authenticated
with check (
  public.has_company_role(company_id, array['owner', 'admin'])
  and created_by = (select auth.uid())
);

drop policy if exists "customers_update_admins" on public.customers;
create policy "customers_update_admins"
on public.customers for update
to authenticated
using (public.has_company_role(company_id, array['owner', 'admin']))
with check (public.has_company_role(company_id, array['owner', 'admin']));

drop policy if exists "customers_delete_admins" on public.customers;
create policy "customers_delete_admins"
on public.customers for delete
to authenticated
using (public.has_company_role(company_id, array['owner', 'admin']));

drop policy if exists "leads_select_admins" on public.leads;
create policy "leads_select_admins"
on public.leads for select
to authenticated
using (public.has_company_role(company_id, array['owner', 'admin']));

drop policy if exists "leads_insert_admins" on public.leads;
create policy "leads_insert_admins"
on public.leads for insert
to authenticated
with check (
  public.has_company_role(company_id, array['owner', 'admin'])
  and created_by = (select auth.uid())
);

drop policy if exists "leads_update_admins" on public.leads;
create policy "leads_update_admins"
on public.leads for update
to authenticated
using (public.has_company_role(company_id, array['owner', 'admin']))
with check (public.has_company_role(company_id, array['owner', 'admin']));

drop policy if exists "leads_delete_admins" on public.leads;
create policy "leads_delete_admins"
on public.leads for delete
to authenticated
using (public.has_company_role(company_id, array['owner']));

drop policy if exists "services_select_members" on public.services;
create policy "services_select_members"
on public.services for select
to authenticated
using (public.is_company_member(company_id));

drop policy if exists "services_insert_admins" on public.services;
create policy "services_insert_admins"
on public.services for insert
to authenticated
with check (
  public.has_company_role(company_id, array['owner', 'admin'])
  and created_by = (select auth.uid())
);

drop policy if exists "services_update_admins" on public.services;
create policy "services_update_admins"
on public.services for update
to authenticated
using (public.has_company_role(company_id, array['owner', 'admin']))
with check (public.has_company_role(company_id, array['owner', 'admin']));

drop policy if exists "services_delete_admins" on public.services;
create policy "services_delete_admins"
on public.services for delete
to authenticated
using (public.has_company_role(company_id, array['owner']));

grant select, insert, update, delete on public.customers to authenticated;
grant select, insert, update, delete on public.leads to authenticated;
grant select, insert, update, delete on public.services to authenticated;
