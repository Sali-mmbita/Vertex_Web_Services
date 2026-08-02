import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export interface SliderProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'onChange'> {
  label?: string;
  min: number;
  max: number;
  step?: number;
  value: number;
  onChange: (value: number) => void;
  formatValue?: (value: number) => string;
}

export function Slider({
  className,
  label,
  min,
  max,
  step = 1,
  value,
  onChange,
  formatValue = (v) => String(v),
  ...props
}: SliderProps) {
  const percentage = ((value - min) / (max - min)) * 100;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(Number(e.target.value));
  };

  return (
    <div className="w-full flex flex-col gap-3">
      {/* Label and Output Row */}
      <div className="flex items-center justify-between select-none">
        {label && (
          <span className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
            {label}
          </span>
        )}
        <span className="text-sm font-bold text-brand-cyan tracking-tight bg-brand-cyan/5 px-2.5 py-1 rounded-md border border-brand-cyan/15">
          {formatValue(value)}
        </span>
      </div>

      {/* Interactive Track Container */}
      <div className="relative w-full h-6 flex items-center">
        {/* Styled Progress Background tracks */}
        <div className="absolute inset-x-0 h-1.5 rounded-full bg-white/5 pointer-events-none" />
        <div
          className="absolute left-0 h-1.5 rounded-full bg-gradient-to-r from-brand-indigo to-brand-cyan pointer-events-none"
          style={{ width: `${percentage}%` }}
        />

        {/* Native Range Slider styled invisibly on top to manage all dragging and standard keyboard a11y */}
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={handleChange}
          className={twMerge(
            clsx(
              'w-full h-full cursor-pointer opacity-0 absolute z-20 outline-none',
              /* We style the input invisibly but let the native thumb catch interactions */
              '[&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:appearance-none',
              '[&::-moz-range-thumb]:w-6 [&::-moz-range-thumb]:h-6'
            ),
            className
          )}
          role="slider"
          aria-valuenow={value}
          aria-valuemin={min}
          aria-valuemax={max}
          aria-label={label || 'Range slider'}
          {...props}
        />

        {/* Visual Custom Thumb aligned perfectly with the percentage */}
        <div
          className="absolute w-5 h-5 rounded-full bg-white shadow-[0_0_15px_rgba(6,182,212,0.4)] border border-brand-cyan pointer-events-none z-10 -translate-x-1/2 flex items-center justify-center transition-transform duration-100 hover:scale-110 active:scale-95"
          style={{ left: `${percentage}%` }}
        >
          <div className="w-1.5 h-1.5 rounded-full bg-brand-indigo" />
        </div>
      </div>
    </div>
  );
}
