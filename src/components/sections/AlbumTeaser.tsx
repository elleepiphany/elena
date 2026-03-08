'use client';

import { motion } from 'framer-motion';
import { useInView } from '@/hooks/useInView';
import { Button } from '@/components/ui/Button';
import { DSPLinks } from '@/components/ui/DSPLinks';

export function AlbumTeaser() {
  const { ref, isInView } = useInView({ threshold: 0.3 });

  return (
    <section
      ref={ref}
      className="scroll-panel relative flex items-center bg-warm-black px-8 md:px-16 lg:px-24"
      aria-label="Debut Album"
    >
      <div className="flex flex-col md:flex-row items-center gap-12 md:gap-20 w-full max-w-6xl mx-auto">
        {/* Album Artwork Placeholder */}
        <motion.div
          className="w-72 h-72 md:w-96 md:h-96 bg-midnight-violet/50 flex items-center justify-center relative shrink-0"
          initial={{ opacity: 0, x: -40 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="absolute inset-0 border border-gold-muted/20" />
          <span className="text-overline text-gold-muted/40">Album Artwork</span>
        </motion.div>

        {/* Album Info */}
        <motion.div
          className="flex flex-col gap-6 text-center md:text-left"
          initial={{ opacity: 0, x: 40 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="text-overline text-gold-muted">Debut Album</span>

          <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl text-warm-cream font-semibold italic">
            [Album Title]
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
