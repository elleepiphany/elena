'use client';

import { motion } from 'framer-motion';
import { merchProducts } from '@/data/merch';
import { useInView } from '@/hooks/useInView';
import { Button } from '@/components/ui/Button';

interface MerchGridProps {
  limit?: number;
}

export function MerchGrid({ limit }: MerchGridProps) {
  const { ref, isInView } = useInView({ threshold: 0.2 });
  const products = limit ? merchProducts.slice(0, limit) : merchProducts;

  return (
    <div ref={ref} className="w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((product, i) => (
          <motion.article
            key={product.id}
            className="group"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: i * 0.1, duration: 0.6 }}
          >
            {/* Product image placeholder */}
            <div className="aspect-square bg-midnight-violet/30 mb-4 relative overflow-hidden">
              <div className="absolute inset-0 border border-warm-cream/5 group-hover:border-warm-cream/15 transition-colors duration-500" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-meta text-warm-cream/20">{product.category}</span>
              </div>
            </div>

            <h3 className="text-warm-cream text-sm font-body font-light mb-1">
              {product.name}
            </h3>
            <p className="text-meta text-warm-cream/40 mb-3">
              ${product.price} {product.currency}
            </p>

            {product.inStock ? (
              <Button variant="ghost" size="sm">
                Add to Cart
              </Button>
            ) : (
              <span className="text-meta text-brandy">Sold Out</span>
            )}
          </motion.article>
        ))}
      </div>
    </div>
  );
}
