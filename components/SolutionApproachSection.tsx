'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';

// Left col: 01 (top-left) and 03 (bottom-left)
const leftSteps = [
  {
    num: '01',
    title: 'Access',
    desc: 'Digital reading materials for every child, removing financial and geographic barriers.',
    color: '#00ABBE',
    bg: 'bg-[#00ABBE]',
  },
  {
    num: '03',
    title: 'Assessment',
    desc: 'Placement-based learning levels ensuring every child starts where they need to be.',
    color: '#00ABBE',
    bg: 'bg-[#00ABBE]',
  },
];

// Right col: 02 (top-right) and 04 (bottom-right)
const rightSteps = [
  {
    num: '02',
    title: 'Engagement',
    desc: 'Quizzes, rewards, and gamified learning that make reading exciting and habitual.',
    color: '#00ABBE',
    bg: 'bg-[#00ABBE]',
  },
  {
    num: '04',
    title: 'Accountability',
    desc: 'Real-time reporting and progress tracking for schools, parents, and partners.',
    color: '#00ABBE',
    bg: 'bg-[#00ABBE]',
  },
];

export default function SolutionApproachSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section ref={ref} className="py-20 lg:py-28 bg-white relative overflow-hidden">
      <div className="absolute inset-0 dot-pattern opacity-20" />

      <div className="relative max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-6">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 lg:mb-20"
        >
          <p className="flex items-center justify-center gap-3 text-[#00ABBE] text-xs font-bold uppercase tracking-widest mb-4">
            <span className="w-8 h-px bg-[#00ABBE]" />
            Our Response
            <span className="w-8 h-px bg-[#00ABBE]" />
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0a1628] mb-5">
            A Proven Model for{' '}
            <span className="text-[#00ABBE]">Literacy Transformation</span>
          </h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            PerbiCubs Foundation removes barriers to literacy through an integrated, evidence-based system.
          </p>
        </motion.div>

        {/* ── Desktop: 4-quadrant circular infographic ── */}
        <div className="hidden lg:grid grid-cols-[1fr_auto_1fr] min-h-[380px]">

          {/* LEFT COLUMN: 01 (top) and 03 (bottom) */}
          <div className="flex flex-col justify-between py-6 pr-4">
            {leftSteps.map((step, i) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, x: -60 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: i * 0.18, duration: 0.65 }}
                className="flex items-center justify-end gap-4"
              >
                {/* Text — right-aligned */}
                <div className="text-right w-52 xl:w-64">
                  <p className="font-extrabold text-base uppercase tracking-wider mb-1.5" style={{ color: step.color }}>
                    {step.title}
                  </p>
                  <p className="text-gray-500 text-sm leading-relaxed">{step.desc}</p>
                </div>

                {/* Numbered bubble */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={isInView ? { scale: 1 } : {}}
                  transition={{ delay: i * 0.18 + 0.3, duration: 0.4, type: 'spring', stiffness: 200 }}
                  className={`w-14 h-14 rounded-full ${step.bg} text-white text-base font-black flex items-center justify-center flex-shrink-0 shadow-xl`}
                >
                  {step.num}
                </motion.div>

                {/* Connector line → dot */}
                <div className="flex items-center flex-shrink-0">
                  <motion.div
                    initial={{ scaleX: 0 }}
                    animate={isInView ? { scaleX: 1 } : {}}
                    transition={{ delay: i * 0.18 + 0.5, duration: 0.5 }}
                    style={{ transformOrigin: 'left' }}
                    className="h-px bg-gray-300 w-14 xl:w-20"
                  />
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={isInView ? { scale: 1 } : {}}
                    transition={{ delay: i * 0.18 + 0.65, duration: 0.3, type: 'spring' }}
                    className="w-3.5 h-3.5 rounded-full border-2 bg-white flex-shrink-0"
                    style={{ borderColor: '#FF6B56' }}
                  />
                </div>
              </motion.div>
            ))}
          </div>

          {/* CENTER CIRCLE */}
          <motion.div
            initial={{ opacity: 0, scale: 0.6 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.1, duration: 0.8, type: 'spring', stiffness: 100 }}
            className="flex items-center justify-center flex-shrink-0 px-4"
          >
            <div className="relative">
              {/* Rotating outer ring */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-[-18px] rounded-full border border-dashed border-[#FF6B56]/35 pointer-events-none"
              />
              {/* Pulsing glow */}
              <motion.div
                animate={{ scale: [1, 1.06, 1], opacity: [0.4, 0.7, 0.4] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute inset-[-6px] rounded-full bg-[#00ABBE]/8 pointer-events-none"
              />
              {/* Main circle */}
              <div className="w-72 h-72 xl:w-80 xl:h-80 rounded-full shadow-2xl border-[10px] border-[#FF6B56]/20 flex items-center justify-center relative z-10 overflow-hidden">
                {/* Background image */}
                <Image src="/img/solution.JPG" alt="Our Approach" fill className="object-cover" sizes="320px" />
                {/* Dark overlay */}
                <div className="absolute inset-0 bg-[#0a1628]/65" />
                {/* Inner dashed ring */}
                <div className="absolute w-[72%] h-[72%] rounded-full border-2 border-dashed border-white/40 z-10 pointer-events-none" />
                {/* Center text */}
                <div className="absolute inset-0 flex items-center justify-center z-20">
                  <p className="text-white font-bold text-lg text-center leading-tight tracking-wide uppercase">
                    Our<br />Response
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* RIGHT COLUMN: 02 (top) and 04 (bottom) */}
          <div className="flex flex-col justify-between py-6 pl-4">
            {rightSteps.map((step, i) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, x: 60 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: i * 0.18 + 0.1, duration: 0.65 }}
                className="flex items-center gap-4"
              >
                {/* dot ← connector line */}
                <div className="flex items-center flex-shrink-0">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={isInView ? { scale: 1 } : {}}
                    transition={{ delay: i * 0.18 + 0.65, duration: 0.3, type: 'spring' }}
                    className="w-3.5 h-3.5 rounded-full border-2 bg-white flex-shrink-0"
                    style={{ borderColor: '#FF6B56' }}
                  />
                  <motion.div
                    initial={{ scaleX: 0 }}
                    animate={isInView ? { scaleX: 1 } : {}}
                    transition={{ delay: i * 0.18 + 0.5, duration: 0.5 }}
                    style={{ transformOrigin: 'right' }}
                    className="h-px bg-gray-300 w-14 xl:w-20"
                  />
                </div>

                {/* Numbered bubble */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={isInView ? { scale: 1 } : {}}
                  transition={{ delay: i * 0.18 + 0.3, duration: 0.4, type: 'spring', stiffness: 200 }}
                  className={`w-14 h-14 rounded-full ${step.bg} text-white text-base font-black flex items-center justify-center flex-shrink-0 shadow-xl`}
                >
                  {step.num}
                </motion.div>

                {/* Text — left-aligned */}
                <div className="w-52 xl:w-64">
                  <p className="font-extrabold text-base uppercase tracking-wider mb-1.5" style={{ color: step.color }}>
                    {step.title}
                  </p>
                  <p className="text-gray-500 text-sm leading-relaxed">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ── Mobile: vertical numbered list ── */}
        <div className="lg:hidden flex flex-col gap-5">
          {[...leftSteps, ...rightSteps]
            .sort((a, b) => a.num.localeCompare(b.num))
            .map((step, i) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="flex items-start gap-4 bg-white rounded-2xl p-5 shadow-sm border border-gray-100"
              >
                <div className={`w-12 h-12 rounded-full ${step.bg} text-white text-base font-black flex items-center justify-center flex-shrink-0 shadow-md`}>
                  {step.num}
                </div>
                <div>
                  <p className="font-extrabold text-base uppercase tracking-wider mb-1" style={{ color: step.color }}>
                    {step.title}
                  </p>
                  <p className="text-gray-500 text-sm leading-relaxed">{step.desc}</p>
                </div>
              </motion.div>
            ))}
        </div>

      </div>
    </section>
  );
}
