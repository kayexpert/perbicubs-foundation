-- ================================================================
-- PerbiCubs — RLS Write Policies Revert
-- Run this in Supabase SQL Editor:
-- https://supabase.com/dashboard/project/mcaywvwsjavkfoesoblz/sql/new
-- ================================================================
-- WHY: The previous migration (003 and 004) opened up INSERT/UPDATE/DELETE
-- to the public `anon` role to make the admin panel work without Supabase Auth.
-- This is a severe security vulnerability.
--
-- Now that the Next.js Server Actions use the `SUPABASE_SERVICE_ROLE_KEY`
-- to perform admin operations, we can safely remove the `anon` write policies
-- and restrict mutations to the `service_role` only.
-- ================================================================

-- ─── hero_slides ──────────────────────────────────────────────
DROP POLICY IF EXISTS "Allow insert hero_slides" ON public.hero_slides;
DROP POLICY IF EXISTS "Allow update hero_slides" ON public.hero_slides;
DROP POLICY IF EXISTS "Allow delete hero_slides" ON public.hero_slides;
DROP POLICY IF EXISTS "Admin mutate hero_slides" ON public.hero_slides;

CREATE POLICY "Admin mutate hero_slides"
  ON public.hero_slides FOR ALL
  USING (auth.role() = 'service_role');

-- ─── impact_stats ─────────────────────────────────────────────
DROP POLICY IF EXISTS "Allow insert impact_stats" ON public.impact_stats;
DROP POLICY IF EXISTS "Allow update impact_stats" ON public.impact_stats;
DROP POLICY IF EXISTS "Allow delete impact_stats" ON public.impact_stats;
DROP POLICY IF EXISTS "Admin mutate impact_stats" ON public.impact_stats;

CREATE POLICY "Admin mutate impact_stats"
  ON public.impact_stats FOR ALL
  USING (auth.role() = 'service_role');

-- ─── gallery_images ───────────────────────────────────────────
DROP POLICY IF EXISTS "Allow insert gallery_images" ON public.gallery_images;
DROP POLICY IF EXISTS "Allow update gallery_images" ON public.gallery_images;
DROP POLICY IF EXISTS "Allow delete gallery_images" ON public.gallery_images;
DROP POLICY IF EXISTS "Admin mutate gallery_images" ON public.gallery_images;

CREATE POLICY "Admin mutate gallery_images"
  ON public.gallery_images FOR ALL
  USING (auth.role() = 'service_role');

-- ─── blog_posts ───────────────────────────────────────────────
DROP POLICY IF EXISTS "Allow insert blog_posts" ON public.blog_posts;
DROP POLICY IF EXISTS "Allow update blog_posts" ON public.blog_posts;
DROP POLICY IF EXISTS "Allow delete blog_posts" ON public.blog_posts;
DROP POLICY IF EXISTS "Admin mutate blog_posts" ON public.blog_posts;

CREATE POLICY "Admin mutate blog_posts"
  ON public.blog_posts FOR ALL
  USING (auth.role() = 'service_role');

-- ─── team_members ─────────────────────────────────────────────
DROP POLICY IF EXISTS "Allow insert team_members" ON public.team_members;
DROP POLICY IF EXISTS "Allow update team_members" ON public.team_members;
DROP POLICY IF EXISTS "Allow delete team_members" ON public.team_members;
DROP POLICY IF EXISTS "Admin mutate team_members" ON public.team_members;

CREATE POLICY "Admin mutate team_members"
  ON public.team_members FOR ALL
  USING (auth.role() = 'service_role');
