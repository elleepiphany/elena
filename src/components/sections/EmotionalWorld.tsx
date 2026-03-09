'use client';

import { motion } from 'framer-motion';
import { emotionalWords } from '@/lib/constants';
import { useInView } from '@/hooks/useInView';

// Predefined positions for the constellation layout
const wordPositions = [
  { x: 10, y: 8, size: 'text-3xl md:text-5xl', rotate: -3 },
  { x: 42, y: 5, size: 'text-lg md:text-2xl', rotate: 2 },
  { x: 62, y: 10, size: 'text-sm md:text-lg', rotate: -1 },
  { x: 10, y: 22, size: 'text-sm md:text-lg', rotate: 1 },
  { x: 30, y: 20, size: 'text-xl md:text-3xl', rotate: -2 },
  { x: 48, y: 24, size: 'text-2xl md:text-4xl', rotate: 3 },
  { x: 66, y: 22, size: 'text-sm md:text-xl', rotate: -1 },
  { x: 14, y: 35, size: 'text-xl md:text-3xl', rotate: 2 },
  { x: 38, y: 33, size: 'text-sm md:text-lg', rotate: -3 },
  { x: 56, y: 37, size: 'text-lg md:text-2xl', rotate: 1 },
  { x: 8, y: 47, size: 'text-2xl md:text-4xl', rotate: -2 },
  { x: 32, y: 46, size: 'text-sm md:text-xl', rotate: 3 },
  { x: 48, y: 50, size: 'text-xl md:text-3xl', rotate: -1 },
  { x: 65, y: 45, size: 'text-sm md:text-lg', rotate: 2 },
  { x: 14, y: 58, size: 'text-lg md:text-2xl', rotate: -3 },
  { x: 36, y: 60, size: 'text-2xl md:text-4xl', rotate: 1 },
  { x: 58, y: 57, size: 'text-sm md:text-xl', rotate: -2 },
  { x: 10, y: 70, size: 'text-xl md:text-3xl', rotate: 3 },
  { x: 30, y: 72, size: 'text-sm md:text-lg', rotate: -1 },
  { x: 46, y: 69, size: 'text-lg md:text-2xl', rotate: 2 },
  { x: 60, y: 71, size: 'text-xl md:text-3xl', rotate: -3 },
  { x: 20, y: 80, size: 'text-sm md:text-xl', rotate: 1 },
  { x: 40, y: 82, size: 'text-lg md:text-2xl', rotate: -2 },
  { x: 54, y: 78, size: 'text-3xl md:text-5xl', rotate: 3 },
  { x: 34, y: 12, size: 'text-2xl md:text-4xl', rotate: -1 },
];

export function EmotionalWorld() {
  const { ref, isInView } = useInView({ threshold: 0.1 });

  return (
    <section
      ref={ref}
      className="scroll-panel relative flex items-start justify-center overflow-hidden"
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
                absolute font-heading italic select-none cursor-none
                ${pos.size}
                text-gold-muted
              `}
              style={{
                left: `${pos.x}%`,
                top: `${pos.y}%`,
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? {
                opacity: item.highlighted ? 0.9 : 0.25 + (i % 5) * 0.06,
                y: 0,
              } : {}}
              whileHover={{
                opacity: 1,
                scale: 1.08,
                textShadow: '0 0 20px rgba(201, 169, 110, 0.6)',
                transition: { duration: 0.3 },
              }}
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
              ${item.highlighted ? 'text-gold-muted text-2xl' : 'text-gold-muted text-base'}
            `}
            initial={{ opacity: 0, y: 15 }}
            animate={isInView ? {
              opacity: item.highlighted ? 0.9 : 0.35 + (i % 5) * 0.06,
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
