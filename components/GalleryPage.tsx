'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';
import type { GalleryImage } from './HomePage';
import { defaultGalleryImages } from './HomePage';

interface GalleryPageProps {
  images?: GalleryImage[];
}

export default function GalleryPage({ images: rawImages = defaultGalleryImages }: GalleryPageProps) {
  const categories = [
    'All',
    ...Array.from(new Set(rawImages.map((img) => img.category).filter(Boolean) as string[])),
  ];

  const [activeCategory, setActiveCategory] = useState('All');
  const [lightbox, setLightbox] = useState<{ open: boolean; index: number }>({ open: false, index: 0 });

  const filtered =
    activeCategory === 'All' ? rawImages : rawImages.filter((img) => img.category === activeCategory);

  const openLightbox = (index: number) => setLightbox({ open: true, index });
  const closeLightbox = () => setLightbox((prev) => ({ ...prev, open: false }));
  const prevLight = () =>
    setLightbox((prev) => ({ ...prev, index: (prev.index - 1 + filtered.length) % filtered.length }));
  const nextLight = () =>
    setLightbox((prev) => ({ ...prev, index: (prev.index + 1) % filtered.length }));

  return (
    <>
      {/* ── Page Hero ── */}
      <section className="relative pt-40 pb-20 bg-[#0a1628] overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(0,171,190,0.15),transparent_60%)]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
            className="flex items-center justify-center gap-2.5 text-[#00ABBE] text-xs font-bold uppercase tracking-widest mb-4"
          >
            <span className="w-6 h-px bg-[#00ABBE]" />
            Photo Gallery
            <span className="w-6 h-px bg-[#00ABBE]" />
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.08 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-5"
          >
            Our <span className="text-[#00ABBE]">Gallery</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.16 }}
            className="text-white/55 max-w-xl mx-auto text-base leading-relaxed"
          >
            Every photograph is a story of a child given the chance to read, learn, and dream.
          </motion.p>
        </div>
      </section>

      {/* ── Grid Section ── */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Category Pills */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-wrap justify-center gap-3 mb-12"
          >
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2 rounded-full text-sm font-semibold border transition-all duration-300 ${
                  activeCategory === cat
                    ? 'bg-[#00ABBE] border-[#00ABBE] text-white'
                    : 'bg-white border-[#0a1628]/15 text-[#0a1628]/60 hover:border-[#00ABBE]/40 hover:text-[#00ABBE]'
                }`}
              >
                {cat}
              </button>
            ))}
          </motion.div>

          {/* Bento Grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-2 md:grid-cols-3 auto-rows-[180px] sm:auto-rows-[220px] lg:auto-rows-[260px] gap-3 md:gap-4"
            >
              {filtered.map((img, i) => {
                const isFeatured = i === 0;
                return (
                  <motion.div
                    key={img.src + i}
                    layout
                    initial={{ opacity: 0, scale: 0.94 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.45, delay: i * 0.07 }}
                    className={`group relative overflow-hidden rounded-2xl cursor-pointer ring-1 ring-black/5 ${
                      isFeatured ? 'col-span-2 row-span-2' : ''
                    }`}
                    onClick={() => openLightbox(i)}
                  >
                    <Image
                      src={img.src}
                      alt={img.caption}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-[1.08]"
                      sizes={isFeatured ? '(max-width: 768px) 100vw, 66vw' : '(max-width: 768px) 50vw, 33vw'}
                      quality={90}
                    />

                    {/* Base gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

                    {/* Teal hover wash */}
                    <div className="absolute inset-0 bg-[#00ABBE]/15 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    {/* Category badge */}
                    <div className="absolute top-3 left-3">
                      <span className="inline-block px-2.5 py-1 rounded-full bg-black/50 backdrop-blur-md text-white/90 text-[10px] font-bold uppercase tracking-wider border border-white/15">
                        {img.category}
                      </span>
                    </div>

                    {/* Zoom icon */}
                    <div className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center opacity-0 group-hover:opacity-100 scale-75 group-hover:scale-100 transition-all duration-300">
                      <ZoomIn size={14} className="text-white" />
                    </div>

                    {/* Caption */}
                    <div className="absolute inset-x-0 bottom-0 p-4 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                      <p className="text-white font-bold text-sm md:text-base leading-tight">{img.caption}</p>
                    </div>

                    {/* Teal ring glow */}
                    <div className="absolute inset-0 rounded-2xl ring-2 ring-inset ring-[#00ABBE]/0 group-hover:ring-[#00ABBE]/55 transition-all duration-300" />
                  </motion.div>
                );
              })}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* ── Lightbox ── */}
      <AnimatePresence>
        {lightbox.open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center backdrop-blur-sm"
            onClick={closeLightbox}
          >
            {/* Counter */}
            <div className="absolute top-5 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-white/10 text-white/70 text-sm font-medium backdrop-blur-sm border border-white/10">
              {lightbox.index + 1} / {filtered.length}
            </div>

            {/* Close */}
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 hover:bg-[#00ABBE] text-white flex items-center justify-center transition-colors z-10 border border-white/10"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Prev */}
            <button
              onClick={(e) => { e.stopPropagation(); prevLight(); }}
              className="absolute left-3 sm:left-6 w-12 h-12 rounded-full bg-white/10 hover:bg-[#00ABBE] text-white flex items-center justify-center transition-colors z-10 border border-white/10"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Image */}
            <motion.div
              key={lightbox.index}
              initial={{ opacity: 0, scale: 0.93 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.93 }}
              transition={{ duration: 0.25 }}
              className="relative w-full max-w-5xl mx-16 sm:mx-24"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden ring-1 ring-white/10 shadow-2xl">
                <Image
                  src={filtered[lightbox.index].src}
                  alt={filtered[lightbox.index].caption}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 80vw"
                  quality={95}
                  priority
                />
              </div>
              <div className="text-center mt-5">
                <span className="inline-block px-3 py-1 rounded-full bg-[#00ABBE]/20 text-[#00ABBE] text-xs font-bold uppercase tracking-wider mb-2 border border-[#00ABBE]/30">
                  {filtered[lightbox.index].category}
                </span>
                <p className="text-white font-bold text-lg mt-1">{filtered[lightbox.index].caption}</p>
              </div>
            </motion.div>

            {/* Next */}
            <button
              onClick={(e) => { e.stopPropagation(); nextLight(); }}
              className="absolute right-3 sm:right-6 w-12 h-12 rounded-full bg-white/10 hover:bg-[#00ABBE] text-white flex items-center justify-center transition-colors z-10 border border-white/10"
              aria-label="Next image"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
