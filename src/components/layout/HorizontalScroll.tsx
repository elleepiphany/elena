'use client';

import { ReactNode } from 'react';
import { useHorizontalScroll } from '@/hooks/useHorizontalScroll';
import { ScrollProgress } from './ScrollProgress';

interface HorizontalScrollProps {
  children: ReactNode;
}

export function HorizontalScroll({ children }: HorizontalScrollProps) {
  const { containerRef, progress, isMobile } = useHorizontalScroll();

  if (isMobile) {
    return (
      <div className="flex flex-col">
        {children}
      </div>
    );
  }

  return (
    <>
      <div
        style={{
          position: 'fixed',
          inset: 0,
          overflow: 'hidden',
        }}
      >
        <div
          ref={containerRef}
          className="horizontal-scroll-container"
          style={{ height: '100vh', alignItems: 'stretch' }}
        >
          {children}
        </div>
      </div>
      <ScrollProgress progress={progress} />
    </>
  );
}
