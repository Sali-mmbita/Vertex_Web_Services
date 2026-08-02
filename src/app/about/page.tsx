'use client';

import React from 'react';
import { ShieldCheck, Eye, CheckCircle, Crosshair, Award, AwardIcon, Check, Calendar } from 'lucide-react';
import { clientConfig } from '@/config/client.config';
import { EmergencyBanner } from '@/components/layout/emergency-banner';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function AboutPage() {
  const { name } = clientConfig.meta;
  const aboutData = clientConfig.pageContent.about;

  const valueIcons: Record<string, React.ReactNode> = {
    Crosshair: <Crosshair className="h-6 w-6 text-brand-cyan" />,
    Eye: <Eye className="h-6 w-6 text-brand-indigo" />,
    CheckCircle: <CheckCircle className="h-6 w-6 text-brand-cyan" />,
  };

  return (
    <div className="min-h-screen bg-background-dark text-white flex flex-col relative overflow-x-clip">
      <EmergencyBanner />
      <Navbar />

      {/* Hero section */}
      <header className="relative w-full pt-32 pb-16 md:pt-40 md:pb-20 text-center px-4 overflow-hidden select-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_40%,rgba(79,70,229,0.05),transparent)] pointer-events-none" />
        <div className="max-w-4xl mx-auto flex flex-col items-center gap-4 relative z-10">
          <Badge variant="primary">About Vortex Flow</Badge>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight bg-gradient-to-b from-white to-neutral-400 bg-clip-text text-transparent">
            Our Story & Values
          </h1>
          <p className="text-neutral-400 text-sm sm:text-base max-w-xl leading-relaxed mt-1">
            Setting the standard for professional hydraulic engineering across Silicon Valley since {clientConfig.meta.establishedYear}.
          </p>
        </div>
      </header>

      {/* Main Core Story Section */}
      <section className="py-16 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 flex flex-col gap-6 text-left">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              {aboutData.story.title}
            </h2>
            <div className="flex flex-col gap-5 text-sm text-neutral-400 leading-relaxed font-medium">
              {aboutData.story.paragraphs.map((para, idx) => (
                <p key={idx}>{para}</p>
              ))}
            </div>
          </div>

          <div className="lg:col-span-6 relative flex items-center justify-center">
            {/* Visual spotlight grid backing the story card */}
            <div className="absolute inset-0 bg-gradient-to-tr from-brand-indigo/10 to-brand-cyan/10 rounded-3xl blur-3xl pointer-events-none" />
            <Card className="p-8 border-white/5 relative z-10 max-w-lg bg-gradient-to-b from-card-dark to-[#050507]">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <Award className="h-5 w-5 text-brand-cyan" /> Enterprise Certifications
              </h3>
              <div className="flex flex-col gap-4 text-xs text-neutral-400 leading-relaxed">
                <div className="flex gap-3.5 items-start">
                  <div className="h-6 w-6 rounded-full bg-brand-cyan/10 flex items-center justify-center text-brand-cyan shrink-0 mt-0.5"><Check className="h-3.5 w-3.5 stroke-[3]" /></div>
                  <div>
                    <span className="text-white font-bold block">CA C-36 Licensing</span>
                    <span>Licensed master plumbers certified under contract CSLB #984210.</span>
                  </div>
                </div>
                <div className="flex gap-3.5 items-start">
                  <div className="h-6 w-6 rounded-full bg-brand-cyan/10 flex items-center justify-center text-brand-cyan shrink-0 mt-0.5"><Check className="h-3.5 w-3.5 stroke-[3]" /></div>
                  <div>
                    <span className="text-white font-bold block">AWWA Backflow Certified</span>
                    <span>Accredited specialists authorized to inspect and submit backflow prevention stamps.</span>
                  </div>
                </div>
                <div className="flex gap-3.5 items-start">
                  <div className="h-6 w-6 rounded-full bg-brand-cyan/10 flex items-center justify-center text-brand-cyan shrink-0 mt-0.5"><Check className="h-3.5 w-3.5 stroke-[3]" /></div>
                  <div>
                    <span className="text-white font-bold block">CIPP Sewer Liners Mastery</span>
                    <span>Accredited in trenchless Cured-in-Place Pipe (CIPP) material applications.</span>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Section 2: Core Values Grid */}
      <section className="py-20 border-y border-white/5 bg-[#040406] relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-xl mx-auto text-center flex flex-col gap-2 select-none mb-12">
            <Badge variant="primary" className="mx-auto">Our Creed</Badge>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">Engineering Core Mandates</h2>
            <p className="text-neutral-400 text-xs leading-relaxed max-w-sm mx-auto">
              Every technician aligns strictly to our three foundational customer service guidelines.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {aboutData.values.map((val, idx) => (
              <Card key={idx} className="p-6 flex flex-col gap-4 text-left border-white/5">
                <div className="h-12 w-12 rounded-2xl bg-white/[0.02] border border-white/10 flex items-center justify-center">
                  {valueIcons[val.icon] || <ShieldCheck className="h-6 w-6 text-brand-cyan" />}
                </div>
                <div>
                  <h4 className="text-base font-bold text-white tracking-tight">{val.title}</h4>
                  <p className="text-neutral-400 text-xs leading-relaxed mt-2">{val.desc}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Section 3: History Timeline */}
      <section className="py-24 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-xl mx-auto text-center flex flex-col gap-2 select-none mb-16">
            <Badge variant="secondary" className="mx-auto">The Journey</Badge>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">Milestones & Growth</h2>
            <p className="text-neutral-400 text-xs leading-relaxed">
              Tracking our development from single diagnostics truck to an award-winning enterprise.
            </p>
          </div>

          {/* Interactive Timeline Layout */}
          <div className="max-w-3xl mx-auto relative flex flex-col gap-10 select-none">
            {/* Vertical timeline spine */}
            <div className="absolute left-6 top-2 bottom-2 w-[1px] bg-white/5 hidden md:block" />

            {aboutData.timeline.map((time, idx) => (
              <div key={idx} className="flex flex-col md:flex-row gap-6 items-start relative">
                {/* Timeline node dot */}
                <div className="h-12 w-12 rounded-2xl bg-[#0a0a0c] border border-white/10 flex items-center justify-center text-brand-cyan font-black text-xs z-15 shrink-0 shadow-[0_0_15px_rgba(6,182,212,0.1)]">
                  {time.year}
                </div>

                <Card className="flex-1 p-6 text-left border-white/5 bg-gradient-to-b from-card-dark to-[#050507]">
                  <h4 className="text-sm font-bold text-white tracking-tight flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-brand-indigo" /> {time.title}
                  </h4>
                  <p className="text-neutral-400 text-xs leading-relaxed mt-2 font-medium">
                    {time.desc}
                  </p>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
