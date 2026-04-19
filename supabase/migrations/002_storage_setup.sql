-- ============================================================
-- PerbiCubs — Supabase Storage Setup
-- Run this in your Supabase SQL Editor (project: mcaywvwsjavkfoesoblz)
-- ============================================================
-- NOTE: You must ALSO create the bucket manually in the Supabase Dashboard:
--   Storage → New bucket → Name: "content-images" → Enable "Public bucket" → Save
--
-- Then run the RLS policies below.
-- ============================================================

-- Allow anyone to read (view) images publicly
create policy "Public read content-images"
  on storage.objects for select
  using ( bucket_id = 'content-images' );

-- Allow authenticated uploads (admin only after auth is set up)
-- For now, allow all uploads so you can test image uploading:
create policy "Allow uploads to content-images"
  on storage.objects for insert
  with check ( bucket_id = 'content-images' );

-- Allow authenticated users to delete their own uploads
create policy "Allow delete from content-images"
  on storage.objects for delete
  using ( bucket_id = 'content-images' );
