'use client';

import React, { useRef, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export interface ButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onAnimationStart' | 'onDrag' | 'onDragStart' | 'onDragEnd' | 'style'> {
  variant?: 'primary' | 'secondary' | 'glass' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  enableMagnetic?: boolean;
}

export function Button({
  children,
  className,
  variant = 'primary',
  size = 'md',
  enableMagnetic = true,
  ...props
}: ButtonProps) {
  const ref = useRef<HTMLButtonElement>(null);
  
  // Spring configuration for smooth premium motion physics (Apple style lag-free spring)
  const springConfig = { damping: 15, stiffness: 150, mass: 0.6 };
  const x = useSpring(0, springConfig);
  const y = useSpring(0, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!enableMagnetic || !ref.current) return;
    
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    
    // Calculate relative cursor position from center of button
    const xPos = clientX - (left + width / 2);
    const yPos = clientY - (top + height / 2);
    
    // Pull factor: Button moves 25% of the distance toward cursor
    x.set(xPos * 0.25);
    y.set(yPos * 0.25);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const baseStyles = 'group relative inline-flex items-center justify-center font-medium rounded-full cursor-pointer transition-all duration-300 select-none outline-none focus-visible:ring-2 focus-visible:ring-brand-cyan/70 focus-visible:ring-offset-2 focus-visible:ring-offset-background-dark';
  
  const variants = {
    primary: 'bg-brand-indigo text-white shadow-[0_4px_20px_rgba(79,70,229,0.35)] hover:shadow-[0_8px_30px_rgba(79,70,229,0.55)] border border-brand-indigo/30 hover:bg-brand-indigo/90 active:scale-[0.98]',
    secondary: 'bg-white text-background-dark shadow-[0_4px_15px_rgba(255,255,255,0.15)] hover:shadow-[0_8px_25px_rgba(255,255,255,0.25)] border border-neutral-200 hover:bg-neutral-100 active:scale-[0.98]',
    glass: 'glass-panel text-white hover:bg-white/10 active:bg-white/5 active:scale-[0.98] border border-white/10 hover:border-white/20 hover:shadow-[0_0_20px_rgba(255,255,255,0.05)]',
    ghost: 'text-neutral-400 hover:text-white hover:bg-white/5 active:bg-white/2 active:scale-[0.98]',
    danger: 'bg-rose-600 text-white hover:bg-rose-500 active:bg-rose-700 hover:shadow-[0_4px_20px_rgba(244,63,94,0.35)] active:scale-[0.98]'
  };

  const sizes = {
    sm: 'text-xs px-4 py-1.5 h-8',
    md: 'text-sm px-5 py-2.5 h-10',
    lg: 'text-base px-7 py-3 h-12',
    xl: 'text-lg px-8 py-3.5 h-14'
  };

  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: enableMagnetic ? x : 0, y: enableMagnetic ? y : 0 }}
      className={twMerge(clsx(baseStyles, variants[variant], sizes[size], className))}
      {...props}
    >
      <span className="relative z-10 flex items-center gap-2">
        {children}
      </span>
      
      {/* Subtle background glow highlight for premium Stripe/Linear aesthetic */}
      {variant === 'primary' && (
        <span className="absolute inset-0 rounded-full bg-gradient-to-r from-brand-cyan/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      )}
    </motion.button>
  );
}
