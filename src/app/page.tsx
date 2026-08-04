'use client';

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Sparkles, ArrowRight, ShieldCheck, Flame, Zap, Award, Activity, Star } from 'lucide-react';
import { clientConfig } from '@/config/client.config';
import { EmergencyBanner } from '@/components/layout/emergency-banner';
import { Navbar } from '@/components/layout/navbar';
import { CostEstimator } from '@/components/features/cost-estimator';
import { CoverageMap } from '@/components/features/coverage-map';
import { FinancingCalculator } from '@/components/features/financing-calculator';
import { BeforeAfterSlider } from '@/components/ui/before-after-slider';
import { Footer } from '@/components/layout/footer';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

// Register ScrollTrigger with GSAP globally
gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Wrap GSAP animations in a context for memory safety/cleanup on unmount, per GEMINI.md
    const ctx = gsap.context(() => {
      // 1. Subtle parallax floating effect on the hero background glow spotlights
      gsap.to('.hero-glow-1', {
        y: 40,
        x: 20,
        duration: 8,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
      gsap.to('.hero-glow-2', {
        y: -40,
        x: -20,
        duration: 6,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });

      // 2. Trigger entry animations on hero load
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1.2, ease: 'power4.out', delay: 0.1 }
      );
      gsap.fromTo(
        subtitleRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1.2, ease: 'power3.out', delay: 0.25 }
      );
      gsap.fromTo(
        '.hero-cta',
        { opacity: 0, scale: 0.95 },
        { opacity: 1, scale: 1, duration: 0.8, ease: 'back.out(1.7)', delay: 0.4 }
      );

      // 3. Stagger reveal metrics cards on scroll
      gsap.fromTo(
        '.metric-reveal-card',
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.85,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.metrics-section-trigger',
            start: 'top 85%',
          },
        }
      );
    }, heroRef);

    return () => ctx.revert(); // Revert timeline state upon unmount to prevent leaks
  }, []);

  const meta = clientConfig.meta;
  const homeData = clientConfig.pageContent.home;

  // Unsplash CDN plumbing placeholders
  const pipeLeakImage = 'https://i.pinimg.com/736x/03/bb/ec/03bbec6dbf085d116512f900b1e9df1f.jpg';
  const pipeCleanImage = 'https://i.pinimg.com/736x/03/bb/ec/03bbec6dbf085d116512f900b1e9df1f.jpg';

  return (
    <div ref={heroRef} className="min-h-screen bg-background-dark text-white flex flex-col relative overflow-x-clip">
      {/* 24/7 Neon Announcement Banner */}
      <EmergencyBanner />

      {/* Sticky Global Navigation */}
      <Navbar />

      {/* SECTION 1: HERO SPOTLIGHT (Apple/Linear spatial aesthetic) */}
      <header className="relative w-full pt-32 pb-24 md:pt-40 md:pb-36 flex flex-col items-center justify-center text-center px-4 overflow-hidden">
        {/* Dynamic radial glow beacons */}
        <div className="hero-glow-1 absolute top-[10%] left-[15%] w-80 h-80 bg-brand-indigo/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="hero-glow-2 absolute bottom-[20%] right-[15%] w-80 h-80 bg-brand-cyan/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_40%,rgba(79,70,229,0.06),transparent)] pointer-events-none" />

        <div className="max-w-4xl mx-auto flex flex-col items-center gap-6 relative z-10 select-none">
          <Badge variant="primary" className="hero-badge motion-reduce:transform-none">
            <Sparkles className="h-3 w-3 text-brand-cyan" /> {homeData.hero.badge}
          </Badge>

          <h1
            ref={titleRef}
            className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight leading-[1.08] bg-gradient-to-b from-white via-neutral-100 to-neutral-400 bg-clip-text text-transparent"
          >
            {homeData.hero.title}
          </h1>

          <p
            ref={subtitleRef}
            className="text-neutral-400 text-sm sm:text-base md:text-lg max-w-2xl leading-relaxed mt-2"
          >
            {homeData.hero.subtitle}
          </p>

          {/* Quick CTA row */}
          <div className="hero-cta flex flex-col sm:flex-row items-center gap-4 mt-6 w-full sm:w-auto">
            <a href="#estimator" className="inline-flex w-full sm:w-auto">
              <Button variant="primary" size="lg" className="gap-2 w-full sm:w-auto">
                {homeData.hero.ctaPrimary} <ArrowRight className="h-4 w-4" />
              </Button>
            </a>
            <a href={`tel:${meta.emergencyPhoneRaw}`} className="inline-flex w-full sm:w-auto">
              <Button variant="glass" size="lg" className="gap-2 border-rose-500/20 text-rose-400 hover:border-rose-500/30 hover:bg-rose-500/5 w-full sm:w-auto">
                <Flame className="h-4 w-4 text-rose-500 animate-pulse" /> {homeData.hero.ctaSecondary}
              </Button>
            </a>
          </div>
        </div>
      </header>

      {/* SECTION 2: METRICS COUNTER GRID */}
      <section className="metrics-section-trigger py-16 border-y border-white/5 relative z-10 bg-[#040406]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {homeData.metrics.map((metric, idx) => (
              <div
                key={idx}
                className="metric-reveal-card p-6 rounded-3xl bg-white/[0.01] border border-white/5 flex flex-col gap-1.5 text-center sm:text-left select-none"
              >
                <span className="text-[10px] uppercase font-bold tracking-widest text-neutral-500">
                  {metric.label}
                </span>
                <span className="text-3xl sm:text-4xl font-black text-white bg-gradient-to-r from-white to-neutral-400 bg-clip-text text-transparent">
                  {metric.value}
                </span>
                <span className="text-xs text-neutral-400 font-medium">
                  {metric.desc}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 3: CENTERPIECE STATEFUL ESTIMATOR */}
      <section id="estimator" className="py-24 sm:py-28 relative z-10 overflow-hidden">
        {/* Abstract vector guidelines represent pipelines flows */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_50%,rgba(6,182,212,0.04),transparent)] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-12 sm:gap-14">
          <div className="max-w-2xl mx-auto text-center flex flex-col gap-3 select-none">
            <Badge variant="secondary" className="mx-auto">Instant Quote Engine</Badge>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white">
              Dynamic Hydraulic Quote Generator
            </h2>
            <p className="text-neutral-400 text-sm leading-relaxed max-w-lg mx-auto">
              Get an instant calibrated pricing range for any residential or commercial service. No hourly surprise fees. Flat-rates locked in under 60 seconds.
            </p>
          </div>

          <CostEstimator />
        </div>
      </section>

      {/* SECTION 4: BEFORE & AFTER VISUAL COMPARISON (CIPP Sewer Restoration) */}
      <section className="py-24 border-t border-white/5 bg-[#040406] relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 flex flex-col gap-5 text-left select-none">
            <Badge variant="primary" className="w-fit">Precision Restoration</Badge>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white leading-tight">
              Trenchless sewer pipelines CIPP curing.
            </h2>
            <p className="text-neutral-400 text-sm leading-relaxed">
              We restore underground line structures from the inside out using structural epoxy sleeve lining. No driveways demolished. No mature trees damaged. 100% seamless pipe sleeve with a <span className="text-white font-semibold">50-year structural warranty</span>.
            </p>
            <div className="flex flex-col gap-3.5 mt-3 text-xs text-neutral-400 font-medium">
              <div className="flex items-center gap-2.5">
                <div className="h-5 w-5 rounded-full bg-brand-cyan/10 flex items-center justify-center text-brand-cyan"><Star className="h-3 w-3 fill-brand-cyan" /></div>
                <span>95% cheaper than traditional yard excavation</span>
              </div>
              <div className="flex items-center gap-2.5">
                <div className="h-5 w-5 rounded-full bg-brand-cyan/10 flex items-center justify-center text-brand-cyan"><Star className="h-3 w-3 fill-brand-cyan" /></div>
                <span>Completed within 4-6 hours with zero utility disruption</span>
              </div>
            </div>
            <a href="/gallery" className="inline-flex mt-2">
              <Button variant="glass" className="gap-2 text-xs border-white/10 hover:border-brand-cyan">
                View Project Gallery <ArrowRight className="h-3.5 w-3.5" />
              </Button>
            </a>
          </div>

          <div className="lg:col-span-7 w-full">
            <BeforeAfterSlider
              beforeImage={pipeLeakImage}
              afterImage={pipeCleanImage}
              beforeLabel="Ruptured / Blocked Line"
              afterLabel="Seamless Epoxy Sleeve"
            />
          </div>
        </div>
      </section>

      {/* SECTION 5: COVERAGE MAP ZIP CODES */}
      <section className="py-24 border-t border-white/5 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center flex flex-col gap-3 select-none mb-14">
            <Badge variant="secondary" className="mx-auto">Sectors Map</Badge>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
              Staged Regional Fleet Coordinates
            </h2>
            <p className="text-neutral-400 text-sm leading-relaxed max-w-md mx-auto">
              Our rolling warehouses track traffic dynamically via GPS and are dispatched within 10 minutes. Check your availability below.
            </p>
          </div>

          <CoverageMap />
        </div>
      </section>

      {/* SECTION 6: FINANCING PAYMENT ESTIMATOR */}
      <section className="py-24 border-t border-white/5 bg-[#040406] relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center flex flex-col gap-3 select-none mb-14">
            <Badge variant="primary" className="mx-auto">Flex-Pay Options</Badge>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
              Endless Endless Flow. 0% Interest Financing.
            </h2>
            <p className="text-neutral-400 text-sm leading-relaxed max-w-md mx-auto">
              Surgically repair or upgrade your home facilities without draining your cash savings. Flexible monthly repayment installments.
            </p>
          </div>

          <FinancingCalculator />
        </div>
      </section>

      {/* Comprehensive Enterprise Footer */}
      <Footer />
    </div>
  );
}
