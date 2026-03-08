import { Cormorant_Garamond, Jost, JetBrains_Mono } from 'next/font/google';

// NOTE: Safira March is a local font that should be loaded when available.
// To enable it, uncomment the localFont import and safiraMarch export below,
// and add the font files to /public/fonts/SafiraMarch/
//
// import localFont from 'next/font/local';
// export const safiraMarch = localFont({
//   src: [{ path: '../../public/fonts/SafiraMarch/SafiraMarch-Regular.woff2', weight: '400', style: 'normal' }],
//   variable: '--font-safira-march',
//   display: 'swap',
//   fallback: ['Georgia', 'Times New Roman', 'serif'],
// });

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
