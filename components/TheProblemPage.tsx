'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { AlertTriangle, TrendingDown, BookX, Globe, ArrowRight } from 'lucide-react';
import DonationSection from './DonationSection';
import ContactSection from './ContactSection';

const causes = [
  { title: 'Limited Materials', desc: 'Limited access to age-appropriate and engaging reading materials, especially for children from low-income households' },
  { title: 'Cost Barriers', desc: 'Cost barriers that prevent families from accessing quality literacy programmes and digital learning tools' },
  { title: 'Weak Reading Culture', desc: 'Weak reading culture at home and in communities, where reading is not seen as a daily life skill' },
  { title: 'Limited Data Use', desc: 'Limited use of data and evidence to improve literacy interventions and learning outcomes' },
];

const crisisStats = [
  { 
    stat: '87%', 
    label: 'of 10-year-olds cannot read and understand a simple story',
    icon: BookX,
    color: 'text-[#00ABBE]',
    detail: 'This represents millions of children across Sub-Saharan Africa who lack basic literacy skills despite attending school.'
  },
  { 
    stat: '9/10', 
    label: 'children in low-income countries cannot read by age 10',
    icon: AlertTriangle,
    color: 'text-[#FF6B56]',
    detail: 'The learning crisis disproportionately affects the most vulnerable populations, perpetuating cycles of poverty.'
  },
  { 
    stat: '617M', 
    label: 'children and adolescents worldwide cannot read',
    icon: Globe,
    color: 'text-[#00ABBE]',
    detail: 'This global statistic highlights the systemic nature of the literacy crisis across developing regions.'
  },
  { 
    stat: '2x', 
    label: 'more likely to be out of school if unable to read',
    icon: TrendingDown,
    color: 'text-[#FF6B56]',
    detail: 'Children who fail to acquire basic literacy skills are at significantly higher risk of dropping out of school entirely.'
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

export default function TheProblemPage() {
  return (
    <main>
      {/* Hero - SIMPLIFIED */}
      <section
        className="relative min-h-[45vh] flex flex-col items-center justify-center pt-24 pb-16 overflow-hidden parallax-section"
      >
        <Image src="/img/problem_banner.jpg" alt="" fill className="object-cover object-center" priority sizes="100vw" quality={80} />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a1628]/60 via-[#0a1628]/70 to-[#0a1628]/90" />
        <div className="relative z-10 max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-6 w-full text-center flex flex-col items-center">
          <RevealSection className="flex flex-col items-center">
            <span className="section-tag mb-4 justify-center" >The Crisis</span>
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white leading-tight mb-6">The Problem</h1>
            <p className="text-xl sm:text-2xl text-white/90 max-w-3xl leading-relaxed font-medium">
              Sub-Saharan Africa is at the epicentre of a global learning crisis.
            </p>
          </RevealSection>
        </div>
      </section>

      {/* Stats Cards */}
      <section className="py-20 lg:py-28 bg-white relative overflow-hidden">
        <div className="relative max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-6">
          <RevealSection className="text-center mb-16">
            <span className="section-tag" >By the Numbers</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#0a1628]">
              The Scale of the Problem
            </h2>
          </RevealSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {crisisStats.map((item, i) => (
              <RevealSection key={i} delay={0.1 + (i * 0.1)}>
                <div className="group">
                  {/* Stat number */}
                  <div className="text-6xl lg:text-7xl font-black text-[#0a1628] mb-4 tracking-tight">
                    {item.stat}
                  </div>
                  
                  {/* Divider */}
                  <div className="w-16 h-1 bg-[#00ABBE] mb-6 group-hover:w-24 transition-all duration-300" />
                  
                  {/* Label */}
                  <p className="text-gray-700 text-base leading-relaxed mb-4 font-medium">
                    {item.label}
                  </p>
                  
                  {/* Detail */}
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {item.detail}
                  </p>
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
                Root Causes
                <span className="w-6 h-px bg-[#00ABBE]" />
              </p>
              <h2 className="text-[32px] font-bold text-[#0a1628] leading-tight mb-7">
                The Literacy Crisis is Driven By{' '}
                <span >Interconnected Factors</span>
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
        <div className="absolute inset-0" style={{ filter: 'grayscale(1)', opacity: 0.03 }}>
          <Image src="/img/intervention.jpg" alt="" fill className="object-cover object-center" sizes="100vw" quality={75} />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-6 text-center">
          <RevealSection className="flex flex-col items-center">
            <span className="section-tag mb-4 justify-center">Why It Matters</span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0a1628] mb-8">
              Without Urgent Intervention, We Risk Losing{' '}
              <span className="text-[#00ABBE]">an Entire Generation</span>
            </h2>
            <p className="text-gray-500 text-xl leading-relaxed mb-10 max-w-2xl mx-auto">
              Sub-Saharan Africa risks losing an entire generation to learning poverty — making SDG 4 (Quality Education) unattainable.
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
