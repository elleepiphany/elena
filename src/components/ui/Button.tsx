import { ReactNode, ButtonHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: ReactNode;
  href?: string;
}

export function Button({
  variant = 'primary',
  size = 'md',
  children,
  className,
  href,
  ...props
}: ButtonProps) {
  const baseStyles =
    'inline-flex items-center justify-center font-body font-light uppercase tracking-[0.2em] transition-all duration-300 relative overflow-hidden';

  const variants = {
    primary:
      'bg-amber-honey text-warm-black hover:shadow-[0_0_30px_rgba(242,169,0,0.3)] active:scale-[0.98]',
    secondary:
      'border border-warm-cream/30 text-warm-cream hover:border-amber-honey hover:text-amber-honey',
    ghost:
      'text-warm-cream/60 hover:text-amber-honey',
  };

  const sizes = {
    sm: 'text-[10px] px-5 py-2',
    md: 'text-xs px-8 py-3',
    lg: 'text-sm px-10 py-4',
  };

  const classes = cn(baseStyles, variants[variant], sizes[size], className);

  if (href) {
    return (
      <a href={href} className={classes}>
        {children}
      </a>
    );
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}
