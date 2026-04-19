-- ================================================================
-- PerbiCubs — RLS Write Policies Fix
-- Run this in Supabase SQL Editor:
-- https://supabase.com/dashboard/project/mcaywvwsjavkfoesoblz/sql/new
-- ================================================================
-- WHY: Currently only SELECT (read) is allowed publicly.
-- INSERT / UPDATE / DELETE are blocked by RLS, causing all admin
-- save operations to fail with "row-level security policy" errors.
--
-- This SQL adds write policies for the `anon` role so the admin
-- works without authentication. Once auth is added later, replace
-- these with `auth.uid()` checks.
-- ================================================================

-- ─── hero_slides ──────────────────────────────────────────────
ALTER TABLE public.hero_slides ENABLE ROW LEVEL SECURITY;

-- Public read (may already exist)
DROP POLICY IF EXISTS "Allow public read hero_slides" ON public.hero_slides;
CREATE POLICY "Allow public read hero_slides"
  ON public.hero_slides FOR SELECT USING (true);

-- Allow insert (admin — unauthenticated for now)
DROP POLICY IF EXISTS "Allow insert hero_slides" ON public.hero_slides;
CREATE POLICY "Allow insert hero_slides"
  ON public.hero_slides FOR INSERT WITH CHECK (true);

-- Allow update
DROP POLICY IF EXISTS "Allow update hero_slides" ON public.hero_slides;
CREATE POLICY "Allow update hero_slides"
  ON public.hero_slides FOR UPDATE USING (true) WITH CHECK (true);

-- Allow delete
DROP POLICY IF EXISTS "Allow delete hero_slides" ON public.hero_slides;
CREATE POLICY "Allow delete hero_slides"
  ON public.hero_slides FOR DELETE USING (true);


-- ─── impact_stats ─────────────────────────────────────────────
ALTER TABLE public.impact_stats ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow public read impact_stats" ON public.impact_stats;
CREATE POLICY "Allow public read impact_stats"
  ON public.impact_stats FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow insert impact_stats" ON public.impact_stats;
CREATE POLICY "Allow insert impact_stats"
  ON public.impact_stats FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Allow update impact_stats" ON public.impact_stats;
CREATE POLICY "Allow update impact_stats"
  ON public.impact_stats FOR UPDATE USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Allow delete impact_stats" ON public.impact_stats;
CREATE POLICY "Allow delete impact_stats"
  ON public.impact_stats FOR DELETE USING (true);


-- ─── gallery_images ───────────────────────────────────────────
ALTER TABLE public.gallery_images ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow public read gallery_images" ON public.gallery_images;
CREATE POLICY "Allow public read gallery_images"
  ON public.gallery_images FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow insert gallery_images" ON public.gallery_images;
CREATE POLICY "Allow insert gallery_images"
  ON public.gallery_images FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Allow update gallery_images" ON public.gallery_images;
CREATE POLICY "Allow update gallery_images"
  ON public.gallery_images FOR UPDATE USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Allow delete gallery_images" ON public.gallery_images;
CREATE POLICY "Allow delete gallery_images"
  ON public.gallery_images FOR DELETE USING (true);


-- ─── blog_posts ───────────────────────────────────────────────
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow public read blog_posts" ON public.blog_posts;
CREATE POLICY "Allow public read blog_posts"
  ON public.blog_posts FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow insert blog_posts" ON public.blog_posts;
CREATE POLICY "Allow insert blog_posts"
  ON public.blog_posts FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Allow update blog_posts" ON public.blog_posts;
CREATE POLICY "Allow update blog_posts"
  ON public.blog_posts FOR UPDATE USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Allow delete blog_posts" ON public.blog_posts;
CREATE POLICY "Allow delete blog_posts"
  ON public.blog_posts FOR DELETE USING (true);

-- ================================================================
-- CONFIRM: after running, try adding a hero slide in the admin.
-- ================================================================
