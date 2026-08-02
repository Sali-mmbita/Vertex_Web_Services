'use client';

import React from 'react';
import { Mail, Phone, MapPin, Activity, Github, ShieldCheck, Heart } from 'lucide-react';
import { clientConfig } from '@/config/client.config';

export function Footer() {
  const { name, phone, email, address, licenseNumber, establishedYear, socialLinks } = clientConfig.meta;
  const services = clientConfig.services;

  return (
    <footer className="w-full bg-[#030303] border-t border-white/5 pt-16 pb-8 relative overflow-hidden select-none">
      {/* Grid lights overlay */}
      <div className="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-t from-brand-indigo/5 to-transparent pointer-events-none blur-xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 footer-grid-responsive gap-10 lg:gap-8">
        {/* Brand Column */}
        <div className="sm:col-span-2 lg:col-span-4 flex flex-col gap-5 text-center sm:text-left items-center sm:items-start">
          <a href="/" className="flex items-center gap-2 outline-none">
            <div className="h-8 w-8 rounded-xl bg-gradient-to-tr from-brand-indigo to-brand-cyan p-[1px]">
              <div className="h-full w-full bg-[#030303] rounded-xl flex items-center justify-center text-white">
                <Activity className="h-4 w-4 text-brand-cyan" />
              </div>
            </div>
            <span className="text-sm font-black tracking-tight text-white">
              {clientConfig.meta.logo?.primaryText || 'VORTEX'}<span className="text-brand-cyan">{clientConfig.meta.logo?.secondaryText || 'FLOW'}</span>
            </span>
          </a>
          <p className="text-neutral-400 text-xs leading-relaxed max-w-sm text-center sm:text-left">
            Setting the standard for dynamic hydraulic engineering and surgical home services. Multi-acoustic slab scans, thermal diagnostics, and seamless trenchless sewer replacements.
          </p>
          <div className="flex flex-col gap-1 text-[10px] text-neutral-500 uppercase tracking-widest font-semibold text-center sm:text-left">
            <span>State License: {licenseNumber}</span>
            <span>Established in {establishedYear}</span>
          </div>
        </div>

        {/* Quick Link Category 1: Services */}
        <div className="lg:col-span-3 flex flex-col gap-4 text-center sm:text-left items-center sm:items-start">
          <h4 className="text-xs font-bold text-white uppercase tracking-wider">Our Services</h4>
          <div className="flex flex-col gap-2.5 text-xs items-center sm:items-start">
            {services.map((s) => (
              <a
                key={s.slug}
                href={`/services/${s.slug}`}
                className="text-neutral-400 hover:text-brand-cyan transition-colors text-center sm:text-left"
              >
                {s.title.split(' ')[0]} {s.title.split(' ')[1] || ''} {s.title.split(' ')[2] || ''}
              </a>
            ))}
          </div>
        </div>

        {/* Quick Link Category 2: Legal & Company */}
        <div className="lg:col-span-2 flex flex-col gap-4 text-center sm:text-left items-center sm:items-start">
          <h4 className="text-xs font-bold text-white uppercase tracking-wider">Company</h4>
          <div className="flex flex-col gap-2.5 text-xs items-center sm:items-start">
            <a href="/about" className="text-neutral-400 hover:text-white transition-colors text-center sm:text-left">About Story</a>
            <a href="/gallery" className="text-neutral-400 hover:text-white transition-colors text-center sm:text-left">Showcase Gallery</a>
            <a href="/testimonials" className="text-neutral-400 hover:text-white transition-colors text-center sm:text-left">Verified Reviews</a>
            <a href="/careers" className="text-neutral-400 hover:text-white transition-colors text-center sm:text-left">Open Careers</a>
            <a href="/privacy" className="text-neutral-400 hover:text-white transition-colors text-center sm:text-left">Privacy Policy</a>
            <a href="/terms" className="text-neutral-400 hover:text-white transition-colors text-center sm:text-left">Terms of Service</a>
          </div>
        </div>

        {/* Quick Link Category 3: Coordinates Info */}
        <div className="sm:col-span-2 lg:col-span-3 flex flex-col gap-4 text-center sm:text-left items-center sm:items-start">
          <h4 className="text-xs font-bold text-white uppercase tracking-wider">Local Support Center</h4>
          <div className="flex flex-col gap-3.5 text-xs text-neutral-400 leading-relaxed items-center sm:items-start">
            <a href={`tel:${clientConfig.meta.phoneRaw}`} className="flex items-center gap-2.5 hover:text-white transition-colors justify-center sm:justify-start">
              <Phone className="h-4 w-4 text-brand-cyan shrink-0" />
              <span>{phone} (Voice/Text)</span>
            </a>
            <a href={`mailto:${email}`} className="flex items-center gap-2.5 hover:text-white transition-colors justify-center sm:justify-start">
              <Mail className="h-4 w-4 text-brand-indigo shrink-0" />
              <span>{email}</span>
            </a>
            <div className="flex items-start gap-2.5 justify-center sm:justify-start">
              <MapPin className="h-4 w-4 text-brand-cyan shrink-0 mt-0.5" />
              <span className="text-center sm:text-left">{address.street},<br />{address.city}, {address.state} {address.zip}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Under footer copyright */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-[10px] text-neutral-500 font-semibold uppercase tracking-widest text-center sm:text-left">
          &copy; {new Date().getFullYear()} {name}. All Hydraulic Engineering Rights Reserved.
        </p>

        <div className="flex items-center gap-4 text-[10px] text-neutral-500 font-semibold uppercase tracking-widest">
          <span className="flex items-center gap-1"><ShieldCheck className="h-3.5 w-3.5 text-brand-cyan" /> Secure 256-Bit Link</span>
          <span className="flex items-center gap-1">Designed for Palo Alto <Heart className="h-3 w-3 text-rose-500 fill-rose-500" /></span>
        </div>
      </div>
    </footer>
  );
}
export default Footer;
