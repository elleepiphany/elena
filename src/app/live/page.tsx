'use client';

import { motion } from 'framer-motion';
import { HorizontalScroll } from '@/components/layout/HorizontalScroll';
import { TourDates } from '@/components/sections/TourDates';
import { Button } from '@/components/ui/Button';
import { tourDates } from '@/data/tour-dates';
import { useInView } from '@/hooks/useInView';

function PastPerformancesPanel() {
  const { ref, isInView } = useInView({ threshold: 0.2 });

  const notableVenues = [
    'Carnegie Hall',
    'The Kennedy Center',
    'The White House',
    'Coachella',
    'Monterey Jazz Festival',
    'Montreux Jazz Festival',
    'Newport Jazz Festival',
    'North Sea Jazz Festival',
    'Blue Note Jazz Club',
    'Hollywood Bowl',
  ];

  return (
    <section
      ref={ref}
      className="scroll-panel relative flex items-center justify-center bg-warm-black px-8 md:px-16 lg:px-24"
      aria-label="Past Performances"
    >
      <div className="max-w-4xl text-center">
        <motion.span
          className="text-overline text-gold-muted/60 block mb-4"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
        >
          Past Performances
        </motion.span>

        <motion.h2
          className="font-heading text-3xl md:text-4xl text-warm-cream mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1 }}
        >
          Notable Stages
        </motion.h2>

        <div className="flex flex-wrap justify-center gap-x-8 gap-y-4">
          {notableVenues.map((venue, i) => (
            <motion.span
              key={venue}
              className="font-heading italic text-xl md:text-2xl text-warm-cream/30 hover:text-warm-cream/60 transition-colors duration-500"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.2 + i * 0.06 }}
            >
              {venue}
            </motion.span>
          ))}
        </div>
      </div>
    </section>
  );
}

function BookingPanel() {
  const { ref, isInView } = useInView({ threshold: 0.3 });

  return (
    <section
      ref={ref}
      className="scroll-panel relative flex items-center justify-center bg-shadow-brown px-8 md:px-16 lg:px-24"
      aria-label="Booking"
    >
      <motion.div
        className="text-center max-w-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
      >
        <span className="text-overline text-gold-muted/60 block mb-4">Private Events</span>
        <h2 className="font-heading text-3xl md:text-4xl text-warm-cream mb-6">
          Book Elena
        </h2>
        <p className="text-warm-cream/50 text-sm font-body font-light leading-relaxed mb-10">
          Available for private events, festivals, corporate engagements, and special performances.
          Elena brings an unforgettable musical experience to every stage.
        </p>
        <Button variant="primary" href="/contact">
          Inquire
        </Button>
      </motion.div>
    </section>
  );
}

export default function LivePage() {
  return (
    <HorizontalScroll>
      <TourDates showViewAll={false} />
      <PastPerformancesPanel />
      <BookingPanel />
    </HorizontalScroll>
  );
}
