'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { HorizontalScroll } from '@/components/layout/HorizontalScroll';
import { Button } from '@/components/ui/Button';
import { DSPLinks } from '@/components/ui/DSPLinks';
import { discography } from '@/data/discography';
import { useInView } from '@/hooks/useInView';
import { safiraMarch } from '@/lib/fonts';
import { ScrollHint } from '@/components/ui/ScrollHint';

type FilterType = 'all' | 'album' | 'film_tv' | 'featured';

function DebutAlbumPanel() {
  const { ref, isInView } = useInView({ threshold: 0.3 });

  return (
    <section
      ref={ref}
      className="scroll-panel relative flex items-start bg-midnight-violet px-8 md:px-16 lg:px-24"
      aria-label="Debut Album"
    >
      <div className="flex flex-col md:flex-row items-center gap-12 md:gap-20 w-full max-w-6xl mx-auto">
        {/* Album artwork placeholder */}
        <motion.div
          className="w-72 h-72 md:w-[400px] md:h-[400px] bg-midnight-violet/40 overflow-hidden relative shrink-0"
          initial={{ opacity: 0, x: -30 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: 'url(/images/album/ihyfit.jpg)' }} />
          <div className="absolute inset-0 border border-gold-muted/15" />
        </motion.div>

        <motion.div
          className="flex flex-col gap-6"
          initial={{ opacity: 0, x: 30 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <span className="text-overline text-gold-muted">Debut Album</span>
          <h1 className={`${safiraMarch.className} text-4xl md:text-6xl text-warm-cream`}>
            IHYFIT
          </h1>
          <p className="text-meta text-warm-cream/40">2026</p>

          {/* Placeholder tracklist */}
          <div className="flex flex-col gap-2 mt-4">
            {Array.from({ length: 8 }, (_, i) => (
              <div key={i} className="flex items-center gap-4">
                <span className="text-meta text-warm-cream/25 w-6">{String(i + 1).padStart(2, '0')}</span>
                <span className="text-warm-cream/50 text-sm font-body font-light">Track {i + 1}</span>
              </div>
            ))}
          </div>

          <div className="flex gap-4 mt-6">
            <Button variant="primary" href="#">Listen Now</Button>
            <Button variant="secondary" href="#">Pre-Save</Button>
          </div>

          <DSPLinks className="mt-2" />
        </motion.div>
      </div>
      <ScrollHint />
    </section>
  );
}

function DiscographyPanel() {
  const { ref, isInView } = useInView({ threshold: 0.2 });
  const [filter, setFilter] = useState<FilterType>('all');

  const filtered = (filter === 'all'
    ? discography
    : discography.filter(d => d.type === filter)
  ).toSorted((a, b) => b.year - a.year);

  const filters: { label: string; value: FilterType }[] = [
    { label: 'All', value: 'all' },
    { label: 'Albums', value: 'album' },
    { label: 'Film / TV', value: 'film_tv' },
    { label: 'Featured On', value: 'featured' },
  ];

  return (
    <section
      ref={ref}
      className="scroll-panel relative flex items-start bg-warm-black px-8 md:px-16 lg:px-24"
      aria-label="Discography"
      data-scrollable
    >
      <div className="w-full max-w-5xl mx-auto">
        <motion.span
          className="text-overline text-gold-muted/60 block mb-4"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
        >
          Selected Works
        </motion.span>

        <motion.h2
          className={`${safiraMarch.className} text-3xl md:text-4xl text-warm-cream mb-8`}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1 }}
        >
          Discography
        </motion.h2>

        {/* Filters */}
        <div className="flex gap-3 mb-10 flex-wrap">
          {filters.map((f) => (
            <button
              key={f.value}
              onClick={() => setFilter(f.value)}
              className={`text-meta px-4 py-2 border transition-all duration-300 ${
                filter === f.value
                  ? 'border-amber-honey text-amber-honey'
                  : 'border-warm-cream/10 text-warm-cream/40 hover:border-warm-cream/25'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filtered.map((item, i) => (
            <motion.article
              key={item.id}
              className="group"
              initial={{ opacity: 0, y: 15 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 + i * 0.05 }}
            >
              <div className="aspect-square bg-midnight-violet/20 mb-3 relative overflow-hidden">
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-[1.03]"
                  style={{ backgroundImage: `url(${item.artwork})` }}
                />
                <div className="absolute inset-0 border border-warm-cream/5 group-hover:border-warm-cream/15 transition-colors duration-500" />
              </div>
              <h3 className="text-warm-cream text-sm font-body font-light leading-tight">
                {item.title}
              </h3>
              <p className="text-warm-cream/40 text-xs font-body mt-0.5">{item.artist}</p>
              <p className="text-meta text-warm-cream/25 mt-1">{item.role}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

function VideoPanel() {
  const { ref, isInView } = useInView({ threshold: 0.3 });

  return (
    <section
      ref={ref}
      className="scroll-panel relative flex items-start justify-center bg-shadow-brown px-8 md:px-16 lg:px-24"
      aria-label="Video"
    >
      <div className="w-full max-w-4xl">
        <motion.span
          className="text-overline text-gold-muted/60 block mb-4"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
        >
          Watch
        </motion.span>

        {/* Video placeholder */}
        <motion.div
          className="aspect-video bg-midnight-violet/30 relative flex items-center justify-center"
          initial={{ opacity: 0, scale: 0.98 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          <div className="absolute inset-0 border border-warm-cream/5" />
          <div className="text-center">
            <div className="w-16 h-16 rounded-full border border-warm-cream/20 flex items-center justify-center mb-4 mx-auto">
              <div className="w-0 h-0 border-t-8 border-b-8 border-l-12 border-t-transparent border-b-transparent border-l-warm-cream/40 ml-1" />
            </div>
            <span className="text-meta text-warm-cream/25">Video Coming Soon</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default function MusicPage() {
  return (
    <HorizontalScroll>
      <DebutAlbumPanel />
      <DiscographyPanel />
      <VideoPanel />
    </HorizontalScroll>
  );
}
