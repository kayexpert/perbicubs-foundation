'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  CheckCircle2,
  HeartHandshake,
  BookOpen,
  Globe,
  Target,
  Award,
  Trophy,
} from 'lucide-react';

const tabs = [
  {
    id: 'mission',
    label: 'Our Mission',
    text: 'To empower underprivileged children and youth through scholarships, advocacy, research, and dedicated digital access to structured literacy materials — giving every child the foundation to read, learn, and thrive.',
    boxes: [
      {
        icon: HeartHandshake,
        title: 'Trusted Organization',
        desc: 'We help companies develop powerful corporate social responsibility strategies.',
      },
      {
        icon: BookOpen,
        title: 'Empower Learning',
        desc: 'We help scale digital literacy across the continent seamlessly.',
      },
    ],
  },
  {
    id: 'vision',
    label: 'Our Vision',
    text: 'Every family flourishing through equitable access to literacy and learning, creating equal opportunities to end learning poverty in our lifetime.',
    boxes: [
      {
        icon: Globe,
        title: 'Equal Access',
        desc: 'Every child deserves access to reading materials regardless of geography or income.',
      },
      {
        icon: Target,
        title: 'End Learning Poverty',
        desc: 'We work to eliminate literacy poverty within a generation across Sub-Saharan Africa.',
      },
    ],
  },
  {
    id: 'excellence',
    label: 'Our Excellence',
    text: 'Recognized through partnerships with UNESCO Accra World Book Capital & the Mastercard Foundation EdTech Fellowship for proven scale and measurable impact.',
    boxes: [
      {
        icon: Award,
        title: 'UNESCO Recognized',
        desc: 'Partners with UNESCO Accra World Book Capital for literacy advocacy.',
      },
      {
        icon: Trophy,
        title: 'Mastercard Backed',
        desc: 'Mastercard Foundation EdTech Fellowship recipient for innovation.',
      },
    ],
  },
];

