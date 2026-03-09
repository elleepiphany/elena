'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { pressFeatures } from '@/data/press';
import { useInView } from '@/hooks/useInView';
import Link from 'next/link';

export function PressQuotes() {
  const { ref, isInView } = useInView({ threshold: 0.3 });
  const quotesWithQuotes = pressFeatures.filter((p) => p.quote);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % quotesWithQuotes.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isInView, quotesWithQuotes.length]);

  return (
    <section
      ref={ref}
      className="scroll-panel relative flex items-start justify-center bg-warm-black px-8 md:px-16 lg:px-24"
      aria-label="Press"
    >
      <div className="max-w-6xl w-full text-center">
        <motion.span
          className="text-overline text-gold-muted/60 block mb-12"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.2 }}
        >
          Press
        </motion.span>

        <div className="relative min-h-[50vh] flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="absolute"
            >
              <blockquote className="font-heading italic text-xl md:text-3xl lg:text-4xl text-warm-cream/90 leading-snug whitespace-pre-line">
                &ldquo;{quotesWithQuotes[activeIndex]?.quote}&rdquo;
              </blockquote>
              <cite className="block mt-8 text-overline text-warm-cream/40 not-italic">
                {quotesWithQuotes[activeIndex]?.publication}
              </cite>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-16">
          {quotesWithQuotes.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                i === activeIndex ? 'bg-amber-honey w-6' : 'bg-warm-cream/20'
              }`}
              aria-label={`View quote ${i + 1}`}
            />
          ))}
        </div>

        <motion.div
          className="mt-12"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6 }}
        >
          <Link
            href="/press"
            className="text-overline text-warm-cream/40 hover:text-amber-honey transition-colors duration-300"
          >
            View All Press
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
