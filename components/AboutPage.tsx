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
import TeamSection, { type TeamMember } from './TeamSection';

import type { ImpactStat } from './HomePage';

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

interface AboutPageProps {
  teamMembers?: TeamMember[];
  stats?: ImpactStat[];
}

export default function AboutPage({ teamMembers, stats }: AboutPageProps) {
  return (
    <main>
      {/* ─── Page Hero ─── */}
      <section
        className="relative min-h-[45vh] flex flex-col items-center justify-center pt-24 pb-16 overflow-hidden parallax-section"
      >
        <Image src="/img/about_banner.jpg" alt="" fill className="object-cover object-center" priority sizes="100vw" quality={80} />
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

      {/* ─── The PerbiCubs Story ─── */}
      <section className="py-14 lg:py-20 bg-white relative overflow-hidden">
        <div className="absolute inset-0 dot-pattern opacity-15" aria-hidden />
        <div className="relative max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-6">
          <Section className="text-center mb-10">
            <p className="flex items-center justify-center gap-3 text-[#FF6B56] text-xs font-bold uppercase tracking-widest mb-4">
              <span className="w-8 h-px bg-[#FF6B56]" />
              The PerbiCubs Story
              <span className="w-8 h-px bg-[#FF6B56]" />
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0a1628] leading-tight">
              From a Reading App to a{' '}
              <span className="text-[#00ABBE]">Literacy Movement</span>
            </h2>
          </Section>

          <div className="max-w-[760px] mx-auto">
            <Section>
              <p
                className="text-gray-500 text-xl leading-[1.8] mb-6 font-medium"
                style={{ textAlign: 'left' }}
              >
                <span
                  className="float-left text-5xl font-bold leading-[0.9] mr-2 mt-1"
                  style={{ color: '#00ABBE' }}
                >
                  P
                </span>
                erbiCubs was founded to address one of the most significant
                barriers to educational success in Africa: low literacy levels
                among children.
              </p>
            </Section>

            <Section>
              <p className="text-gray-500 text-lg leading-[1.85] mb-6">
                As an education technology and literacy company, PerbiCubs is
                dedicated to making reading engaging, measurable, and
                rewarding. Through its digital platform and programmes,
                PerbiCubs helps children build strong reading habits by
                combining access to books, quizzes, gamification, and
                structured engagement.
              </p>
            </Section>

            <Section>
              <p className="text-gray-500 text-lg leading-[1.85]">
                The PerbiCubs model goes beyond simply providing access to
                books. It combines access, engagement, assessment,
                accountability, and support to ensure that children not only
                read more but also grow into confident, lifelong learners.
              </p>
            </Section>
          </div>
        </div>
      </section>

      {/* ─── Why We Exist ─── */}
      <section
        className="py-20 lg:py-28 relative parallax-section overflow-hidden"
      >
        <Image src="/img/problem_hero_bg.png" alt="" fill className="object-cover object-center" sizes="100vw" quality={80} />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a1628]/95 via-[#0a1628]/90 to-[#0a1628]/70" />
        <div className="relative z-10 max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-6">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
            {/* Left: text */}
            <Section className="self-center">
              <span className="section-tag">
                Why We Exist
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-8">
                Bridging the Gap Between Access and Literacy
              </h2>
              <p className="text-white/80 text-lg leading-relaxed mb-6">
                While PerbiCubs provides an effective literacy solution, access
                remains one of the greatest barriers facing millions of
                children across Sub-Saharan Africa. The PerbiCubs Foundation
                was established to bridge this gap.
              </p>
              <p className="text-white/70 text-lg leading-relaxed mb-6">
                As a mission-driven non-profit organisation, the PerbiCubs
                Foundation is dedicated to expanding access to quality
                literacy and learning opportunities to underprivileged
                children and youth.
              </p>
              <p className="text-white/70 text-lg leading-relaxed mb-10">
                Building on the proven literacy model developed by PerbiCubs,
                the Foundation focuses on ensuring that children who would
                otherwise be left behind have the opportunity to develop the
                literacy skills needed to thrive in school and beyond.
              </p>
              <Link href="/get-involved" className="btn-accent inline-flex">
                Support Our Mission <ArrowRight size={18} />
              </Link>
            </Section>

            {/* Right: cutout image — absolute so it doesn't inflate section height, head overflows above */}
            <Section className="hidden lg:block relative">
              <div className="absolute inset-x-0 bottom-0 h-[860px]">
                <Image
                  src="/img/wwe.png"
                  alt="Teacher and children reading"
                  fill
                  className="object-contain object-bottom"
                />
              </div>
            </Section>
          </div>
        </div>
      </section>

      {/* ─── Board Members ─── */}
      <TeamSection members={teamMembers} />
      {/* ─── Proven Impact ─── */}
      <ProvenImpactSection stats={stats} />

      {/* ─── Donation ─── */}
      <DonationSection />

      {/* ─── Contact ─── */}
      <ContactSection />
    </main>
  );
}
