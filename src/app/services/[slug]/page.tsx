import React from 'react';
import { clientConfig } from '@/config/client.config';
import { getServiceSchema } from '@/lib/seo/schema-generator';
import { EmergencyBanner } from '@/components/layout/emergency-banner';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Accordion } from '@/components/ui/accordion';
import { Check, ArrowRight, Flame, Search, Wind, Zap, Shield, Briefcase, Server, ArrowLeft, Phone } from 'lucide-react';

// Generates the static parameter slugs at compile time for strict export (SSG), per next.config.js
export async function generateStaticParams() {
  return clientConfig.services.map((service) => ({
    slug: service.slug,
  }));
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function ServiceDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const service = clientConfig.services.find((s) => s.slug === slug);

  if (!service) {
    return (
      <div className="min-h-screen bg-background-dark text-white flex flex-col justify-center items-center p-6">
        <h1 className="text-2xl font-bold">Service Not Found</h1>
        <a href="/services" className="text-brand-cyan hover:underline mt-4">Back to All Services</a>
      </div>
    );
  }

  const schema = getServiceSchema(service);

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

  const accordionItems = service.faqs.map((faq, idx) => ({
    id: `faq-${idx}`,
    trigger: faq.question,
    content: <p className="leading-relaxed">{faq.answer}</p>,
  }));

  return (
    <div className="min-h-screen bg-background-dark text-white flex flex-col relative overflow-x-clip">
      {/* Inject targeted dynamic Service JSON-LD script for Local SEO compliance */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <EmergencyBanner />
      <Navbar />

      {/* Header Back Button */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 select-none z-10 w-full text-left">
        <a href="/services" className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-neutral-500 hover:text-white transition-colors">
          <ArrowLeft className="h-4 w-4" /> Back to Catalog
        </a>
      </div>

      {/* Hero Header */}
      <header className="relative w-full pt-6 pb-12 text-left px-4 overflow-hidden select-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_10%_40%,rgba(79,70,229,0.04),transparent)] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-4 relative z-10">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-white/[0.02] border border-white/10 flex items-center justify-center shrink-0">
              {getIcon(service.icon)}
            </div>
            <Badge variant="primary" className="uppercase font-bold tracking-widest text-[10px]">
              {service.category} Specialization
            </Badge>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-white to-neutral-400 bg-clip-text text-transparent">
            {service.title}
          </h1>
          <p className="text-neutral-400 text-sm sm:text-base max-w-3xl leading-relaxed mt-1">
            {service.shortDesc}
          </p>
        </div>
      </header>

      {/* Split Column Content Layout */}
      <section className="py-8 pb-24 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Details (Left Side - 8 Cols) */}
          <div className="lg:col-span-8 flex flex-col gap-10 text-left">
            {/* Overview long description */}
            <div className="flex flex-col gap-4">
              <h3 className="text-lg font-bold text-white tracking-tight border-b border-white/5 pb-2.5">
                Technical Overview
              </h3>
              <p className="text-neutral-400 text-sm sm:text-base leading-relaxed font-medium">
                {service.longDesc}
              </p>
            </div>

            {/* Sub-services breakdown */}
            <div className="flex flex-col gap-4">
              <h3 className="text-lg font-bold text-white tracking-tight border-b border-white/5 pb-2.5">
                Operations Specializations
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-1">
                {service.subServices.map((sub, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-white/[0.01] border border-white/5 flex items-center gap-3">
                    <div className="h-2 w-2 rounded-full bg-brand-cyan" />
                    <span className="text-xs font-bold text-neutral-200">{sub}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Interactive Process steps */}
            <div className="flex flex-col gap-5">
              <h3 className="text-lg font-bold text-white tracking-tight border-b border-white/5 pb-2.5">
                Execution Workflow
              </h3>
              <div className="flex flex-col gap-4 mt-2">
                {service.steps.map((step, idx) => (
                  <div key={idx} className="flex gap-4 items-start">
                    <div className="h-8 w-8 rounded-xl bg-brand-indigo/10 border border-brand-indigo/25 flex items-center justify-center text-brand-indigo font-bold text-xs shrink-0 mt-0.5">
                      0{idx + 1}
                    </div>
                    <div className="flex flex-col gap-0.5">
                      <span className="text-sm font-bold text-white">{step.title}</span>
                      <p className="text-neutral-400 text-xs leading-relaxed">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Targeted FAQs accordion */}
            {service.faqs.length > 0 && (
              <div className="flex flex-col gap-4">
                <h3 className="text-lg font-bold text-white tracking-tight border-b border-white/5 pb-2.5">
                  Targeted FAQs
                </h3>
                <Accordion items={accordionItems} className="mt-1" />
              </div>
            )}
          </div>

          {/* Sticky Quote Sidebar (Right Side - 4 Cols) */}
          <div className="lg:col-span-4 lg:sticky lg:top-24 flex flex-col gap-5 text-left">
            <Card className="p-6 sm:p-7 border-brand-indigo/15 bg-gradient-to-b from-card-dark to-[#050507] select-none">
              <div className="flex flex-col gap-1 mb-4">
                <span className="text-[9px] uppercase font-bold tracking-widest text-brand-indigo">Flat-Rate Estimate</span>
                <h4 className="text-base font-bold text-white">Interactive Estimation</h4>
                <p className="text-neutral-500 text-[11px] leading-relaxed">
                  Lock in dynamic pricing for this specialization in real-time.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white/[0.01] border border-white/5 flex justify-between items-center text-xs mb-5">
                <span className="text-neutral-500 font-medium">Binds catalog rate:</span>
                <span className="text-brand-cyan font-extrabold text-sm">{service.priceRange}</span>
              </div>

              {/* Benefits list */}
              <div className="flex flex-col gap-3 text-[11px] text-neutral-400 leading-normal mb-6">
                {service.benefits.map((b, idx) => (
                  <div key={idx} className="flex gap-2 items-start">
                    <Check className="h-3.5 w-3.5 text-brand-cyan shrink-0 mt-0.5" />
                    <span>{b}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-col gap-2">
                <a href="/quote" className="inline-flex w-full">
                  <Button variant="primary" className="w-full text-xs gap-1">
                    Calculate Dynamic Cost <ArrowRight className="h-3.5 w-3.5" />
                  </Button>
                </a>
                <a href={`tel:${clientConfig.meta.phoneRaw}`} className="inline-flex w-full">
                  <Button variant="glass" className="w-full text-xs gap-2 border-white/5">
                    <Phone className="h-3.5 w-3.5 text-brand-cyan" /> Call Local Tech
                  </Button>
                </a>
              </div>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const service = clientConfig.services.find((s) => s.slug === slug);
  return {
    title: service ? service.metaTitle : 'Service Details',
    description: service ? service.metaDesc : 'Vortex Flow & Plumbing specialized services.',
  };
}
