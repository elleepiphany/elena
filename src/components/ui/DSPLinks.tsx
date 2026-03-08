import { dspLinks } from '@/lib/constants';

interface DSPLinksProps {
  className?: string;
  size?: 'sm' | 'md';
}

export function DSPLinks({ className = '', size = 'md' }: DSPLinksProps) {
  return (
    <div className={`flex items-center gap-4 ${className}`}>
      {dspLinks.map((link) => (
        <a
          key={link.platform}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className={`
            text-warm-cream/50 hover:text-amber-honey transition-colors duration-300
            uppercase tracking-[0.15em] font-body font-light
            ${size === 'sm' ? 'text-[9px]' : 'text-[10px]'}
          `}
          aria-label={`Listen on ${link.label}`}
        >
          {link.label}
        </a>
      ))}
    </div>
  );
}
