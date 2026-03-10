'use client';

import { useRef, useEffect, useCallback, useState } from 'react';
import { clamp } from '@/lib/utils';

interface UseHorizontalScrollOptions {
  speed?: number;
  ease?: number;
}

export function useHorizontalScroll(options: UseHorizontalScrollOptions = {}) {
  const { speed = 2.5, ease = 0.14 } = options;
  const containerRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const panelCounterRef = useRef<HTMLSpanElement>(null);
  const scrollTargetRef = useRef(0);
  const scrollCurrentRef = useRef(0);
  const rafRef = useRef<number>(0);
  const maxScrollRef = useRef(0);
  const boundaryDeltaRef = useRef(0);
  const lastScrollablePanelRef = useRef<HTMLElement | null>(null);
  const lastBoundaryRef = useRef<'top' | 'bottom' | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const updateMaxScroll = useCallback(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    maxScrollRef.current = container.scrollWidth - window.innerWidth;
  }, []);

  useEffect(() => {
    if (isMobile) return;

    updateMaxScroll();
    window.addEventListener('resize', updateMaxScroll);

    const animate = () => {
      const diff = scrollTargetRef.current - scrollCurrentRef.current;

      // Apply easing
      if (Math.abs(diff) > 0.5) {
        scrollCurrentRef.current += diff * ease;
      } else {
        scrollCurrentRef.current = scrollTargetRef.current;
      }

      if (containerRef.current) {
        containerRef.current.style.transform = `translateX(${-scrollCurrentRef.current}px)`;

        // Update progress bar directly via DOM — no React re-render
        if (progressBarRef.current && maxScrollRef.current > 0) {
          const p = scrollCurrentRef.current / maxScrollRef.current;
          progressBarRef.current.style.width = `${p * 100}%`;
        }

        // Update panel counter via DOM
        if (panelCounterRef.current) {
          const panelWidth = window.innerWidth;
          const panels = containerRef.current.querySelectorAll('.scroll-panel');
          const current = Math.round(scrollCurrentRef.current / panelWidth) + 1;
          const total = panels.length;
          panelCounterRef.current.textContent = `${current} / ${total}`;
        }
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', updateMaxScroll);
    };
  }, [isMobile, ease, updateMaxScroll]);

  useEffect(() => {
    if (isMobile) return;

    const handleWheel = (e: WheelEvent) => {
      // Check if cursor is over a panel that opts in to vertical scroll
      const target = e.target as HTMLElement;
      const scrollablePanel = target.closest('[data-scrollable]') as HTMLElement | null;

      // Reset boundary accumulator when panel changes
      if (scrollablePanel !== lastScrollablePanelRef.current) {
        boundaryDeltaRef.current = 0;
        lastBoundaryRef.current = null;
        lastScrollablePanelRef.current = scrollablePanel;
      }

      if (scrollablePanel) {
        const { scrollTop, scrollHeight, clientHeight } = scrollablePanel;
        const hasOverflow = scrollHeight > clientHeight + 1;

        if (hasOverflow) {
          const isVerticalScroll = Math.abs(e.deltaY) > Math.abs(e.deltaX);

          if (isVerticalScroll) {
            const atTop = scrollTop <= 0;
            const atBottom = scrollTop + clientHeight >= scrollHeight - 1;
            const scrollingDown = e.deltaY > 0;
            const scrollingUp = e.deltaY < 0;

            // Not at boundary — let native vertical scroll happen
            if (!(atTop && scrollingUp) && !(atBottom && scrollingDown)) {
              boundaryDeltaRef.current = 0;
              lastBoundaryRef.current = null;
              return; // Don't preventDefault — native scroll handles it
            }

            // At a boundary — accumulate delta before switching to horizontal
            const currentBoundary = atTop && scrollingUp ? 'top' : 'bottom';
            if (currentBoundary !== lastBoundaryRef.current) {
              boundaryDeltaRef.current = 0;
              lastBoundaryRef.current = currentBoundary;
            }
            boundaryDeltaRef.current += Math.abs(e.deltaY);

            if (boundaryDeltaRef.current < 50) {
              e.preventDefault(); // Absorb momentum at boundary
              return;
            }
            // Past threshold — fall through to horizontal scroll
          }
        }
      }

      // Default: convert wheel to horizontal scroll
      e.preventDefault();
      const delta = Math.abs(e.deltaY) > Math.abs(e.deltaX) ? e.deltaY : e.deltaX;

      scrollTargetRef.current = clamp(
        scrollTargetRef.current + delta * speed,
        0,
        maxScrollRef.current
      );
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      const panelWidth = window.innerWidth;
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        scrollTargetRef.current = clamp(
          scrollTargetRef.current + panelWidth,
          0,
          maxScrollRef.current
        );
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        scrollTargetRef.current = clamp(
          scrollTargetRef.current - panelWidth,
          0,
          maxScrollRef.current
        );
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isMobile, speed]);

  // Touch handling for tablet (non-mobile horizontal scroll)
  useEffect(() => {
    if (isMobile) return;

    let touchStartX = 0;
    let touchStartY = 0;
    let touchStartScroll = 0;
    let touchDirection: 'horizontal' | 'vertical' | null = null;
    let touchedScrollablePanel: HTMLElement | null = null;

    const handleTouchStart = (e: TouchEvent) => {
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
      touchStartScroll = scrollTargetRef.current;
      touchDirection = null;

      const target = e.target as HTMLElement;
      touchedScrollablePanel = target.closest('[data-scrollable]') as HTMLElement | null;
    };

    const handleTouchMove = (e: TouchEvent) => {
      const deltaX = touchStartX - e.touches[0].clientX;
      const deltaY = touchStartY - e.touches[0].clientY;

      // Lock direction after 10px of movement
      if (touchDirection === null && (Math.abs(deltaX) > 10 || Math.abs(deltaY) > 10)) {
        touchDirection = Math.abs(deltaY) > Math.abs(deltaX) ? 'vertical' : 'horizontal';
      }

      // Vertical swipe over a scrollable panel — allow native scroll
      if (touchDirection === 'vertical' && touchedScrollablePanel) {
        const { scrollTop, scrollHeight, clientHeight } = touchedScrollablePanel;
        const hasOverflow = scrollHeight > clientHeight + 1;

        if (hasOverflow) {
          const atTop = scrollTop <= 0;
          const atBottom = scrollTop + clientHeight >= scrollHeight - 1;
          const swipingUp = deltaY < 0;
          const swipingDown = deltaY > 0;

          if (!(atTop && swipingUp) && !(atBottom && swipingDown)) {
            return; // Native vertical scroll
          }
        }
      }

      // Horizontal scroll (default)
      e.preventDefault();
      scrollTargetRef.current = clamp(
        touchStartScroll + deltaX * 1.5,
        0,
        maxScrollRef.current
      );
    };

    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: false });

    return () => {
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, [isMobile]);

  const scrollTo = useCallback((position: number) => {
    scrollTargetRef.current = clamp(position, 0, maxScrollRef.current);
  }, []);

  const scrollToPanel = useCallback((index: number) => {
    scrollTargetRef.current = clamp(
      index * window.innerWidth,
      0,
      maxScrollRef.current
    );
  }, []);

  return {
    containerRef,
    progressBarRef,
    panelCounterRef,
    isMobile,
    scrollTo,
    scrollToPanel,
  };
}
