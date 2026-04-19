'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { BookX, TrendingDown, Briefcase, RotateCcw, ArrowRight } from 'lucide-react';

const consequences = [
  { icon: BookX,        label: 'Poor academic performance' },
  { icon: TrendingDown, label: 'High dropout rates' },
  { icon: Briefcase,    label: 'Limited job opportunities' },
  { icon: RotateCcw,    label: 'Intergenerational poverty' },
];

export default function TheProblemSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section className="bg-white overflow-hidden">
      <div ref={ref} className="flex flex-col lg:flex-row lg:items-center lg:min-h-[580px]">

        {/* ── Left: full-bleed image — no border-radius, no container padding ── */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="relative w-full lg:w-[55%] flex-shrink-0 min-h-[300px] lg:min-h-[580px] overflow-hidden"
        >
          <Image
            src="/problem.png"
            alt="Children facing the literacy crisis"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 44vw"
          />
        </motion.div>

        {/* ── Right: section tag + heading (outside box) + compact card ── */}
        <div className="flex-1 flex flex-col justify-center px-6 sm:px-10 lg:pl-12 xl:pl-16 py-12 lg:py-16">

          {/* Section tag — outside box, primary */}
          <motion.p
            initial={{ opacity: 0, y: -12 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex items-center gap-2.5 text-[#00ABBE] text-xs font-bold uppercase tracking-widest mb-5"
          >
            <span className="w-6 h-px bg-[#00ABBE]" />
            The Problem
            <span className="w-6 h-px bg-[#00ABBE]" />
          </motion.p>

          {/* Headline — outside box, primary accent */}
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="text-[32px] font-bold text-[#0a1628] leading-tight mb-7"
          >
            A Learning Crisis{' '}
            <span className="text-[#00ABBE]">We Cannot Ignore</span>
          </motion.h2>

          {/* Content card — compact, overlaps image on desktop */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.35 }}
            className="p-0 lg:p-10 lg:bg-white lg:rounded-2xl lg:shadow-xl lg:shadow-black/8 lg:border lg:border-gray-100 lg:-ml-48 z-10"
          >
            {/* Body text */}
            <p className="text-base text-gray-500 leading-relaxed mb-3">
              <span className="font-bold text-[#0a1628]">
                87% of 10-year-olds in Sub-Saharan Africa
              </span>{' '}
              cannot read and understand a simple story.
            </p>
            <p className="text-base text-gray-500 leading-relaxed mb-7">
              This means millions of children are sitting in classrooms without foundational
              skills — unable to fully learn, grow, or succeed.
            </p>

            {/* Key consequences — 2×2 grid, primary */}
            <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">
              Key Consequences
            </p>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-6 gap-y-3 mb-8">
              {consequences.map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-[#00ABBE]/10 flex items-center justify-center flex-shrink-0">
                    <item.icon size={15} className="text-[#00ABBE]" />
                  </div>
                  <span className="text-gray-700 font-medium text-sm">{item.label}</span>
                </div>
              ))}
            </div>

            {/* CTA */}
            <Link
              href="/the-problem"
              className="inline-flex items-center gap-2 bg-[#00ABBE] hover:bg-[#0097a6] text-white px-7 py-3.5 rounded-full font-bold text-sm tracking-wide uppercase transition-colors"
            >
              Understand the Crisis <ArrowRight size={16} />
            </Link>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
