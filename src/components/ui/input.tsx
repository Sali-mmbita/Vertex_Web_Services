import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = 'text', label, error, ...props }, ref) => {
    return (
      <div className="w-full flex flex-col gap-2.5 mb-2.5">
        {label && (
          <label className="text-xs font-semibold uppercase tracking-wider text-neutral-400 select-none mb-1 block">
            {label}
          </label>
        )}
        <input
          type={type}
          className={twMerge(
            clsx(
              'w-full h-13 px-4.5 py-3 rounded-xl bg-white/[0.02] border border-white/10 text-white font-medium text-sm transition-all duration-300 outline-none placeholder:text-neutral-500 focus:border-brand-indigo/50 focus:bg-white/[0.04] focus:ring-1 focus:ring-brand-indigo/30',
              error && 'border-rose-500/50 focus:border-rose-500 focus:ring-rose-500/30'
            ),
            className
          )}
          ref={ref}
          {...props}
        />
        {error && <span className="text-xs text-rose-400 font-medium pl-1 mt-1">{error}</span>}
      </div>
    );
  }
);

Input.displayName = 'Input';

export interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ className, label, error, rows = 4, ...props }, ref) => {
    return (
      <div className="w-full flex flex-col gap-2.5 mb-2.5">
        {label && (
          <label className="text-xs font-semibold uppercase tracking-wider text-neutral-400 select-none mb-1 block">
            {label}
          </label>
        )}
        <textarea
          rows={rows}
          className={twMerge(
            clsx(
              'w-full p-4.5 rounded-xl bg-white/[0.02] border border-white/10 text-white font-medium text-sm transition-all duration-300 outline-none placeholder:text-neutral-500 focus:border-brand-indigo/50 focus:bg-white/[0.04] focus:ring-1 focus:ring-brand-indigo/30 resize-none',
              error && 'border-rose-500/50 focus:border-rose-500 focus:ring-rose-500/30'
            ),
            className
          )}
          ref={ref}
          {...props}
        />
        {error && <span className="text-xs text-rose-400 font-medium pl-1">{error}</span>}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';
