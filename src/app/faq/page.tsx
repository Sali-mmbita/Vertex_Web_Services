'use client';

import React, { useState } from 'react';
import { Search, HelpCircle, AlertCircle, Phone } from 'lucide-react';
import { clientConfig } from '@/config/client.config';
import { EmergencyBanner } from '@/components/layout/emergency-banner';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { Accordion } from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function FAQHubPage() {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState<'All' | 'General' | 'Pricing' | 'Emergency' | 'Services'>('All');

  const faqs = clientConfig.faqs;

  // Filter FAQ items dynamically by category & search query keywords
  const filteredFaqs = faqs.filter((faq) => {
    const matchesCategory = activeCategory === 'All' || faq.category === activeCategory;
    const matchesSearch =
      faq.question.toLowerCase().includes(search.toLowerCase()) ||
      faq.answer.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const categories = ['All', 'General', 'Pricing', 'Emergency', 'Services'] as const;

  const accordionItems = filteredFaqs.map((faq, idx) => ({
    id: `faq-${idx}`,
    trigger: faq.question,
    content: <p className="leading-relaxed">{faq.answer}</p>,
  }));

  return (
    <div className="min-h-screen bg-background-dark text-white flex flex-col relative overflow-x-clip">
      <EmergencyBanner />
      <Navbar />

      {/* Hero Header */}
      <header className="relative w-full pt-32 pb-12 md:pt-40 md:pb-16 text-center px-4 overflow-hidden select-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_40%,rgba(6,182,212,0.05),transparent)] pointer-events-none" />
        <div className="max-w-4xl mx-auto flex flex-col items-center gap-4 relative z-10">
          <Badge variant="secondary">Knowledge Base</Badge>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight bg-gradient-to-b from-white to-neutral-400 bg-clip-text text-transparent">
            FAQ support Hub
          </h1>
          <p className="text-neutral-400 text-sm sm:text-base max-w-xl leading-relaxed mt-1">
            Search our comprehensive documentation covering licensing, pricing matrix systems, and response times.
          </p>
        </div>
      </header>

      {/* Search and Category Filter triggers */}
      <section className="py-6 select-none relative z-10 flex flex-col items-center gap-6 max-w-2xl mx-auto w-full px-4">
        {/* Search Input bar */}
        <div className="w-full relative">
          <Input
            placeholder="Search questions or keyword answers..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-12 border-white/10 pl-11"
          />
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-500" />
        </div>

        {/* Categories tags row */}
        <div className="flex flex-wrap gap-2 justify-center">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3.5 py-1 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all duration-300 outline-none ${
                activeCategory === cat
                  ? 'bg-brand-indigo text-white shadow-[0_0_15px_rgba(79,70,229,0.35)]'
                  : 'text-neutral-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Accordion List container */}
      <section className="py-12 pb-24 relative z-10 px-4">
        <div className="max-w-3xl mx-auto w-full">
          {accordionItems.length > 0 ? (
            <Accordion items={accordionItems} allowMultiple={true} />
          ) : (
            <div className="p-8 rounded-3xl bg-white/[0.01] border border-white/5 text-center flex flex-col items-center justify-center gap-4 py-16 select-none">
              <div className="h-11 w-11 rounded-full bg-white/5 flex items-center justify-center text-neutral-500">
                <HelpCircle className="h-5 w-5" />
              </div>
              <div>
                <h4 className="text-base font-bold text-white">No Matching FAQs Found</h4>
                <p className="text-neutral-400 text-xs mt-1 max-w-xs mx-auto leading-relaxed">
                  Try adjusting search keywords or clearing your category filters to find the right answer.
                </p>
              </div>
            </div>
          )}

          {/* Quick contact block under accordions */}
          <div className="mt-16 p-8 rounded-3xl bg-gradient-to-r from-brand-indigo/10 to-transparent border border-brand-indigo/15 text-left flex flex-col sm:flex-row justify-between items-center gap-6 select-none">
            <div className="max-w-md">
              <h4 className="text-base font-bold text-white tracking-tight flex items-center gap-2">
                Still Need Assistance?
              </h4>
              <p className="text-neutral-400 text-xs mt-1.5 leading-relaxed">
                Our support clerks operate 24 hours a day to answer hydraulic questions and route technicians.
              </p>
            </div>
            <a href={`tel:${clientConfig.meta.phoneRaw}`} className="inline-flex shrink-0">
              <Button variant="primary" size="md" className="gap-2">
                <Phone className="h-4 w-4" /> Call support Office
              </Button>
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
