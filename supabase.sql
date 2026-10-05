create extension if not exists pgcrypto;

create table if not exists public.households (
  id uuid primary key default gen_random_uuid(),
  name text not null default 'Bizim Ev',
  invite_code text unique not null,
  created_at timestamptz not null default now()
);

create table if not exists public.household_members (
  household_id uuid references public.households(id) on delete cascade,
  user_id uuid references auth.users(id) on delete cascade,
  name text not null default 'Üye',
  created_at timestamptz not null default now(),
  primary key (household_id,user_id)
);

create table if not exists public.shopping_items (
  id uuid primary key default gen_random_uuid(),
  household_id uuid references public.households(id) on delete cascade not null,
  name text not null,
  quantity text default '',
  icon text default '🛒',
  category text default 'Diğer',
  is_bought boolean not null default false,
  added_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now(),
  bought_at timestamptz
);

alter table public.households enable row level security;
alter table public.household_members enable row level security;
alter table public.shopping_items enable row level security;

create or replace function public.is_member(hid uuid) returns boolean language sql stable security definer set search_path=public as $$
  select exists(select 1 from public.household_members where household_id=hid and user_id=auth.uid());
$$;

create policy "members read households" on public.households for select using (public.is_member(id));
create policy "members read membership" on public.household_members for select using (user_id=auth.uid() or public.is_member(household_id));
create policy "members manage items" on public.shopping_items for all using (public.is_member(household_id)) with check (public.is_member(household_id));

-- Signup sonrası kullanıcıyı eve bağlamak için aşağıdaki RPC'yi kullanıyoruz.
create or replace function public.join_household(p_code text, p_name text default 'Üye') returns uuid
language plpgsql security definer set search_path=public as $$
declare hid uuid;
begin
  select id into hid from public.households where upper(invite_code)=upper(trim(p_code));
  if hid is null then raise exception 'Geçersiz ev kodu'; end if;
  insert into public.household_members(household_id,user_id,name) values(hid,auth.uid(),coalesce(nullif(trim(p_name),''),'Üye')) on conflict do nothing;
  return hid;
end; $$;

create or replace function public.create_household(p_name text default 'Bizim Ev', p_member_name text default 'Üye') returns table(household_id uuid, invite_code text)
language plpgsql security definer set search_path=public as $$
declare hid uuid; code text;
begin
  code := upper(substr(encode(gen_random_bytes(4),'hex'),1,6));
  insert into public.households(name,invite_code) values(coalesce(nullif(trim(p_name),''),'Bizim Ev'),code) returning id into hid;
  insert into public.household_members(household_id,user_id,name) values(hid,auth.uid(),coalesce(nullif(trim(p_member_name),''),'Üye'));
  return query select hid,code;
end; $$;

grant execute on function public.join_household(text,text) to authenticated;
grant execute on function public.create_household(text,text) to authenticated;
