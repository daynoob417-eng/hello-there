-- Central de Orçamentos — Fase 1: base multiempresa
-- Esta migration cria apenas a fundação de identidade e isolamento por empresa.
-- Não cria dados de demonstração nem substitui as próximas migrations dos módulos.

create extension if not exists pgcrypto;

create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  full_name text,
  phone text,
  avatar_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.companies (
  id uuid primary key default gen_random_uuid(),
  name text not null check (length(trim(name)) between 2 and 160),
  legal_name text,
  tax_document text,
  phone text,
  whatsapp text,
  email text,
  postal_code text,
  state text,
  city text,
  neighborhood text,
  street text,
  street_number text,
  address_complement text,
  logo_url text,
  timezone text not null default 'America/Sao_Paulo',
  owner_user_id uuid not null references auth.users (id) on delete restrict,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.company_members (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies (id) on delete cascade,
  user_id uuid not null references auth.users (id) on delete cascade,
  role text not null check (role in ('owner', 'admin', 'technician')),
  status text not null default 'active' check (status in ('active', 'invited', 'disabled')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (company_id, user_id)
);

create index if not exists company_members_user_company_idx
  on public.company_members (user_id, company_id);

create index if not exists company_members_company_status_idx
  on public.company_members (company_id, status);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create or replace function public.is_company_member(target_company_id uuid)
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1
    from public.company_members cm
    where cm.company_id = target_company_id
      and cm.user_id = (select auth.uid())
      and cm.status = 'active'
  );
$$;

create or replace function public.has_company_role(target_company_id uuid, allowed_roles text[])
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1
    from public.company_members cm
    where cm.company_id = target_company_id
      and cm.user_id = (select auth.uid())
      and cm.status = 'active'
      and cm.role = any (allowed_roles)
  );
$$;

create or replace function public.create_company_owner_membership()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.company_members (company_id, user_id, role, status)
  values (new.id, new.owner_user_id, 'owner', 'active');
  return new;
end;
$$;

create or replace function public.prevent_company_owner_change()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  if new.owner_user_id is distinct from old.owner_user_id then
    raise exception 'A titularidade da empresa não pode ser alterada por esta operação.';
  end if;
  return new;
end;
$$;

create or replace function public.handle_new_auth_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.profiles (id, full_name, avatar_url)
  values (
    new.id,
    nullif(trim(new.raw_user_meta_data ->> 'full_name'), ''),
    nullif(trim(new.raw_user_meta_data ->> 'avatar_url'), '')
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists profiles_set_updated_at on public.profiles;
create trigger profiles_set_updated_at
before update on public.profiles
for each row execute function public.set_updated_at();

drop trigger if exists companies_set_updated_at on public.companies;
create trigger companies_set_updated_at
before update on public.companies
for each row execute function public.set_updated_at();

drop trigger if exists company_members_set_updated_at on public.company_members;
create trigger company_members_set_updated_at
before update on public.company_members
for each row execute function public.set_updated_at();

drop trigger if exists companies_create_owner_membership on public.companies;
create trigger companies_create_owner_membership
after insert on public.companies
for each row execute function public.create_company_owner_membership();

drop trigger if exists companies_prevent_owner_change on public.companies;
create trigger companies_prevent_owner_change
before update of owner_user_id on public.companies
for each row execute function public.prevent_company_owner_change();

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row execute function public.handle_new_auth_user();

alter table public.profiles enable row level security;
alter table public.companies enable row level security;
alter table public.company_members enable row level security;

drop policy if exists "profiles_select_self" on public.profiles;
create policy "profiles_select_self"
on public.profiles for select
to authenticated
using (id = (select auth.uid()));

drop policy if exists "profiles_update_self" on public.profiles;
create policy "profiles_update_self"
on public.profiles for update
to authenticated
using (id = (select auth.uid()))
with check (id = (select auth.uid()));

drop policy if exists "companies_select_members" on public.companies;
create policy "companies_select_members"
on public.companies for select
to authenticated
using (public.is_company_member(id));

drop policy if exists "companies_insert_owner" on public.companies;
create policy "companies_insert_owner"
on public.companies for insert
to authenticated
with check (owner_user_id = (select auth.uid()));

drop policy if exists "companies_update_admins" on public.companies;
create policy "companies_update_admins"
on public.companies for update
to authenticated
using (public.has_company_role(id, array['owner', 'admin']))
with check (public.has_company_role(id, array['owner', 'admin']));

drop policy if exists "companies_delete_owner" on public.companies;
create policy "companies_delete_owner"
on public.companies for delete
to authenticated
using (public.has_company_role(id, array['owner']));

drop policy if exists "company_members_select_members" on public.company_members;
create policy "company_members_select_members"
on public.company_members for select
to authenticated
using (public.is_company_member(company_id));

drop policy if exists "company_members_insert_admins" on public.company_members;
create policy "company_members_insert_admins"
on public.company_members for insert
to authenticated
with check (
  role <> 'owner'
  and public.has_company_role(company_id, array['owner', 'admin'])
);

drop policy if exists "company_members_update_admins" on public.company_members;
create policy "company_members_update_admins"
on public.company_members for update
to authenticated
using (
  role <> 'owner'
  and public.has_company_role(company_id, array['owner', 'admin'])
)
with check (
  role <> 'owner'
  and public.has_company_role(company_id, array['owner', 'admin'])
);

drop policy if exists "company_members_delete_owner" on public.company_members;
create policy "company_members_delete_owner"
on public.company_members for delete
to authenticated
using (
  role <> 'owner'
  and public.has_company_role(company_id, array['owner'])
);

revoke all on function public.is_company_member(uuid) from public;
revoke all on function public.has_company_role(uuid, text[]) from public;
grant execute on function public.is_company_member(uuid) to authenticated;
grant execute on function public.has_company_role(uuid, text[]) to authenticated;

grant select, update on public.profiles to authenticated;
grant select, insert, update, delete on public.companies to authenticated;
grant select, insert, update, delete on public.company_members to authenticated;
