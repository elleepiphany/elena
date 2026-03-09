'use client';

import { motion } from 'framer-motion';
import { NameLockup } from '@/components/brand/NameLockup';
import { EtherealShadow } from '@/components/ui/EtherealShadow';

export function HeroSection() {
  return (
    <section
      className="scroll-panel relative flex items-end justify-center bg-shadow-brown"
      aria-label="Hero"
    >
      {/* Hero Image with Ken Burns effect */}
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1.05 }}
        animate={{ scale: 1 }}
        transition={{ duration: 20, ease: 'linear', repeat: Infinity, repeatType: 'reverse' }}
      >
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url(/images/hero/elena-pinderhughes-hero.jpeg)',
          }}
        />
      </motion.div>

      {/* Warm gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-shadow-brown/80 via-shadow-brown/30 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-shadow-brown/60 via-transparent to-shadow-brown/20" />

      {/* Ethereal shadow atmospheric layer */}
      <div className="absolute inset-0 z-[5] pointer-events-none opacity-60">
        <EtherealShadow
          color="rgba(139, 38, 21, 0.85)"
          animation={{ scale: 60, speed: 40 }}
          noise={{ opacity: 0.4, scale: 1 }}
          sizing="fill"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 px-6 pb-24 pt-24 md:p-16 lg:p-24 md:pb-24 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          <NameLockup size="hero" />
        </motion.div>

        <motion.p
          className="font-heading italic text-warm-cream/70 text-base md:text-xl mt-4 md:mt-6 tracking-[0.05em]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          Flutist. Vocalist. Composer.
        </motion.p>

        {/* Scroll hint */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
        >
          <span className="text-meta text-warm-cream/30">Scroll</span>
          <motion.div
            className="w-[1px] h-8 bg-warm-cream/20"
            animate={{ scaleY: [0, 1, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            style={{ transformOrigin: 'top' }}
          />
        </motion.div>
      </div>
    </section>
  );
}
