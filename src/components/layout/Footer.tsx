import { socialLinks } from '@/lib/constants';

export function Footer() {
  return (
    <footer className="bg-shadow-brown py-12 px-8 text-center">
      <div className="flex justify-center gap-6 mb-6">
        {socialLinks.map((link) => (
          <a
            key={link.platform}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-warm-cream/40 hover:text-amber-honey text-xs uppercase tracking-[0.2em] transition-colors duration-300"
          >
            {link.platform}
          </a>
        ))}
      </div>
      <p className="text-meta text-warm-cream/30">
        &copy; {new Date().getFullYear()} Elena Pinderhughes. All rights reserved.
      </p>
    </footer>
  );
}
