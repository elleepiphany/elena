'use client';

import { HorizontalScroll } from '@/components/layout/HorizontalScroll';
import { BioSection } from '@/components/sections/BioSection';

export default function AboutPage() {
  return (
    <HorizontalScroll>
      <BioSection />
    </HorizontalScroll>
  );
}
