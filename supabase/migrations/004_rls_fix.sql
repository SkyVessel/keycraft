-- supabase/migrations/004_rls_fix.sql
-- Add WITH CHECK to ownership policies and enable RLS on manufacturers

-- Enable RLS on manufacturers (was missing)
alter table manufacturers enable row level security;

-- Drop and recreate designs policy with WITH CHECK
drop policy if exists "users own designs" on designs;
create policy "users own designs"
  on designs for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- Drop and recreate kits policy with WITH CHECK
drop policy if exists "users own kits" on kits;
create policy "users own kits"
  on kits for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- Add separate INSERT policies for chat_sessions and messages (subquery-based WITH CHECK is complex)
drop policy if exists "users own sessions via design" on chat_sessions;
create policy "users own sessions select/update/delete"
  on chat_sessions for select
  using (exists (
    select 1 from designs where designs.id = chat_sessions.design_id
      and designs.user_id = auth.uid()
  ));
create policy "users own sessions insert"
  on chat_sessions for insert
  with check (exists (
    select 1 from designs where designs.id = design_id
      and designs.user_id = auth.uid()
  ));

drop policy if exists "users own messages via session" on messages;
create policy "users own messages select/update/delete"
  on messages for select
  using (exists (
    select 1 from chat_sessions
      join designs on designs.id = chat_sessions.design_id
      where chat_sessions.id = messages.session_id
        and designs.user_id = auth.uid()
  ));
create policy "service role messages insert"
  on messages for insert
  with check (true);  -- Edge Function uses service_role key which bypasses RLS

drop policy if exists "render jobs via design" on render_jobs;
create policy "render jobs via design select/update/delete"
  on render_jobs for select
  using (exists (
    select 1 from designs where designs.id = render_jobs.design_id
      and designs.user_id = auth.uid()
  ));
create policy "render jobs via design insert"
  on render_jobs for insert
  with check (exists (
    select 1 from designs where designs.id = design_id
      and designs.user_id = auth.uid()
  ));
