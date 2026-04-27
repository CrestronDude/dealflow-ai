-- DealFlow AI — Supabase Schema

-- Users (extends Supabase auth.users)
create table public.profiles (
  id uuid references auth.users on delete cascade primary key,
  email text unique not null,
  full_name text,
  avatar_url text,
  stripe_customer_id text unique,
  subscription_tier text default 'free' check (subscription_tier in ('free','starter','pro','investor_club','agency')),
  subscription_status text default 'inactive',
  analyses_used_this_month int default 0,
  analyses_limit int default 3,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Deal Analyses
create table public.deals (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles on delete cascade not null,
  address text not null,
  property_type text default 'single_family',
  purchase_price numeric,
  down_payment_pct numeric default 20,
  interest_rate numeric default 7.0,
  loan_term_years int default 30,
  monthly_rent numeric,
  vacancy_rate_pct numeric default 8,
  expenses_pct numeric default 40,
  repair_costs numeric default 0,
  -- Computed by AI
  cap_rate numeric,
  cash_on_cash_return numeric,
  noi numeric,
  monthly_cash_flow numeric,
  annual_cash_flow numeric,
  gross_rent_multiplier numeric,
  debt_service_coverage numeric,
  deal_score int, -- 1-100 AI score
  ai_summary text,
  ai_recommendations text,
  red_flags text[],
  strengths text[],
  status text default 'draft' check (status in ('draft','analyzed','saved','archived')),
  is_favorite boolean default false,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Portfolio (tracked properties)
create table public.portfolio (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles on delete cascade not null,
  deal_id uuid references public.deals,
  property_name text not null,
  address text not null,
  purchase_date date,
  purchase_price numeric,
  current_value numeric,
  monthly_rent_actual numeric,
  monthly_expenses_actual numeric,
  notes text,
  created_at timestamptz default now()
);

-- Waitlist
create table public.waitlist (
  id uuid default gen_random_uuid() primary key,
  email text unique not null,
  name text,
  source text,
  created_at timestamptz default now()
);

-- RLS Policies
alter table public.profiles enable row level security;
alter table public.deals enable row level security;
alter table public.portfolio enable row level security;

create policy "Users can view own profile" on public.profiles for select using (auth.uid() = id);
create policy "Users can update own profile" on public.profiles for update using (auth.uid() = id);
create policy "Users can manage own deals" on public.deals for all using (auth.uid() = user_id);
create policy "Users can manage own portfolio" on public.portfolio for all using (auth.uid() = user_id);
create policy "Anyone can join waitlist" on public.waitlist for insert with check (true);

-- Indexes
create index deals_user_id_idx on public.deals(user_id);
create index portfolio_user_id_idx on public.portfolio(user_id);
