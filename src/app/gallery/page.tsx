'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ArrowRight, Eye, Grid, CheckCircle2 } from 'lucide-react';
import { clientConfig } from '@/config/client.config';
import { EmergencyBanner } from '@/components/layout/emergency-banner';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { BeforeAfterSlider } from '@/components/ui/before-after-slider';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export default function GalleryPage() {
  const [filter, setFilter] = useState<'all' | 'leak-detection' | 'sewer-line' | 'water-heaters' | 'commercial-plumbing'>('all');

  const galleryItems = clientConfig.gallery;

  const filteredItems = galleryItems.filter((item) => {
    if (filter === 'all') return true;
    return item.category === filter;
  });

  const filterTabs = [
    { label: 'All Jobs', value: 'all' as const },
    { label: 'Leak Pinpoints', value: 'leak-detection' as const },
    { label: 'Sewer Liners', value: 'sewer-line' as const },
    { label: 'Water Heaters', value: 'water-heaters' as const },
    { label: 'Commercial Facilities', value: 'commercial-plumbing' as const },
  ];

  // Map local references to rich CDN plumbing representations
  const getImage = (val: string) => {
    switch (val) {
      case '/images/gallery/leak-before.jpg':
        return 'https://images.unsplash.com/photo-1542013936693-8848e574047e?auto=format&fit=crop&w=800&q=80';
      case '/images/gallery/leak-after.jpg':
        return 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&w=800&q=80';
      case '/images/gallery/sewer-before.jpg':
        return 'https://images.unsplash.com/photo-1615906655593-ad0386982a0f?auto=format&fit=crop&w=800&q=80';
      case '/images/gallery/sewer-after.jpg':
        return 'https://images.unsplash.com/photo-1542013936693-8848e574047e?auto=format&fit=crop&w=800&q=80';
      case '/images/gallery/tank-before.jpg':
        return 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80';
      case '/images/gallery/tank-after.jpg':
        return 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=800&q=80';
      case '/images/gallery/backflow-before.jpg':
        return 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&w=800&q=80';
      case '/images/gallery/backflow-after.jpg':
        return 'https://images.unsplash.com/photo-1542013936693-8848e574047e?auto=format&fit=crop&w=800&q=80';
      default:
        return 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&w=800&q=80';
    }
  };

  return (
    <div className="min-h-screen bg-background-dark text-white flex flex-col relative overflow-x-clip">
      <EmergencyBanner />
      <Navbar />

      {/* Hero Header */}
      <header className="relative w-full pt-32 pb-12 md:pt-40 md:pb-16 text-center px-4 overflow-hidden select-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_40%,rgba(79,70,229,0.05),transparent)] pointer-events-none" />
        <div className="max-w-4xl mx-auto flex flex-col items-center gap-4 relative z-10">
          <Badge variant="primary">Work Showcase</Badge>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight bg-gradient-to-b from-white to-neutral-400 bg-clip-text text-transparent">
            Before & After Comparisons
          </h1>
          <p className="text-neutral-400 text-sm sm:text-base max-w-xl leading-relaxed mt-1">
            Real jobs executed by Vortex Flow technicians. Drag the handle to reveal structural restorations.
          </p>
        </div>
      </header>

      {/* Categories filter row */}
      <section className="py-6 select-none relative z-10 flex justify-center">
        <div className="flex flex-wrap gap-2 bg-white/[0.02] border border-white/5 p-2 rounded-2xl max-w-2xl justify-center">
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

      {/* Filterable Comparisons list */}
      <section className="py-12 pb-24 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            layout
            className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10"
          >
            <AnimatePresence mode="popLayout">
              {filteredItems.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 15 }}
                  transition={{ duration: 0.35 }}
                  className="flex flex-col gap-4 text-left"
                >
                  <BeforeAfterSlider
                    beforeImage={getImage(item.beforeImage)}
                    afterImage={getImage(item.afterImage)}
                    beforeLabel="Before Restoration"
                    afterLabel="After Vortex Flow"
                    heightClass="h-[280px] sm:h-[380px]"
                  />
                  <div className="flex flex-col gap-1 px-1.5 select-none">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-brand-cyan">
                      {item.category.replace('-', ' ')}
                    </span>
                    <h3 className="text-lg font-bold text-white tracking-tight">{item.title}</h3>
                    <p className="text-neutral-400 text-xs leading-relaxed mt-1 font-medium">
                      {item.description}
                    </p>
                  </div>
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
