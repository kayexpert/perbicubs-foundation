-- ============================================================
-- PerbiCubs — Dynamic Content Tables
-- Run this in your Supabase SQL Editor (project: mcaywvwsjavkfoesoblz)
-- ============================================================

-- ─── 1. HERO SLIDES ──────────────────────────────────────────
create table if not exists public.hero_slides (
  id          bigserial primary key,
  ordering    int not null default 0,
  image       text not null,
  tag         text not null,
  headline    text not null,
  sub         text not null,
  cta1_label  text not null,
  cta1_href   text not null,
  cta2_label  text not null,
  cta2_href   text not null,
  created_at  timestamptz not null default now()
);

alter table public.hero_slides enable row level security;

-- Public read
create policy "Public read hero_slides"
  on public.hero_slides for select
  using (true);

-- Only service-role / admin can mutate
create policy "Admin mutate hero_slides"
  on public.hero_slides for all
  using (auth.role() = 'service_role');

-- Seed
insert into public.hero_slides (ordering, image, tag, headline, sub, cta1_label, cta1_href, cta2_label, cta2_href) values
  (1, '/hero1.png', 'Ending Learning Poverty', 'Every Child Deserves to Read', 'We are building a future where no child is left behind because they cannot read.', 'Become a Founding Partner', '/get-involved', 'Sponsor a Child', '/get-involved'),
  (2, '/hero2.png', 'Literacy for All', 'Turning Pages, Changing Lives', '87% of 10-year-olds in Sub-Saharan Africa cannot read a simple story. Together, we can change this.', 'Learn About the Crisis', '/the-problem', 'Our Solution', '/our-solution'),
  (3, '/hero3.png', '17,000+ Children Reached', 'A Proven Model That Works', 'UNESCO-recognized. Mastercard Foundation-backed. 700,000+ books read by children just like yours.', 'See Our Impact', '/about', 'Join the Movement', '/get-involved');


-- ─── 2. IMPACT STATS ─────────────────────────────────────────
create table if not exists public.impact_stats (
  id         bigserial primary key,
  ordering   int not null default 0,
  value      int not null,
  suffix     text not null default '',
  prefix     text not null default '',
  label      text not null,
  accent     text not null default '#00ABBE',
  created_at timestamptz not null default now()
);

alter table public.impact_stats enable row level security;

create policy "Public read impact_stats"
  on public.impact_stats for select
  using (true);

create policy "Admin mutate impact_stats"
  on public.impact_stats for all
  using (auth.role() = 'service_role');

-- Seed
insert into public.impact_stats (ordering, value, suffix, prefix, label, accent) values
  (1, 700000, '+', '',  'Books Read',        '#00ABBE'),
  (2, 17000,  '+', '',  'Children Reached',  '#FF6B56'),
  (3, 12000,  '',  '',  'Year-One Target',   '#00ABBE'),
  (4, 35,     '',  '$', 'Per Child Per Year', '#FF6B56');


-- ─── 3. GALLERY IMAGES ───────────────────────────────────────
create table if not exists public.gallery_images (
  id         bigserial primary key,
  ordering   int not null default 0,
  src        text not null,
  caption    text not null,
  category   text not null,
  created_at timestamptz not null default now()
);

alter table public.gallery_images enable row level security;

create policy "Public read gallery_images"
  on public.gallery_images for select
  using (true);

create policy "Admin mutate gallery_images"
  on public.gallery_images for all
  using (auth.role() = 'service_role');

-- Seed
insert into public.gallery_images (ordering, src, caption, category) values
  (1, '/images/about_child_bw.png',   'Children Ready to Learn',  'Education'),
  (2, '/images/about_learning.png',   'A Teacher''s Dedication',  'Community'),
  (3, '/images/problem_student.png',  'Literacy Opens Doors',     'Impact'),
  (4, '/images/program_literacy.png', 'Joyful Learning Moments',  'Impact'),
  (5, '/images/program_digital.png',  'Every Book, A New World',  'Literacy'),
  (6, '/images/program_advocacy.png', 'Building Bright Futures',  'Education');


-- ─── 4. BLOG POSTS ───────────────────────────────────────────
create table if not exists public.blog_posts (
  id          bigserial primary key,
  slug        text not null unique,
  title       text not null,
  excerpt     text not null,
  body        text not null,
  category    text not null,
  date        text not null,
  read_time   text not null,
  image       text not null,
  author      text not null,
  author_role text not null,
  created_at  timestamptz not null default now()
);

alter table public.blog_posts enable row level security;

create policy "Public read blog_posts"
  on public.blog_posts for select
  using (true);

create policy "Admin mutate blog_posts"
  on public.blog_posts for all
  using (auth.role() = 'service_role');

-- Seed
insert into public.blog_posts (slug, title, excerpt, body, category, date, read_time, image, author, author_role) values
  (
    'literacy-crisis-sub-saharan-africa',
    'The Silent Learning Crisis in Sub-Saharan Africa',
    'Despite record school enrolment rates, millions of children in Sub-Saharan Africa are graduating without the ability to read a simple sentence. We explore why this crisis is happening and what can be done.',
    'Despite record school enrolment rates, millions of children across Sub-Saharan Africa are graduating without the ability to read a simple sentence...',
    'Research', 'March 15, 2025', '5 min read', '/problem.png', 'PerbiCubs Research Team', 'Foundation Research'
  ),
  (
    'digital-reading-transforms-communities',
    'How Digital Reading Transforms Rural Communities',
    'Our six-month field report from three rural schools shows measurable reading improvement, increased parental engagement, and a shift in how communities value literacy.',
    'Six months into our rural school pilot programme, the results are clear: digital reading access transforms not just children, but entire communities...',
    'Impact Stories', 'February 28, 2025', '4 min read', '/hero2.png', 'Program Field Team', 'Field Operations'
  ),
  (
    'sponsor-a-child-program-impact',
    'From $35 to a Lifelong Love of Reading',
    'One sponsorship. One child. One year. See how a single $35 donation creates measurable, lasting change in a child''s literacy journey and opens doors that were previously closed.',
    'What does $35 actually do? It gives one child twelve months of uninterrupted access to digital literacy education...',
    'Programs', 'January 20, 2025', '3 min read', '/hero1.png', 'PerbiCubs Foundation', 'Communications'
  ),
  (
    'teacher-training-key-to-literacy',
    'Why Teacher Training Is the Key to Lasting Literacy',
    'Technology alone cannot close the literacy gap. Our latest field data shows that teacher confidence and training are the single biggest multiplier of student reading outcomes.',
    'Technology is often positioned as the silver bullet for Africa''s literacy crisis. But our field data tells a more nuanced story...',
    'Education', 'December 10, 2024', '4 min read', '/hero3.png', 'PerbiCubs Education Team', 'Curriculum & Training'
  );
