'use client';

import React from 'react';
import { clientConfig } from '@/config/client.config';
import { EmergencyBanner } from '@/components/layout/emergency-banner';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { CostEstimator } from '@/components/features/cost-estimator';
import { Badge } from '@/components/ui/badge';

export default function QuotePage() {
  return (
    <div className="min-h-screen bg-background-dark text-white flex flex-col relative overflow-x-clip">
      <EmergencyBanner />
      <Navbar />

      {/* Hero Header */}
      <header className="relative w-full pt-32 pb-12 md:pt-40 md:pb-16 text-center px-4 overflow-hidden select-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_40%,rgba(6,182,212,0.05),transparent)] pointer-events-none" />
        <div className="max-w-4xl mx-auto flex flex-col items-center gap-4 relative z-10">
          <Badge variant="primary">Pricing Dispatch</Badge>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight bg-gradient-to-b from-white to-neutral-400 bg-clip-text text-transparent">
            Instant Cost Estimator
          </h1>
          <p className="text-neutral-400 text-sm max-w-lg leading-relaxed mt-1">
            Formulate exact pricing ranges. No credit card required. Binds 100% to local field operations rates.
          </p>
        </div>
      </header>

      {/* Centerpiece Estimator wizard */}
      <section className="pb-24 px-4 select-none relative z-10">
        <CostEstimator />
      </section>

      <Footer />
    </div>
  );
}
