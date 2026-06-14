'use client';

/**
 * "Our Response" section.
 *
 * Layout:
 *  - Desktop: one large circular image hub on the left, three numbered bubbles
 *    anchored to the right edge of that hub (top / middle / bottom). Each
 *    bubble pairs with a title + description on the right, vertically aligned
 *    to its bubble. A subtle coral halo around each bubble + a dashed
 *    connector from the hub to the text block keep the composition feeling
 *    circular. Implemented as a 3-row CSS grid so the bubbles and text stay
 *    locked to the same horizontal lines at every viewport.
 *  - Mobile: the hub and bubbles are hidden — only the three title/description
 *    blocks render, stacked vertically.
 */

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';

interface Pillar {
  num: string;
  title: string;
  desc: string;
}

const pillars: Pillar[] = [
  {
    num: '01',
    title: 'Expanding Literacy Access',
    desc: 'Removing financial barriers so underserved children can access quality literacy and learning opportunities.',
  },
  {
    num: '02',
    title: 'Building a Reading Culture',
    desc: 'Promoting reading as enjoyable, valuable, and essential for lifelong success.',
  },
  {
    num: '03',
    title: 'Research, Data & Innovation',
    desc: 'Using evidence, technology, and insights to improve literacy outcomes and inform action.',
  },
];

function Hub() {
  return (
    <>
      {/* Rotating outer dashed ring */}
      <motion.div
        aria-hidden
        animate={{ rotate: 360 }}
        transition={{ duration: 32, repeat: Infinity, ease: 'linear' }}
        className="absolute inset-[-18px] rounded-full border border-dashed border-[#FF6B56]/35 pointer-events-none"
      />
      {/* Pulsing teal glow */}
      <motion.div
        aria-hidden
        animate={{ scale: [1, 1.06, 1], opacity: [0.35, 0.65, 0.35] }}
        transition={{ duration: 3.6, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute inset-[-6px] rounded-full bg-[#00ABBE]/10 pointer-events-none"
      />
      {/* Main hub */}
      <div className="absolute inset-0 rounded-full shadow-2xl border-[10px] border-[#FF6B56]/20 overflow-hidden">
        <Image
          src="/img/solution.jpg"
          alt="PerbiCubs children reading"
          fill
          className="object-cover"
          sizes="(max-width: 1024px) 256px, 560px"
        />
        <div className="absolute inset-0 bg-[#0a1628]/65" />
        <div className="absolute w-[72%] h-[72%] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-dashed border-white/40 pointer-events-none" />
        <div className="absolute inset-0 flex items-center justify-center">
          <p className="text-white font-bold text-2xl xl:text-3xl text-center leading-tight tracking-widest uppercase">
            Our
            <br />
            Response
          </p>
        </div>
      </div>
    </>
  );
}

function PillarBubble({ num }: { num: string }) {
  return (
    <div className="relative flex-shrink-0 -ml-14 xl:-ml-16 z-10">
      {/* Coral halo — gives the bubble a circular anchor on the hub */}
      <div className="absolute inset-0 rounded-full bg-[#FF6B56]/15 blur-[2px] scale-110" />
      <div className="relative w-16 h-16 xl:w-20 xl:h-20 rounded-full bg-white flex items-center justify-center shadow-xl">
        <div className="w-[88%] h-[88%] rounded-full bg-[#00ABBE] text-white text-lg xl:text-xl font-black flex items-center justify-center">
          {num}
        </div>
      </div>
    </div>
  );
}

export default function OurResponseSection() {
  const ref = useRef<HTMLElement | null>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section
      ref={ref}
      className="py-20 lg:py-28 bg-white relative overflow-hidden"
    >
      <div className="absolute inset-0 dot-pattern opacity-20" aria-hidden />

      <div className="relative max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14 lg:mb-20"
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
            PerbiCubs Foundation removes barriers to literacy by expanding
            access, building a reading culture, and investing in research and
            innovation.
          </p>
        </motion.div>

        {/* Desktop: large hub on the left, 3 staggered pillars on the right.
            Pillars 1 and 3 hug the right edge of the hub; pillar 2 sits further
            to the right. The text deliberately does NOT form a vertical column. */}
        <div className="hidden lg:flex items-center gap-0 min-h-[560px]">
          {/* Large hub */}
          <motion.div
            initial={{ opacity: 0, scale: 0.7 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.1, duration: 0.8, type: 'spring', stiffness: 110 }}
            className="relative flex-shrink-0 w-[500px] xl:w-[560px] aspect-square"
          >
            <Hub />
          </motion.div>

          {/* 3 pillars — staggered, not vertically aligned. */}
          <div className="flex-1 flex flex-col gap-14 xl:gap-20">
            {pillars.map((pillar, i) => {
              // i=0 (top) and i=2 (bottom) hug the hub's edge.
              // i=1 (middle) sits further to the right.
              const leftPad = i === 1 ? 'pl-10 xl:pl-16' : 'pl-0 xl:pl-2';
              return (
                <motion.div
                  key={pillar.num}
                  initial={{ opacity: 0, x: 30 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.5 + i * 0.2, duration: 0.55, ease: 'easeOut' }}
                  className={`flex items-center gap-5 ${leftPad}`}
                >
                  <PillarBubble num={pillar.num} />

                  {/* Dashed connector from the hub out to the text block */}
                  <div
                    aria-hidden
                    className="hidden xl:block w-8 h-px"
                    style={{
                      backgroundImage:
                        'linear-gradient(to right, #FF6B56 50%, transparent 50%)',
                      backgroundSize: '6px 1px',
                      backgroundRepeat: 'repeat-x',
                    }}
                  />

                  <div>
                    <p
                      className="font-extrabold text-sm xl:text-base uppercase tracking-wider mb-1.5"
                      style={{ color: '#00ABBE' }}
                    >
                      {pillar.title}
                    </p>
                    <p className="text-gray-500 text-sm xl:text-[15px] leading-relaxed max-w-md">
                      {pillar.desc}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Mobile: hub and bubbles hidden, only the three text blocks. */}
        <div className="lg:hidden flex flex-col gap-8">
          {pillars.map((pillar, i) => (
            <motion.div
              key={pillar.num}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 + i * 0.15, duration: 0.5 }}
              className="flex items-start gap-4"
            >
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#00ABBE] text-white text-sm font-black flex items-center justify-center shadow-lg">
                {pillar.num}
              </div>
              <div className="pt-0.5">
                <p
                  className="font-extrabold text-sm uppercase tracking-wider mb-1.5"
                  style={{ color: '#00ABBE' }}
                >
                  {pillar.title}
                </p>
                <p className="text-gray-500 text-sm leading-relaxed">
                  {pillar.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
