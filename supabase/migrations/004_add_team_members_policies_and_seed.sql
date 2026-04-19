-- ============================================================
-- PerbiCubs — Team Members: RLS Policies + Seed Data
-- Project: mcaywvwsjavkfoesoblz
-- ============================================================

-- ─── RLS write policies ──────────────────────────────────────
ALTER TABLE public.team_members ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public read team_members" ON public.team_members;
CREATE POLICY "Public read team_members"
  ON public.team_members FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow insert team_members" ON public.team_members;
CREATE POLICY "Allow insert team_members"
  ON public.team_members FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Allow update team_members" ON public.team_members;
CREATE POLICY "Allow update team_members"
  ON public.team_members FOR UPDATE USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Allow delete team_members" ON public.team_members;
CREATE POLICY "Allow delete team_members"
  ON public.team_members FOR DELETE USING (true);

-- ─── Seed default team members ───────────────────────────────
INSERT INTO public.team_members (name, role, image, ordering) VALUES
  ('Kweku Andoh',   'Executive Director & Founder',    '/img/about_learning.png',    1),
  ('Abena Asante',  'Head of Programs',                '/img/program_literacy.png',  2),
  ('Kofi Owusu',    'Technology Lead',                 '/img/program_digital.png',   3),
  ('Efua Boateng',  'Community Outreach Manager',      '/img/program_advocacy.png',  4);
