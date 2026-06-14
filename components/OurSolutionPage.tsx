'use client';


import Image from 'next/image';
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { BookOpen, Sparkles, Target, BarChart3, Users } from 'lucide-react';
import OurResponseSection from './OurResponseSection';
import GallerySection from './GallerySection';
import BlogSection from './BlogSection';
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
}

export default function OurSolutionPage({ galleryImages }: OurSolutionPageProps) {
  return (
    <main>
      {/* ═══════════════════════════════════════════════════════
          HERO - SIMPLIFIED
      ═══════════════════════════════════════════════════════ */}
      <section
        className="relative min-h-[45vh] flex flex-col items-center justify-center pt-24 pb-16 overflow-hidden parallax-section"
      >
        <Image src="/img/solution_banner.jpg" alt="" fill className="object-cover object-center" priority sizes="100vw" quality={80} />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a1628]/60 via-[#0a1628]/70 to-[#0a1628]/90" />
        <div className="relative z-10 max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-6 w-full text-center flex flex-col items-center">
          <RevealSection className="flex flex-col items-center">
             <span className="section-tag mb-4 justify-center" >Our Approach</span>
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white leading-tight">Our Solution</h1>
          </RevealSection>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          SECTION 1: OUR RESPONSE
      ═══════════════════════════════════════════════════════ */}
      <OurResponseSection />

      {/* ═══════════════════════════════════════════════════════
          SECTION 2: WHY IT WORKS (5-Point System)
      ═══════════════════════════════════════════════════════ */}
      <section className="py-20 lg:py-28 bg-gradient-to-br from-gray-50 via-white to-[#00ABBE]/5">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-6">
          <RevealSection className="text-center max-w-3xl mx-auto mb-16">
            <span className="section-tag justify-center">The Differentiator</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">Why The PerbiCubs Model Works</h2>
            <p className="text-gray-500 text-lg leading-relaxed">
              PerbiCubs Foundation uses an integrated system that transforms reading from a task into a habit.
            </p>
          </RevealSection>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: 'Access', desc: 'Providing thousands of curated digital books for children.', icon: BookOpen, color: 'from-blue-500 to-blue-600' },
              { title: 'Engagement', desc: 'Making reading fun through quizzes, rewards, and gamification.', icon: Sparkles, color: 'from-purple-500 to-purple-600' },
              { title: 'Assessment', desc: 'Ensuring children start at the right reading level.', icon: Target, color: 'from-emerald-500 to-emerald-600' },
              { title: 'Accountability', desc: 'Tracking progress through real-time reports.', icon: BarChart3, color: 'from-orange-500 to-orange-600' },
              { title: 'Support', desc: 'On-the-ground and digital support for schools and learners.', icon: Users, color: 'from-pink-500 to-pink-600' },
            ].map((item, i) => (
              <RevealSection key={i} delay={i * 0.1}>
                <div className="group h-full rounded-3xl p-8 bg-white border border-gray-100 shadow-lg shadow-gray-200/50 transition-all duration-500 hover:shadow-2xl hover:shadow-[#00ABBE]/10 hover:-translate-y-1 relative overflow-hidden text-center">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#00ABBE]/5 to-transparent rounded-full -translate-y-1/2 translate-x-1/2 transition-transform duration-500 group-hover:scale-150" />
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center mb-6 shadow-lg shadow-gray-200 group-hover:scale-110 transition-transform duration-300 mx-auto`}>
                    <item.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-[#00ABBE] transition-colors">{item.title}</h3>
                  <p className="text-gray-500 leading-relaxed">{item.desc}</p>
                </div>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          SECTION 3: WHY IT WORKS & WHY IT MATTERS
      ═══════════════════════════════════════════════════════ */}
      <section className="py-20 lg:py-28 relative overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/img/solution.jpg"
            alt="Children reading"
            fill
            className="object-cover"
            sizes="100vw"
            quality={80}
          />
          <div className="absolute inset-0 bg-[#0a1628]/95" />
        </div>

        <div className="relative max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-6">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
            {/* Left: Why It Works */}
            <RevealSection className="text-center lg:text-left">
              <span className="section-tag">Why It Works</span>
              <h2 className="text-xl sm:text-xl font-normal text-white mb-4">
                We combine access, motivation, and accountability — turning reading into a habit, not a task.
              </h2>
              <p className="text-gray-300 text-sm leading-relaxed">
                Our integrated system ensures children have access to thousands of curated digital books, engage through gamified learning experiences, and stay motivated with real-time progress tracking. By making reading enjoyable and measurable, we transform it from a chore into a lifelong habit.
              </p>
            </RevealSection>

            {/* Divider */}
            <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px bg-white/20" style={{ transform: 'translateX(-50%)' }} />

            {/* Right: Why It Matters */}
            <RevealSection className="text-center lg:text-left">
              <span className="section-tag">Why It Matters</span>
              <h2 className="text-xl sm:text-xl font-normal text-white mb-4">
                Literacy is the foundation of all learning and the key to breaking the cycle of poverty.
              </h2>
              <p className="text-gray-300 text-sm leading-relaxed">
                When children can read, they can learn anything. Our approach addresses the root causes of learning poverty by providing scalable, measurable interventions that give every child the power to read, understand, and thrive in school and beyond.
              </p>
            </RevealSection>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          SECTION 4: GALLERY & BLOG
      ═══════════════════════════════════════════════════════ */}
      <BlogSection />
      <GallerySection images={galleryImages} />

    </main>
  );
}
