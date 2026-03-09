import { cn } from '@/lib/utils';
import { safiraMarch } from '@/lib/fonts';

interface NameLockupProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'hero';
  className?: string;
  color?: 'cream' | 'dark';
  align?: 'center' | 'left';
}

const sizeMap = {
  xs: 'text-[0.6rem]',
  sm: 'text-sm',
  md: 'text-2xl',
  lg: 'text-4xl',
  hero: 'text-[2.1rem] sm:text-5xl md:text-7xl lg:text-[7rem] xl:text-[8.5rem]',
};

// Negative top margin on "Pinderhughes" to overlap with "Elena"
// Scaled per size so the two words share a visual line
const overlapMap = {
  xs: '-mt-[0.3em]',
  sm: '-mt-[0.3em]',
  md: '-mt-[0.3em]',
  lg: '-mt-[0.3em]',
  hero: '-mt-[0.3em]',
};

export function NameLockup({ size = 'md', className, color = 'cream', align = 'center' }: NameLockupProps) {
  return (
    <div
      className={cn(
        safiraMarch.className,
        'uppercase select-none',
        align === 'left' ? 'text-left' : 'text-center',
        sizeMap[size],
        color === 'cream' ? 'text-warm-cream' : 'text-warm-black',
        className
      )}
      style={{ lineHeight: 1, letterSpacing: '0.02em' }}
      aria-label="Elena Pinderhughes"
    >
      <span className="block">Elena</span>
      <span className={cn('block', overlapMap[size])}>Pinderhughes</span>
    </div>
  );
}
