'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MoveHorizontal } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export interface BeforeAfterSliderProps {
  beforeImage: string;
  afterImage: string;
  beforeLabel?: string;
  afterLabel?: string;
  className?: string;
  heightClass?: string; // e.g. "h-[400px]"
}

export function BeforeAfterSlider({
  beforeImage,
  afterImage,
  beforeLabel = 'Before Restoration',
  afterLabel = 'After Vortex Flow',
  className,
  heightClass = 'h-[300px] md:h-[450px]',
}: BeforeAfterSliderProps) {
  const [position, setPosition] = useState(50); // percentage (0 to 100)
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  // Keyboard navigation support
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'ArrowLeft') {
      setPosition((prev) => Math.max(0, prev - 2));
    } else if (e.key === 'ArrowRight') {
      setPosition((prev) => Math.min(100, prev + 2));
    } else if (e.key === 'Home') {
      setPosition(0);
    } else if (e.key === 'End') {
      setPosition(100);
    }
  };

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const { left, width } = containerRef.current.getBoundingClientRect();
    const relativeX = clientX - left;
    const percentage = Math.min(100, Math.max(0, (relativeX / width) * 100));
    setPosition(percentage);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (!isDragging) return;
    if (e.touches[0]) {
      handleMove(e.touches[0].clientX);
    }
  };

  const handleMouseUp = () => setIsDragging(false);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      window.addEventListener('touchmove', handleTouchMove);
      window.addEventListener('touchend', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleMouseUp);
    };
  }, [isDragging]);

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleTouchStart = () => {
    setIsDragging(true);
  };

  return (
    <div
      ref={containerRef}
      onKeyDown={handleKeyDown}
      className={twMerge(
        clsx(
          'relative w-full overflow-hidden rounded-3xl border border-white/10 select-none group',
          heightClass,
          className
        )
      )}
    >
      {/* Before Image (Background Layer) */}
      <img
        src={beforeImage}
        alt="Before restoration plumbing state"
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
      />
      <div className="absolute top-4 left-4 z-20 px-3 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-black/60 backdrop-blur-md border border-white/10 text-neutral-400 select-none">
        {beforeLabel}
      </div>

      {/* After Image (Top Sliding Layer) */}
      <div
        className="absolute inset-y-0 left-0 w-full h-full pointer-events-none"
        style={{
          clipPath: `polygon(${position}% 0, 100% 0, 100% 100%, ${position}% 100%)`,
        }}
      >
        <img
          src={afterImage}
          alt="After professional plumbing restoration"
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        />
      </div>
      <div className="absolute top-4 right-4 z-20 px-3 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-brand-indigo/80 backdrop-blur-md border border-brand-indigo/30 text-white select-none">
        {afterLabel}
      </div>

      {/* Transparent overlay allowing click-to-reposition anywhere on slider */}
      <div
        className="absolute inset-0 z-10 cursor-ew-resize"
        onMouseDown={(e) => {
          handleMove(e.clientX);
          setIsDragging(true);
        }}
        onTouchStart={(e) => {
          if (e.touches[0]) {
            handleMove(e.touches[0].clientX);
            setIsDragging(true);
          }
        }}
      />

      {/* Slider Handle (Interactive center handle) */}
      <div
        tabIndex={0}
        role="slider"
        aria-valuenow={Math.round(position)}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Image comparison slider"
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
        className="absolute inset-y-0 z-30 w-1 bg-white cursor-ew-resize -translate-x-1/2 focus:outline-none focus:bg-brand-cyan"
        style={{ left: `${position}%` }}
      >
        <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-white text-background-dark shadow-[0_0_20px_rgba(0,0,0,0.4)] hover:shadow-[0_0_25px_var(--accent-secondary)] border border-neutral-300 hover:border-brand-cyan hover:scale-110 active:scale-95 flex items-center justify-center transition-all duration-200">
          <MoveHorizontal className="h-4 w-4" />
        </div>
      </div>
    </div>
  );
}
export default BeforeAfterSlider;
