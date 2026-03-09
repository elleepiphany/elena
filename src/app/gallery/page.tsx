'use client';

import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { HorizontalScroll } from '@/components/layout/HorizontalScroll';
import { useInView } from '@/hooks/useInView';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { safiraMarch } from '@/lib/fonts';

const galleryImages = [
  { src: '/images/gallery/ep1.avif', alt: 'Elena Pinderhughes portrait', credit: 'Photographer TBD', aspect: 'portrait', bgPos: 'center' },
  { src: '/images/gallery/ep2.avif', alt: 'Elena Pinderhughes editorial', credit: 'Photographer TBD', aspect: 'landscape', bgPos: 'center' },
  { src: '/images/gallery/ep5.avif', alt: 'Elena Pinderhughes with flute', credit: 'Photographer TBD', aspect: 'portrait', bgPos: 'center' },
  { src: '/images/gallery/ep6.avif', alt: 'Elena Pinderhughes performing', credit: 'Photographer TBD', aspect: 'landscape', bgPos: 'top' },
  { src: '/images/gallery/ep4.avif', alt: 'Elena Pinderhughes portrait session', credit: 'Photographer TBD', aspect: 'portrait', bgPos: 'center' },
  { src: '/images/gallery/ep3.avif', alt: 'Elena Pinderhughes candid', credit: 'Photographer TBD', aspect: 'landscape', bgPos: 'center' },
  { src: '/images/gallery/ep7.avif', alt: 'Elena Pinderhughes studio portrait', credit: 'Photographer TBD', aspect: 'portrait', bgPos: 'center' },
  { src: '/images/gallery/ep8.avif', alt: 'Elena Pinderhughes close-up', credit: 'Photographer TBD', aspect: 'landscape', bgPos: 'center' },
  { src: '/images/gallery/ep9.avif', alt: 'Elena Pinderhughes on stage', credit: 'Photographer TBD', aspect: 'landscape', bgPos: 'center' },
];

const slideVariants = {
  enter: (direction: number) => ({ x: direction > 0 ? 120 : -120, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (direction: number) => ({ x: direction > 0 ? -120 : 120, opacity: 0 }),
};

function Lightbox({ index, onClose, onPrev, onNext }: {
  index: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  const [mounted, setMounted] = useState(false);
  const [direction, setDirection] = useState(0);

  useEffect(() => { setMounted(true); }, []);

  // Block wheel + keyboard from reaching the horizontal scroll engine
  useEffect(() => {
    const blockWheel = (e: WheelEvent) => { e.preventDefault(); e.stopPropagation(); };
    const blockKeys = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        e.preventDefault(); e.stopPropagation();
        if (index < galleryImages.length - 1) { setDirection(1); onNext(); }
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault(); e.stopPropagation();
        if (index > 0) { setDirection(-1); onPrev(); }
      } else if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('wheel', blockWheel, { passive: false, capture: true });
    window.addEventListener('keydown', blockKeys, { capture: true });
    return () => {
      window.removeEventListener('wheel', blockWheel, { capture: true });
      window.removeEventListener('keydown', blockKeys, { capture: true });
    };
  }, [index, onClose, onPrev, onNext]);

  if (!mounted) return null;

  const img = galleryImages[index];

  const handlePrev = (e: React.MouseEvent) => { e.stopPropagation(); setDirection(-1); onPrev(); };
  const handleNext = (e: React.MouseEvent) => { e.stopPropagation(); setDirection(1); onNext(); };

  return createPortal(
    <motion.div
      className="fixed inset-0 z-[60] bg-shadow-brown/95 flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <div className="max-w-[90vw] max-h-[90vh] relative overflow-hidden">
        <AnimatePresence mode="popLayout" custom={direction}>
          <motion.div
            key={index}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className="w-[90vw] h-[80vh] md:w-[80vw] md:h-[85vh] bg-contain bg-center bg-no-repeat"
              style={{ backgroundImage: `url(${img.src})` }}
            />
            <p className="text-meta text-warm-cream/40 mt-4 text-center">
              {img.credit}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Nav arrows */}
      {index > 0 && (
        <button
          className="absolute left-4 md:left-8 text-warm-cream/40 hover:text-warm-cream text-2xl transition-colors"
          onClick={handlePrev}
          aria-label="Previous image"
        >
          &larr;
        </button>
      )}
      {index < galleryImages.length - 1 && (
        <button
          className="absolute right-4 md:right-8 text-warm-cream/40 hover:text-warm-cream text-2xl transition-colors"
          onClick={handleNext}
          aria-label="Next image"
        >
          &rarr;
        </button>
      )}

      <button
        className="absolute top-6 right-6 md:top-8 md:right-8 text-warm-cream/40 hover:text-warm-cream text-sm uppercase tracking-[0.2em] transition-colors"
        onClick={onClose}
        aria-label="Close lightbox"
      >
        Close
      </button>
    </motion.div>,
    document.body
  );
}

function GalleryPanel() {
  const { ref, isInView } = useInView({ threshold: 0.1 });
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const isMobile = useMediaQuery('(max-width: 767px)');

  return (
    <>
      <section
        ref={ref}
        className="scroll-panel relative flex items-start bg-warm-black px-6 md:px-16 lg:px-24"
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
            className={`${safiraMarch.className} text-3xl md:text-4xl text-warm-cream mb-8 md:mb-12`}
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
                  className="absolute inset-0 bg-cover transition-transform duration-700 group-hover:scale-[1.02]"
                  style={{ backgroundImage: `url(${img.src})`, backgroundPosition: img.bgPos }}
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
                  className="absolute inset-0 bg-cover"
                  style={{ backgroundImage: `url(${img.src})`, backgroundPosition: img.bgPos }}
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

      {/* Lightbox — portaled to document.body so it escapes the transformed scroll container */}
      {lightboxIndex !== null && (
        <Lightbox
          index={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onPrev={() => setLightboxIndex(lightboxIndex - 1)}
          onNext={() => setLightboxIndex(lightboxIndex + 1)}
        />
      )}
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
