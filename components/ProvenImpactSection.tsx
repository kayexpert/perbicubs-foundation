'use client';

import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import CountUp from 'react-countup';
import { CheckCircle2 } from 'lucide-react';
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
        <Image src="/img/impact.jpg" alt="Literacy programs in Ghana improving student reading skills" fill className="object-cover object-right" sizes="100vw" quality={80} />
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
            Evidence. Scale. Impact.
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 22 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.12, duration: 0.65 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0a1628] leading-tight mb-5"
          >
            A Track Record of {' '}
            <span className="text-[#00ABBE]">Literacy Impact</span>
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.22, duration: 0.6 }}
            className="text-gray-500 leading-[1.8] mb-5 max-w-[500px]"
          >
            Our foundation builds on the proven success of PerbiCubs, a literacy
            model that has demonstrated measurable impact across schools and communities.

            <ul className="mt-6 space-y-4 text-gray-600 bg-[#00ABBE]/8 p-6 rounded-2xl border border-[#00ABBE]/15 shadow-sm">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#00ABBE] mt-0.5 flex-shrink-0" />
                <span><strong className="text-[#0a1628]">1,000,000+ books read</strong> by children on the Perbicubs platform.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#FF6B56] mt-0.5 flex-shrink-0" />
                <span><strong className="text-[#0a1628]">Millions of viewers</strong> reached through the Inter-School Reading Quiz.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#00ABBE] mt-0.5 flex-shrink-0" />
                <span><strong className="text-[#0a1628]">Global recognition</strong> from <strong className="text-[#0a1628]">UNESCO</strong> and the <strong className="text-[#0a1628]">Mastercard Foundation</strong>.</span>
              </li>
            </ul>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.26, duration: 0.6 }}
            className="text-gray-500 leading-[1.8] mb-8 max-w-[480px]"
          >
            These achievements demonstrate that when children are given the right
            tools, support, and motivation, meaningful improvements in literacy
            outcomes are possible.
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
