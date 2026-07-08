'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  DollarSign,
  Smartphone,
  CreditCard,
  Heart,
  ChevronDown,
  ChevronUp,
  ArrowRight,
  Users,
  BookOpen,
  CheckCircle2
} from 'lucide-react';
import BlogSection from './BlogSection';
import type { BlogPost } from './HomePage';

// Using placeholders for the actual links
const MYRIAD_LINK = '#MYRIAD_LINK_HERE';
const CHANGO_LINK = '#CHANGO_LINK_HERE';

function RevealSection({
  children,
  delay = 0,
  className = '',
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.65, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

interface DonatePageProps {
  blogPosts?: BlogPost[];
}

export default function DonatePage({ blogPosts }: DonatePageProps) {
  const [activeTab, setActiveTab] = useState<'local' | 'international'>('local');
  const [faqOpen, setFaqOpen] = useState<number | null>(null);

  const faqs = [
    {
      q: 'How is my donation used?',
      a: '80% of every donation goes directly to program delivery — scholarships, platform access, and literacy materials. 12% funds operations and 8% supports outreach and awareness campaigns.',
    },
    {
      q: 'Is my donation tax-deductible?',
      a: 'PerbiCubs Foundation is a registered NGO. Tax deductibility depends on your country\'s laws. For international donations via Myriad Canada, eligible Canadian and US donors may receive tax receipts. Please consult your local tax authority.',
    },
    {
      q: 'Can I make a recurring donation?',
      a: 'Yes — recurring donations can be set up through both our local and international payment partners. Just select the recurring option on their respective checkout pages.',
    },
    {
      q: 'What is Mobile Money?',
      a: 'Mobile Money (MTN MoMo, Airtel Money, Vodafone Cash) is a digital payment system widely used in West Africa. It lets you send money directly from your mobile phone — no bank account needed.',
    },
  ];

  return (
    <main>
      {/* ═══════════════════════════════════════════════════════
          1. HERO
      ═══════════════════════════════════════════════════════ */}
      <section
        className="relative min-h-[55vh] flex items-center overflow-hidden"
      >
        <Image src="/img/sponsor_banner.jpg" alt="" fill className="object-cover object-center" priority sizes="100vw" quality={80} />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a1628]/60 via-[#0a1628]/70 to-[#0a1628]/90" />
        
        <div className="relative z-10 max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-6 pt-28 pb-16 w-full flex flex-col items-center text-center">
          <RevealSection className="flex flex-col items-center max-w-2xl">
            <span className="section-tag mb-5 justify-center text-white" >
              Make a Donation
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white mb-5 leading-tight">
              You Can Change a Child&apos;s Story
            </h1>
            <p className="text-white/70 text-xl leading-relaxed max-w-xl mx-auto">
              Your contribution ensures a child gains full access to digital literacy tools, a curated reading library, and the bright future they deserve.
            </p>
          </RevealSection>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          2. HOW WE USE FUNDS (Redesigned)
      ═══════════════════════════════════════════════════════ */}
      <section className="py-16 lg:py-24 bg-white relative z-20">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-6">
          <RevealSection className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-[#0a1628] flex items-center justify-center gap-3">
              <DollarSign size={32} className="text-[#00ABBE]" />
              How We Use Funds
            </h2>
            <p className="text-gray-500 mt-4 max-w-2xl mx-auto text-lg">
              Every donation is an investment in a child&apos;s future. Here is how your generosity translates into tangible impact.
            </p>
          </RevealSection>

          <div className="grid md:grid-cols-3 gap-8">
            <RevealSection delay={0.1}>
              <div className="bg-gray-50 rounded-3xl p-8 h-full border border-gray-100 hover:shadow-lg transition-all duration-300">
                <div className="w-14 h-14 rounded-2xl bg-[#00ABBE]/10 flex items-center justify-center mb-6">
                  <BookOpen size={24} className="text-[#00ABBE]" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Scholarships & Access</h3>
                <p className="text-gray-500 leading-relaxed">
                  Your donation funds scholarships that provide underprivileged children with full access to the PerbiCubs digital literacy platform, removing the financial barrier to reading.
                </p>
              </div>
            </RevealSection>
            
            <RevealSection delay={0.2}>
              <div className="bg-gray-50 rounded-3xl p-8 h-full border border-gray-100 hover:shadow-lg transition-all duration-300">
                <div className="w-14 h-14 rounded-2xl bg-[#FF6B56]/10 flex items-center justify-center mb-6">
                  <Users size={24} className="text-[#FF6B56]" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">National Campaigns</h3>
                <p className="text-gray-500 leading-relaxed">
                  Supports large-scale initiatives like the Inter-School Reading Quiz and behavioral change campaigns that actively promote reading culture across communities.
                </p>
              </div>
            </RevealSection>

            <RevealSection delay={0.3}>
              <div className="bg-gray-50 rounded-3xl p-8 h-full border border-gray-100 hover:shadow-lg transition-all duration-300">
                <div className="w-14 h-14 rounded-2xl bg-[#0a1628]/10 flex items-center justify-center mb-6">
                  <Heart size={24} className="text-[#0a1628]" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Impact Measurement</h3>
                <p className="text-gray-500 leading-relaxed">
                  Enables data-driven interventions by tracking reading progress, quiz performance, and engagement trends to continuously refine our programs.
                </p>
              </div>
            </RevealSection>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          3. DONATION SECTION (Original Design adapted)
      ═══════════════════════════════════════════════════════ */}
      <section className="relative pt-16 lg:pt-24 pb-16 lg:pb-24 bg-gray-50">
        <div className="relative z-10 max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-6">
          <RevealSection className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0a1628] leading-tight">
              Start Sponsoring A Child
            </h2>
          </RevealSection>

          <RevealSection delay={0.1}>
            <div className="grid grid-cols-1 lg:grid-cols-[2fr_3fr] rounded-2xl overflow-hidden shadow-2xl shadow-black/10 bg-white">
              {/* Left col — image */}
              <div className="relative min-h-[300px] lg:min-h-full">
                <Image
                  src="/img/donation.jpg"
                  alt="Ghanaian students using tablets"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a1628]/40 via-transparent to-transparent" />
              </div>

              {/* Right col — Interactive Tabs & Impact */}
              <div className="p-7 sm:p-10 lg:p-12 flex flex-col justify-center">
                
                <div className="mb-8">
                  <h3 className="text-2xl sm:text-3xl font-bold text-[#0a1628] mb-3">Choose How to Donate</h3>
                  <p className="text-gray-500 text-sm leading-relaxed max-w-lg">
                    Your support gives a child access to reading, learning, and opportunity. Choose your preferred secure donation method.
                  </p>
                </div>

                {/* Tab Toggle */}
                <div className="relative flex p-1.5 bg-slate-100 rounded-full mb-8 w-full">
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
                <div className="relative min-h-[160px] mb-10">
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
                        
                        <div className="flex justify-end">
                          <a
                            href={CHANGO_LINK}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center gap-2 bg-[#00ABBE] hover:bg-[#0097a6] text-white px-8 py-3.5 rounded-full font-bold text-sm transition-all duration-300 w-full sm:w-auto shadow-lg shadow-[#00ABBE]/20"
                          >
                            Donate via Chango <ArrowRight size={16} />
                          </a>
                        </div>
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

                        <div className="flex justify-end">
                          <a
                            href={MYRIAD_LINK}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center gap-2 bg-[#FF6B56] hover:bg-[#e55944] text-white px-8 py-3.5 rounded-full font-bold text-sm transition-all duration-300 w-full sm:w-auto shadow-lg shadow-[#FF6B56]/20"
                          >
                            Donate via Myriad Canada <ArrowRight size={16} />
                          </a>
                        </div>
                      </motion.div>
                    )}

                  </AnimatePresence>
                </div>

                {/* Impact of Change */}
                <div className="bg-[#0a1628]/5 rounded-2xl p-6 border border-[#0a1628]/10">
                  <h4 className="font-bold text-[#0a1628] mb-4 flex items-center gap-2">
                    <Heart size={18} className="text-[#FF6B56]" />
                    The Impact of Change
                  </h4>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <CheckCircle2 size={18} className="text-[#00ABBE] mt-0.5 flex-shrink-0" />
                      <p className="text-gray-600 text-sm">Empowering students to read at their grade level and beyond.</p>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 size={18} className="text-[#00ABBE] mt-0.5 flex-shrink-0" />
                      <p className="text-gray-600 text-sm">Providing essential digital tools and culturally relevant books.</p>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 size={18} className="text-[#00ABBE] mt-0.5 flex-shrink-0" />
                      <p className="text-gray-600 text-sm">Inspiring families to engage in reading together at home.</p>
                    </li>
                  </ul>
                </div>

              </div>
            </div>
          </RevealSection>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          4. STORIES OF IMPACT (BlogSection)
      ═══════════════════════════════════════════════════════ */}
      <BlogSection posts={blogPosts} />

      {/* ═══════════════════════════════════════════════════════
          5. FAQ
      ═══════════════════════════════════════════════════════ */}
      <section className="py-16 lg:py-24 bg-white border-t border-gray-100">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-6">
          <RevealSection className="text-center mb-12">
            <span className="section-tag justify-center">Common Questions</span>
            <h2 className="text-3xl font-bold text-gray-900">Donation FAQs</h2>
          </RevealSection>

          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <RevealSection key={i} delay={i * 0.05}>
                <div className="border border-gray-200 bg-white rounded-2xl overflow-hidden hover:border-[#00ABBE]/30 transition-colors">
                  <button
                    type="button"
                    onClick={() => setFaqOpen(faqOpen === i ? null : i)}
                    className="w-full flex items-center justify-between px-6 py-5 text-left font-bold text-gray-900 hover:bg-gray-50 transition-colors"
                    id={`faq-${i}`}
                  >
                    {faq.q}
                    {faqOpen === i ? (
                      <ChevronUp size={18} className="text-[#00ABBE] flex-shrink-0 ml-4" />
                    ) : (
                      <ChevronDown size={18} className="text-gray-400 flex-shrink-0 ml-4" />
                    )}
                  </button>
                  <AnimatePresence>
                    {faqOpen === i && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-5 text-gray-500 leading-relaxed border-t border-gray-100 pt-4">
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </RevealSection>
            ))}
          </div>

          <RevealSection delay={0.2} className="text-center mt-12">
            <p className="text-gray-500 mb-4">Have more questions?</p>
            <Link href="/get-involved" className="btn-primary">
              Contact Our Team
            </Link>
          </RevealSection>
        </div>
      </section>
    </main>
  );
}
