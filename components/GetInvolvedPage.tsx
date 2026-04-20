'use client';

import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { HandHeart, Users, Building2, ArrowRight } from 'lucide-react';
import ContactSection from './ContactSection';
import BlogSection from './BlogSection';

// ─── Animation Helper ───
function RevealSection({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ─── Data ───
const INVOLVE_CARDS = [
  {
    id: 'sponsor',
    icon: HandHeart,
    title: 'Sponsor a Child',
    desc: 'For just $35 a year, you can give a child full access to our digital literacy platform. Your donation directly funds their education.',
    action: 'Donate Now',
    href: '/donate', // Fixed routing
    image: '/img/conceq.jpg'
  },
  {
    id: 'corporate',
    icon: Building2,
    title: 'Corporate Partnership',
    desc: 'Align your brand with our mission. We work with corporations to scale our impact through CSR initiatives and employee engagement.',
    action: 'Become a Partner',
    href: '#contact', // Scrolls down
    image: '/img/flagship_ini.jpg'
  },
  {
    id: 'volunteer',
    icon: Users,
    title: 'Volunteer & Advocate',
    desc: 'Give your time or platform. We need advocates to help spread the word, organize book drives, or support our operations.',
    action: 'Join the Movement',
    href: '#contact', // Scrolls down
    image: '/img/wea_1.jpg'
  },
];

export default function GetInvolvedPage() {
  return (
    <main className="bg-white">
      {/* ═══════════════════════════════════════════════════════
          HERO (Storytelling focused)
      ═══════════════════════════════════════════════════════ */}
      <section
        className="relative min-h-[45vh] flex flex-col items-center justify-center pt-24 pb-16 overflow-hidden parallax-section"
        style={{
          backgroundImage: 'url(/img/get_involved_banner.jpg)', // Using one of the cinematic hero images
          backgroundSize: 'cover',
          backgroundPosition: 'center 30%', 
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a1628]/60 via-[#0a1628]/70 to-[#0a1628]/90" />
        
        <div className="relative z-10 max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-6 w-full text-center flex flex-col items-center">
          <RevealSection className="flex flex-col items-center">
             <span className="section-tag mb-4 justify-center" >Take Action</span>
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white leading-tight">
              Get Involved
            </h1>
          </RevealSection>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          STORYTELLING TILE SECTION
      ═══════════════════════════════════════════════════════ */}
      <section className="py-20 lg:py-28 relative">
        {/* Decorative background split */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gray-50 -z-10 hidden lg:block rounded-l-3xl" />
        
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            
            <RevealSection>
              <div className="relative rounded-[40px] overflow-hidden aspect-square lg:aspect-[4/5] shadow-2xl">
                <Image
                  src="/img/get_involved_2.jpg" 
                  alt="Student reading"
                  fill
                  className="object-cover"
                />
              </div>
            </RevealSection>

            <RevealSection delay={0.2}>
              <span className="text-[#00ABBE] text-sm font-bold uppercase tracking-widest mb-4 block">
                The Power of the collective
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                You Can Be The Change
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-8">
                Our model is proven. The technology is built. The only missing variable is the resources to scale it to every child who needs it. When you get involved, you directly accelerate our mission to eradicate learning poverty across Sub-Saharan Africa.
              </p>
              
              <div className="bg-[#0a1628] rounded-3xl p-8 text-white">
                <div className="text-4xl font-black text-[#00ABBE] mb-2">100%</div>
                <div className="font-bold text-lg mb-2">Transparency & Accountability</div>
                <p className="text-white/60 text-sm leading-relaxed m-0">
                  We measure our success not by effort, but by outcomes. Every donation, partnership, and resource is tracked via real-time data to ensure maximum impact in the communities we serve.
                </p>
              </div>
            </RevealSection>

          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          WAYS TO SUPPORT (Immersive action tiles)
      ═══════════════════════════════════════════════════════ */}
      <section className="py-20 bg-gray-50 border-t border-gray-100">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-6">
          <RevealSection className="text-center mb-16 max-w-3xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">Choose How You&apos;ll Impact</h2>
            <p className="text-gray-500 text-lg">There is a role for everyone in this movement. Choose the path that aligns with your capacity to give.</p>
          </RevealSection>

          <div className="grid md:grid-cols-3 gap-8">
            {INVOLVE_CARDS.map((card, i) => (
              <RevealSection key={card.id} delay={i * 0.1}>
                  <div className="relative h-[480px] rounded-3xl overflow-hidden group border border-gray-100">
                    {/* Background Image */}
                    <div className="absolute inset-0">
                      <Image src={card.image} alt={card.title} fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
                    </div>
                    {/* Gradient that slightly darkens on hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a1628] via-[#0a1628]/80 to-black/20 opacity-90 transition-opacity duration-500 group-hover:opacity-100" />
                    
                    {/* Content */}
                    <div className="absolute inset-0 p-8 flex flex-col justify-end text-left items-start z-10">
                      <div className="transform transition-transform duration-500 ease-out group-hover:-translate-y-3 w-full">
                        <h3 className="text-2xl font-bold text-white mb-3">{card.title}</h3>
                        <p className="text-white/80 leading-relaxed text-sm mb-8 max-w-[95%]">{card.desc}</p>
                        
                        <Link 
                          href={card.href} 
                          className="w-full flex items-center justify-center gap-2 bg-[#00ABBE] text-white py-3.5 px-6 rounded-xl font-bold text-sm tracking-wider uppercase transition-all duration-300 hover:bg-white hover:text-[#00ABBE] group/btn"
                        >
                          {card.action} 
                          <ArrowRight size={16} className="transition-transform group-hover/btn:translate-x-1" />
                        </Link>
                      </div>
                    </div>
                  </div>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          STORIES
      ═══════════════════════════════════════════════════════ */}
      <BlogSection />

      {/* ═══════════════════════════════════════════════════════
          CONTACT FORM (Using the global ContactSection UI)
      ═══════════════════════════════════════════════════════ */}
      <div id="contact">
        <ContactSection />
      </div>

    </main>
  );
}
