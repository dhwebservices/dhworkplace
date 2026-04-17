create extension if not exists pgcrypto;

create table if not exists public.beta_signups (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  phone text not null,
  source text not null default 'DH Workplace beta landing page',
  ip_address text,
  user_agent text,
  created_at timestamptz not null default timezone('utc', now())
);

create index if not exists beta_signups_created_at_idx
  on public.beta_signups (created_at desc);

alter table public.beta_signups enable row level security;

drop policy if exists "No direct public access to beta signups" on public.beta_signups;
create policy "No direct public access to beta signups"
  on public.beta_signups
  for all
  to anon, authenticated
  using (false)
  with check (false);
