'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, EffectFade } from 'swiper/modules';
import { motion, useInView } from 'framer-motion';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
import { ArrowRight } from 'lucide-react';
import TheProblemSection from './TheProblemSection';
import ProvenImpactSection from './ProvenImpactSection';
import DonationSection from './DonationSection';
import GallerySection from './GallerySection';
import SolutionApproachSection from './SolutionApproachSection';
import BlogSection from './BlogSection';
import ContactSection from './ContactSection';

// ─── Types ───────────────────────────────────────────────────────────────────
export interface HeroSlide {
  id?: number;
  image: string;
  tag: string;
  headline: string;
  sub: string;
  cta1_label: string;
  cta1_href: string;
  cta2_label: string;
  cta2_href: string;
}

export interface ImpactStat {
  id?: number;
  value: number;
  suffix: string;
  prefix: string;
  label: string;
  accent: string;
}

export interface GalleryImage {
  id?: number;
  src: string;
  caption: string;
  category: string;
}

export interface BlogPost {
  id?: number;
  slug: string;
  title: string;
  excerpt: string;
  body: string;
  category: string;
  date: string;
  read_time: string;
  image: string;
  author: string;
  author_role: string;
}

// ─── Fallback static data (used if DB is unavailable) ────────────────────────
export const defaultHeroSlides: HeroSlide[] = [
  {
    image: '/hero1.png',
    tag: 'Ending Learning Poverty',
    headline: 'Every Child Deserves to Read',
    sub: 'We are building a future where no child is left behind because they cannot read.',
    cta1_label: 'Become a Founding Partner',
    cta1_href: '/get-involved',
    cta2_label: 'Sponsor a Child',
    cta2_href: '/get-involved',
  },
  {
    image: '/hero2.png',
    tag: 'Literacy for All',
    headline: 'Turning Pages, Changing Lives',
    sub: '87% of 10-year-olds in Sub-Saharan Africa cannot read a simple story. Together, we can change this.',
    cta1_label: 'Learn About the Crisis',
    cta1_href: '/the-problem',
    cta2_label: 'Our Solution',
    cta2_href: '/our-solution',
  },
  {
    image: '/hero3.png',
    tag: '17,000+ Children Reached',
    headline: 'A Proven Model That Works',
    sub: 'UNESCO-recognized. Mastercard Foundation-backed. 700,000+ books read by children just like yours.',
    cta1_label: 'See Our Impact',
    cta1_href: '/about',
    cta2_label: 'Join the Movement',
    cta2_href: '/get-involved',
  },
];

export const defaultStats: ImpactStat[] = [
  { value: 700000, suffix: '+', prefix: '', label: 'Books Read',        accent: '#FF6B56' },
  { value: 17000,  suffix: '+', prefix: '', label: 'Children Reached',  accent: '#FF6B56' },
  { value: 12000,  suffix: '',  prefix: '', label: 'Year-One Target',   accent: '#FF6B56' },
  { value: 35,     suffix: '',  prefix: '$', label: 'Per Child Per Year', accent: '#FF6B56' },
];

export const defaultGalleryImages: GalleryImage[] = [
  { src: '/img/about_child_bw.png',   caption: 'Children Ready to Learn', category: 'Education' },
  { src: '/img/about_learning.png',   caption: "A Teacher's Dedication",  category: 'Community' },
  { src: '/img/problem_student.png',  caption: 'Literacy Opens Doors',    category: 'Impact'    },
  { src: '/img/program_literacy.png', caption: 'Joyful Learning Moments', category: 'Impact'    },
  { src: '/img/program_digital.png',  caption: 'Every Book, A New World', category: 'Literacy'  },
  { src: '/img/program_advocacy.png', caption: 'Building Bright Futures', category: 'Education' },
];

// ─── Props ────────────────────────────────────────────────────────────────────


