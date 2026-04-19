'use client';

import Image from 'next/image';
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Plus } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

const team = [
  {
    name: 'Kweku Andoh',
    role: 'Executive Director & Founder',
    image: '/images/about_learning.png',
  },
  {
    name: 'Abena Asante',
    role: 'Head of Programs',
    image: '/images/program_literacy.png',
  },
  {
    name: 'Kofi Owusu',
    role: 'Technology Lead',
    image: '/images/program_digital.png',
  },
  {
    name: 'Efua Boateng',
    role: 'Community Outreach Manager',
    image: '/images/program_advocacy.png',
  },
];

function Section({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function TeamSection() {
  return (
    <section className="py-20 lg:py-28 bg-white overflow-hidden border-t border-gray-100">
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-6">
        <Section className="text-center mb-14">
          <p className="flex items-center justify-center gap-3 text-[#00ABBE] text-xs font-bold uppercase tracking-widest mb-4">
            <span className="w-8 h-px bg-[#00ABBE]" />
            Our People
            <span className="w-8 h-px bg-[#00ABBE]" />
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0a1628]">
            The Team Behind <span className="text-[#00ABBE]">the Mission</span>
          </h2>
        </Section>

        <Swiper
          modules={[Pagination, Autoplay]}
          slidesPerView={1}
          spaceBetween={24}
          autoplay={{ delay: 3200, disableOnInteraction: false, pauseOnMouseEnter: true }}
          pagination={{ clickable: true }}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 4 },
          }}
          className="pb-12"
        >
          {team.map((member, i) => (
            <SwiperSlide key={i}>
              <div className="rounded-2xl overflow-hidden bg-[#f0f0f0] hover:shadow-xl transition-shadow duration-300 group">
                {/* Photo */}
                <div className="relative h-72">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover object-top"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                  <button
                    className="absolute bottom-3 right-3 w-8 h-8 rounded-full bg-[#0a1628] group-hover:bg-[#00ABBE] text-white flex items-center justify-center transition-colors duration-300 z-10"
                    aria-label={`View ${member.name}`}
                  >
                    <Plus size={15} strokeWidth={2.5} />
                  </button>
                </div>
                {/* Info */}
                <div className="px-5 py-4 text-center">
                  <h3 className="font-bold text-[#0a1628] text-base leading-snug">{member.name}</h3>
                  <p className="text-gray-500 text-sm mt-0.5">{member.role}</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
