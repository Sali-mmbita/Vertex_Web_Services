'use client';

import React from 'react';
import { PhoneCall, AlertTriangle, ChevronRight } from 'lucide-react';
import { clientConfig } from '@/config/client.config';

export function EmergencyBanner() {
  const { emergencyPhone, emergencyPhoneRaw, name } = clientConfig.meta;

  return (
    <div className="w-full bg-black border-b border-white/5 relative overflow-hidden select-none z-40">
      {/* Absolute micro grid lines for tech Stripe style aesthetics */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:30px] opacity-30" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 relative z-10 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
        {/* Left pulsed notice */}
        <div className="flex flex-col sm:flex-row items-center gap-2.5">
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 text-[10px] uppercase font-bold tracking-widest">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500"></span>
            </span>
            Live Alert
          </div>
          <p className="text-xs text-neutral-400 font-medium">
            Active flooding, burst lines or backflow? <span className="text-white font-bold">{name}</span> dispatched emergency rigs in Palo Alto area.
          </p>
        </div>

        {/* Right Direct Dialer Action */}
        <a
          href={`tel:${emergencyPhoneRaw}`}
          className="flex items-center gap-2.5 bg-rose-500/10 hover:bg-rose-500/15 border border-rose-500/30 hover:border-rose-500/40 text-rose-400 px-4 py-1.5 rounded-full text-xs font-bold tracking-tight transition-all duration-300 group shadow-[0_0_15px_rgba(244,63,94,0.1)] active:scale-[0.98]"
        >
          <PhoneCall className="h-3.5 w-3.5 animate-bounce group-hover:rotate-12 transition-transform" />
          <span>Call Emergency Dispatch: <span className="text-white">{emergencyPhone}</span></span>
          <ChevronRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
        </a>
      </div>
    </div>
  );
}
export default EmergencyBanner;
