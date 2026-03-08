'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { NameLockup } from '@/components/brand/NameLockup';
import { SocialLinks } from '@/components/ui/SocialLinks';

export default function MailingListPage() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-shadow-brown px-8 relative overflow-hidden">
      {/* Background gradient */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at 30% 50%, rgba(59, 28, 50, 0.4) 0%, transparent 60%), radial-gradient(ellipse at 70% 60%, rgba(0, 92, 105, 0.1) 0%, transparent 50%)',
        }}
      />

      <motion.div
        className="relative z-10 text-center max-w-md w-full"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      >
        <NameLockup size="md" className="mx-auto mb-12" />

        <h1 className="font-heading italic text-2xl md:text-3xl text-warm-cream mb-4">
          Join the Inner Circle
        </h1>

        <p className="text-warm-cream/50 text-sm font-body font-light leading-relaxed mb-10">
          Be the first to hear about new music, tour dates, and exclusive content.
          No spam. Just the music that matters.
        </p>

        {submitted ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <p className="font-heading italic text-amber-honey text-xl mb-2">
              Welcome. You&rsquo;re in.
            </p>
            <p className="text-warm-cream/40 text-sm font-body font-light">
              Check your inbox for a confirmation.
            </p>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email"
              required
              className="bg-transparent border-b border-warm-cream/20 text-warm-cream text-sm font-body font-light px-2 py-3 text-center focus:border-amber-honey focus:outline-none transition-colors placeholder:text-warm-cream/25"
              aria-label="Email address"
            />
            <button
              type="submit"
              className="bg-amber-honey text-warm-black text-xs uppercase tracking-[0.2em] font-body font-light py-3 hover:shadow-[0_0_30px_rgba(242,169,0,0.3)] transition-all duration-300"
            >
              Subscribe
            </button>
          </form>
        )}

        <motion.div
          className="mt-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <SocialLinks className="justify-center" />
        </motion.div>
      </motion.div>
    </div>
  );
}
