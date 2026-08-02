'use client';

import React, { useRef } from 'react';
import { motion, useMotionTemplate, useMotionValue } from 'framer-motion';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  enableSpotlight?: boolean;
  spotlightColor?: string; // e.g. "rgba(99, 102, 241, 0.15)"
  hoverBorder?: boolean;
}

export function Card({
  children,
  className,
  enableSpotlight = true,
  spotlightColor = 'rgba(79, 70, 229, 0.12)', // Default brand indigo
  hoverBorder = true,
  ...props
}: CardProps) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const cardRef = useRef<HTMLDivElement>(null);

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    if (!enableSpotlight) return;
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  // Smooth CSS radial gradient string driven by motion values (prevents trigger of React re-renders)
  const spotlightBackground = useMotionTemplate`
    radial-gradient(
      350px circle at ${mouseX}px ${mouseY}px,
      ${spotlightColor},
      transparent 80%
    )
  `;

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      className={twMerge(
        clsx(
          'group relative overflow-hidden rounded-3xl bg-card-dark border border-white/5 transition-all duration-500 mx-auto text-left w-full max-w-md sm:max-w-none',
          hoverBorder && 'hover:border-white/10 hover:shadow-[0_4px_30px_rgba(0,0,0,0.4)]',
          className
        )
      )}
      {...props}
    >
      {/* Dynamic Cursor Spotlight Layer */}
      {enableSpotlight && (
        <motion.div
          className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 hover:opacity-100 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            background: spotlightBackground,
          }}
        />
      )}

      {/* Static premium noise or background overlay if needed, then children */}
      <div className="relative z-10 w-full h-full">
        {children}
      </div>
    </div>
  );
}

export function CardHeader({ children, className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={twMerge('p-6 pb-3 flex flex-col gap-1', className)} {...props}>
      {children}
    </div>
  );
}

export function CardContent({ children, className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={twMerge('p-6 pt-0 text-neutral-400 text-sm leading-relaxed', className)} {...props}>
      {children}
    </div>
  );
}

export function CardFooter({ children, className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={twMerge('p-6 pt-3 flex items-center justify-between border-t border-white/5', className)} {...props}>
      {children}
    </div>
  );
}
