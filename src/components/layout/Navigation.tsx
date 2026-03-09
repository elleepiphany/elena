'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { navigation, socialLinks } from '@/lib/constants';
import { NameLockup } from '@/components/brand/NameLockup';

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      {/* Desktop Navigation */}
      <nav
        className="fixed top-0 right-0 z-40 hidden md:flex flex-col items-end gap-1 p-8"
        aria-label="Main navigation"
      >
        {navigation.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`
              font-body text-xs font-light uppercase tracking-[0.25em] py-1 px-2
              transition-all duration-300
              hover:tracking-[0.35em] hover:text-dark-teal
              ${pathname === item.href
                ? 'text-amber-honey'
                : 'text-warm-cream/60 hover:text-warm-cream'
              }
            `}
          >
            {item.label}
          </Link>
        ))}
      </nav>

      {/* Home link (desktop) */}
      <Link
        href="/"
        className="fixed top-6 left-8 z-40 hidden md:block"
        aria-label="Home"
      >
        <NameLockup size="sm" />
      </Link>

      {/* Mobile Hamburger */}
      <button
        className="fixed top-6 right-6 z-50 md:hidden flex flex-col gap-[5px] p-2"
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? 'Close menu' : 'Open menu'}
        aria-expanded={isOpen}
      >
        <motion.span
          className="block w-6 h-[1px] bg-warm-cream"
          animate={isOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
          transition={{ duration: 0.3 }}
        />
        <motion.span
          className="block w-6 h-[1px] bg-warm-cream"
          animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
          transition={{ duration: 0.2 }}
        />
        <motion.span
          className="block w-6 h-[1px] bg-warm-cream"
          animate={isOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
          transition={{ duration: 0.3 }}
        />
      </button>

      {/* Mobile name */}
      <Link
        href="/"
        className="fixed top-6 left-6 z-50 md:hidden"
        aria-label="Home"
      >
        <NameLockup size="xs" />
      </Link>

      {/* Mobile Fullscreen Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-40 bg-shadow-brown/98 flex flex-col items-center justify-center gap-6 md:hidden"
          >
            {/* Film grain on menu */}
            <div className="grain-overlay" />

            {navigation.map((item, i) => (
              <motion.div
                key={item.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ delay: i * 0.05, duration: 0.4 }}
              >
                <Link
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`
                    font-body text-sm font-light uppercase tracking-[0.25em]
                    transition-colors duration-300
                    ${pathname === item.href
                      ? 'text-amber-honey'
                      : 'text-warm-cream/70 hover:text-warm-cream'
                    }
                  `}
                >
                  {item.label}
                </Link>
              </motion.div>
            ))}

            {/* Social links at bottom */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="absolute bottom-12 flex gap-6"
            >
              {socialLinks.map((link) => (
                <a
                  key={link.platform}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-warm-cream/40 hover:text-amber-honey text-xs uppercase tracking-[0.2em] transition-colors"
                >
                  {link.platform}
                </a>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
