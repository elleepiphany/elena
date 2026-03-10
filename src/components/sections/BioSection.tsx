'use client';

import { motion } from 'framer-motion';
import { useInView } from '@/hooks/useInView';
import { safiraMarch } from '@/lib/fonts';
import { ScrollHint } from '@/components/ui/ScrollHint';

const bioText = {
  opening:
    'Elena Pinderhughes is redefining what the flute can be in contemporary music.',
  paragraphs: [
    'An award-winning flutist, vocalist, composer, and songwriter, the Bay Area-raised, Manhattan School of Music-trained artist moves across jazz, R&B, hip-hop, and orchestral settings with a fluency that has led The Guardian to call her the most exciting and creatively assured jazz flutist to have emerged in years. Her instrument is not an ornament in these contexts. It is a lead voice, carrying the same weight and authority as any horn or human vocal.',
    'Her range of collaborators speaks to the breadth of her artistry. She has performed alongside Herbie Hancock, Chief Adjuah, Robert Glasper, Esperanza Spalding, Terrace Martin, Common, Lupe Fiasco, Kenny Barron, Vijay Iyer, Terri Lyne Carrington, Ambrose Akinmusire, and Future, while also working with Victoria Monet, Cynthia Erivo, Giveon, and Jordan Ward. Her stages include Carnegie Hall, the Kennedy Center, the White House, Coachella, Monterey Jazz Festival, Montreux, Newport, and North Sea Jazz.',
    'Her reach extends into film and recorded music with equal force. She contributed to the Academy Award-nominated score for American Fiction and has worked in Laura Karpman\'s studio on HBO\'s Duster. Her flute and vocal work appear on landmark releases including Chief Adjuah\'s Stretch Music and Diaspora, Terrace Martin\'s Impedance and Nintendo Soul, Common\'s Black America Again, and Ambrose Akinmusire\'s The Imagined Savior.',
  ],
  closing:
    'Now preparing solo releases that weave together her gifts as a flutist, vocalist, and songwriter, Pinderhughes stands at a pivotal moment. The world has heard what she can do in service of other artists\' visions; what comes next will be entirely her own.',
};

export function BioSection() {
  const { ref, isInView } = useInView({ threshold: 0.15 });

  return (
    <div ref={ref} className="flex flex-col md:flex-row">
      {/* Panel 1: Portrait + Opening */}
      <section className="scroll-panel relative flex items-end bg-shadow-brown p-8 md:p-16 lg:p-24">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: 'url(/images/gallery/ep3.avif)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-shadow-brown via-shadow-brown/50 to-transparent" />
        {/* Dark gradient behind nav for legibility on this bright image */}
        <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-shadow-brown/70 via-shadow-brown/30 to-transparent" />
        <div className="relative z-10 max-w-lg">
          <motion.h1
            className={`${safiraMarch.className} text-4xl md:text-6xl lg:text-7xl text-warm-cream uppercase mb-6`}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            About Elena
          </motion.h1>
          <motion.p
            className="font-heading italic text-xl md:text-2xl text-warm-cream/80 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            {bioText.opening}
          </motion.p>
        </div>
        <ScrollHint />
      </section>

      {/* Panel 2: Bio text with imagery */}
      <section className="scroll-panel relative flex items-start bg-warm-black px-8 md:px-16 lg:px-24" data-scrollable>
        <div className="max-w-2xl mx-auto">
          {bioText.paragraphs.map((paragraph, i) => (
            <motion.p
              key={i}
              className="text-warm-cream/70 font-body font-light text-sm md:text-base leading-[1.8] mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 + i * 0.15, duration: 0.8 }}
            >
              {paragraph}
            </motion.p>
          ))}
        </div>
      </section>

      {/* Panel 3: Collaborators */}
      <section className="scroll-panel relative flex items-start justify-center bg-dark-teal px-8 md:px-16 lg:px-24 overflow-hidden">
        <div className="relative z-10 text-center max-w-4xl">
          <motion.span
            className="text-overline text-gold-muted/60 block mb-6"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
          >
            Collaborators
          </motion.span>

          {/* Constellation of names */}
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-3 mb-8">
            {[
              { name: 'Herbie Hancock', size: 'text-2xl md:text-3xl' },
              { name: 'Chief Adjuah', size: 'text-xl md:text-2xl' },
              { name: 'Robert Glasper', size: 'text-lg md:text-xl' },
              { name: 'Esperanza Spalding', size: 'text-2xl md:text-3xl' },
              { name: 'Terrace Martin', size: 'text-xl md:text-2xl' },
              { name: 'Common', size: 'text-lg md:text-2xl' },
              { name: 'Lupe Fiasco', size: 'text-base md:text-lg' },
              { name: 'Kenny Barron', size: 'text-lg md:text-xl' },
              { name: 'Vijay Iyer', size: 'text-base md:text-lg' },
              { name: 'Terri Lyne Carrington', size: 'text-xl md:text-2xl' },
              { name: 'Ambrose Akinmusire', size: 'text-lg md:text-xl' },
              { name: 'Future', size: 'text-xl md:text-2xl' },
              { name: 'Victoria Monet', size: 'text-lg md:text-xl' },
              { name: 'Cynthia Erivo', size: 'text-xl md:text-2xl' },
              { name: 'Giveon', size: 'text-base md:text-lg' },
              { name: 'Jordan Ward', size: 'text-base md:text-lg' },
            ].map((collab, i) => (
              <motion.span
                key={collab.name}
                className={`font-heading italic text-warm-cream/40 hover:text-warm-cream/70 transition-colors duration-500 ${collab.size}`}
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ delay: 0.1 + i * 0.05 }}
              >
                {collab.name}
              </motion.span>
            ))}
          </div>

          {/* Photo — ep12, background-removed, blended into teal */}
          <motion.div
            className="relative flex items-center justify-center -mt-4"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 1, duration: 1.2 }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/gallery/ep12.png"
              alt="Elena Pinderhughes"
              className="w-[95vw] md:w-[75vw] max-w-none"
              style={{
                maskImage: 'linear-gradient(to bottom, transparent 0%, black 8%, black 75%, transparent 100%), linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%)',
                maskComposite: 'intersect',
                WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 8%, black 75%, transparent 100%), linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%)',
                WebkitMaskComposite: 'destination-in',
                filter: 'brightness(0.88) drop-shadow(0 0 40px var(--dark-teal))',
              }}
            />
          </motion.div>
        </div>
      </section>

      {/* Panel 4: The Moment */}
      <section className="scroll-panel relative flex items-center justify-center bg-midnight-violet overflow-hidden">
        <div className="relative z-10 px-8 md:px-16 lg:px-24 max-w-3xl text-center">
          <motion.blockquote
            className="font-heading italic text-2xl md:text-3xl lg:text-4xl text-warm-cream/90 leading-snug"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          >
            The world has heard what she can do in service of other artists&rsquo; visions;
            what comes next will be entirely her&nbsp;own.
          </motion.blockquote>
        </div>
      </section>
    </div>
  );
}
