import { cn } from '@/lib/utils';

interface NameLockupProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'hero';
  className?: string;
  color?: 'cream' | 'dark';
}

const sizeMap = {
  xs: 'text-sm leading-[0.85]',
  sm: 'text-lg leading-[0.85]',
  md: 'text-3xl leading-[0.85]',
  lg: 'text-5xl leading-[0.85]',
  hero: 'text-6xl md:text-7xl lg:text-[8rem] xl:text-[9rem] leading-[0.82]',
};

export function NameLockup({ size = 'md', className, color = 'cream' }: NameLockupProps) {
  return (
    <div
      className={cn(
        'font-display uppercase tracking-[0.04em] select-none',
        sizeMap[size],
        color === 'cream' ? 'text-warm-cream' : 'text-warm-black',
        className
      )}
      aria-label="Elena Pinderhughes"
    >
      <span className="block">Elena</span>
      <span className="block">Pinderhughes</span>
    </div>
  );
}
