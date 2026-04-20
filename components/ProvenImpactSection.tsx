'use client';

import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import CountUp from 'react-countup';
import type { ImpactStat } from './HomePage';
import { defaultStats } from './HomePage';

interface ProvenImpactSectionProps {
  stats?: ImpactStat[];
}

export default function ProvenImpactSection({ stats = defaultStats }: ProvenImpactSectionProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (inView) {
      const t = setTimeout(() => setStarted(true), 0);
      return () => clearTimeout(t);
    }
  }, [inView]);

  return (
    <section ref={ref} className="relative overflow-hidden bg-white">
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <Image src="/img/impact.jpg" alt="" fill className="object-cover object-right" />
        {/* Gradient: solid white left → transparent right */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to right, #ffffff 0%, #ffffff 38%, rgba(255,255,255,0.85) 60%, rgba(255,255,255,0.1) 80%, transparent 100%)',
          }}
        />
        {/* Mobile: full white overlay */}
        <div className="absolute inset-0 bg-white/90 lg:hidden" />
      </div>

      <div className="relative z-10 max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-6 py-20 lg:py-28">
        <div className="max-w-[600px]">

          <motion.span
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="section-tag mb-5"
          >
            Proven Impact
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 22 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.12, duration: 0.65 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0a1628] leading-tight mb-5"
          >
            Numbers That{' '}
            <span className="text-[#00ABBE]">Tell Our Story</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.22, duration: 0.6 }}
            className="text-gray-500 leading-[1.8] mb-10 max-w-[480px]"
          >
            Every number represents a child who can now read, a family empowered, and a
            community transformed. Our model is proven, scalable, and built for Africa.
          </motion.p>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-x-10 gap-y-8 mt-2">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -16 }}
                animate={started ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: i * 0.12, duration: 0.5 }}
                className="border-l-[3px] pl-5"
                style={{ borderColor: stat.accent }}
              >
                <div
                  className="text-4xl lg:text-5xl font-bold leading-none tabular-nums"
                  style={{ color: '#0a1628' }}
                >
                  {stat.prefix}
                  {started ? (
                    <CountUp end={stat.value} duration={2.5} separator="," suffix={stat.suffix} />
                  ) : (
                    '0'
                  )}
                </div>
                <p className="text-gray-500 text-sm font-medium mt-2 leading-snug">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
