'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from '@/hooks/useInView';
import { SocialLinks } from '@/components/ui/SocialLinks';

export function MailingListSignup() {
  const { ref, isInView } = useInView({ threshold: 0.3 });
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Future: integrate with Mailchimp/ConvertKit
    setSubmitted(true);
  };

  return (
    <section
      ref={ref}
      className="scroll-panel relative flex items-center justify-center bg-shadow-brown px-8 md:px-16 lg:px-24"
      aria-label="Connect"
    >
      <div className="text-center max-w-lg">
        <motion.span
          className="text-overline text-gold-muted/60 block mb-4"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
        >
          Stay Connected
        </motion.span>

        <motion.h2
          className="font-heading italic text-3xl md:text-4xl text-warm-cream mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1 }}
        >
          Join the Inner Circle
        </motion.h2>

        <motion.p
          className="text-warm-cream/50 text-sm font-body font-light mb-10 leading-relaxed"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.2 }}
        >
          Tour announcements, new music, and exclusive content — delivered straight to your&nbsp;inbox.
        </motion.p>

        {submitted ? (
          <motion.p
            className="font-heading italic text-amber-honey text-lg"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            Welcome. You&rsquo;re in.
          </motion.p>
        ) : (
          <motion.form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-3"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3 }}
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email"
              required
              className="flex-1 bg-transparent border-b border-warm-cream/20 text-warm-cream text-sm font-body font-light px-2 py-3 focus:border-amber-honey focus:outline-none transition-colors placeholder:text-warm-cream/30"
              aria-label="Email address"
            />
            <button
              type="submit"
              className="bg-amber-honey text-warm-black text-xs uppercase tracking-[0.2em] font-body font-light px-8 py-3 hover:shadow-[0_0_30px_rgba(242,169,0,0.3)] transition-all duration-300"
            >
              Subscribe
            </button>
          </motion.form>
        )}

        <motion.div
          className="mt-16"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
        >
          <SocialLinks className="justify-center" />
        </motion.div>

        <motion.p
          className="text-meta text-warm-cream/20 mt-8"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6 }}
        >
          Management &amp; Booking: info@elenapinderhughes.com
        </motion.p>
      </div>
    </section>
  );
}
