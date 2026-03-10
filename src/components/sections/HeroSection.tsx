'use client';

import { motion } from 'framer-motion';
import { NameLockup } from '@/components/brand/NameLockup';
import { EtherealShadow } from '@/components/ui/EtherealShadow';

export function HeroSection() {
  return (
    <section
      className="scroll-panel relative flex items-end justify-center overflow-hidden"
      aria-label="Hero"
      style={{ backgroundColor: '#7D4A5C' }}
    >
      {/* Hero Image with Ken Burns effect */}
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1.03 }}
        animate={{ scale: 1 }}
        transition={{ duration: 20, ease: 'linear', repeat: Infinity, repeatType: 'reverse' }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/gallery/ep10.png"
          alt="Elena Pinderhughes"
          className="absolute inset-0 w-full h-full object-cover object-top"
          fetchPriority="high"
        />
      </motion.div>

      {/* Bottom gradient only — for text legibility */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#7D4A5C]/80 via-transparent to-transparent" />

      {/* Ethereal shadow atmospheric layer */}
      <div className="absolute inset-0 z-[5] pointer-events-none opacity-[0.08]">
        <EtherealShadow
          color="rgba(125, 74, 92, 0.85)"
          animation={{ scale: 60, speed: 40 }}
          noise={{ opacity: 0.4, scale: 1 }}
          sizing="fill"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 px-6 pb-20 pt-24 md:px-16 lg:px-24 md:pb-12 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          <NameLockup size="hero" />
        </motion.div>

        <motion.p
          className="font-heading italic text-warm-cream/70 text-base md:text-lg mt-2 md:mt-3 tracking-[0.05em]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          Flutist. Vocalist. Composer.
        </motion.p>
      </div>

      {/* Scroll hint — positioned against section, not content block */}
      <motion.div
        className="absolute bottom-6 right-8 md:right-16 lg:right-24 z-10 hidden md:flex flex-col items-center gap-2"
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
    </section>
  );
}
