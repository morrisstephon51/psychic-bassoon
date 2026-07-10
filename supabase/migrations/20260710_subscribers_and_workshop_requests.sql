-- Contact form submissions (used by /api/contact)
create table if not exists public.contacts (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  phone text not null,
  zip_code text not null,
  subject text not null,
  message text not null,
  created_at timestamptz not null default now()
);

alter table public.contacts enable row level security;
-- No public policies: only the service role (server-side API routes) may read/write.

-- Newsletter / waitlist subscribers
create table if not exists public.subscribers (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  source text not null default 'website',
  created_at timestamptz not null default now()
);

alter table public.subscribers enable row level security;
-- No public policies: only the service role (server-side API routes) may read/write.

-- Workshop requests from the /workshops page
create table if not exists public.workshop_requests (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  organization text not null,
  event_type text not null,
  attendance text,
  date_preference text,
  email text not null,
  message text,
  created_at timestamptz not null default now()
);

alter table public.workshop_requests enable row level security;
-- No public policies: only the service role (server-side API routes) may read/write.
