import localFont from 'next/font/local';
import { Cormorant_Garamond, Jost, JetBrains_Mono } from 'next/font/google';

// Display / Artist Name — Safira March
export const safiraMarch = localFont({
  src: [{ path: '../../public/fonts/SafiraMarch/SafiraMarch-Regular.ttf', weight: '400', style: 'normal' }],
  variable: '--font-safira-march',
  display: 'swap',
  fallback: ['Georgia', 'Times New Roman', 'serif'],
});

// Headings — elegant serif with soul
export const cormorantGaramond = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '600'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
});

// Body — clean, modern sans-serif
export const jost = Jost({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-jost',
  display: 'swap',
});

// Monospace / Metadata — dates, timestamps, small labels
export const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['300', '400'],
  variable: '--font-mono',
  display: 'swap',
});
