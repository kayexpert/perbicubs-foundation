export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  body: string;
  category: string;
  date: string;
  readTime: string;
  image: string;
  author: string;
  authorRole: string;
}

export const blogPosts: BlogPost[] = [
  {
    slug: 'literacy-crisis-sub-saharan-africa',
    title: 'The Silent Learning Crisis in Sub-Saharan Africa',
    excerpt:
      'Despite record school enrolment rates, millions of children in Sub-Saharan Africa are graduating without the ability to read a simple sentence. We explore why this crisis is happening and what can be done.',
    body: `Despite record school enrolment rates, millions of children across Sub-Saharan Africa are graduating without the ability to read a simple sentence. This paradox — high attendance, low learning — is what experts now call the "learning crisis."

According to the World Bank, 87% of 10-year-olds in Sub-Saharan Africa cannot read and understand a simple story. This is not merely a statistic — it represents millions of futures constrained before they begin.

**Why Enrolment Is Not Enough**

Governments and NGOs have made extraordinary strides in getting children into classrooms. Net enrolment rates in many countries have surpassed 90%. Yet the quality of what happens inside those classrooms has lagged dangerously behind.

Key factors include:
- Overcrowded classrooms with limited teacher capacity
- A lack of culturally relevant, mother-tongue reading materials
- No systematic early assessment to identify children falling behind
- Technology infrastructure gaps in rural communities

**The PerbiCubs Approach**

PerbiCubs Foundation addresses these systemic failures through a four-pillar model: Access, Engagement, Assessment, and Accountability. By providing digital reading materials, gamified learning, placement-based assessment, and real-time progress tracking, we ensure no child is left behind simply because the system failed to see them.

**The Path Forward**

Solving the literacy crisis requires more than policy — it demands direct, measurable intervention at the classroom and community level. Every $35 spent through our Sponsor a Child programme gives one child a full year of digital literacy access.

The crisis is real. But so is the solution.`,
    category: 'Research',
    date: 'March 15, 2025',
    readTime: '5 min read',
    image: '/img/problem_banner.jpg',
    author: 'PerbiCubs Research Team',
    authorRole: 'Foundation Research',
  },
  {
    slug: 'digital-reading-transforms-communities',
    title: 'How Digital Reading Transforms Rural Communities',
    excerpt:
      'Our six-month field report from three rural schools shows measurable reading improvement, increased parental engagement, and a shift in how communities value literacy.',
    body: `Six months into our rural school pilot programme, the results are clear: digital reading access transforms not just children, but entire communities.

**The Schools**

We partnered with three rural primary schools in underserved regions, each with limited access to books and qualified reading teachers. We deployed our digital reading platform, provided teacher training, and ran weekly parent engagement sessions.

**What Changed**

After six months:
- Average reading levels improved by 1.8 grade levels
- School attendance increased by 22%
- 78% of parents reported reading with their children at home for the first time
- Teacher confidence in literacy instruction rose significantly

**The Community Effect**

What surprised us most was the ripple effect. As children brought home digital devices and books, parents became curious. Literacy conversations started happening at dinner tables. Older siblings began reading to younger ones.

One parent told us: *"I never learned to read properly. But now my daughter teaches me words every evening. For the first time, I feel like I can help her with school."*

**Scaling What Works**

These results confirm that our model works — not just in controlled environments, but in the real, resource-constrained settings where most of Sub-Saharan Africa's children actually live and learn.

With your support, we can scale this to 12,000 children in the next year.`,
    category: 'Impact Stories',
    date: 'February 28, 2025',
    readTime: '4 min read',
    image: '/img/wea_2.jpg',
    author: 'Program Field Team',
    authorRole: 'Field Operations',
  },
  {
    slug: 'sponsor-a-child-program-impact',
    title: 'From $35 to a Lifelong Love of Reading',
    excerpt:
      'One sponsorship. One child. One year. See how a single $35 donation creates measurable, lasting change in a child\'s literacy journey and opens doors that were previously closed.',
    body: `What does $35 actually do? It is a question we get asked often. The answer is both simple and profound: it gives one child twelve months of uninterrupted access to digital literacy education.

**The $35 Model**

We designed our Sponsor a Child programme around a single, achievable price point. At $35 per year — less than $3 per month — a sponsor provides:

- Full access to our digital reading platform (1,000+ books)
- Personalised assessment and placement
- Gamified reading challenges and rewards
- Monthly progress reports shared with parents and teachers

**Amara's Story**

When Amara joined our programme in January, she was in Grade 3 but reading at a Grade 1 level. Her teacher had identified her as "slow" — not knowing that Amara simply had never had access to books at her reading level.

Within three months of joining, Amara moved to grade-level reading. Within six months, she was one of her class's most enthusiastic readers. By year-end, she was helping her classmates.

Her sponsor — a software engineer from London — received monthly updates throughout. "I've sponsored other causes," he told us, "but this is the first time I've actually seen a face, a name, and real progress."

**The Multiplier Effect**

Children who learn to read don't just benefit themselves. Research consistently shows that a child's literacy level is the single strongest predictor of future educational attainment — and by extension, economic mobility.

Your $35 is not a donation. It is an investment in a human life.`,
    category: 'Programs',
    date: 'January 20, 2025',
    readTime: '3 min read',
    image: '/img/pg_1.JPG',
    author: 'PerbiCubs Foundation',
    authorRole: 'Communications',
  },
  {
    slug: 'teacher-training-key-to-literacy',
    title: 'Why Teacher Training Is the Key to Lasting Literacy',
    excerpt:
      'Technology alone cannot close the literacy gap. Our latest field data shows that teacher confidence and training are the single biggest multiplier of student reading outcomes.',
    body: `Technology is often positioned as the silver bullet for Africa's literacy crisis. But our field data tells a more nuanced story: the most powerful predictor of reading improvement is not the device in a child's hand — it is the teacher standing in front of the classroom.

**The Teacher Confidence Gap**

In many of the schools we partner with, teachers have never received formal training in early literacy instruction. They were trained as generalists, expected to teach every subject to every grade with minimal support.

When we introduced our digital reading platform into these classrooms, we initially saw modest gains. It was only when we paired technology with structured teacher coaching that results accelerated dramatically.

**What Training Changes**

Our coaching programme focuses on three areas:
- Phonemic awareness instruction techniques
- How to use assessment data to personalise learning
- Classroom management strategies for technology-integrated lessons

Teachers who completed the full 12-hour coaching programme saw their students improve reading levels at 2.3× the rate of uncoached classrooms.

**A Teacher's Transformation**

Ms. Abena teaches Grade 2 at a rural school in our programme. Before training, she described herself as "not a reading teacher." After coaching, she runs structured literacy blocks daily, uses data to pull struggling readers for small-group sessions, and has become an informal mentor to other teachers at her school.

"I didn't know I could teach reading this way," she told us. "Now I can't imagine teaching any other way."

**The Investment Case**

Every $35 Sponsor a Child donation doesn't just fund a child's reading access — it funds the training ecosystem that makes that access meaningful. Teacher training is not a cost. It is the multiplier.`,
    category: 'Education',
    date: 'December 10, 2024',
    readTime: '4 min read',
    image: '/img/pg_2.JPG',
    author: 'PerbiCubs Education Team',
    authorRole: 'Curriculum & Training',
  },
];

export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}
