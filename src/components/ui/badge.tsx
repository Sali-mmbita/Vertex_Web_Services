import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'primary' | 'secondary' | 'glass' | 'emerald' | 'amber' | 'rose';
}

export function Badge({ children, className, variant = 'glass', ...props }: BadgeProps) {
  const baseStyles = 'inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] md:text-xs font-semibold select-none border tracking-widest uppercase';
  
  const variants = {
    primary: 'bg-brand-indigo/10 text-brand-indigo border-brand-indigo/20 shadow-[0_0_10px_rgba(79,70,229,0.1)]',
    secondary: 'bg-brand-cyan/10 text-brand-cyan border-brand-cyan/20 shadow-[0_0_10px_rgba(6,182,212,0.1)]',
    glass: 'bg-white/5 text-neutral-300 border-white/5 backdrop-blur-md',
    emerald: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/25 shadow-[0_0_10px_rgba(16,185,129,0.1)]',
    amber: 'bg-amber-500/10 text-amber-400 border-amber-500/25 shadow-[0_0_10px_rgba(245,158,11,0.1)]',
    rose: 'bg-rose-500/10 text-rose-400 border-rose-500/25 shadow-[0_0_10px_rgba(244,63,94,0.1)]'
  };

  return (
    <span className={twMerge(clsx(baseStyles, variants[variant], className))} {...props}>
      {children}
    </span>
  );
}
