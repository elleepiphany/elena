'use client';

import { ReactNode } from 'react';
import { useHorizontalScroll } from '@/hooks/useHorizontalScroll';

interface HorizontalScrollProps {
  children: ReactNode;
}

export function HorizontalScroll({ children }: HorizontalScrollProps) {
  const { containerRef, progressBarRef, isMobile } = useHorizontalScroll();

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
          style={{ height: '100vh', alignItems: 'stretch', willChange: 'transform' }}
        >
          {children}
        </div>
      </div>
      {/* Progress bar — updated via ref, no React re-renders */}
      <div
        className="fixed bottom-0 left-0 right-0 z-50 h-[2px]"
        style={{ backgroundColor: 'rgba(28, 20, 16, 0.3)' }}
      >
        <div
          ref={progressBarRef}
          className="h-full bg-amber-honey"
          style={{ width: '0%', willChange: 'width' }}
        />
      </div>
    </>
  );
}
