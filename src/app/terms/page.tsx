'use client';

import React from 'react';
import { clientConfig } from '@/config/client.config';
import { EmergencyBanner } from '@/components/layout/emergency-banner';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';

export default function TermsPage() {
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
            Terms of Service
          </h1>
          <p className="text-neutral-500 text-xs mt-1">
            Last Updated: August 2026 • {meta.name}
          </p>
        </div>
      </header>

      <section className="py-12 pb-24 relative z-10 max-w-3xl mx-auto px-4 text-left text-neutral-400 text-sm leading-relaxed flex flex-col gap-6">
        <Card className="p-8 border-white/5 bg-[#0a0a0c] flex flex-col gap-6">
          <div>
            <h3 className="text-base font-bold text-white mb-2 uppercase tracking-wider">1. Upfront Fixed-Pricing Binds</h3>
            <p>
              Calculated ranges provided by our online Cost Estimator represent non-binding hydraulic parameters based on dynamic inventories. To lock in a fixed rate, candidates must submit their authorized contact details. Once dispatch ticket is assigned, rate quotes bind for up to 30 calendar days.
            </p>
          </div>

          <div>
            <h3 className="text-base font-bold text-white mb-2 uppercase tracking-wider">2. Emergency Dispatch Terms</h3>
            <p>
              Emergency rig dispatch options carry flat-rate fees of $149 as outlined in our dynamic pricing matrix. Our guaranteed 45-minute staging response applies strictly to verified ZIP codes served within Palo Alto municipal boundaries. Extreme traffic/act of God delays waive dispatch fees but do not void core repair rates.
            </p>
          </div>

          <div>
            <h3 className="text-base font-bold text-white mb-2 uppercase tracking-wider">3. Structural Warranties</h3>
            <p>
              Standard field repairs carry a 1-year labor and installation guarantee. Dynamic CIPP sewer lining epoxy sleeves carry an active 50-year manufacture structural warranty against root intrusion or joint failures. Physical alterations executed by outside unlicensed contractors void all active warranties instantly.
            </p>
          </div>

          <div>
            <h3 className="text-base font-bold text-white mb-2 uppercase tracking-wider">4. Contact Administrative Desk</h3>
            <p>
              Administrative legal notices can be submitted directly to our main headquarters at <span className="text-white font-semibold">{meta.address.street}, {meta.address.city}, {meta.address.state} {meta.address.zip}</span>, or by calling our office desk at <span className="text-brand-cyan font-bold">{meta.phone}</span>.
            </p>
          </div>
        </Card>
      </section>

      <Footer />
    </div>
  );
}
