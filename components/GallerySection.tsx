'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperType } from 'swiper';
import { Autoplay, Pagination } from 'swiper/modules';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ChevronLeft, ChevronRight, X } from 'lucide-react';
import 'swiper/css';
import 'swiper/css/pagination';
import type { GalleryImage } from './HomePage';
import { defaultGalleryImages } from './HomePage';

interface GallerySectionProps {
  images?: GalleryImage[];
}

export default function GallerySection({ images = defaultGalleryImages }: GallerySectionProps) {
  const swiperRef = useRef<SwiperType | null>(null);
  const [lightbox, setLightbox] = useState<{ open: boolean; index: number }>({ open: false, index: 0 });

  const openLightbox = (index: number) => setLightbox({ open: true, index });
  const closeLightbox = () => setLightbox((prev) => ({ ...prev, open: false }));
  const prevLight = () =>
    setLightbox((prev) => ({ ...prev, index: (prev.index - 1 + images.length) % images.length }));
  const nextLight = () =>
    setLightbox((prev) => ({ ...prev, index: (prev.index + 1) % images.length }));

  return (
    <section className="py-20 lg:py-28 bg-white overflow-hidden">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.65 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 text-center"
      >
        <p className="flex items-center justify-center gap-2.5 text-[#00ABBE] text-xs font-bold uppercase tracking-widest mb-4">
          <span className="w-6 h-px bg-[#00ABBE]" />
          Our Gallery
          <span className="w-6 h-px bg-[#00ABBE]" />
        </p>
        <h2 className="text-4xl sm:text-5xl font-bold text-[#0a1628] leading-tight mb-4">
          Glimpses of <span className="text-[#00ABBE]">Impact</span>
        </h2>
        <p className="text-[#0a1628]/50 max-w-lg mx-auto text-base leading-relaxed">
          Moments that inspire—children discovering the joy of learning across Ghana.
        </p>
      </motion.div>

      {/* Centered slider + arrow buttons */}
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.15 }}
        className="relative"
      >
        {/* Prev arrow */}
        <button
          onClick={() => swiperRef.current?.slidePrev()}
          aria-label="Previous"
          className="absolute left-4 lg:left-10 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white border border-[#0a1628]/10 text-[#0a1628] shadow-md hover:bg-[#00ABBE] hover:border-[#00ABBE] hover:text-white transition-all duration-300 flex items-center justify-center"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        {/* Next arrow */}
        <button
          onClick={() => swiperRef.current?.slideNext()}
          aria-label="Next"
          className="absolute right-4 lg:right-10 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white border border-[#0a1628]/10 text-[#0a1628] shadow-md hover:bg-[#00ABBE] hover:border-[#00ABBE] hover:text-white transition-all duration-300 flex items-center justify-center"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        <Swiper
          onSwiper={(s) => (swiperRef.current = s)}
          modules={[Autoplay, Pagination]}
          slidesPerView="auto"
          centeredSlides
          spaceBetween={12}
          loop
          speed={700}
          grabCursor
          autoplay={{ delay: 3600, disableOnInteraction: false, pauseOnMouseEnter: true }}
          pagination={{ clickable: true }}
          className="gallery-home"
        >
          {images.map((img, i) => (
            <SwiperSlide key={i} onClick={() => openLightbox(i)} className="cursor-pointer">
              <div className="relative w-full h-full">
                <Image
                  src={img.src}
                  alt={img.caption}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 90vw, 65vw"
                  quality={90}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
                <div className="absolute bottom-0 inset-x-0 p-6">
                  <span className="inline-block px-2.5 py-1 rounded-full bg-[#00ABBE]/80 backdrop-blur-sm text-white text-[10px] font-bold uppercase tracking-wider mb-2">
                    {img.category}
                  </span>
                  <p className="text-white font-bold text-base leading-snug">{img.caption}</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </motion.div>

      {/* View All button */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="text-center mt-10"
      >
        <Link
          href="/gallery"
          className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#0a1628] text-white font-bold text-sm hover:bg-[#00ABBE] transition-all duration-300 group"
        >
          View All Gallery
          <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      </motion.div>

      {/* Lightbox */}
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
              {lightbox.index + 1} / {images.length}
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
                  src={images[lightbox.index].src}
                  alt={images[lightbox.index].caption}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 80vw"
                  quality={95}
                  priority
                />
              </div>
              <div className="text-center mt-5">
                <span className="inline-block px-3 py-1 rounded-full bg-[#00ABBE]/20 text-[#00ABBE] text-xs font-bold uppercase tracking-wider mb-2 border border-[#00ABBE]/30">
                  {images[lightbox.index].category}
                </span>
                <p className="text-white font-bold text-lg mt-1">{images[lightbox.index].caption}</p>
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
    </section>
  );
}
