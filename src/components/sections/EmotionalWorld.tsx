'use client';

import { motion } from 'framer-motion';
import { emotionalWords } from '@/lib/constants';
import { useInView } from '@/hooks/useInView';

// Predefined positions for the constellation layout
const wordPositions = [
  { x: 15, y: 12, size: 'text-3xl md:text-5xl', rotate: -3 },
  { x: 55, y: 8, size: 'text-lg md:text-2xl', rotate: 2 },
  { x: 78, y: 15, size: 'text-sm md:text-lg', rotate: -1 },
  { x: 8, y: 28, size: 'text-sm md:text-lg', rotate: 1 },
  { x: 35, y: 25, size: 'text-xl md:text-3xl', rotate: -2 },
  { x: 62, y: 30, size: 'text-2xl md:text-4xl', rotate: 3 },
  { x: 88, y: 28, size: 'text-sm md:text-xl', rotate: -1 },
  { x: 20, y: 42, size: 'text-xl md:text-3xl', rotate: 2 },
  { x: 48, y: 40, size: 'text-sm md:text-lg', rotate: -3 },
  { x: 72, y: 45, size: 'text-lg md:text-2xl', rotate: 1 },
  { x: 5, y: 55, size: 'text-2xl md:text-4xl', rotate: -2 },
  { x: 38, y: 55, size: 'text-sm md:text-xl', rotate: 3 },
  { x: 60, y: 58, size: 'text-xl md:text-3xl', rotate: -1 },
  { x: 85, y: 55, size: 'text-sm md:text-lg', rotate: 2 },
  { x: 18, y: 68, size: 'text-lg md:text-2xl', rotate: -3 },
  { x: 45, y: 70, size: 'text-2xl md:text-4xl', rotate: 1 },
  { x: 75, y: 68, size: 'text-sm md:text-xl', rotate: -2 },
  { x: 10, y: 80, size: 'text-xl md:text-3xl', rotate: 3 },
  { x: 35, y: 82, size: 'text-sm md:text-lg', rotate: -1 },
  { x: 58, y: 78, size: 'text-lg md:text-2xl', rotate: 2 },
  { x: 82, y: 80, size: 'text-xl md:text-3xl', rotate: -3 },
  { x: 25, y: 90, size: 'text-sm md:text-xl', rotate: 1 },
  { x: 50, y: 92, size: 'text-lg md:text-2xl', rotate: -2 },
  { x: 70, y: 88, size: 'text-3xl md:text-5xl', rotate: 3 },
  { x: 42, y: 15, size: 'text-2xl md:text-4xl', rotate: -1 },
];

export function EmotionalWorld() {
  const { ref, isInView } = useInView({ threshold: 0.1 });

  return (
    <section
      ref={ref}
      className="scroll-panel relative flex items-center justify-center overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, var(--midnight-violet) 0%, var(--shadow-brown) 100%)',
      }}
      aria-label="Emotional World"
    >
      {/* Desktop: absolute-positioned constellation */}
      <div className="relative w-full h-full hidden md:block">
        {emotionalWords.map((item, i) => {
          const pos = wordPositions[i % wordPositions.length];
          return (
            <motion.span
              key={item.word}
              className={`
                absolute font-heading italic select-none
                ${pos.size}
                ${item.highlighted
                  ? 'text-gold-muted'
                  : 'text-warm-cream/20'
                }
              `}
              style={{
                left: `${pos.x}%`,
                top: `${pos.y}%`,
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? {
                opacity: item.highlighted ? 0.9 : 0.15 + Math.random() * 0.15,
                y: 0,
              } : {}}
              transition={{
                duration: 0.8,
                delay: i * 0.06,
                ease: [0.22, 1, 0.36, 1],
              }}
              whileInView={{
                y: [0, -5 + Math.random() * 10, 0],
                transition: {
                  duration: 4 + Math.random() * 4,
                  repeat: Infinity,
                  ease: 'easeInOut',
                },
              }}
            >
              {item.word}
            </motion.span>
          );
        })}
      </div>

      {/* Mobile: flowing word cloud */}
      <div className="flex flex-wrap justify-center items-center gap-x-4 gap-y-3 px-4 md:hidden">
        {emotionalWords.map((item, i) => (
          <motion.span
            key={item.word}
            className={`
              font-heading italic select-none
              ${item.highlighted ? 'text-gold-muted text-2xl' : 'text-warm-cream/20 text-base'}
            `}
            initial={{ opacity: 0, y: 15 }}
            animate={isInView ? {
              opacity: item.highlighted ? 0.9 : 0.2,
              y: 0,
            } : {}}
            transition={{
              duration: 0.6,
              delay: i * 0.04,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {item.word}
          </motion.span>
        ))}
      </div>
    </section>
  );
}
