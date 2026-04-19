'use client';


import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { TabletSmartphone, Gamepad2, LineChart } from 'lucide-react';
import SolutionApproachSection from './SolutionApproachSection';
import ProvenImpactSection from './ProvenImpactSection';
import GallerySection from './GallerySection';
import BlogSection from './BlogSection';
import TeamSection, { type TeamMember } from './TeamSection';
import type { GalleryImage } from './HomePage';


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

interface OurSolutionPageProps {
  galleryImages?: GalleryImage[];
  teamMembers?: TeamMember[];
}

export default function OurSolutionPage({ galleryImages, teamMembers }: OurSolutionPageProps) {
  return (
    <main>
      {/* ═══════════════════════════════════════════════════════
          HERO - SIMPLIFIED
      ═══════════════════════════════════════════════════════ */}
      <section
        className="relative min-h-[45vh] flex flex-col items-center justify-center pt-24 pb-16 overflow-hidden parallax-section"
        style={{
          backgroundImage: 'url(/img/solution_banner.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a1628]/60 via-[#0a1628]/70 to-[#0a1628]/90" />
        <div className="relative z-10 max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-6 w-full text-center flex flex-col items-center">
          <RevealSection className="flex flex-col items-center">
             <span className="section-tag mb-4 justify-center" >Our Approach</span>
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white leading-tight">Our Solution</h1>
          </RevealSection>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          SECTION 1: THE MODEL (Infographic)
      ═══════════════════════════════════════════════════════ */}
      <SolutionApproachSection />

      {/* ═══════════════════════════════════════════════════════
          SECTION 2: WHY IT WORKS (Feature Cards)
      ═══════════════════════════════════════════════════════ */}
      <section className="py-20 lg:py-28 bg-gray-50 border-y border-gray-100">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-6">
          <RevealSection className="text-center max-w-3xl mx-auto mb-16">
            <span className="section-tag justify-center" >The Differentiator</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">Why The PerbiCubs Model Works</h2>
            <p className="text-gray-500 text-lg leading-relaxed">
              We don&apos;t just distribute books and hope for the best. We&apos;ve engineered an ecosystem that guarantees engagement, tracks progress, and delivers measurable outcomes.
            </p>
          </RevealSection>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: TabletSmartphone,
                title: 'Digital Scale',
                desc: 'A physical library serves a neighborhood. A digital library serves a continent. Over 10,000 curated books available instantly, with offline fallbacks for remote areas.',
                color: '#00ABBE',
                bg: 'bg-[#00ABBE]/5',
              },
              {
                icon: Gamepad2,
                title: 'Gamified Engagement',
                desc: 'Reading isn\'t a chore, it\'s an adventure. We use behavioral psychology and game mechanics (leaderboards, badges, levels) to build intrinsic motivation.',
                color: '#00ABBE', // Changed from #FF6B56 to primary
                bg: 'bg-[#00ABBE]/5',
              },
              {
                icon: LineChart,
                title: 'Real-Time Accountability',
                desc: 'Every page turned, every quiz answered, and every minute spent reading is tracked. Teachers and parents intervene precisely when a child needs help.',
                color: '#0a1628',
                bg: 'bg-[#0a1628]/5',
              },
            ].map((card, i) => (
              <RevealSection key={i} delay={i * 0.1}>
                <div className={`h-full rounded-3xl p-8 border border-gray-200 bg-white shadow-xl shadow-black-[0.02] transition-transform duration-300 hover:-translate-y-2`}>
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-colors ${card.bg}`}>
                    <card.icon size={26} style={{ color: card.color }} />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">{card.title}</h3>
                  <p className="text-gray-500 leading-relaxed text-sm mb-0">{card.desc}</p>
                </div>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          SECTION 3: IMPACT & GALLERY (Replaces "The Result")
      ═══════════════════════════════════════════════════════ */}
      <ProvenImpactSection />
      <TeamSection members={teamMembers} />
      <BlogSection />
      <GallerySection images={galleryImages} />

    </main>
  );
}