interface HomePageProps {
  heroSlides?: HeroSlide[];
  stats?: ImpactStat[];
  galleryImages?: GalleryImage[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  blogPosts?: any[]; // using any for blog posts to skip complex type
}

// ─── Component ────────────────────────────────────────────────────────────────
export default function HomePage({
  heroSlides = defaultHeroSlides,
  stats = defaultStats,
  galleryImages = defaultGalleryImages,
  blogPosts,
}: HomePageProps) {
  const [activeSlide, setActiveSlide] = useState(0);


  return (
    <main>
      {/* ═══════════════════════════════════════════════════════
          HERO — THREE-SLIDE CAROUSEL
      ═══════════════════════════════════════════════════════ */}
      <section className="relative h-screen min-h-[600px]">
        <Swiper
          modules={[Autoplay, Pagination, EffectFade]}
          effect="fade"
          autoplay={{ delay: 6000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          loop
          onSlideChange={(s) => setActiveSlide(s.realIndex)}
          className="hero-swiper h-full"
        >
          {heroSlides.map((slide, i) => (
            <SwiperSlide key={i} className="relative overflow-hidden group">
              {/* Background Image */}
              <Image
                src={slide.image}
                alt={slide.headline}
                fill
                sizes="100vw"
                quality={85}
                className="object-cover transition-transform duration-[10000ms] ease-out scale-100 group-[.swiper-slide-active]:scale-110"
                priority={i === 0}
                loading={i === 0 ? 'eager' : 'lazy'}
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-[#0a1628]/40 z-10" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#0a1628]/95 via-[#0a1628]/70 to-transparent z-10" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a1628]/80 via-transparent to-transparent z-10" />

              {/* Content */}
              <div className="relative z-20 h-full flex items-center">
                <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-6 w-full pt-20">
                  <motion.div
                    key={`slide-${i}-${activeSlide}`}
                    initial={{ opacity: 0, y: 50 }}
                    animate={activeSlide === i ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                    className="max-w-3xl"
                  >
                    {/* Tag */}
                    <motion.span
                      initial={{ opacity: 0, x: -20 }}
                      animate={activeSlide === i ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: 0.2, duration: 0.6 }}
                      className="section-tag mb-6"
                      style={{ color: '#33c4d3' }}
                    >
                      {slide.tag}
                    </motion.span>

                    {/* Headline */}
                    <motion.h1
                      initial={{ opacity: 0, y: 30 }}
                      animate={activeSlide === i ? { opacity: 1, y: 0 } : {}}
                      transition={{ delay: 0.3, duration: 0.7 }}
                      className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight"
                    >
                      {slide.headline}
                    </motion.h1>

                    {/* Subheading */}
                    <motion.p
                      initial={{ opacity: 0, y: 20 }}
                      animate={activeSlide === i ? { opacity: 1, y: 0 } : {}}
                      transition={{ delay: 0.5, duration: 0.6 }}
                      className="text-lg sm:text-xl text-white/80 mb-10 leading-relaxed max-w-xl"
                    >
                      {slide.sub}
                    </motion.p>

                    {/* Buttons */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={activeSlide === i ? { opacity: 1, y: 0 } : {}}
                      transition={{ delay: 0.7, duration: 0.5 }}
                      className="flex flex-row flex-wrap gap-3"
                    >
                      <Link href={slide.cta1_href} className="btn-primary">
                        {slide.cta1_label}
                        <ArrowRight size={18} />
                      </Link>
                      <Link href={slide.cta2_href} className="btn-outline">
                        {slide.cta2_label}
                      </Link>
                    </motion.div>
                  </motion.div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      {/* ═══════════════════════════════════════════════════════
          PARTNERS MARQUEE
      ═══════════════════════════════════════════════════════ */}
      <section className="bg-gray-50 py-10 border-b border-gray-100">
        <div className="overflow-hidden">
          <div className="marquee-track flex gap-20 whitespace-nowrap items-center w-max">
            {[1, 2, 3].map((set) => (
              <div key={set} className="flex gap-16 items-center">
                <div className="flex items-center justify-center grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300">
                  <div className="relative w-32 h-14">
                    <Image src="/img/unesco%20logo.png" alt="UNESCO" fill sizes="128px" className="object-contain" />
                  </div>
                </div>
                <div className="flex items-center justify-center grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300">
                  <div className="relative w-32 h-14">
                    <Image src="/img/world%20book%20capital%20logo.png" alt="World Book Capital" fill sizes="128px" className="object-contain" />
                  </div>
                </div>
                <div className="flex items-center justify-center grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300">
                  <div className="relative w-36 h-14">
                    <Image src="/img/Master%20card%20foundation%20.png" alt="Mastercard Foundation" fill sizes="144px" className="object-contain" />
                  </div>
                </div>
                <div className="flex items-center justify-center grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300">
                  <div className="relative w-28 h-14">
                    <Image src="/img/mest%20logo.png" alt="MEST" fill sizes="112px" className="object-contain" />
                  </div>
                </div>
                <div className="flex items-center justify-center grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300">
                  <div className="relative w-32 h-14">
                    <Image src="/img/perbicubs%20logo.png" alt="PerbiCubs Foundation" fill sizes="128px" className="object-contain" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          THE PROBLEM
      ═══════════════════════════════════════════════════════ */}
      <TheProblemSection />

      {/* ═══════════════════════════════════════════════════════
          OUR RESPONSE
      ═══════════════════════════════════════════════════════ */}
      <SolutionApproachSection />

      {/* ═══════════════════════════════════════════════════════
          PROVEN IMPACT
      ═══════════════════════════════════════════════════════ */}
      <ProvenImpactSection stats={stats} />

      {/* ═══════════════════════════════════════════════════════
          GALLERY
      ═══════════════════════════════════════════════════════ */}
      <GallerySection images={galleryImages} />

      {/* ═══════════════════════════════════════════════════════
          DONATION
      ═══════════════════════════════════════════════════════ */}
      <DonationSection />

      {/* ═══════════════════════════════════════════════════════
          BLOG
      ═══════════════════════════════════════════════════════ */}
      <BlogSection posts={blogPosts} />

      {/* ═══════════════════════════════════════════════════════
          CONTACT
      ═══════════════════════════════════════════════════════ */}
      <ContactSection />
    </main>
  );
}
