'use client';

import { ReactNode } from 'react';
import { useHorizontalScroll } from '@/hooks/useHorizontalScroll';

interface HorizontalScrollProps {
  children: ReactNode;
}

export function HorizontalScroll({ children }: HorizontalScrollProps) {
  const { containerRef, progressBarRef, panelCounterRef, isMobile } = useHorizontalScroll();

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
      {/* Progress bar + panel counter — updated via refs, no React re-renders */}
      <div className="fixed bottom-0 left-0 right-0 z-50 flex items-center">
        <div
          className="flex-1 h-[2px]"
          style={{ backgroundColor: 'rgba(28, 20, 16, 0.3)' }}
        >
          <div
            ref={progressBarRef}
            className="h-full bg-amber-honey"
            style={{ width: '0%', willChange: 'width' }}
          />
        </div>
        <span
          ref={panelCounterRef}
          className="text-[10px] uppercase tracking-[0.2em] font-body font-light text-warm-cream/30 px-4 py-1 shrink-0"
        >
          1 / 1
        </span>
      </div>
    </>
  );
}
