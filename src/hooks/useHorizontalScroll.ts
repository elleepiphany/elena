'use client';

import { useRef, useEffect, useCallback, useState } from 'react';
import { clamp } from '@/lib/utils';

interface UseHorizontalScrollOptions {
  speed?: number;
  ease?: number;
}

export function useHorizontalScroll(options: UseHorizontalScrollOptions = {}) {
  const { speed = 1.2, ease = 0.08 } = options;
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollTargetRef = useRef(0);
  const scrollCurrentRef = useRef(0);
  const rafRef = useRef<number>(0);
  const maxScrollRef = useRef(0);
  const [isMobile, setIsMobile] = useState(false);
  const [progress, setProgress] = useState(0);

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

        // Update progress
        if (maxScrollRef.current > 0) {
          setProgress(scrollCurrentRef.current / maxScrollRef.current);
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
      e.preventDefault();

      // Use deltaY for vertical scroll wheels, deltaX for horizontal trackpads
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
    let touchStartScroll = 0;

    const handleTouchStart = (e: TouchEvent) => {
      touchStartX = e.touches[0].clientX;
      touchStartScroll = scrollTargetRef.current;
    };

    const handleTouchMove = (e: TouchEvent) => {
      e.preventDefault();
      const deltaX = touchStartX - e.touches[0].clientX;
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
    progress,
    isMobile,
    scrollTo,
    scrollToPanel,
  };
}
