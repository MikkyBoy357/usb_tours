-- Inquiries table for tour booking inquiries from the public site.
-- Public can INSERT (so the contact form server action can persist anonymously).
-- Only authenticated users (the ops team) can SELECT.

create table if not exists public.inquiries (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null,
  email text not null,
  phone text,
  tour_slug text,
  travel_date text,
  group_size int,
  message text not null,
  source text,                 -- which page they were on (e.g. tour slug page)
  user_agent text,
  ip_hash text,                -- optional, hash of client IP for rate limiting
  status text not null default 'new'  -- 'new' | 'replied' | 'archived' | 'spam'
);

create index if not exists inquiries_created_at_idx on public.inquiries (created_at desc);
create index if not exists inquiries_status_idx on public.inquiries (status);

alter table public.inquiries enable row level security;

-- Allow anonymous inserts (the form is public).
drop policy if exists "anyone can insert inquiries" on public.inquiries;
create policy "anyone can insert inquiries"
  on public.inquiries
  for insert
  to anon, authenticated
  with check (true);

-- Only authenticated users can read.
drop policy if exists "authenticated can read inquiries" on public.inquiries;
create policy "authenticated can read inquiries"
  on public.inquiries
  for select
  to authenticated
  using (true);
