'use client';

import { motion } from 'framer-motion';
import { HorizontalScroll } from '@/components/layout/HorizontalScroll';
import { MerchGrid } from '@/components/sections/MerchGrid';
import { merchProducts } from '@/data/merch';
import { useInView } from '@/hooks/useInView';
import { Button } from '@/components/ui/Button';
import { safiraMarch } from '@/lib/fonts';
import { ScrollHint } from '@/components/ui/ScrollHint';

function FeaturedProductPanel() {
  const { ref, isInView } = useInView({ threshold: 0.3 });
  const featured = merchProducts[0];

  return (
    <section
      ref={ref}
      className="scroll-panel relative flex items-start bg-shadow-brown px-8 md:px-16 lg:px-24"
      aria-label="Featured Product"
    >
      <div className="flex flex-col md:flex-row items-center gap-12 md:gap-20 w-full max-w-5xl mx-auto">
        {/* Product image placeholder */}
        <motion.div
          className="w-72 h-72 md:w-96 md:h-96 bg-midnight-violet/30 flex items-center justify-center relative shrink-0"
          initial={{ opacity: 0, x: -30 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <div className="absolute inset-0 border border-warm-cream/5" />
          <span className="text-overline text-warm-cream/20">Product Image</span>
        </motion.div>

        <motion.div
          className="flex flex-col gap-4"
          initial={{ opacity: 0, x: 30 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <span className="text-overline text-gold-muted/60">Featured</span>
          <h1 className={`${safiraMarch.className} text-3xl md:text-4xl text-warm-cream`}>
            {featured.name}
          </h1>
          <p className="text-meta text-warm-cream/40">${featured.price} {featured.currency}</p>
          <p className="text-warm-cream/50 text-sm font-body font-light max-w-md leading-relaxed">
            {featured.description}
          </p>
          <Button variant="primary" className="self-start mt-4">
            Add to Cart
          </Button>
        </motion.div>
      </div>
      <ScrollHint />
    </section>
  );
}

function ProductGridPanel() {
  const { ref, isInView } = useInView({ threshold: 0.2 });

  return (
    <section
      ref={ref}
      className="scroll-panel relative flex items-start bg-warm-black px-8 md:px-16 lg:px-24"
      aria-label="All Products"
      data-scrollable
    >
      <div className="w-full max-w-5xl mx-auto">
        <motion.span
          className="text-overline text-gold-muted/60 block mb-4"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
        >
          Merch
        </motion.span>

        <motion.h2
          className={`${safiraMarch.className} text-3xl md:text-4xl text-warm-cream mb-12`}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1 }}
        >
          Shop
        </motion.h2>

        <MerchGrid />
      </div>
    </section>
  );
}

export default function MerchPage() {
  return (
    <HorizontalScroll>
      <FeaturedProductPanel />
      <ProductGridPanel />
    </HorizontalScroll>
  );
}
