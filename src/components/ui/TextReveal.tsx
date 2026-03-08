'use client';

import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { useInView } from '@/hooks/useInView';

interface TextRevealProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: 'div' | 'p' | 'h1' | 'h2' | 'h3' | 'span';
}

export function TextReveal({
  children,
  delay = 0,
  className = '',
  as: Tag = 'div',
}: TextRevealProps) {
  const { ref, isInView } = useInView({ threshold: 0.2 });

  return (
    <div ref={ref} className="overflow-hidden">
      <motion.div
        initial={{ y: '100%', opacity: 0 }}
        animate={isInView ? { y: 0, opacity: 1 } : { y: '100%', opacity: 0 }}
        transition={{
          duration: 0.8,
          delay,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        <Tag className={className}>{children}</Tag>
      </motion.div>
    </div>
  );
}
