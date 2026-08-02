'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Flame, Shield, ArrowRight, Server, Check, Briefcase, Zap, Wind } from 'lucide-react';
import { clientConfig } from '@/config/client.config';
import { EmergencyBanner } from '@/components/layout/emergency-banner';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export default function ServicesPage() {
  const [filter, setFilter] = useState<'all' | 'residential' | 'commercial' | 'emergency'>('all');

  const services = clientConfig.services;

  const filteredServices = services.filter((s) => {
    if (filter === 'all') return true;
    return s.category === filter;
  });

  const filterTabs = [
    { label: 'All Services', value: 'all' as const },
    { label: 'Residential', value: 'residential' as const },
    { label: 'Commercial', value: 'commercial' as const },
    { label: 'Emergency Rigs', value: 'emergency' as const },
  ];

  // Helper matching Lucide icons dynamically to avoid bundling issues
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Flame':
        return <Flame className="h-6 w-6 text-rose-400" />;
      case 'Search':
        return <Search className="h-6 w-6 text-brand-cyan" />;
      case 'Wind':
        return <Wind className="h-6 w-6 text-emerald-400" />;
      case 'Zap':
        return <Zap className="h-6 w-6 text-amber-400" />;
      case 'Shield':
        return <Shield className="h-6 w-6 text-brand-indigo" />;
      case 'Briefcase':
        return <Briefcase className="h-6 w-6 text-blue-400" />;
      default:
        return <Server className="h-6 w-6 text-neutral-400" />;
    }
  };

  return (
    <div className="min-h-screen bg-background-dark text-white flex flex-col relative overflow-x-clip">
      <EmergencyBanner />
      <Navbar />

      {/* Hero Header */}
      <header className="relative w-full pt-32 pb-12 md:pt-40 md:pb-16 text-center px-4 overflow-hidden select-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_40%,rgba(6,182,212,0.05),transparent)] pointer-events-none" />
        <div className="max-w-4xl mx-auto flex flex-col items-center gap-4 relative z-10">
          <Badge variant="secondary">Catalog Index</Badge>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight bg-gradient-to-b from-white to-neutral-400 bg-clip-text text-transparent">
            Our Hydraulic Engineering Solutions
          </h1>
          <p className="text-neutral-400 text-sm sm:text-base max-w-xl leading-relaxed mt-1">
            Pinpoint ultrasonic diagnostics, 4000 PSI hydro-jetting, and seamless trenchless sewer replacements. Complete fixed-rate pricing up front.
          </p>
        </div>
      </header>

      {/* Services Filter Category Tabs */}
      <section className="py-6 select-none relative z-10 flex justify-center">
        <div className="flex flex-wrap gap-2.5 bg-white/[0.02] border border-white/5 p-2 rounded-2xl max-w-lg justify-center">
          {filterTabs.map((tab) => (
            <button
              key={tab.value}
              onClick={() => setFilter(tab.value)}
              className={`px-4 py-1.5 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all duration-300 outline-none ${
                filter === tab.value
                  ? 'bg-brand-indigo text-white shadow-[0_0_15px_rgba(79,70,229,0.3)]'
                  : 'text-neutral-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </section>

      {/* Grid List */}
      <section className="py-12 pb-24 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
          >
            <AnimatePresence mode="popLayout">
              {filteredServices.map((serv) => (
                <motion.div
                  key={serv.slug}
                  layout
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-col h-full"
                >
                  <Card className="flex flex-col justify-between h-full border-white/5 hover:border-brand-indigo/15 bg-gradient-to-b from-card-dark to-[#050507]">
                    <div>
                      {/* Top Visual Accent icon */}
                      <CardHeader className="flex flex-row items-center justify-between p-6 pb-2">
                        <div className="h-12 w-12 rounded-xl bg-white/[0.02] border border-white/10 flex items-center justify-center">
                          {getIcon(serv.icon)}
                        </div>
                        <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-500 bg-white/5 px-2.5 py-1 rounded-full border border-white/5">
                          {serv.category}
                        </span>
                      </CardHeader>

                      <div className="p-6 pt-3 flex flex-col gap-2.5 text-left">
                        <h3 className="text-lg font-bold text-white tracking-tight">{serv.title}</h3>
                        <p className="text-neutral-400 text-xs leading-relaxed font-medium line-clamp-3">
                          {serv.shortDesc}
                        </p>
                      </div>

                      {/* Benefits summaries */}
                      <div className="px-6 pb-6 pt-1 flex flex-col gap-2 text-xs text-neutral-400 text-left border-t border-white/5 my-3">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-500 mb-1 block">Key Specs:</span>
                        {serv.benefits.slice(0, 2).map((b, bIdx) => (
                          <div key={bIdx} className="flex gap-2 items-start leading-normal">
                            <Check className="h-3.5 w-3.5 text-brand-cyan shrink-0 mt-0.5" />
                            <span className="line-clamp-1">{b}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <CardFooter className="p-6 pt-3 border-t border-white/5 flex items-center justify-between text-xs select-none">
                      <div className="text-left">
                        <span className="text-[10px] uppercase font-bold text-neutral-500 block">Pricing from</span>
                        <span className="text-base font-extrabold text-brand-cyan">{serv.priceRange}</span>
                      </div>

                      <a href={`/services/${serv.slug}`} className="inline-flex">
                        <Button
                          variant="glass"
                          size="sm"
                          className="h-8.5 text-xs font-semibold gap-1 border-white/5 hover:border-brand-indigo"
                        >
                          Details <ArrowRight className="h-3 w-3" />
                        </Button>
                      </a>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
