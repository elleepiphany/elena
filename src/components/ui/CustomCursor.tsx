'use client';

import { useEffect } from 'react';

// SVG cursors rendered natively by the browser — zero JS lag
const DOT_SIZE = 8;
const HOVER_SIZE = 20;
const COLOR = '%23F2A900'; // url-encoded #F2A900 (amber-honey)

function makeCursorSvg(size: number, opacity = 1) {
  const r = size / 2;
  return `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='${size}' height='${size}'%3E%3Ccircle cx='${r}' cy='${r}' r='${r}' fill='${COLOR}' opacity='${opacity}'/%3E%3C/svg%3E") ${r} ${r}, auto`;
}

const defaultCursor = makeCursorSvg(DOT_SIZE);
const hoverCursor = makeCursorSvg(HOVER_SIZE, 0.6);

export function CustomCursor() {
  useEffect(() => {
    // Don't override on touch devices
    if (window.matchMedia('(pointer: coarse)').matches) return;

    // Create a <style> element so cursor rules apply globally
    const style = document.createElement('style');
    style.textContent = `
      *, *::before, *::after {
        cursor: ${defaultCursor} !important;
      }
      a, button, a *, button *, [data-hoverable], [data-hoverable] * {
        cursor: ${hoverCursor} !important;
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  // No DOM element needed — cursor is entirely CSS-driven
  return null;
}
