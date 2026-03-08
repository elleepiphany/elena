'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from '@/hooks/useInView';

const categories = ['Booking', 'Press', 'Management', 'General'];

export function ContactForm() {
  const { ref, isInView } = useInView({ threshold: 0.2 });
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    category: 'General',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Future: integrate with form handler
    setSubmitted(true);
  };

  const inputStyles =
    'w-full bg-transparent border-b border-warm-cream/20 text-warm-cream text-sm font-body font-light px-1 py-3 focus:border-amber-honey focus:outline-none transition-colors placeholder:text-warm-cream/25';

  return (
    <section
      ref={ref}
      className="scroll-panel relative flex items-center justify-center bg-warm-black px-8 md:px-16 lg:px-24"
      aria-label="Contact"
    >
      <div className="w-full max-w-xl">
        <motion.span
          className="text-overline text-gold-muted/60 block mb-4"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
        >
          Contact
        </motion.span>

        <motion.h2
          className="font-heading text-3xl md:text-4xl text-warm-cream mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1 }}
        >
          Get in Touch
        </motion.h2>

        {submitted ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <p className="font-heading italic text-amber-honey text-2xl mb-4">
              Message sent.
            </p>
            <p className="text-warm-cream/50 text-sm font-body font-light">
              We&rsquo;ll be in touch soon.
            </p>
          </motion.div>
        ) : (
          <motion.form
            onSubmit={handleSubmit}
            className="flex flex-col gap-6"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
          >
            {/* Category selector */}
            <div className="flex gap-3 flex-wrap">
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() =>
                    setFormData((prev) => ({ ...prev, category: cat }))
                  }
                  className={`text-meta px-4 py-2 border transition-all duration-300 ${
                    formData.category === cat
                      ? 'border-amber-honey text-amber-honey'
                      : 'border-warm-cream/15 text-warm-cream/40 hover:border-warm-cream/30'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <input
              type="text"
              placeholder="Name"
              value={formData.name}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, name: e.target.value }))
              }
              required
              className={inputStyles}
            />

            <input
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, email: e.target.value }))
              }
              required
              className={inputStyles}
            />

            <input
              type="text"
              placeholder="Subject"
              value={formData.subject}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, subject: e.target.value }))
              }
              required
              className={inputStyles}
            />

            <textarea
              placeholder="Message"
              value={formData.message}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, message: e.target.value }))
              }
              required
              rows={4}
              className={`${inputStyles} resize-none`}
            />

            <button
              type="submit"
              className="self-start bg-amber-honey text-warm-black text-xs uppercase tracking-[0.2em] font-body font-light px-10 py-3 hover:shadow-[0_0_30px_rgba(242,169,0,0.3)] transition-all duration-300 mt-4"
            >
              Send Message
            </button>
          </motion.form>
        )}
      </div>
    </section>
  );
}
