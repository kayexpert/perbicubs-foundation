'use client';

import Image from 'next/image';
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { BookOpen, Globe, BarChart3, LayoutDashboard, Sparkles, Network, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import ContactSection from './ContactSection';

const programs = [
  {
    icon: BookOpen,
    number: '01',
    title: 'Expanding Equitable Access to Literacy and Learning',
    subtitle: 'Scholarships & Access',
    desc: 'Expanding access for underprivileged children and youth through targeted scholarships that remove financial barriers to quality literacy and learning tools. This includes providing funded access to the PerbiCubs digital literacy platform, ensuring children can read curated books, complete quizzes, and engage in structured reading regardless of their socio-economic background.',
    features: [
      'Targeted scholarships for underprivileged youth',
      'Funded access to digital literacy tools',
      'Curated books, quizzes, and structured reading',
    ],
    image: '/img/pg_1.jpg',
    color: 'bg-[#0a1628]',
    accent: '#00ABBE',
    stats: { value: '12,000+', label: 'Children Targeted' },
  },
  {
    icon: Globe,
    number: '02',
    title: 'Promoting a National Reading Culture',
    subtitle: 'National Campaigns',
    desc: 'Driving public awareness, behavioural change campaigns, and national initiatives that position reading as enjoyable, aspirational, and essential for life success. This includes flagship initiatives such as the Inter-School Reading Quiz, which encourages schools to compete, collaborate, and build strong reading habits while making literacy visible, exciting, and socially rewarding across communities.',
    features: [
      'Behavioural change and public awareness campaigns',
      'Inter-School Reading Quiz and competitions',
      'Making literacy visible and socially rewarding',
    ],
    image: '/img/pg_2.jpg',
    color: 'bg-[#00ABBE]', // Changed from #FF6B56 to primary color to balance
    accent: '#00ABBE',
    stats: { value: 'Proven', label: 'Measurable Impact' },
  },
  {
    icon: BarChart3,
    number: '03',
    title: 'Literacy Research, Evidence, and Technology',
    subtitle: 'Evidence-Based Impact',
    desc: 'Generating and using evidence, data, and technology to strengthen literacy interventions, improve learning outcomes, and inform policy and practice. The Foundation leverages real-time data from the PerbiCubs platform such as reading activity, quiz performance, and engagement trends to measure impact, refine programmes, and contribute to evidence-based decision-making in the reading systems.',
    features: [
      'Real-time data on reading and quiz performance',
      'Refining programmes based on engagement trends',
      'Contributing to evidence-based policy making',
    ],
    image: '/img/pg_3.jpg',
    color: 'bg-[#0a1628]', // Shifted to dark blue
    accent: '#0a1628',
    stats: { value: 'Data', label: 'Driven Interventions' },
  },
];

const processSteps = [
  {
    icon: LayoutDashboard,
    title: 'Platform Access',
    desc: 'A child logs into a curated library of thousands of books tailored to their age.',
  },
  {
    icon: Sparkles,
    title: 'Engaged Learning',
    desc: 'Interactive elements, quizzes, and rewards turn reading from a task into a habit.',
  },
  {
    icon: Network,
    title: 'Data & Growth',
    desc: 'Progress is tracked in real-time, helping teachers and parents support the child.',
  },
];

function RevealSection({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function ProgramsPage() {
  return (
    <main>
      {/* ═══════════════════════════════════════════════════════
          HERO - SIMPLIFIED
      ═══════════════════════════════════════════════════════ */}
      <section
        className="relative min-h-[45vh] flex flex-col items-center justify-center pt-24 pb-16 overflow-hidden parallax-section"
      >
        <Image src="/img/programs_banner.jpg" alt="" fill className="object-cover object-center" priority sizes="100vw" quality={80} />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a1628]/60 via-[#0a1628]/70 to-[#0a1628]/90" />
        
        <div className="relative z-10 max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-6 w-full text-center flex flex-col items-center">
          <RevealSection className="flex flex-col items-center">
             <span className="section-tag mb-4 justify-center" >What We Do</span>
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white leading-tight">
              Programs
            </h1>
          </RevealSection>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          OVERVIEW SECTION
      ═══════════════════════════════════════════════════════ */}
      <section className="py-20 bg-gray-50 border-b border-gray-200">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-6">
          <RevealSection className="text-center mb-16">
            <span className="section-tag" >Overview</span>
            <h2 className="text-3xl font-bold text-gray-900 max-w-3xl mx-auto leading-tight">
              The Foundation focuses on scalable, measurable literacy interventions that remove barriers and create opportunity.
            </h2>
          </RevealSection>

          <div className="grid md:grid-cols-3 gap-10 relative">
            {/* Desktop connecting line */}
            <div className="hidden md:block absolute top-[40px] left-1/6 right-1/6 h-[2px] bg-gray-200" />
            
            {processSteps.map((step, i) => (
              <RevealSection key={i} delay={i * 0.1}>
                <div className="relative text-center z-10">
                  <div className="mx-auto w-20 h-20 bg-white border-4 border-gray-50 rounded-2xl shadow-xl flex items-center justify-center mb-6">
                    <step.icon size={32} className="text-[#00ABBE]" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h3>
                  <p className="text-gray-500 leading-relaxed max-w-xs mx-auto text-sm">{step.desc}</p>
                </div>
              </RevealSection>
            ))}
          </div>

          <div className="flex justify-center mt-12 relative z-10">
             <div className="w-px h-16 bg-gradient-to-b from-[#00ABBE] to-transparent"></div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          EDITORIAL PROGRAMS LAYOUT 
      ═══════════════════════════════════════════════════════ */}
      <section className="bg-white">
        {programs.map((program, i) => (
          <div key={i} className={`flex flex-col lg:flex-row min-h-[600px] ${i % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}>
            
            {/* Image Side - Full Bleed */}
            <div className="w-full lg:w-1/2 relative min-h-[400px] lg:min-h-full">
              <Image 
                src={program.image} 
                alt={program.title} 
                fill 
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                quality={80}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a1628]/70 to-transparent lg:hidden" />
              
              {/* Floating Stat Card (Desktop) */}
              <div className="hidden lg:block absolute bottom-8 right-8 (i % 2 !== 0 ? 'left-8 right-auto' : '') bg-white rounded-2xl p-6 shadow-2xl max-w-[240px]">
                <div className="text-3xl font-black mb-1" style={{ color: program.accent }}>
                  {program.stats.value}
                </div>
                <div className="text-gray-500 text-sm font-medium uppercase tracking-wider">
                  {program.stats.label}
                </div>
              </div>
            </div>

            {/* Content Side */}
            <div className="w-full lg:w-1/2 flex items-center justify-center py-20 px-6 sm:px-12 lg:px-20 xl:px-28 bg-white relative">
              {/* Large faded background number */}
              <div className="absolute top-10 right-10 text-[180px] font-black italic text-gray-50 leading-none select-none pointer-events-none z-0">
                {program.number}
              </div>

              <RevealSection className="relative z-10 w-full max-w-xl">
                <div className="flex items-center gap-4 mb-8">
                  <div className={`w-14 h-14 ${program.color} rounded-2xl flex items-center justify-center`}>
                    <program.icon size={26} className="text-white" />
                  </div>
                  <div>
                    <span className="text-sm font-bold uppercase tracking-widest text-[#00ABBE] block mb-1">
                      Program {program.number}
                    </span>
                    <span className="text-sm font-bold text-gray-900">
                      {program.subtitle}
                    </span>
                  </div>
                </div>

                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6 leading-tight">
                  {program.title}
                </h2>
                
                <p className="text-gray-600 text-lg leading-relaxed mb-8">
                  {program.desc}
                </p>

                <div className="space-y-4 pt-6 border-t border-gray-100">
                  {program.features.map((feat, fi) => (
                    <div key={fi} className="flex items-start gap-4">
                      <div 
                        className="w-1.5 h-1.5 rounded-full mt-2.5 flex-shrink-0" 
                        style={{ background: program.accent }} 
                      />
                      <span className="text-gray-800 font-medium">{feat}</span>
                    </div>
                  ))}
                </div>
              </RevealSection>
            </div>

          </div>
        ))}
      </section>

      {/* ═══════════════════════════════════════════════════════
          FLAGSHIP SPOTLIGHT
      ═══════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden bg-white py-20 lg:py-28">
        {/* Background image */}
        <div className="absolute inset-0 z-0">
          <Image src="/img/flagship_ini.jpg" alt="Student using tablet" fill className="object-cover object-right" sizes="100vw" quality={80} />
          {/* Gradient: solid white left → transparent right */}
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(to right, #ffffff 0%, #ffffff 35%, rgba(255,255,255,0.85) 60%, rgba(255,255,255,0.1) 70%, transparent 100%)',
            }}
          />
          {/* Mobile: full white overlay */}
          <div className="absolute inset-0 bg-white/90 lg:hidden" />
        </div>

        <div className="relative z-10 max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-6">
          <div className="max-w-[600px]">
            <RevealSection>
              <span className="section-tag mb-5" >
                Flagship Initiative
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0a1628] mb-6 leading-tight">
                <span className="text-[#00ABBE]">PerbiCubs Literacy</span> <br className="hidden sm:block" />
                Scholarship Programme
              </h2>
              <p className="text-gray-500 text-lg leading-[1.8] mb-10 max-w-[480px]">
                12,000 children gaining access to literacy tools that can change their future.
              </p>

              <div className="grid sm:grid-cols-2 gap-x-10 gap-y-8 mb-10 mt-2">
                <div className="border-l-[3px] pl-5 border-[#FF6B56]">
                  <div className="text-4xl lg:text-5xl font-bold leading-none tabular-nums text-[#0a1628] mb-2">12k</div>
                  <div className="text-[#0a1628] font-bold mb-1">Children Targeted</div>
                  <p className="text-gray-500 text-sm font-medium mt-1 leading-snug">Targeted in Year 1</p>
                </div>
                <div className="border-l-[3px] pl-5 border-[#FF6B56]">
                  <div className="text-4xl lg:text-5xl font-bold leading-none tabular-nums text-[#0a1628] mb-2">Full</div>
                  <div className="text-[#0a1628] font-bold mb-1">Access</div>
                  <p className="text-gray-500 text-sm font-medium mt-1 leading-snug">Reading, quizzes, rewards, and progress tracking</p>
                </div>
              </div>

              <Link href="/donate" className="btn-primary inline-flex items-center gap-2">
                Fund a Scholarship <ArrowRight size={18} />
              </Link>
            </RevealSection>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          CONTACT FORM 
      ═══════════════════════════════════════════════════════ */}
      <ContactSection />

    </main>
  );
}
