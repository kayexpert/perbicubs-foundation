'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { ArrowRight, ChevronDown, ChevronUp } from 'lucide-react';

// ─── Animation Helper ───────────────────────────────────────────────────────
function RevealSection({
  children,
  delay = 0,
  className = '',
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ─── FAQ Accordion Item ─────────────────────────────────────────────────────
function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm">
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left font-bold text-[#0a1628] text-lg hover:bg-gray-50 transition-colors"
        aria-expanded={open}
      >
        <span>{q}</span>
        {open ? (
          <ChevronUp size={20} className="text-[#00ABBE] flex-shrink-0" />
        ) : (
          <ChevronDown size={20} className="text-[#00ABBE] flex-shrink-0" />
        )}
      </button>
      {open && (
        <div className="px-6 pb-5 text-gray-600 leading-relaxed border-t border-gray-100 pt-4">
          {a}
        </div>
      )}
    </div>
  );
}

// ─── Data ────────────────────────────────────────────────────────────────────
const PARTNERSHIP_TIERS = [
  {
    id: 'champion',
    name: 'Champion Partner',
    readers: '1,000 readers',
    price: '$60,000',
    duration: 'one year',
    desc: '"1,000 [Your Company] Reading Champions": a named cohort across partner schools, with its own termly report.',
    highlight: false,
    cta: 'Start here',
    bgClass: 'bg-white border-2 border-gray-100',
    btnClass: 'bg-[#E0F5F8] text-[#0a1628] hover:bg-[#00ABBE] hover:text-white',
  },
  {
    id: 'regional',
    name: 'Regional Partner',
    readers: '5,000 readers',
    price: '$300,000',
    duration: 'two years',
    desc: '2,500 new children a year in a region you choose, at $150,000 a year, with regional reporting and school visits.',
    highlight: true,
    badge: 'Recommended',
    cta: 'Start here',
    bgClass: 'bg-[#E0F5F8] border-2 border-[#00ABBE]',
    btnClass: 'bg-[#FF6B56] text-[#0a1628] hover:bg-[#e5533e] hover:text-white',
  },
  {
    id: 'lead',
    name: 'Lead Partner',
    readers: '15,000 readers',
    price: '$900,000',
    duration: 'three years',
    desc: '5,000 new children a year for three years, at $300,000 a year, with lead recognition across the campaign.',
    highlight: false,
    cta: 'Start here',
    bgClass: 'bg-[#FF6B56]',
    btnClass: 'bg-white text-[#0a1628] hover:bg-[#0a1628] hover:text-white',
  },
];

const STATS = [
  { value: '1,000,000+', label: 'books read and quizzes passed since 2018' },
  { value: '19,000+', label: 'children reached' },
  { value: '107,000+', label: 'books read across 51 schools as UNESCO Accra World Book Capital 2023 partner' },
  { value: '2 million+', label: 'viewers of the 2025 Inter-School Reading Quiz with the Mastercard Foundation, 85 schools' },
];

const SOLUTION_STEPS = [
  {
    num: '1',
    title: 'Placed at the right level',
    desc: 'A placement test sets each child\'s level. They choose from 4,000+ curated African and international books pitched to it.',
    img: '/img/reader-tablet.jpg',
    imgAlt: 'A girl holds a tablet close as she reads in her classroom',
  },
  {
    num: '2',
    title: 'Read, then prove it',
    desc: 'A comprehension quiz follows every book. A book counts only when the quiz is passed, so every number we report is a book understood.',
    img: '/img/girl-reading.jpg',
    imgAlt: 'A girl in glasses reads beside a classroom window',
  },
  {
    num: '3',
    title: 'Celebrated every week',
    desc: 'A weekly reading period, a trained school coordinator, weekly recognition and the Inter-School Reading Quiz keep children reading all year.',
    img: '/img/quiz-trophy.jpg',
    imgAlt: 'Three pupils hold up a trophy at the Inter-School Reading Quiz',
  },
];

const FAQS = [
  {
    q: 'Where does the $60 go?',
    a: "76% is the child's scholarship award: the digital library, placement test, quizzes, coordinator support and school engagement. Operations and staffing take 5%, monitoring and reporting 3%, reading celebrations 2%, governance and audit 2%. The last 13% covers currency movement and transfer costs over the year; any of it not needed goes back into the same cohort.",
  },
  {
    q: 'Does a multi-year gift fund the same children?',
    a: "No. Each year of your gift funds a new cohort, and every child receives a full school year of reading. A Lead Partner's $900,000 reaches 15,000 different children over three years.",
  },
  {
    q: 'Is our gift tax-deductible?',
    a: 'US companies can give through Myriad USA and Canadian companies through Myriad Canada, both of which issue tax receipts. Ghanaian companies give directly to the Foundation.',
  },
  {
    q: 'How will we know children are reading?',
    a: "You receive a termly dashboard: children activated, weekly readers, books read and quizzes passed, plus an annual report. We assess each child's reading level at the start and end of the year and report the comparison in full. We do not promise a proficiency gain before an evaluation shows one.",
  },
  {
    q: 'Can our employees take part?',
    a: 'Yes. Staff can join a virtual reading assembly, read their cohort\'s stories, or visit partner schools in Ghana.',
  },
  {
    q: 'What if a school drops out?',
    a: 'Unspent scholarship value is moved to another eligible school with your agreement, or returned. No funds are kept for places not delivered.',
  },
  {
    q: 'Who runs the Foundation?',
    a: 'PerbiCubs Foundation Ghana LBG (No. CG078901125) is a licensed National Non-Profit Organisation with an independent board, a Chartered Accountant as Treasurer, cashless financial controls and a Child and Youth Safeguarding Policy. Perbi Cubs delivers the programme under a written Shared Services Agreement, with staff billed on actual hours.',
  },
];

// ─── Partner Form ────────────────────────────────────────────────────────────
function PartnerForm() {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    level: 'Not sure yet',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: '',
          subject: `Corporate Partnership Enquiry – ${formData.level}${formData.company ? ` (${formData.company})` : ''}`,
          message: `Company: ${formData.company || 'Not provided'}\nPartnership Level: ${formData.level}\n\n${formData.message}`,
        }),
      });
      if (res.ok) {
        setStatus('success');
        setFormData({ name: '', company: '', email: '', level: 'Not sure yet', message: '' });
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className="flex flex-col gap-4 py-8 text-center">
        <div className="text-5xl">🎉</div>
        <h3 className="font-bold text-2xl text-[#0a1628]">Thank you. We will be in touch.</h3>
        <p className="text-gray-600">In the meantime, you can write to <a href="mailto:info@perbicubsfoundation.org" className="text-[#00ABBE] font-semibold hover:underline">info@perbicubsfoundation.org</a>.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <h3 className="font-bold text-2xl text-[#0a1628]">Request a call</h3>

      <label className="flex flex-col gap-1.5 text-sm font-semibold text-gray-700">
        Your name *
        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          type="text"
          autoComplete="name"
          placeholder="Jane Smith"
          className="border-2 border-gray-200 rounded-xl px-4 py-3 text-base text-gray-800 outline-none focus:border-[#00ABBE] transition-colors"
        />
      </label>

      <label className="flex flex-col gap-1.5 text-sm font-semibold text-gray-700">
        Company
        <input
          name="company"
          value={formData.company}
          onChange={handleChange}
          type="text"
          autoComplete="organization"
          placeholder="Acme Ltd."
          className="border-2 border-gray-200 rounded-xl px-4 py-3 text-base text-gray-800 outline-none focus:border-[#00ABBE] transition-colors"
        />
      </label>

      <label className="flex flex-col gap-1.5 text-sm font-semibold text-gray-700">
        Work email *
        <input
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          type="email"
          autoComplete="email"
          placeholder="jane@acme.com"
          className="border-2 border-gray-200 rounded-xl px-4 py-3 text-base text-gray-800 outline-none focus:border-[#00ABBE] transition-colors"
        />
      </label>

      <label className="flex flex-col gap-1.5 text-sm font-semibold text-gray-700">
        Level you are considering
        <select
          name="level"
          value={formData.level}
          onChange={handleChange}
          className="border-2 border-gray-200 rounded-xl px-4 py-3 text-base text-gray-800 outline-none focus:border-[#00ABBE] transition-colors bg-white"
        >
          <option>Not sure yet</option>
          <option>Champion Partner (1,000 readers, $60,000)</option>
          <option>Regional Partner (5,000 readers, $300,000)</option>
          <option>Lead Partner (15,000 readers, $900,000)</option>
        </select>
      </label>

      <label className="flex flex-col gap-1.5 text-sm font-semibold text-gray-700">
        Anything else you'd like us to know?
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows={3}
          placeholder="Tell us what your company is working towards..."
          className="border-2 border-gray-200 rounded-xl px-4 py-3 text-base text-gray-800 outline-none focus:border-[#00ABBE] transition-colors resize-none"
        />
      </label>

      {status === 'error' && (
        <p className="text-red-600 text-sm bg-red-50 rounded-xl px-4 py-3">
          Something went wrong. Please try again or email us directly at info@perbicubsfoundation.org.
        </p>
      )}

      <button
        type="submit"
        disabled={status === 'loading'}
        className="bg-[#FF6B56] hover:bg-[#e5533e] disabled:bg-gray-300 text-white font-bold text-base rounded-full py-4 px-8 transition-all duration-300 hover:-translate-y-0.5 shadow-md"
      >
        {status === 'loading' ? 'Sending…' : 'Request my call'}
      </button>
      <p className="text-xs text-gray-400 text-center">We reply within two working days.</p>
    </form>
  );
}

