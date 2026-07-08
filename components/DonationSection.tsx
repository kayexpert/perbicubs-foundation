'use client';

import { useState } from 'react';
import Image from 'next/image';

import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Smartphone, CreditCard } from 'lucide-react';

export default function DonationSection() {
  const [activeTab, setActiveTab] = useState<'local' | 'international'>('local');

  return (
    <section className="relative pt-16 lg:pt-24">
      {/* Dark background — stops 80px before the section's actual bottom */}
      <div
        className="absolute inset-x-0 top-0 z-0 overflow-hidden"
        style={{ height: 'calc(100% - 80px)' }}
      >
        <div className="absolute inset-0 bg-[#0a1628]" />
        <div
          className="absolute inset-0"
          style={{ filter: 'grayscale(1)', opacity: 0.2 }}
        >
          <Image src="/img/impact.jpg" alt="Literacy programs in Ghana improving student reading skills" fill className="object-cover object-center" sizes="100vw" quality={75} />
        </div>
        <div className="absolute inset-0 bg-[#0a1628]/65" />
      </div>

      <div className="relative z-10 max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-6">
        {/* Centered heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          className="text-center mb-12"
        >
          <p className="text-[#FF6B56] text-sm font-bold uppercase tracking-widest mb-3 flex items-center justify-center gap-2">
            <span className="inline-block w-5 h-[2px] bg-[#FF6B56]" />
            Start Sponsoring A Child
            <span className="inline-block w-5 h-[2px] bg-[#FF6B56]" />
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
            Help Us Reach{' '}
            <span className="text-[#FF6B56]">12,000 Children</span>{' '}in Year One
          </h2>
        </motion.div>

        {/* Two-column card — bottom 80px sticks out past dark bg */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
          className="grid grid-cols-1 lg:grid-cols-[2fr_3fr] rounded-2xl overflow-hidden shadow-2xl shadow-black/30 bg-white"
        >
          {/* Left col — image */}
          <div className="relative min-h-[260px] lg:min-h-[500px]">
            <Image
              src="/img/donation.jpg"
              alt="Ghanaian students using tablets provided by our education NGO sponsorship program"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 40vw"
            />
            {/* Gradient overlay for depth */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a1628]/40 via-transparent to-transparent" />
          </div>

          {/* Right col — Interactive Tabs */}
          <div className="p-7 sm:p-10 lg:p-12 flex flex-col justify-center">
            
            <div className="mb-8">
              <h3 className="text-2xl sm:text-3xl font-bold text-[#0a1628] mb-3">Choose How to Donate</h3>
              <p className="text-gray-500 text-sm leading-relaxed max-w-lg">
                Your support gives a child access to reading, learning, and opportunity. Choose your preferred secure donation method.
              </p>
            </div>

            {/* Tab Toggle */}
            <div className="relative flex p-1.5 bg-slate-100 rounded-full mb-8 max-w-[400px]">
              <div 
                className="absolute inset-y-1.5 left-1.5 w-[calc(50%-6px)] bg-white rounded-full shadow-sm transition-transform duration-300 ease-in-out" 
                style={{ transform: activeTab === 'local' ? 'translateX(0)' : 'translateX(100%)' }}
              />
              <button 
                onClick={() => setActiveTab('local')}
                className={`relative flex-1 py-3 text-sm font-bold rounded-full transition-colors z-10 flex items-center justify-center gap-2 ${activeTab === 'local' ? 'text-[#0a1628]' : 'text-slate-500 hover:text-slate-700'}`}
              >
                <Smartphone size={16} /> Local / MoMo
              </button>
              <button 
                onClick={() => setActiveTab('international')}
                className={`relative flex-1 py-3 text-sm font-bold rounded-full transition-colors z-10 flex items-center justify-center gap-2 ${activeTab === 'international' ? 'text-[#0a1628]' : 'text-slate-500 hover:text-slate-700'}`}
              >
                <CreditCard size={16} /> International
              </button>
            </div>

            {/* Tab Content Container */}
            <div className="relative min-h-[160px]">
              <AnimatePresence mode="wait">
                
                {activeTab === 'local' && (
                  <motion.div
                    key="local"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-6"
                  >
                    <div>
                      <p className="text-gray-600 leading-relaxed mb-4">
                        Make a direct impact through Mobile Money or a local bank transfer via Chango. It is quick, secure, and ensures 100% of your donation goes directly towards our mission.
                      </p>
                    </div>
                    
                    <a
                      href="#CHANGO_LINK_HERE"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 bg-[#00ABBE] hover:bg-[#0097a6] text-white px-8 py-3.5 rounded-full font-bold text-sm transition-all duration-300 w-full sm:w-auto shadow-lg shadow-[#00ABBE]/20"
                    >
                      Donate via Chango <ArrowRight size={16} />
                    </a>
                  </motion.div>
                )}

                {activeTab === 'international' && (
                  <motion.div
                    key="international"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-6"
                  >
                    <div>
                      <p className="text-gray-600 leading-relaxed mb-4">
                        Support our mission from anywhere in the world. We accept all major credit cards globally via our secure integration with Myriad Canada.
                      </p>
                    </div>

                    <a
                      href="#MYRIAD_LINK_HERE"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 bg-[#FF6B56] hover:bg-[#e55944] text-white px-8 py-3.5 rounded-full font-bold text-sm transition-all duration-300 w-full sm:w-auto shadow-lg shadow-[#FF6B56]/20"
                    >
                      Donate via Myriad Canada <ArrowRight size={16} />
                    </a>
                  </motion.div>
                )}

              </AnimatePresence>
            </div>

          </div>
        </motion.div>
      </div>
    </section>
  );
}
