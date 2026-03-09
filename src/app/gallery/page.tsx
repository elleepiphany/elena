'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HorizontalScroll } from '@/components/layout/HorizontalScroll';
import { useInView } from '@/hooks/useInView';
import { useMediaQuery } from '@/hooks/useMediaQuery';

const galleryImages = [
  { src: '/images/gallery/elena-pinderhughes-hero.jpeg', alt: 'Elena Pinderhughes performing', credit: 'Photographer TBD', aspect: 'portrait' },
  { src: '/images/gallery/elena-pinderhughes-1.jpeg', alt: 'Elena Pinderhughes portrait', credit: 'Photographer TBD', aspect: 'portrait' },
  { src: '/images/gallery/elena-pinderhughes-2.jpeg', alt: 'Elena Pinderhughes editorial portrait', credit: 'Photographer TBD', aspect: 'landscape' },
  { src: '/images/gallery/elena-pinderhughes-3.jpeg', alt: 'Elena Pinderhughes portrait', credit: 'Photographer TBD', aspect: 'portrait' },
  { src: '/images/gallery/elena-pinderhughes-roster.jpeg', alt: 'Elena Pinderhughes performing with flute', credit: 'Photographer TBD', aspect: 'landscape' },
];

function GalleryPanel() {
  const { ref, isInView } = useInView({ threshold: 0.1 });
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const isMobile = useMediaQuery('(max-width: 767px)');

  return (
    <>
      <section
        ref={ref}
        className="scroll-panel relative flex items-center bg-warm-black px-6 md:px-16 lg:px-24"
        style={!isMobile ? { width: `${Math.max(100, galleryImages.length * 35)}vw` } : undefined}
        aria-label="Gallery"
      >
        <div className="w-full">
          <motion.span
            className="text-overline text-gold-muted/60 block mb-4"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
          >
            Gallery
          </motion.span>

          <motion.h1
            className="font-safira text-3xl md:text-4xl text-warm-cream mb-8 md:mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
          >
            Editorial
          </motion.h1>

          {/* Desktop: Asymmetric masonry-style layout */}
          <div className="hidden md:flex gap-6 items-start h-[70vh]">
            {galleryImages.map((img, i) => (
              <motion.button
                key={i}
                className={`
                  relative shrink-0 overflow-hidden group
                  ${img.aspect === 'portrait' ? 'w-56 md:w-72 h-full' : 'w-72 md:w-96 h-3/4'}
                  ${i % 3 === 1 ? 'self-end' : i % 3 === 2 ? 'self-center' : ''}
                `}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.2 + i * 0.1, duration: 0.8 }}
                onClick={() => setLightboxIndex(i)}
                aria-label={`View ${img.alt}`}
              >
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-[1.02]"
                  style={{ backgroundImage: `url(${img.src})` }}
                />
                <div className="absolute inset-0 bg-amber-honey/0 group-hover:bg-amber-honey/10 transition-colors duration-500 flex items-end justify-start p-4">
                  <span className="text-meta text-warm-cream/0 group-hover:text-warm-cream/60 transition-colors duration-500">
                    {img.credit}
                  </span>
                </div>
              </motion.button>
            ))}
          </div>

          {/* Mobile: Vertical stacked grid */}
          <div className="grid grid-cols-2 gap-3 md:hidden">
            {galleryImages.map((img, i) => (
              <motion.button
                key={i}
                className={`
                  relative overflow-hidden
                  ${img.aspect === 'portrait' ? 'aspect-[3/4]' : 'aspect-[4/3]'}
                  ${i === 0 ? 'col-span-2 aspect-[16/10]' : ''}
                `}
                initial={{ opacity: 0, y: 15 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.1 + i * 0.08, duration: 0.6 }}
                onClick={() => setLightboxIndex(i)}
                aria-label={`View ${img.alt}`}
              >
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url(${img.src})` }}
                />
                <div className="absolute inset-0 flex items-end p-3">
                  <span className="text-meta text-warm-cream/40">
                    {img.credit}
                  </span>
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            className="fixed inset-0 z-[60] bg-shadow-brown/95 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightboxIndex(null)}
          >
            <motion.div
              className="max-w-[90vw] max-h-[90vh] relative"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div
                className="w-[90vw] h-[70vh] md:w-[80vw] md:h-[80vh] bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: `url(${galleryImages[lightboxIndex].src})` }}
              />
              <p className="text-meta text-warm-cream/40 mt-4 text-center">
                {galleryImages[lightboxIndex].credit}
              </p>
            </motion.div>

            {/* Nav arrows */}
            {lightboxIndex > 0 && (
              <button
                className="absolute left-4 md:left-8 text-warm-cream/40 hover:text-warm-cream text-2xl transition-colors"
                onClick={(e) => { e.stopPropagation(); setLightboxIndex(lightboxIndex - 1); }}
                aria-label="Previous image"
              >
                &larr;
              </button>
            )}
            {lightboxIndex < galleryImages.length - 1 && (
              <button
                className="absolute right-4 md:right-8 text-warm-cream/40 hover:text-warm-cream text-2xl transition-colors"
                onClick={(e) => { e.stopPropagation(); setLightboxIndex(lightboxIndex + 1); }}
                aria-label="Next image"
              >
                &rarr;
              </button>
            )}

            <button
              className="absolute top-6 right-6 md:top-8 md:right-8 text-warm-cream/40 hover:text-warm-cream text-sm uppercase tracking-[0.2em] transition-colors"
              onClick={() => setLightboxIndex(null)}
              aria-label="Close lightbox"
            >
              Close
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default function GalleryPage() {
  return (
    <HorizontalScroll>
      <GalleryPanel />
    </HorizontalScroll>
  );
}