// ─── Main Page ───────────────────────────────────────────────────────────────
export default function CorporatePartnershipsPage() {
  return (
    <main className="bg-white">

      {/* ═══════════════════════════════════════════════════════
          HERO — 2-Column Executive Layout + Floating Impact Card
      ═══════════════════════════════════════════════════════ */}
      <section className="relative min-h-[75vh] lg:min-h-[82vh] flex flex-col justify-center pt-28 pb-20 overflow-hidden">
        {/* Background image */}
        <Image
          src="/img/reader-girl.jpg"
          alt="A pupil reads on a tablet"
          fill
          className="object-cover object-center"
          priority
          sizes="100vw"
          quality={85}
        />
        {/* Dark gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a1628]/95 via-[#0a1628]/85 to-[#0a1628]/70" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a1628] via-transparent to-[#0a1628]/60" />

        {/* Content */}
        <div className="relative z-10 max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-6 w-full">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-14 items-center">
            
            {/* ── Left Column: Pitch & Action (7 cols) ── */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
              className="lg:col-span-7 flex flex-col items-start"
            >
              {/* Tag */}
              <span className="section-tag mb-4" style={{ color: '#33c4d3' }}>
                Africa Reads · Corporate Partnerships
              </span>

              {/* Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-[1.1] mb-6">
                Help 50,000 children in Ghana become readers by 2028.
              </h1>

              {/* Subheading */}
              <p className="text-lg sm:text-xl text-white/80 leading-relaxed mb-8 max-w-xl">
                Every <span className="text-[#33c4d3] font-bold">$60</span> sponsors a child with a full school year of curated digital books and verified comprehension quizzes. Empower entire cohorts through your corporate CSR or ESG initiatives.
              </p>

              {/* Dual CTAs */}
              <div className="flex flex-wrap items-center gap-4">
                <Link href="#partnership-levels" className="btn-primary">
                  Explore Partnership Tiers <ArrowRight size={18} />
                </Link>
                <Link href="#get-started" className="btn-outline">
                  Book a 20-Minute Call
                </Link>
              </div>
            </motion.div>

            {/* ── Right Column: Impact at a Glance Card (5 cols) ── */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.7, ease: 'easeOut' }}
              className="lg:col-span-5"
            >
              <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-7 text-white shadow-2xl relative overflow-hidden flex flex-col gap-6">
                {/* Header Row: Stat + Tax Tag */}
                <div className="flex items-center justify-between border-b border-white/15 pb-5">
                  <div>
                    <span className="text-xs uppercase tracking-widest text-[#33c4d3] font-bold block mb-1">
                      Per-Child Investment
                    </span>
                    <div className="flex items-baseline gap-2">
                      <span className="text-4xl sm:text-5xl font-black text-white">$60</span>
                      <span className="text-sm text-white/80 font-medium">/ full school year</span>
                    </div>
                  </div>
                  <div className="bg-[#FF6B56] text-[#0a1628] font-bold text-xs uppercase tracking-wider px-3.5 py-1.5 rounded-full shadow-md">
                    Tax-Deductible
                  </div>
                </div>

                {/* Micro Stats Grid */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/5 rounded-2xl p-4 border border-white/10">
                    <div className="text-2xl sm:text-3xl font-bold text-white mb-1">50,000</div>
                    <div className="text-xs text-white/70 leading-snug">Children targeted across Ghanaian schools by 2028</div>
                  </div>
                  <div className="bg-white/5 rounded-2xl p-4 border border-white/10">
                    <div className="text-2xl sm:text-3xl font-bold text-[#33c4d3] mb-1">100%</div>
                    <div className="text-xs text-white/70 leading-snug">Every book read is verified by comprehension quizzes</div>
                  </div>
                </div>

                {/* Inclusions Feature Callout */}
                <div className="bg-white/5 rounded-2xl p-4 border border-white/10 text-xs text-white/80 leading-relaxed flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#00ABBE]/20 flex items-center justify-center flex-shrink-0 text-[#33c4d3] font-bold">
                    ✓
                  </div>
                  <span>Includes termly impact dashboards, cohort naming rights & in-person or virtual school visits.</span>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          INSTITUTIONAL TRUST & CREDIBILITY STRIP
      ═══════════════════════════════════════════════════════ */}
      <section className="bg-[#0a1628] border-y border-white/10 py-5">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-white/80">
            <span className="text-xs uppercase tracking-widest font-bold text-[#33c4d3] text-center md:text-left flex-shrink-0">
              Validated & Recognized By
            </span>
            <div className="flex flex-wrap items-center justify-center md:justify-end gap-x-6 gap-y-2.5 text-xs sm:text-sm font-medium">
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#00ABBE] flex-shrink-0" />
                Mastercard Foundation EdTech Fellow
              </span>
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#FF6B56] flex-shrink-0" />
                UNESCO Accra Partner
              </span>
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#33c4d3] flex-shrink-0" />
                ICEI Bronze Certification
              </span>
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-white/50 flex-shrink-0" />
                Carnegie Mellon Research
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          THE PROBLEM / REALITY — Executive 2-Column Split
      ═══════════════════════════════════════════════════════ */}
      <section className="bg-gradient-to-b from-[#f8fdfe] to-white py-20 lg:py-28 border-b border-gray-100">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-6">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            
            {/* ── Left Column: Authoritative Metric Card (5 cols) ── */}
            <RevealSection className="lg:col-span-5 h-full">
              <div className="bg-gradient-to-br from-[#FFE7E2] to-[#FFF4F2] border-2 border-[#FFD2CA] rounded-3xl p-8 sm:p-10 flex flex-col justify-between h-full shadow-sm relative overflow-hidden">
                <div>
                  <span className="inline-flex items-center gap-2 text-[#e5533e] text-xs font-bold uppercase tracking-widest mb-5">
                    <span className="w-2 h-2 rounded-full bg-[#FF6B56] animate-pulse" />
                    The Learning Poverty Crisis
                  </span>
                  
                  <div className="text-7xl sm:text-8xl lg:text-9xl font-black text-[#0a1628] leading-none mb-4 tracking-tight">
                    89%
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold text-[#0a1628] leading-snug mb-4">
                    of 10-year-olds in Sub-Saharan Africa cannot read and understand a simple text.
                  </h3>
                </div>

                <div className="pt-6 border-t border-[#FF6B56]/20 flex flex-wrap items-center justify-between gap-3 text-xs text-gray-600 mt-6">
                  <span className="font-semibold text-gray-500">Benchmark Source</span>
                  <a
                    href="https://www.worldbank.org/en/news/press-release/2022/06/23/70-of-10-year-olds-now-in-learning-poverty-unable-to-read-and-understand-a-simple-text"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-bold text-[#00ABBE] hover:underline flex items-center gap-1"
                  >
                    World Bank Learning Poverty Report ↗
                  </a>
                </div>
              </div>
            </RevealSection>

            {/* ── Right Column: The 3 Core Realities (7 cols) ── */}
            <div className="lg:col-span-7 flex flex-col justify-center">
              <RevealSection delay={0.1}>
                <span className="section-tag mb-3">Why Interventions Fail</span>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0a1628] leading-tight mb-8">
                  Books alone do not fix it.
                </h2>
              </RevealSection>

              <div className="space-y-5">
                {[
                  {
                    num: '01',
                    title: 'The Critical Age-10 Threshold',
                    desc: 'A child who cannot read and comprehend by age ten struggles in every subject that follows. Without early foundational literacy, children are left behind for life.',
                  },
                  {
                    num: '02',
                    title: 'The "Donation" Fallacy',
                    desc: 'Traditional book donations often sit untouched in storage or classroom corners. Without level placement and reading engagement, books alone produce zero measurable gain.',
                  },
                  {
                    num: '03',
                    title: 'The Proof Imperative',
                    desc: 'Children need the right book pitched to their exact level, a reason to finish it, and an objective comprehension quiz so every dollar invested represents a child truly learning.',
                  },
                ].map((item, i) => (
                  <RevealSection key={item.num} delay={0.15 + i * 0.1}>
                    <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow flex items-start gap-5 group">
                      <span className="w-11 h-11 rounded-xl bg-[#E0F5F8] text-[#00ABBE] font-bold text-base flex items-center justify-center flex-shrink-0 group-hover:bg-[#00ABBE] group-hover:text-white transition-colors">
                        {item.num}
                      </span>
                      <div className="flex-1">
                        <h4 className="font-bold text-lg text-[#0a1628] mb-1.5">
                          {item.title}
                        </h4>
                        <p className="text-gray-600 text-sm leading-relaxed">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  </RevealSection>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          THE SOLUTION — 3-step cards
      ═══════════════════════════════════════════════════════ */}
      <section className="py-20 lg:py-28">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-6 flex flex-col gap-12">
          <RevealSection className="flex flex-col gap-3 max-w-2xl">
            <span className="section-tag">The solution</span>
            <h2 className="text-4xl sm:text-5xl font-bold text-[#0a1628] leading-tight">
              Every book read is a book understood.
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Perbi Cubs has run this model in Ghanaian schools since 2018. The Foundation brings it
              to children whose schools cannot afford it.
            </p>
          </RevealSection>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {SOLUTION_STEPS.map((step, i) => (
              <RevealSection key={step.num} delay={i * 0.1}>
                <article className="bg-[#E0F5F8] rounded-3xl overflow-hidden flex flex-col card-hover">
                  <div className="relative aspect-[3/2] w-full">
                    <Image src={step.img} alt={step.imgAlt} fill className="object-cover" sizes="(max-width:768px)100vw,33vw" />
                  </div>
                  <div className="p-7 flex flex-col gap-3 flex-1">
                    <span className="self-start bg-[#00ABBE] text-white font-bold text-sm px-4 py-1 rounded-full">
                      {step.num}
                    </span>
                    <h3 className="font-bold text-xl text-[#0a1628]">{step.title}</h3>
                    <p className="text-gray-600 leading-relaxed text-sm">{step.desc}</p>
                  </div>
                </article>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          PROOF — teal background stats
      ═══════════════════════════════════════════════════════ */}
      <section id="proof" className="bg-[#00ABBE] py-20 lg:py-28">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-6 flex flex-col gap-12">
          <RevealSection className="flex flex-col gap-3 max-w-2xl">
            <span className="inline-flex self-start bg-white text-[#0a1628] text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full">
              Proof
            </span>
            <h2 className="text-4xl sm:text-5xl font-bold text-[#0a1628] leading-tight">
              The Foundation is new. The programme is proven.
            </h2>
          </RevealSection>

          {/* Stats grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {STATS.map((s, i) => (
              <RevealSection key={i} delay={i * 0.08}>
                <div className="bg-white rounded-2xl p-7 flex flex-col gap-2 h-full card-hover">
                  <span className="font-bold text-[#0a1628] leading-tight" style={{ fontSize: 'clamp(28px,3.5vw,44px)' }}>
                    {s.value}
                  </span>
                  <span className="text-gray-600 text-sm leading-relaxed">{s.label}</span>
                </div>
              </RevealSection>
            ))}
          </div>

          {/* Photo + recognition */}
          <div className="flex flex-wrap gap-8 items-start">
            <RevealSection className="flex-1 min-w-[280px]">
              <div className="relative w-full aspect-[16/10] rounded-3xl overflow-hidden">
                <Image
                  src="/img/class-cheering.jpg"
                  alt="A classroom of pupils in Reading Champion sashes cheering"
                  fill
                  className="object-cover"
                  sizes="(max-width:1024px)100vw,50vw"
                />
              </div>
            </RevealSection>
            <RevealSection delay={0.1} className="flex-1 min-w-[280px] flex flex-col gap-5">
              <h3 className="font-bold text-2xl text-[#0a1628]">Recognised by</h3>
              {[
                ['Mastercard Foundation', 'EdTech Fellow, three-year fellowship'],
                ['International Centre for EdTech Impact', 'Bronze certification for efficacy evidence'],
                ['UNESCO Accra', 'World Book Capital 2023 partner'],
                ['Jacobs Foundation', 'support, and Carnegie Mellon reader-engagement research'],
              ].map(([bold, rest]) => (
                <p key={bold} className="text-[#0a1628] leading-relaxed">
                  <strong>{bold}</strong> {rest}
                </p>
              ))}
              <Link href="#partnership-levels" className="btn-accent self-start">
                See partnership levels <ArrowRight size={16} />
              </Link>
            </RevealSection>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          PARTNERSHIP LEVELS
      ═══════════════════════════════════════════════════════ */}
      <section id="partnership-levels" className="py-20 lg:py-28">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-6 flex flex-col gap-10">
          <RevealSection className="flex flex-col gap-3 max-w-3xl">
            <span className="section-tag">Choose your level</span>
            <h2 className="text-4xl sm:text-5xl font-bold text-[#0a1628] leading-tight">
              How many readers will your company give Ghana?
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Every level is counted in unique readers. Each child gets one full school year of
              reading, and multi-year levels bring a new cohort of children in every year. Any cohort
              can carry your company&apos;s name, subject to your approval.
            </p>
          </RevealSection>

          {/* Tier cards */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
            {PARTNERSHIP_TIERS.map((tier, i) => (
              <RevealSection key={tier.id} delay={i * 0.1}>
                <article className={`${tier.bgClass} rounded-3xl p-8 flex flex-col gap-4 h-full relative card-hover`}>
                  {tier.badge && (
                    <span className="absolute -top-4 left-6 bg-[#00ABBE] text-white text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full shadow-md">
                      {tier.badge}
                    </span>
                  )}
                  <h3 className="font-bold text-xl text-[#0a1628]">{tier.name}</h3>
                  <p className="font-bold text-[#0a1628] leading-tight" style={{ fontSize: 'clamp(26px,3vw,38px)' }}>
                    {tier.readers}
                  </p>
                  <p className="font-bold text-[#0a1628]">
                    {tier.price} · {tier.duration}
                  </p>
                  <p className="text-gray-700 leading-relaxed flex-1 text-sm">{tier.desc}</p>
                  <Link
                    href="#get-started"
                    className={`${tier.btnClass} font-bold text-sm rounded-full py-3 px-6 text-center transition-all duration-300 hover:-translate-y-0.5`}
                  >
                    {tier.cta}
                  </Link>
                </article>
              </RevealSection>
            ))}
          </div>

          {/* How 50,000 readers come together */}
          <RevealSection>
            <div className="bg-[#E0F5F8] rounded-2xl p-7 flex flex-col gap-6">
              <p className="font-bold text-xl text-[#0a1628]">How 50,000 readers come together</p>
              {/* Visual bar */}
              <div
                role="img"
                aria-label="Two Lead Partners give 30,000 readers, two Regional Partners give 10,000 readers and ten Champion Partners give 10,000 readers"
                className="flex h-11 rounded-xl overflow-hidden gap-0.5 text-sm font-bold"
              >
                <div className="flex-[0_0_30%] bg-[#FF6B56] flex items-center pl-3 text-[#0a1628]">Lead</div>
                <div className="flex-[0_0_30%] bg-[#FF6B56] flex items-center pl-3 text-[#0a1628]">Lead</div>
                <div className="flex-[0_0_10%] bg-[#00ABBE] flex items-center justify-center text-[#0a1628] text-xs">Reg.</div>
                <div className="flex-[0_0_10%] bg-[#00ABBE] flex items-center justify-center text-[#0a1628] text-xs">Reg.</div>
                <div className="flex-1 bg-white flex items-center justify-center text-[#0a1628] text-xs">10 Champions</div>
              </div>
              {/* Table */}
              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-sm">
                  <thead>
                    <tr className="border-b-2 border-[#00ABBE]">
                      <th className="text-left py-2 font-bold text-[#0a1628]">Level</th>
                      <th className="text-right py-2 font-bold text-[#0a1628]">Partners</th>
                      <th className="text-right py-2 font-bold text-[#0a1628]">Readers</th>
                      <th className="text-right py-2 font-bold text-[#0a1628]">Total</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-700">
                    {[
                      ['Lead Partner', '2', '30,000', '$1,800,000'],
                      ['Regional Partner', '2', '10,000', '$600,000'],
                      ['Champion Partner', '10', '10,000', '$600,000'],
                    ].map(([level, partners, readers, total]) => (
                      <tr key={level} className="border-b border-[#C3E7EC]">
                        <td className="py-2">{level}</td>
                        <td className="text-right py-2">{partners}</td>
                        <td className="text-right py-2">{readers}</td>
                        <td className="text-right py-2">{total}</td>
                      </tr>
                    ))}
                    <tr className="font-bold text-[#0a1628]">
                      <td className="py-2">Africa Reads</td>
                      <td className="text-right py-2">14</td>
                      <td className="text-right py-2">50,000</td>
                      <td className="text-right py-2">$3,000,000</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </RevealSection>

          {/* Timing note */}
          <RevealSection>
            <div className="bg-[#FFE7E2] rounded-2xl p-6 flex flex-wrap gap-4 items-center justify-between">
              <p className="text-[#0a1628] flex-1 min-w-[280px]">
                <strong>Planning your giving year?</strong> The inaugural cohort of 6,000 children is
                being formed now and closes on 8 March 2027. Commitments can start in a 2026 or 2027
                budget.
              </p>
              <Link href="#get-started" className="text-[#00ABBE] font-bold hover:underline flex-shrink-0">
                Talk to us about timing
              </Link>
            </div>
          </RevealSection>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          FAQ
      ═══════════════════════════════════════════════════════ */}
      <section id="faq" className="bg-[#E0F5F8] py-20 lg:py-28">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-6 flex flex-wrap gap-12">
          {/* Left column */}
          <RevealSection className="flex-1 min-w-[280px] flex flex-col gap-6">
            <span className="inline-flex self-start bg-white text-[#0a1628] text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full">
              Questions
            </span>
            <h2 className="text-4xl sm:text-5xl font-bold text-[#0a1628] leading-tight">
              What partners ask before they commit.
            </h2>
            <div className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden">
              <Image
                src="/img/champions-certificates.jpg"
                alt="Pupils in Reading Champion sashes hold up their certificates"
                fill
                className="object-cover"
                sizes="(max-width:1024px)100vw,40vw"
              />
            </div>
          </RevealSection>

          {/* Right: accordion */}
          <RevealSection delay={0.1} className="flex-[2] min-w-[280px] flex flex-col gap-4">
            {FAQS.map((faq) => (
              <FaqItem key={faq.q} q={faq.q} a={faq.a} />
            ))}
          </RevealSection>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          GET STARTED — form + steps
      ═══════════════════════════════════════════════════════ */}
      <section id="get-started" className="bg-[#00ABBE] py-20 lg:py-28">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-6 flex flex-wrap gap-12 items-start">
          {/* Left: steps */}
          <RevealSection className="flex-1 min-w-[280px] flex flex-col gap-8">
            <span className="inline-flex self-start bg-white text-[#0a1628] text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full">
              Get started
            </span>
            <h2 className="font-bold text-[#0a1628] leading-tight" style={{ fontSize: 'clamp(32px,4vw,52px)' }}>
              Start with a 20-minute conversation.
            </h2>
            <ol className="flex flex-col gap-5">
              {[
                ['A 20-minute call.', 'Tell us what your company is working towards.'],
                ['A short proposal.', 'A level, schools and reporting shaped to your priorities.'],
                ['Children start reading.', 'Onboarding begins within 30 days of agreement.'],
              ].map(([bold, rest], i) => (
                <li key={i} className="flex gap-4 items-start">
                  <span className="flex-none w-9 h-9 rounded-full bg-white flex items-center justify-center font-bold text-[#0a1628]">
                    {i + 1}
                  </span>
                  <span className="text-[#0a1628] leading-relaxed">
                    <strong>{bold}</strong> {rest}
                  </span>
                </li>
              ))}
            </ol>
            <div className="flex flex-col gap-1 mt-2">
              <p className="font-bold text-[#0a1628]">Naa Anyele Perbi</p>
              <p className="text-[#0a1628]/80 text-sm">
                Chief Executive Officer, Perbi Cubs · Director, PerbiCubs Foundation Ghana LBG
              </p>
              <p className="font-semibold text-[#0a1628] text-sm">
                anyele.perbi@perbicubs.com · perbicubsfoundation.org
              </p>
            </div>
          </RevealSection>

          {/* Right: form */}
          <RevealSection delay={0.15} className="flex-1 min-w-[300px]">
            <div className="bg-white rounded-3xl p-8 shadow-xl">
              <PartnerForm />
            </div>
          </RevealSection>
        </div>
      </section>

    </main>
  );
}
