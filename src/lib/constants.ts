// Elena Pinderhughes — Brand Design Tokens

export const colors = {
  // Primary
  amberHoney: '#F2A900',
  bronzeSpice: '#D95C14',
  midnightViolet: '#3B1C32',
  brandy: '#8B2615',
  darkTeal: '#005C69',

  // Neutrals
  warmCream: '#F5ECD7',
  warmBlack: '#1C1410',
  shadowBrown: '#0D0705',

  // Supporting
  goldMuted: '#C9A96E',
  roseDust: '#B8907A',
} as const;

export const siteConfig = {
  name: 'Elena Pinderhughes',
  title: 'Elena Pinderhughes — Flutist, Vocalist, Composer',
  description:
    'Official website of Elena Pinderhughes — award-winning flutist, vocalist, composer, and songwriter.',
  url: 'https://elenapinderhughes.com',
  ogImage: '/images/hero/elena-pinderhughes-hero.jpeg',
} as const;

export const navigation = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Music', href: '/music' },
  { label: 'Live', href: '/live' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Merch', href: '/merch' },
  { label: 'Press', href: '/press' },
  { label: 'Contact', href: '/contact' },
] as const;

export const socialLinks = [
  { platform: 'Instagram', url: 'https://instagram.com/elenapinderhughes', icon: 'instagram' },
  { platform: 'Twitter/X', url: 'https://x.com/epinderhughes', icon: 'twitter' },
  { platform: 'YouTube', url: 'https://youtube.com/@elenapinderhughes', icon: 'youtube' },
  { platform: 'TikTok', url: 'https://tiktok.com/@elenapinderhughes', icon: 'tiktok' },
] as const;

export const dspLinks = [
  { platform: 'spotify' as const, url: '#', label: 'Spotify' },
  { platform: 'apple_music' as const, url: '#', label: 'Apple Music' },
  { platform: 'tidal' as const, url: '#', label: 'Tidal' },
  { platform: 'youtube_music' as const, url: '#', label: 'YouTube Music' },
  { platform: 'amazon_music' as const, url: '#', label: 'Amazon Music' },
];

export const emotionalWords = [
  { word: 'love', highlighted: true },
  { word: 'honesty', highlighted: false },
  { word: 'patience', highlighted: false },
  { word: 'femininity', highlighted: false },
  { word: 'timelessness', highlighted: false },
  { word: 'sensuality', highlighted: false },
  { word: 'groundedness', highlighted: false },
  { word: 'soaring', highlighted: false },
  { word: 'questioning', highlighted: false },
  { word: 'prayer', highlighted: false },
  { word: 'restlessness', highlighted: false },
  { word: 'sadness', highlighted: false },
  { word: 'joy', highlighted: false },
  { word: 'hope', highlighted: false },
  { word: 'dreaming', highlighted: false },
  { word: 'longing', highlighted: false },
  { word: 'perseverance', highlighted: false },
  { word: 'beauty', highlighted: false },
  { word: 'tension', highlighted: false },
  { word: 'seduction', highlighted: false },
  { word: 'brilliance', highlighted: false },
  { word: 'warmth', highlighted: false },
  { word: 'clarity', highlighted: false },
  { word: 'soul', highlighted: true },
  { word: 'ancestral', highlighted: true },
] as const;

export const breakpoints = {
  mobile: 768,
  tablet: 1280,
} as const;

export const easing = {
  smooth: [0.22, 1, 0.36, 1] as const,
  snappy: [0.16, 1, 0.3, 1] as const,
};
