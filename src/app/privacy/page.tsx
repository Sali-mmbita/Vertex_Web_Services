'use client';

import React from 'react';
import { clientConfig } from '@/config/client.config';
import { EmergencyBanner } from '@/components/layout/emergency-banner';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';

export default function PrivacyPage() {
  const meta = clientConfig.meta;

  return (
    <div className="min-h-screen bg-background-dark text-white flex flex-col relative overflow-x-clip">
      <EmergencyBanner />
      <Navbar />

      <header className="relative w-full pt-32 pb-12 text-center px-4 overflow-hidden select-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_40%,rgba(79,70,229,0.04),transparent)] pointer-events-none" />
        <div className="max-w-4xl mx-auto flex flex-col items-center gap-4 relative z-10">
          <Badge variant="glass">Legal Operations</Badge>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight bg-gradient-to-b from-white to-neutral-400 bg-clip-text text-transparent">
            Privacy Policy
          </h1>
          <p className="text-neutral-500 text-xs mt-1">
            Last Updated: August 2026 • {meta.name}
          </p>
        </div>
      </header>

      <section className="py-12 pb-24 relative z-10 max-w-3xl mx-auto px-4 text-left text-neutral-400 text-sm leading-relaxed flex flex-col gap-6">
        <Card className="p-8 border-white/5 bg-[#0a0a0c] flex flex-col gap-6">
          <div>
            <h3 className="text-base font-bold text-white mb-2 uppercase tracking-wider">1. Data Capture Principles</h3>
            <p>
              At {meta.name}, we collect personal coordinate details (including name, phone, email, and service ZIP codes) exclusively to process immediate field-service dispatches, lock in promotional pricing configurations, and submit local AWWA compliance certification registers. We do not sell or trade your data.
            </p>
          </div>

          <div>
            <h3 className="text-base font-bold text-white mb-2 uppercase tracking-wider">2. Cookie & Session Protocols</h3>
            <p>
              Our software platform operates lightweight, anonymous cookies to map local ZIP-code lookup sessions, cache temporary cost-estimator gauge parameters, and sync GSAP/Lenis smooth scrolling orientations to guarantee high performance and 100/100 core web vitals.
            </p>
          </div>

          <div>
            <h3 className="text-base font-bold text-white mb-2 uppercase tracking-wider">3. Security Verification</h3>
            <p>
              Candidate application files, support inquiry logs, and locked pricing credentials undergo secure 256-bit SSL hashing. Physical databases are protected to guarantee that raw customer credentials remain entirely locked within our operations support center.
            </p>
          </div>

          <div>
            <h3 className="text-base font-bold text-white mb-2 uppercase tracking-wider">4. Contact Information</h3>
            <p>
              Inquiries regarding personal file adjustments, data deletes, or GDPR rights can be routed directly to our operations office email at <span className="text-brand-cyan font-bold">{meta.email}</span> or by calling support at <span className="text-white font-semibold">{meta.phone}</span>.
            </p>
          </div>
        </Card>
      </section>

      <Footer />
    </div>
  );
}
