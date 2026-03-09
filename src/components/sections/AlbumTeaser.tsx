'use client';

import { motion } from 'framer-motion';
import { useInView } from '@/hooks/useInView';
import { Button } from '@/components/ui/Button';
import { DSPLinks } from '@/components/ui/DSPLinks';
import { SmokeBackground } from '@/components/ui/SmokeBackground';
import { safiraMarch } from '@/lib/fonts';

export function AlbumTeaser() {
  const { ref, isInView } = useInView({ threshold: 0.3 });

  return (
    <section
      ref={ref}
      className="scroll-panel relative flex items-start bg-warm-black px-8 md:px-16 lg:px-24 overflow-hidden"
      aria-label="Debut Album"
    >
      {/* Smoke animation background — sunset tones to match album artwork */}
      <div className="absolute inset-0 opacity-50">
        <SmokeBackground smokeColor="#E07020" />
      </div>

      <div className="relative z-10 flex flex-col md:flex-row items-center gap-12 md:gap-20 w-full max-w-6xl mx-auto">
        {/* Album Artwork */}
        <motion.div
          className="w-72 h-72 md:w-96 md:h-96 relative shrink-0 overflow-hidden"
          initial={{ opacity: 0, x: -40 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: 'url(/images/album/ihyfit.jpg)' }}
          />
          <div className="absolute inset-0 border border-gold-muted/20" />
        </motion.div>

        {/* Album Info */}
        <motion.div
          className="flex flex-col gap-6 text-center md:text-left"
          initial={{ opacity: 0, x: 40 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="text-overline text-gold-muted">Debut Album</span>

          <h2 className={`${safiraMarch.className} text-4xl md:text-5xl lg:text-6xl text-warm-cream`}>
            IHYFIT
          </h2>

          <p className="text-meta text-warm-cream/40">Coming 2026</p>

          <p className="font-heading italic text-warm-cream/60 text-lg max-w-md leading-relaxed">
            A debut album weaving together flute, voice, and songwriting into a
            singular statement of artistry — intimate, expansive, and entirely her own.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 mt-2">
            <Button variant="primary" size="md" href="#">
              Pre-Save
            </Button>
            <Button variant="secondary" size="md" href="#">
              Listen Now
            </Button>
          </div>

          <DSPLinks className="mt-4 justify-center md:justify-start" />
        </motion.div>
      </div>
    </section>
  );
}
