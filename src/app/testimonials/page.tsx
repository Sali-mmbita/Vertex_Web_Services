'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, MessageSquare, Award, CheckCircle2, ShieldCheck } from 'lucide-react';
import { clientConfig } from '@/config/client.config';
import { EmergencyBanner } from '@/components/layout/emergency-banner';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function TestimonialsPage() {
  const [filter, setFilter] = useState<'all' | 'Google' | 'Yelp' | 'Verified'>('all');

  const testimonials = clientConfig.testimonials;
  const meta = clientConfig.meta;

  const filteredReviews = testimonials.filter((item) => {
    if (filter === 'all') return true;
    return item.source === filter;
  });

  const filterTabs = [
    { label: 'All Reviews', value: 'all' as const },
    { label: 'Google Maps', value: 'Google' as const },
    { label: 'Yelp Business', value: 'Yelp' as const },
    { label: 'Verified Direct', value: 'Verified' as const },
  ];

  return (
    <div className="min-h-screen bg-background-dark text-white flex flex-col relative overflow-x-clip">
      <EmergencyBanner />
      <Navbar />

      {/* Hero Header */}
      <header className="relative w-full pt-32 pb-12 md:pt-40 md:pb-16 text-center px-4 overflow-hidden select-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_40%,rgba(79,70,229,0.05),transparent)] pointer-events-none" />
        <div className="max-w-4xl mx-auto flex flex-col items-center gap-4 relative z-10">
          <Badge variant="primary">Social Proof</Badge>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight bg-gradient-to-b from-white to-neutral-400 bg-clip-text text-transparent">
            Verified Customer Proof
          </h1>
          <p className="text-neutral-400 text-sm sm:text-base max-w-xl leading-relaxed mt-1">
            See how Vortex Flow helps Palo Alto residential estates and commercial restaurants stabilize their facilities.
          </p>
        </div>
      </header>

      {/* Section 1: Dynamic Rating Summary Badge board */}
      <section className="py-6 select-none relative z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 bg-white/[0.01] border border-white/5 p-6 rounded-3xl items-center text-center">
            {/* Total Rating score */}
            <div className="flex flex-col gap-1">
              <span className="text-3xl font-black text-white">{meta.rating}★</span>
              <div className="flex justify-center gap-0.5 text-brand-cyan">
                {[...Array(5)].map((_, i) => <Star key={i} className="h-4 w-4 fill-brand-cyan" />)}
              </div>
              <span className="text-[10px] text-neutral-500 uppercase tracking-widest font-semibold mt-1">
                Trust Index Score
              </span>
            </div>

            {/* Total Reviews counts */}
            <div className="flex flex-col gap-1 sm:border-x sm:border-white/5 py-2">
              <span className="text-3xl font-black text-white">{meta.reviewCount}+</span>
              <span className="text-xs text-neutral-400 font-medium">Verified Submissions</span>
              <span className="text-[10px] text-neutral-500 uppercase tracking-widest font-semibold mt-1">
                Aggregate Volume
              </span>
            </div>

            {/* Verification secure parameters */}
            <div className="flex flex-col gap-1 items-center justify-center">
              <div className="h-7 w-7 rounded-full bg-emerald-500/10 border border-emerald-500/25 flex items-center justify-center text-emerald-400"><ShieldCheck className="h-4.5 w-4.5" /></div>
              <span className="text-xs text-emerald-400 font-bold mt-1">100% SECURE & VERIFIED</span>
              <span className="text-[10px] text-neutral-500 uppercase tracking-widest font-semibold mt-0.5">
                Authenticity Lock
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Category filters */}
      <section className="py-4 select-none relative z-10 flex justify-center">
        <div className="flex flex-wrap gap-2 bg-white/[0.02] border border-white/5 p-1.5 rounded-2xl max-w-lg justify-center">
          {filterTabs.map((tab) => (
            <button
              key={tab.value}
              onClick={() => setFilter(tab.value)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all duration-300 outline-none ${
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

      {/* Review list cards */}
      <section className="py-12 pb-24 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8"
          >
            <AnimatePresence mode="popLayout">
              {filteredReviews.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="p-6 flex flex-col justify-between text-left h-full border-white/5 bg-gradient-to-b from-card-dark to-[#050507]">
                    <div className="flex flex-col gap-4">
                      {/* Review Card header */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="h-9 w-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center font-bold text-neutral-300 text-xs uppercase">
                            {item.author.split(' ')[0][0]}{item.author.split(' ')[1]?.[0] || ''}
                          </div>
                          <div className="flex flex-col">
                            <span className="text-xs font-bold text-white">{item.author}</span>
                            <span className="text-[10px] text-neutral-500">{item.role}</span>
                          </div>
                        </div>

                        <span className={`text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-md border ${
                          item.source === 'Google'
                            ? 'bg-blue-500/10 text-blue-400 border-blue-500/20'
                            : item.source === 'Yelp'
                            ? 'bg-rose-500/10 text-rose-400 border-rose-500/20'
                            : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                        }`}>
                          {item.source}
                        </span>
                      </div>

                      {/* Stars count */}
                      <div className="flex gap-0.5 text-brand-cyan">
                        {[...Array(item.rating)].map((_, i) => <Star key={i} className="h-3.5 w-3.5 fill-brand-cyan" />)}
                      </div>

                      {/* Review Text */}
                      <p className="text-neutral-300 text-xs sm:text-sm leading-relaxed font-medium italic">
                        "{item.text}"
                      </p>
                    </div>

                    <div className="border-t border-white/5 pt-3 mt-4 text-[10px] text-neutral-500 flex justify-between items-center font-semibold uppercase tracking-wider">
                      <span>Submitted: {item.date}</span>
                      <span className="flex items-center gap-1 text-emerald-500"><CheckCircle2 className="h-3.5 w-3.5" /> Checked</span>
                    </div>
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
