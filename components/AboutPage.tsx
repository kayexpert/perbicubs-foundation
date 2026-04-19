'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import 'swiper/css';
import 'swiper/css/pagination';
import WhoWeAreSection from './WhoWeAreSection';
import ProvenImpactSection from './ProvenImpactSection';
import DonationSection from './DonationSection';
import ContactSection from './ContactSection';
import TeamSection from './TeamSection';

function Section({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function AboutPage() {
  return (
    <main>
      {/* ─── Page Hero ─── */}
      <section
        className="relative min-h-[45vh] flex flex-col items-center justify-center pt-24 pb-16 overflow-hidden parallax-section"
        style={{
          backgroundImage: 'url(/images/about_learning.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a1628]/60 via-[#0a1628]/70 to-[#0a1628]/90" />
        <div className="relative z-10 max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-6 w-full text-center flex flex-col items-center">
          <Section className="flex flex-col items-center">
            <span className="section-tag mb-4 justify-center" >Who We Are</span>
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white leading-tight">About Us</h1>
          </Section>
        </div>
      </section>

      {/* ─── Who We Are (interactive tabs component) ─── */}
      <WhoWeAreSection />

      {/* ─── Why We Exist ─── */}
      <section
        className="py-20 lg:py-28 relative parallax-section"
        style={{ backgroundImage: 'url(/images/problem_hero_bg.png)' }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a1628]/95 via-[#0a1628]/90 to-[#0a1628]/70" />
        <div className="relative z-10 max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-6">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
            {/* Left: text */}
            <Section className="self-center">
              <span className="section-tag">
                Why We Exist
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-8">
                Millions Are in School, But Cannot Read
              </h2>
              <p className="text-white/80 text-xl leading-relaxed mb-6">
                Without foundational literacy, children are unable to progress academically or economically — trapping families in cycles of poverty.
              </p>
              <p className="text-white/70 text-lg leading-relaxed mb-10">
                We exist to change that. By combining digital access, engaging content, and real-time accountability, we are giving every child the tools they need to read — and to thrive.
              </p>
              <Link href="/the-problem" className="btn-accent inline-flex">
                Understand the Crisis <ArrowRight size={18} />
              </Link>
            </Section>

            {/* Right: cutout image — absolute so it doesn't inflate section height, head overflows above */}
            <Section className="hidden lg:block relative">
              <div className="absolute inset-x-0 bottom-0 h-[860px]">
                <Image
                  src="/images/teacher_children_cutout.png"
                  alt="Teacher and children reading"
                  fill
                  className="object-contain object-bottom"
                />
              </div>
            </Section>
          </div>
        </div>
      </section>

      {/* ─── Team Members ─── */}
      <TeamSection />
      {/* ─── Proven Impact ─── */}
      <ProvenImpactSection />

      {/* ─── Donation ─── */}
      <DonationSection />

      {/* ─── Contact ─── */}
      <ContactSection />
    </main>
  );
}
