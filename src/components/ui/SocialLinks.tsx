import { socialLinks } from '@/lib/constants';

interface SocialLinksProps {
  className?: string;
}

export function SocialLinks({ className = '' }: SocialLinksProps) {
  return (
    <div className={`flex items-center gap-6 ${className}`}>
      {socialLinks.map((link) => (
        <a
          key={link.platform}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-warm-cream/40 hover:text-amber-honey text-[10px] uppercase tracking-[0.2em] font-body font-light transition-colors duration-300"
          aria-label={link.platform}
        >
          {link.platform}
        </a>
      ))}
    </div>
  );
}
