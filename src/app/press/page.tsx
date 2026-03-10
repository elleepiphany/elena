'use client';

import { motion } from 'framer-motion';
import { HorizontalScroll } from '@/components/layout/HorizontalScroll';
import { PressQuotes } from '@/components/sections/PressQuotes';
import { pressFeatures } from '@/data/press';
import { useInView } from '@/hooks/useInView';
import { formatDate } from '@/lib/utils';
import { Button } from '@/components/ui/Button';
import { safiraMarch } from '@/lib/fonts';

function PressCoveragePanel() {
  const { ref, isInView } = useInView({ threshold: 0.2 });

  return (
    <section
      ref={ref}
      className="scroll-panel relative flex items-start bg-warm-black px-8 md:px-16 lg:px-24"
      aria-label="Press Coverage"
      data-scrollable
    >
      <div className="w-full max-w-3xl mx-auto pb-32">
        <motion.span
          className="text-overline text-gold-muted/60 block mb-4"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
        >
          Coverage
        </motion.span>

        <motion.h2
          className={`${safiraMarch.className} text-3xl md:text-4xl text-warm-cream mb-12`}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1 }}
        >
          In the Press
        </motion.h2>

        <div className="flex flex-col divide-y divide-warm-cream/10">
          {pressFeatures.map((feature, i) => (
            <motion.a
              key={feature.id}
              href={feature.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start justify-between py-5 gap-4 group"
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.15 + i * 0.08 }}
            >
              <div className="min-w-0 flex-1">
                <span className="text-meta text-amber-honey/60 block mb-1">
                  {feature.publication}
                </span>
                <span className="text-warm-cream text-sm font-body font-light group-hover:text-amber-honey transition-colors duration-300 block">
                  {feature.title}
                </span>
                <span className="text-meta text-warm-cream/25 block mt-1">
                  {formatDate(feature.date)}
                </span>
              </div>
              <span className="text-meta text-warm-cream/15 uppercase shrink-0">
                {feature.type}
              </span>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}

function EPKPanel() {
  const { ref, isInView } = useInView({ threshold: 0.3 });

  return (
    <section
      ref={ref}
      className="scroll-panel relative flex items-start justify-center bg-midnight-violet px-8 md:px-16 lg:px-24"
      aria-label="Press Kit"
      data-scrollable
    >
      <motion.div
        className="text-center max-w-3xl w-full pb-24"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
      >
        <span className="text-overline text-gold-muted/60 block mb-4">EPK</span>
        <h2 className={`${safiraMarch.className} text-3xl md:text-4xl text-warm-cream mb-6`}>
          Press Kit
        </h2>
        <p className="text-warm-cream/50 text-sm font-body font-light leading-relaxed mb-10">
          Download Elena&rsquo;s electronic press kit including hi-res photos, biography, and technical rider.
        </p>

        <div className="flex flex-col gap-4 items-center">
          <Button variant="primary" href="#">Download EPK</Button>
          <Button variant="secondary" href="#">Hi-Res Photos</Button>
          <Button variant="ghost" href="#">Bio (Short)</Button>
          <Button variant="ghost" href="#">Bio (Long)</Button>
          <Button variant="ghost" href="#">Technical Rider</Button>
        </div>

        <p className="text-meta text-warm-cream/25 mt-12">
          Press inquiries: press@elenapinderhughes.com
        </p>
      </motion.div>
    </section>
  );
}

export default function PressPage() {
  return (
    <HorizontalScroll>
      <PressQuotes showScrollHint />
      <PressCoveragePanel />
      <EPKPanel />
    </HorizontalScroll>
  );
}
