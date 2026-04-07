-- Run this in Supabase SQL Editor to provision backend tables.

create table if not exists public.inventory_records (
  id text primary key,
  name text not null,
  quantity numeric not null,
  unit text not null,
  site text not null,
  supplier text not null,
  date date not null,
  status text not null check (status in ('Normal', 'Low')),
  trend text not null,
  created_at timestamptz not null default now()
);

create table if not exists public.worker_records (
  id text primary key,
  name text not null,
  role text not null,
  contact text not null,
  email text not null default '',
  address text not null default '',
  joining_date date not null,
  hourly_rate numeric not null,
  status text not null check (status in ('Active', 'Inactive')),
  hours_this_week numeric not null default 0,
  rating numeric not null default 4.5,
  created_at timestamptz not null default now()
);

create table if not exists public.supplier_records (
  id text primary key,
  name text not null,
  contact text not null,
  phone text not null,
  email text not null default '',
  location text not null,
  materials text[] not null default '{}',
  rating numeric not null default 0,
  orders numeric not null default 0,
  avg_cost text not null check (avg_cost in ('Low', 'Medium', 'High')),
  reliability numeric not null default 90,
  is_recommended boolean not null default false,
  created_at timestamptz not null default now()
);

create table if not exists public.invoice_records (
  id text primary key,
  supplier text not null,
  amount numeric not null,
  status text not null check (status in ('Paid', 'Pending', 'Duplicate')),
  date date not null,
  category text not null,
  created_at timestamptz not null default now()
);

create index if not exists idx_inventory_created_at on public.inventory_records (created_at desc);
create index if not exists idx_workers_created_at on public.worker_records (created_at desc);
create index if not exists idx_suppliers_created_at on public.supplier_records (created_at desc);
create index if not exists idx_invoices_created_at on public.invoice_records (created_at desc);
