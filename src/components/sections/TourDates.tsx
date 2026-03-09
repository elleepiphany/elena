'use client';

import { motion } from 'framer-motion';
import { tourDates } from '@/data/tour-dates';
import { formatDateCompact } from '@/lib/utils';
import { useInView } from '@/hooks/useInView';
import { Button } from '@/components/ui/Button';
import { safiraMarch } from '@/lib/fonts';
import Link from 'next/link';

interface TourDatesProps {
  limit?: number;
  showViewAll?: boolean;
}

export function TourDates({ limit, showViewAll = true }: TourDatesProps) {
  const { ref, isInView } = useInView({ threshold: 0.2 });
  const upcomingDates = tourDates
    .filter((d) => d.status === 'upcoming')
    .slice(0, limit);

  return (
    <section
      ref={ref}
      className="scroll-panel relative flex items-start justify-center bg-shadow-brown px-8 md:px-16 lg:px-24"
      aria-label="Tour Dates"
      data-scrollable
    >
      <div className="w-full max-w-3xl">
        <motion.span
          className="text-overline text-gold-muted/60 block mb-4"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
        >
          Live
        </motion.span>

        <motion.h2
          className={`${safiraMarch.className} text-3xl md:text-4xl text-warm-cream mb-12`}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1, duration: 0.6 }}
        >
          Upcoming Shows
        </motion.h2>

        {upcomingDates.length === 0 ? (
          <motion.p
            className="font-heading italic text-warm-cream/50 text-lg"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.3 }}
          >
            New dates coming soon. Join the mailing list.
          </motion.p>
        ) : (
          <div className="flex flex-col divide-y divide-warm-cream/10">
            {upcomingDates.map((date, i) => (
              <motion.div
                key={date.id}
                className="flex items-center justify-between py-5 gap-4"
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.15 + i * 0.08, duration: 0.5 }}
              >
                <div className="flex items-center gap-6 md:gap-10 flex-1 min-w-0">
                  <span className="text-meta text-amber-honey w-16 shrink-0">
                    {formatDateCompact(date.date)}
                  </span>
                  <div className="min-w-0">
                    <span className="text-warm-cream text-sm font-body font-light block truncate">
                      {date.city}
                    </span>
                    <span className="text-warm-cream/40 text-xs font-body block truncate">
                      {date.venue}
                    </span>
                  </div>
                  {date.specialNote && (
                    <span className="text-meta text-amber-honey/60 hidden md:block">
                      {date.specialNote}
                    </span>
                  )}
                </div>
                <div className="shrink-0">
                  {date.status === 'sold_out' ? (
                    <span className="text-meta text-brandy">Sold Out</span>
                  ) : (
                    <Button variant="secondary" size="sm" href={date.ticketUrl}>
                      Tickets
                    </Button>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {showViewAll && (
          <motion.div
            className="mt-10"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.6 }}
          >
            <Link
              href="/live"
              className="text-overline text-warm-cream/40 hover:text-amber-honey transition-colors duration-300"
            >
              See All Dates
            </Link>
          </motion.div>
        )}
      </div>
    </section>
  );
}
