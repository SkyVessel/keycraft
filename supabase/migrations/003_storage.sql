-- supabase/migrations/003_storage.sql
-- Storage buckets for KeyCraft

insert into storage.buckets (id, name, public) values
  ('textures',    'textures',    true),
  ('sketches',    'sketches',    false),
  ('renders',     'renders',     false),
  ('box-designs', 'box-designs', false)
on conflict (id) do nothing;

-- RLS: textures bucket (public read, owner write)
create policy "textures public read"
  on storage.objects for select
  using (bucket_id = 'textures');

create policy "textures authenticated insert"
  on storage.objects for insert
  with check (bucket_id = 'textures' and auth.role() = 'authenticated');

-- RLS: sketches bucket (owner only)
create policy "sketches owner read"
  on storage.objects for select
  using (bucket_id = 'sketches' and auth.uid()::text = (storage.foldername(name))[1]);

create policy "sketches owner insert"
  on storage.objects for insert
  with check (bucket_id = 'sketches');
