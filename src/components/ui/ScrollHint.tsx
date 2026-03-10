'use client';

import { motion } from 'framer-motion';

interface ScrollHintProps {
  /** Position: bottom-right on desktop, bottom-center on mobile */
  className?: string;
}

export function ScrollHint({ className = '' }: ScrollHintProps) {
  return (
    <motion.div
      className={`absolute z-10 flex flex-col items-center gap-2 bottom-6 left-1/2 -translate-x-1/2 md:left-auto md:translate-x-0 md:right-6 lg:right-8 ${className}`}
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
  );
}
