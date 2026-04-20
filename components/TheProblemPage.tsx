'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { AlertTriangle, TrendingDown, BookX, Globe, ArrowRight } from 'lucide-react';
import DonationSection from './DonationSection';
import ContactSection from './ContactSection';

const crisisStats = [
  {
    stat: '87%',
    label: 'of 10-year-olds in Sub-Saharan Africa cannot read and understand a simple story',
    icon: BookX,
    color: 'text-[#00ABBE]', // Changed to primary to balance
    bg: 'bg-[#00ABBE]/10',
  },
  {
    stat: '2x',
    label: 'More likely to remain in poverty without basic literacy skills',
    icon: TrendingDown,
    color: 'text-[#FF6B56]', // Kept as accent
    bg: 'bg-[#FF6B56]/10',
  },
  {
    stat: '600M+',
    label: 'Children worldwide affected by learning poverty',
    icon: Globe,
    color: 'text-[#00ABBE]', // Changed to primary
    bg: 'bg-[#00ABBE]/10',
  },
  {
    stat: 'SDG 4',
    label: 'Quality Education — at risk of being unattainable without urgent intervention',
    icon: AlertTriangle,
    color: 'text-[#00ABBE]',
    bg: 'bg-[#00ABBE]/10',
  },
];

const causes = [
  { title: 'Weak Academic Performance', desc: 'Students who cannot read struggle in all subjects, creating cascading educational failure.' },
  { title: 'Reduced Confidence', desc: 'Literacy gaps damage children\'s self-image and communication skills, limiting participation.' },
  { title: 'Limited Employment', desc: 'Adults with poor literacy have narrowed career options and economic mobility.' },
  { title: 'Economic Inequality', desc: 'Illiteracy perpetuates cycles of poverty across generations and communities.' },
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

export default function TheProblemPage() {
  return (
    <main>
      {/* Hero - SIMPLIFIED */}
      <section
        className="relative min-h-[45vh] flex flex-col items-center justify-center pt-24 pb-16 overflow-hidden parallax-section"
        style={{
          backgroundImage: 'url(/img/problem_banner.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a1628]/60 via-[#0a1628]/70 to-[#0a1628]/90" />
        <div className="relative z-10 max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-6 w-full text-center flex flex-col items-center">
          <RevealSection className="flex flex-col items-center">
            <span className="section-tag mb-4 justify-center" >The Crisis</span>
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white leading-tight">The Problem</h1>
          </RevealSection>
        </div>
      </section>

      {/* Stats Cards */}
      <section className="py-20 lg:py-28 bg-gray-50 relative overflow-hidden">
        <div className="absolute inset-0 dot-pattern opacity-40" />
        <div className="relative max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-6">
          <RevealSection className="text-center mb-16">
            <span className="section-tag" >By the Numbers</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
              The Scale of the Problem
            </h2>
          </RevealSection>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {crisisStats.map((item, i) => (
              <RevealSection key={i} delay={i * 0.1}>
                <div className={`bg-white rounded-3xl p-8 shadow-xl shadow-black/5 text-center card-hover border border-gray-100`}>
                  <div className={`w-16 h-16 ${item.bg} rounded-2xl flex items-center justify-center mx-auto mb-5`}>
                    <item.icon size={28} className={item.color} />
                  </div>
                  <div className={`text-4xl font-black mb-3 ${item.color}`}>{item.stat}</div>
                  <p className="text-gray-500 text-sm leading-relaxed">{item.label}</p>
                </div>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* Causes */}
      <section className="bg-white overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:items-center lg:min-h-[580px]">

          {/* Left: full-bleed image */}
          <RevealSection className="relative w-full lg:w-[55%] flex-shrink-0 min-h-[300px] lg:min-h-[580px] overflow-hidden">
            <Image
              src="/img/conceq.jpg"
              alt="Student affected by literacy crisis"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 55vw"
            />
          </RevealSection>

          {/* Right: section tag + heading + overlapping card */}
          <div className="flex-1 flex flex-col justify-center px-6 sm:px-10 lg:pl-12 xl:pl-16 py-12 lg:py-16">

            <RevealSection delay={0.2}>
              <p className="flex items-center gap-2.5 text-[#00ABBE] text-xs font-bold uppercase tracking-widest mb-5">
                <span className="w-6 h-px bg-[#00ABBE]" />
                The Consequences
                <span className="w-6 h-px bg-[#00ABBE]" />
              </p>
              <h2 className="text-[32px] font-bold text-[#0a1628] leading-tight mb-7">
                Low Literacy Leads To{' '}
                <span >Life-Long Barriers</span>
              </h2>
            </RevealSection>

            <RevealSection delay={0.35} className="p-0 lg:p-10 lg:bg-white lg:rounded-2xl lg:shadow-xl lg:shadow-black/[0.08] lg:border lg:border-gray-100 lg:-ml-48 z-10">
              <div className="space-y-6">
                {causes.map((cause, i) => (
                  <div key={i} className="flex gap-5 group">
                    <div className="w-10 h-10 rounded-xl bg-[#00ABBE]/10 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:bg-[#00ABBE] transition-colors duration-300">
                      <span className="text-[#00ABBE] group-hover:text-white font-bold text-sm transition-colors">{i + 1}</span>
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 mb-1">{cause.title}</h3>
                      <p className="text-gray-500 text-sm leading-relaxed">{cause.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </RevealSection>

          </div>
        </div>
      </section>

      {/* Why It Matters */}
      <section className="py-24 relative overflow-hidden bg-white">
        {/* Faint grayscale background image */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: 'url(/img/intervention.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'grayscale(1)',
            opacity: 0.03,
          }}
        />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-6 text-center">
          <RevealSection>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0a1628] mb-8">
              Without Urgent Intervention, We Risk Losing{' '}
              <span className="text-[#00ABBE]">an Entire Generation</span>
            </h2>
            <p className="text-gray-500 text-xl leading-relaxed mb-10 max-w-2xl mx-auto">
              Sub-Saharan Africa faces the risk of losing an entire generation to learning poverty — making SDG 4 (Quality Education) unattainable without decisive action now.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/our-solution" className="btn-primary inline-flex">
                See Our Solution <ArrowRight size={18} />
              </Link>
            </div>
          </RevealSection>
        </div>
      </section>

      {/* ── Donation ── */}
      <DonationSection />

      {/* ── Contact ── */}
      <ContactSection />

    </main>
  );
}
