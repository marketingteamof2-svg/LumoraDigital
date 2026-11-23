-- Run this in the Supabase SQL editor (Dashboard → SQL → New query).

create extension if not exists "pgcrypto";

create table if not exists public.leads (
  id          uuid primary key default gen_random_uuid(),
  created_at  timestamptz not null default now(),
  name        text not null,
  email       text not null,
  phone       text not null,
  company     text not null,
  website     text,
  services    text[] not null default '{}',
  budget      text not null,
  timeline    text not null,
  message     text,
  source      text,
  utm         jsonb,
  status      text not null default 'new'
              check (status in ('new','contacted','proposal_sent','won','lost')),
  notes       text
);

create index if not exists leads_created_at_idx on public.leads (created_at desc);
create index if not exists leads_status_idx on public.leads (status);

create table if not exists public.newsletter_subscribers (
  id          uuid primary key default gen_random_uuid(),
  created_at  timestamptz not null default now(),
  email       text not null unique
);

-- Lock the tables down. The site only accesses them server-side with the
-- service role key, which bypasses RLS. No public policies = no public access.
alter table public.leads enable row level security;
alter table public.newsletter_subscribers enable row level security;
