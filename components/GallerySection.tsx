'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperType } from 'swiper';
import { Autoplay } from 'swiper/modules';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';
import 'swiper/css';
import type { GalleryImage } from './HomePage';
import { defaultGalleryImages } from './HomePage';

interface GallerySectionProps {
  images?: GalleryImage[];
}

export default function GallerySection({ images: rawImages = defaultGalleryImages }: GallerySectionProps) {
  // Triple to guarantee Swiper has enough clones for seamless infinite loop at slidesPerView 5
  const images = [...rawImages, ...rawImages, ...rawImages];

  const swiperRef = useRef<SwiperType | null>(null);
  const [lightbox, setLightbox] = useState<{ open: boolean; index: number }>({
    open: false,
    index: 0,
  });

  const openLightbox = (index: number) => setLightbox({ open: true, index });
  const closeLightbox = () => setLightbox((prev) => ({ ...prev, open: false }));

  const prevLight = () =>
    setLightbox((prev) => ({
      ...prev,
      index: (prev.index - 1 + images.length) % images.length,
    }));

  const nextLight = () =>
    setLightbox((prev) => ({
      ...prev,
      index: (prev.index + 1) % images.length,
    }));

  return (
    <section className="py-16 lg:py-24 bg-white overflow-hidden">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.65 }}
        className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-6 mb-14 text-center"
      >
        <p className="flex items-center justify-center gap-2.5 text-[#00ABBE] text-xs font-bold uppercase tracking-widest mb-4">
          <span className="w-6 h-px bg-[#00ABBE]" />
          Our Gallery
          <span className="w-6 h-px bg-[#00ABBE]" />
        </p>
        <h2 className="text-3xl sm:text-4xl font-bold text-[#0a1628] leading-tight">
          Glimpses of <span className="text-[#00ABBE]">Impact</span>
        </h2>
      </motion.div>

      {/* Full-width variable-height carousel */}
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.7, delay: 0.15 }}
        className="relative"
      >
        {/* Left arrow */}
        <button
          onClick={() => swiperRef.current?.slidePrev()}
          className="absolute left-3 lg:left-5 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white shadow-lg hover:bg-[#00ABBE] hover:text-white text-[#0a1628] flex items-center justify-center transition-all"
          aria-label="Previous"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        {/* Right arrow */}
        <button
          onClick={() => swiperRef.current?.slideNext()}
          className="absolute right-3 lg:right-5 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white shadow-lg hover:bg-[#00ABBE] hover:text-white text-[#0a1628] flex items-center justify-center transition-all"
          aria-label="Next"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

      <Swiper
        onSwiper={(s) => (swiperRef.current = s)}
        modules={[Autoplay]}
        slidesPerView={5}
        centeredSlides
        spaceBetween={10}
        breakpoints={{
          0:    { slidesPerView: 1.1, spaceBetween: 12 },
          640:  { slidesPerView: 3, spaceBetween: 10 },
          1024: { slidesPerView: 5, spaceBetween: 12 },
        }}
        autoplay={{ delay: 3200, disableOnInteraction: false, pauseOnMouseEnter: true }}
        loop
        speed={650}
        grabCursor
        initialSlide={3}
        className="gallery-v2 w-full"
      >
        {images.map((img, i) => (
          <SwiperSlide
            key={`slide-${i}`}
            className="cursor-pointer"
            onClick={() => openLightbox(i)}
          >
            {/* inner div fills the slide height set by CSS */}
            <div className="relative w-full h-full">
              <Image
                src={img.src}
                alt={img.caption}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 90vw, (max-width: 1024px) 40vw, 22vw"
                quality={90}
              />
              {/* Bottom info bar */}
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent pt-12 pb-3 px-3">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 min-w-0">
                    <div className="w-7 h-7 rounded-full bg-white/20 border border-white/30 backdrop-blur-sm flex items-center justify-center flex-shrink-0">
                      <ZoomIn size={12} className="text-white" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-white font-bold text-[11px] leading-tight truncate">{img.caption}</p>
                      <p className="text-white/55 text-[9px] mt-0.5">{img.category}</p>
                    </div>
                  </div>
                  <div className="w-7 h-7 rounded-full bg-[#00ABBE] flex items-center justify-center flex-shrink-0">
                    <ChevronRight size={11} className="text-white" />
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      </motion.div>

      {/* ── Lightbox ── */}
      <AnimatePresence>
        {lightbox.open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 bg-black/92 z-50 flex items-center justify-center"
            onClick={closeLightbox}
          >
            {/* Close */}
            <button
              onClick={closeLightbox}
              className="absolute top-5 right-5 w-10 h-10 rounded-full bg-white/10 hover:bg-white/25 text-white flex items-center justify-center transition-colors z-10"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Prev */}
            <button
              onClick={(e) => { e.stopPropagation(); prevLight(); }}
              className="absolute left-3 sm:left-7 w-12 h-12 rounded-full bg-white/10 hover:bg-[#00ABBE] text-white flex items-center justify-center transition-colors z-10"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Image */}
            <motion.div
              key={lightbox.index}
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92 }}
              transition={{ duration: 0.25 }}
              className="relative w-full max-w-4xl mx-14 sm:mx-20"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src={images[lightbox.index].src}
                  alt={images[lightbox.index].caption}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 80vw"
                  quality={90}
                  priority
                />
              </div>
              <div className="text-center mt-5">
                <p className="text-white font-bold text-lg">{images[lightbox.index].caption}</p>
                <p className="text-white/50 text-sm mt-1">{images[lightbox.index].category}</p>
              </div>
            </motion.div>

            {/* Next */}
            <button
              onClick={(e) => { e.stopPropagation(); nextLight(); }}
              className="absolute right-3 sm:right-7 w-12 h-12 rounded-full bg-white/10 hover:bg-[#00ABBE] text-white flex items-center justify-center transition-colors z-10"
              aria-label="Next image"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Dot indicators */}
            <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2">
              {images.map((_, i) => (
                <button
                  key={i}
                  onClick={(e) => { e.stopPropagation(); setLightbox((prev) => ({ ...prev, index: i })); }}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    i === lightbox.index ? 'bg-[#00ABBE] w-6' : 'bg-white/30 w-2 hover:bg-white/60'
                  }`}
                  aria-label={`Go to image ${i + 1}`}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
