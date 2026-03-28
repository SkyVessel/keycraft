-- supabase/migrations/001_schema.sql

-- Designs
create table designs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users not null,
  name text not null default 'Untitled Design',
  profile text not null default 'oem'
    check (profile in ('oem','cherry','sa','dsa','kat','kam','xda','mt3')),
  material text not null default 'matte'
    check (material in ('matte','gloss','transparent','metal')),
  base_color text not null default '#C4956A',
  font_family text not null default 'Helvetica',
  texture_url text,
  kit_id uuid,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Kits
create table kits (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users not null,
  name text not null,
  layout jsonb not null default '{}',
  design_id uuid references designs on delete cascade,
  created_at timestamptz default now()
);

-- Chat sessions
create table chat_sessions (
  id uuid primary key default gen_random_uuid(),
  design_id uuid references designs on delete cascade not null,
  created_at timestamptz default now()
);

-- Messages
create table messages (
  id uuid primary key default gen_random_uuid(),
  session_id uuid references chat_sessions on delete cascade not null,
  role text not null check (role in ('user','assistant')),
  content text not null,
  sketch_url text,
  created_at timestamptz default now()
);

-- Manufacturers (read-only seed data)
create table manufacturers (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  country text,
  profiles text[] default '{}',
  website text,
  notes text
);

-- Render jobs
create table render_jobs (
  id uuid primary key default gen_random_uuid(),
  design_id uuid references designs on delete cascade not null,
  status text not null default 'pending'
    check (status in ('pending','processing','done','error')),
  result_url text,
  created_at timestamptz default now()
);

-- RLS
alter table designs       enable row level security;
alter table kits          enable row level security;
alter table chat_sessions enable row level security;
alter table messages      enable row level security;
alter table render_jobs   enable row level security;

create policy "users own designs"
  on designs for all using (auth.uid() = user_id);

create policy "users own kits"
  on kits for all using (auth.uid() = user_id);

create policy "users own sessions via design"
  on chat_sessions for all
  using (exists (
    select 1 from designs where designs.id = chat_sessions.design_id
      and designs.user_id = auth.uid()
  ));

create policy "users own messages via session"
  on messages for all
  using (exists (
    select 1 from chat_sessions
      join designs on designs.id = chat_sessions.design_id
      where chat_sessions.id = messages.session_id
        and designs.user_id = auth.uid()
  ));

create policy "render jobs via design"
  on render_jobs for all
  using (exists (
    select 1 from designs where designs.id = render_jobs.design_id
      and designs.user_id = auth.uid()
  ));

-- manufacturers 所有人可读
create policy "manufacturers public read"
  on manufacturers for select using (true);

-- Realtime on messages
alter publication supabase_realtime add table messages;

-- Updated_at trigger for designs
create or replace function update_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger designs_updated_at
  before update on designs
  for each row execute function update_updated_at();
