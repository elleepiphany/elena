'use client';

import { HorizontalScroll } from '@/components/layout/HorizontalScroll';
import { HeroSection } from '@/components/sections/HeroSection';
import { AlbumTeaser } from '@/components/sections/AlbumTeaser';
import { EmotionalWorld } from '@/components/sections/EmotionalWorld';
import { PressQuotes } from '@/components/sections/PressQuotes';
import { TourDates } from '@/components/sections/TourDates';
import { MailingListSignup } from '@/components/sections/MailingListSignup';

export default function HomePage() {
  return (
    <HorizontalScroll>
      <HeroSection />
      <AlbumTeaser />
      <EmotionalWorld />
      <PressQuotes />
      <TourDates limit={5} />
      <MailingListSignup />
    </HorizontalScroll>
  );
}
