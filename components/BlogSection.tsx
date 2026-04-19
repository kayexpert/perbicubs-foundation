'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import { ArrowRight } from 'lucide-react';
import { blogPosts as staticBlogPosts } from '@/lib/blogData';
import type { BlogPost } from './HomePage';
import 'swiper/css';
import 'swiper/css/pagination';

const CYCLE_MS = 3800;

interface BlogSectionProps {
  posts?: BlogPost[];
}

export default function BlogSection({ posts }: BlogSectionProps) {
  // Use DB posts if provided, else fall back to static lib/blogData
  const displayPosts: BlogPost[] = posts && posts.length > 0
    ? posts
    : staticBlogPosts.map((p) => ({
        slug: p.slug,
        title: p.title,
        excerpt: p.excerpt,
        body: p.body,
        category: p.category,
        date: p.date,
        read_time: p.readTime,
        image: p.image,
        author: p.author,
        author_role: p.authorRole,
      }));

  const [activeIdx, setActiveIdx] = useState(0);
  const [paused, setPaused] = useState(false);
  const [tickKey, setTickKey] = useState(0);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => {
      setActiveIdx((p) => (p + 1) % displayPosts.length);
      setTickKey((k) => k + 1);
    }, CYCLE_MS);
    return () => clearInterval(id);
  }, [paused, displayPosts.length]);

  const activate = (i: number) => {
    setActiveIdx(i);
    setPaused(true);
    setTickKey((k) => k + 1);
  };

  return (
    <section className="bg-white">
      {/* ── Section header ── */}
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-6 pt-20 lg:pt-28 pb-12">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-6"
        >
          <div>
            <p className="flex items-center gap-2.5 text-[#00ABBE] text-xs font-bold uppercase tracking-widest mb-4">
              <span className="w-6 h-px bg-[#00ABBE]" />
              News &amp; Insights
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0a1628] leading-tight">
              Stories of <span className="text-[#00ABBE]">Change</span>
            </h2>
          </div>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-[#00ABBE] font-bold text-sm hover:gap-3 transition-all duration-300 flex-shrink-0"
          >
            View All Articles <ArrowRight size={16} />
          </Link>
        </motion.div>
      </div>

      {/* ── Desktop: accordion expand panels ── */}
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.7, delay: 0.1 }}
        className="hidden md:flex h-[460px] lg:h-[520px] overflow-hidden"
        onMouseLeave={() => setPaused(false)}
      >
        {displayPosts.map((post, i) => {
          const isActive = i === activeIdx;
          return (
            <div
              key={post.slug}
              onMouseEnter={() => activate(i)}
              className="relative overflow-hidden cursor-pointer"
              style={{
                flex: isActive ? 3.5 : 1,
                minWidth: isActive ? 0 : '90px',
                transition: 'flex 0.55s cubic-bezier(0.4,0,0.2,1), min-width 0.55s',
              }}
            >
              {/* Background image */}
              <Image
                src={post.image}
                alt={post.title}
                fill
                className="object-cover"
                style={{
                  transform: isActive ? 'scale(1.06)' : 'scale(1)',
                  transition: 'transform 0.7s ease',
                  filter: isActive ? 'none' : 'grayscale(0.4)',
                }}
                sizes="50vw"
              />

              {/* Gradient overlay */}
              <div
                className="absolute inset-0"
                style={{
                  background: isActive
                    ? 'linear-gradient(to top, #0a1628 0%, rgba(10,22,40,0.75) 40%, rgba(10,22,40,0.3) 70%, transparent 100%)'
                    : 'linear-gradient(to top, rgba(10,22,40,0.9) 0%, rgba(10,22,40,0.65) 100%)',
                  transition: 'background 0.5s',
                }}
              />

              {/* Divider */}
              {i < displayPosts.length - 1 && (
                <div className="absolute right-0 top-0 bottom-0 w-px bg-white/10 z-10" />
              )}

              {/* Content */}
              <div className="absolute inset-x-0 bottom-0 z-10 p-5 lg:p-8">
                {/* Category */}
                <span
                  className="block text-xs font-bold uppercase tracking-widest mb-3 transition-colors duration-500"
                  style={{ color: isActive ? '#00ABBE' : 'rgba(255,255,255,0.45)' }}
                >
                  {post.category}
                </span>

                {/* Excerpt */}
                <div
                  style={{
                    maxHeight: isActive ? '90px' : '0px',
                    opacity: isActive ? 1 : 0,
                    marginBottom: isActive ? '12px' : '0',
                    overflow: 'hidden',
                    transition: 'max-height 0.5s ease, opacity 0.4s ease, margin-bottom 0.5s ease',
                  }}
                >
                  <p className="text-white/70 text-sm leading-relaxed line-clamp-3">
                    {post.excerpt}
                  </p>
                </div>

                {/* Title */}
                <h3
                  className="text-white font-extrabold uppercase tracking-wider leading-snug transition-all duration-500"
                  style={{ fontSize: isActive ? '1.2rem' : '0.78rem' }}
                >
                  {post.title}
                </h3>

                {/* CTA button */}
                <div
                  style={{
                    maxHeight: isActive ? '56px' : '0px',
                    opacity: isActive ? 1 : 0,
                    marginTop: isActive ? '14px' : '0',
                    overflow: 'hidden',
                    transition: 'max-height 0.5s ease 0.1s, opacity 0.4s ease 0.1s, margin-top 0.5s ease',
                  }}
                >
                  <Link
                    href={`/blog/${post.slug}`}
                    className="inline-flex items-center gap-2 bg-[#00ABBE] hover:bg-[#0097a6] text-white px-6 py-2.5 rounded-full text-sm font-bold transition-colors"
                  >
                    Read More <ArrowRight size={14} />
                  </Link>
                </div>
              </div>

              {/* Auto-play progress bar */}
              {isActive && (
                <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-white/10 z-20 overflow-hidden">
                  <div
                    key={`${tickKey}-${i}`}
                    className="h-full bg-[#00ABBE]"
                    style={{
                      animation: paused
                        ? 'none'
                        : `blogProgress ${CYCLE_MS}ms linear forwards`,
                    }}
                  />
                </div>
              )}
            </div>
          );
        })}
      </motion.div>

      {/* ── Mobile: full-card Swiper carousel ── */}
      <div className="md:hidden pb-16">
        <Swiper
          modules={[Autoplay, Pagination]}
          slidesPerView={1.08}
          spaceBetween={12}
          centeredSlides
          autoplay={{ delay: 4200, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          loop
          className="blog-mobile-swiper px-4"
        >
          {displayPosts.map((post) => (
            <SwiperSlide key={post.slug} className="pb-10">
              <div className="relative h-[380px] rounded-2xl overflow-hidden shadow-xl">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover"
                  sizes="95vw"
                />
                <div
                  className="absolute inset-0"
                  style={{ background: 'linear-gradient(to top, #0a1628 0%, rgba(10,22,40,0.75) 50%, rgba(10,22,40,0.2) 100%)' }}
                />
                <div className="absolute inset-x-0 bottom-0 p-6">
                  <span className="text-[#00ABBE] text-xs font-bold uppercase tracking-widest block mb-2">
                    {post.category}
                  </span>
                  <h3 className="text-white font-extrabold text-lg uppercase tracking-wide leading-snug mb-3">
                    {post.title}
                  </h3>
                  <p className="text-white/70 text-sm leading-relaxed mb-4 line-clamp-2">
                    {post.excerpt}
                  </p>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="inline-flex items-center gap-2 bg-[#00ABBE] hover:bg-[#0097a6] text-white px-5 py-2.5 rounded-full text-sm font-bold transition-colors"
                  >
                    Read More <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div className="hidden md:block pb-20 lg:pb-28" />
    </section>
  );
}