export default function WhoWeAreSection() {
  const [activeTab, setActiveTab] = useState('mission');
  const active = tabs.find((t) => t.id === activeTab)!;

  return (
    <section className="py-14 lg:py-[120px] bg-white overflow-hidden relative z-[1]">

      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-6">
        <div className="grid lg:[grid-template-columns:1.15fr_1fr] gap-8 lg:gap-10">

          {/* ── Left: about-one__img ── */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative mr-0 lg:mr-[35px] lg:h-full lg:min-h-[600px]"
          >
            {/* shape1 — gray blob, top: 33px, right: 88px (behind images) */}
            <div
              className="absolute pointer-events-none -z-[1] w-36 h-24 bg-gray-300/70 blur-3xl rounded-full"
              style={{ top: 33, right: 88 }}
            />

            {/* about-one__img-inner — flex col on mobile, row on desktop */}
            <div className="flex flex-col lg:flex-row lg:h-full">

              {/* about-one__img1 — flex-col: 145px spacer + fills remaining height */}
              <div className="flex flex-col flex-shrink-0 z-[1] w-full lg:w-[55%] lg:mr-[30px]">
                {/* Top spacer — desktop only (margin-top: 145px equivalent) */}
                <div className="hidden lg:block flex-shrink-0 lg:h-[145px]" />

                {/* img1 content — explicit h on mobile so h-full inside resolves */}
                <div className="relative h-[260px] lg:h-auto lg:flex-1 lg:min-h-[300px]">
                  {/* Orange border frame — desktop only */}
                  <div
                    className="hidden lg:block absolute border-[5px] border-[#FF6B56] rounded-[30px] -z-[1]"
                    style={{ top: -25, left: -25, bottom: 45, right: 120 }}
                  />

                  {/* Inner image — fills full height of content area */}
                  <div className="relative h-full rounded-[30px] overflow-hidden bg-[#0a1628] shadow-2xl">
                    <Image
                      src="/img/wea_1.jpg"
                      alt="Children in need of literacy"
                      fill
                      className="object-cover  transition-all duration-500 hover:opacity-50 hover:scale-[1.05]"
                      sizes="(max-width: 768px) 100vw, 25vw"
                    />
                  </div>
                </div>
              </div>

              {/* about-one__img2 — full-width on mobile, flex-1 on desktop */}
              <div className="relative rounded-[30px] overflow-hidden bg-[#0a1628] shadow-xl w-full mt-3 h-[240px] lg:flex-1 lg:h-[370px] lg:mt-[30px] lg:self-start lg:flex-shrink-0">
                <Image
                  src="/img/wea_2.jpg"
                  alt="Child learning"
                  fill
                  className="object-cover transition-all duration-500 hover:opacity-50 hover:scale-[1.05]"
                  sizes="(max-width: 768px) 100vw, 25vw"
                />
              </div>

            </div>

            {/* about-one__img-content — absolute bottom:30 right:0 max-w-[340px] */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="static lg:absolute w-full lg:max-w-[340px] rounded-[20px] lg:rounded-[30px] z-[2] mt-3 lg:mt-0"
              style={{ bottom: 30, right: 0, background: '#fff', padding: '5px 0px 5px 5px' }}
            >
              {/* Inner dark card */}
              <div className="bg-[#0a1628] rounded-[30px] px-[30px] pt-[22px] pb-[30px]">
                <h2 className="text-white text-[18px] sm:text-[22px] lg:text-[28px] font-bold leading-[1.4] capitalize mb-3">
                  Africa&apos;s 186,548+ Children Need{' '}
                  <span className="text-[#FF6B56]">Literacy</span>
                </h2>
                <div className="relative">
                  <Link
                    href="/get-involved"
                    className="relative inline-block text-white text-base font-semibold pb-[2px] transition-colors hover:text-[#00ABBE]"
                  >
                    Become a Volunteer
                    <span className="absolute left-0 bottom-0 right-0 h-[1px] bg-white transition-colors group-hover:bg-[#00ABBE]" />
                  </Link>
                </div>
              </div>
            </motion.div>

          </motion.div>

          {/* ── Right: about-one__content ── */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="flex flex-col justify-center pt-0 lg:pt-0"
          >
            {/* sec-title__tagline */}
            <span className="section-tag mb-5">Who We Are</span>

            {/* sec-title__title */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-5">
              Transforming Lives Through{' '}
              <span className="text-[#00ABBE]">Literacy</span>
            </h2>

            {/* about-one__content-text */}
            <p className="text-gray-500 leading-[1.8] m-0">
              We help communities, schools, and partners develop powerful literacy strategies. Our
              impact is about more than access — it&apos;s about helping every child build the
              foundational skills they need to thrive.
            </p>

            {/* about-one__tab — pill tabs */}
            <div className="mt-8">
              {/* tabs-button-box — flex, centered, pill buttons */}
              <ul className="flex flex-col sm:flex-row items-center sm:items-center gap-3 sm:gap-[25px] mb-7">
                {tabs.map((tab) => (
                  <li key={tab.id} className="relative overflow-hidden w-full sm:w-auto">
                    <button
                      onClick={() => setActiveTab(tab.id)}
                      className={`relative w-full sm:w-auto text-center px-[25px] py-[8px] sm:py-[4px] border rounded-[50px] font-semibold text-base transition-all duration-300 overflow-hidden z-[1] ${
                        activeTab === tab.id
                          ? 'border-[#00ABBE] text-white'
                          : 'border-[#D8DDE1] text-gray-900 hover:border-[#00ABBE]'
                      }`}
                      style={{
                        background: activeTab === tab.id ? '#00ABBE' : 'transparent',
                      }}
                    >
                      {tab.label}
                    </button>
                  </li>
                ))}
              </ul>

              {/* tabs-content */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, scaleY: 0.9 }}
                  animate={{ opacity: 1, scaleY: 1 }}
                  exit={{ opacity: 0, scaleY: 0.9 }}
                  transition={{ duration: 0.3 }}
                  style={{ transformOrigin: 'top' }}
                >
                  {/* about-one__single-tab-text1 — check icon left + text */}
                  <div className="relative pl-[40px] mb-[26px]">
                    <div className="absolute top-[7px] left-0">
                      <CheckCircle2 className="w-[25px] h-[25px] text-[#00ABBE]" strokeWidth={2} />
                    </div>
                    <p className="text-gray-900 font-medium leading-[28px] capitalize m-0">
                      {active.text
                        .split(/(\d[\d,]+)/)
                        .map((part, i) =>
                          /^\d[\d,]+$/.test(part) ? (
                            <span key={i} className="text-[#00ABBE]">{part}</span>
                          ) : (
                            part
                          )
                        )}
                    </p>
                  </div>

                  {/* about-one__single-tab-text2 — dashed border box, 2-col */}
                  <div className="border border-dashed border-gray-900 rounded-[20px] px-[25px] py-[18px]">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-5 sm:gap-y-0 sm:gap-x-[57px]">
                      {active.boxes.map((box, i) => (
                        <div
                          key={i}
                          className={`relative pl-[45px] ${
                            i === 0
                              ? 'sm:after:absolute sm:after:right-[-28px] sm:after:top-0 sm:after:bottom-0 sm:after:w-[1px] sm:after:bg-[linear-gradient(180deg,rgba(31,31,31,0)_5%,rgba(31,31,31,0.99)_50%,rgba(31,31,31,0)_93%)]'
                              : ''
                          }`}
                        >
                          <div className="absolute left-0 top-[8px]">
                            <box.icon className="w-[30px] h-[30px] text-[#00ABBE] transition-all duration-500 hover:[transform:rotateY(180deg)]" strokeWidth={1.5} />
                          </div>
                          <div>
                            <h3 className="text-[22px] font-bold text-gray-900 leading-[32px] capitalize">
                              {box.title}
                            </h3>
                            <p className="text-gray-500 m-0 text-sm leading-relaxed">{box.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>


          </motion.div>

        </div>
      </div>
    </section>
  );
}
