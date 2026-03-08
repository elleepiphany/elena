'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useInView } from '@/hooks/useInView';

interface ImageRevealProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  fill?: boolean;
  className?: string;
  priority?: boolean;
}

export function ImageReveal({
  src,
  alt,
  width,
  height,
  fill = false,
  className = '',
  priority = false,
}: ImageRevealProps) {
  const { ref, isInView } = useInView({ threshold: 0.1 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 1.05 }}
      animate={
        isInView
          ? { opacity: 1, scale: 1 }
          : { opacity: 0, scale: 1.05 }
      }
      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      className={`overflow-hidden ${className}`}
      style={fill ? { position: 'relative' } : undefined}
    >
      <Image
        src={src}
        alt={alt}
        width={fill ? undefined : width}
        height={fill ? undefined : height}
        fill={fill}
        className="object-cover"
        priority={priority}
        sizes={fill ? '100vw' : undefined}
      />
    </motion.div>
  );
}
