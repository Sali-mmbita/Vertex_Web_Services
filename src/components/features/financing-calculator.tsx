'use client';

import React, { useState } from 'react';
import { Percent, ShieldCheck, Check, Calendar, ArrowRight, DollarSign } from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { clientConfig } from '@/config/client.config';

export function FinancingCalculator() {
  const [jobCost, setJobCost] = useState(2500); // Default estimate

  // Interest Rates Configurations
  const tiers = [
    {
      months: 12,
      apr: 0,
      label: 'Promo Plan (Interest Free)',
      desc: 'Pay zero interest over 12 months. Ideal for quick repairs and immediate restorations.',
      badge: 'Most Popular',
    },
    {
      months: 24,
      apr: 5.99,
      label: 'Standard Extension',
      desc: 'Low interest rate with an extended period. Great for water heater upgrades.',
      badge: 'Low Rate',
    },
    {
      months: 36,
      apr: 8.99,
      label: 'Maximum Flexibility',
      desc: 'Lowest monthly payments, spread comfortably over 3 years. Perfect for trenchless linings.',
      badge: 'Best Monthly',
    },
  ];

  // Calculate monthly payment formula: P = (r * PV) / (1 - (1 + r)^(-n))
  const calculateMonthlyPayment = (cost: number, months: number, apr: number) => {
    if (apr === 0) return Math.round(cost / months);
    const r = (apr / 100) / 12; // Monthly rate
    const payment = (r * cost) / (1 - Math.pow(1 + r, -months));
    return Math.round(payment);
  };

  return (
    <div className="w-full max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch select-none">
      {/* Cost Selection Slider Card (Left Side) */}
      <Card className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between border-white/5 bg-gradient-to-b from-card-dark to-[#050507]">
        <div className="flex flex-col gap-1.5 mb-6">
          <span className="text-[10px] uppercase font-bold tracking-widest text-brand-cyan">
            Flex-Pay Engine
          </span>
          <h3 className="text-xl font-bold tracking-tight text-white">
            Set Project Budget
          </h3>
          <p className="text-neutral-400 text-xs mt-1 leading-normal">
            Drag the slider to match your estimated plumbing project or repair budget.
          </p>
        </div>

        <div className="my-8 flex-1 flex flex-col justify-center gap-6">
          <div className="relative p-6 rounded-2xl bg-white/[0.02] border border-white/5 text-center flex flex-col items-center justify-center">
            <span className="text-[10px] uppercase tracking-widest text-neutral-500 font-semibold">
              Project Cost Input
            </span>
            <div className="flex items-center justify-center text-brand-cyan mt-1.5">
              <DollarSign className="h-6 w-6 stroke-[3] -mr-1" />
              <span className="text-4xl font-extrabold tracking-tighter text-white">
                {jobCost.toLocaleString()}
              </span>
            </div>
          </div>

          <Slider
            min={500}
            max={12000}
            step={100}
            value={jobCost}
            onChange={setJobCost}
            formatValue={(v) => `$${v.toLocaleString()}`}
          />
        </div>

        <div className="border-t border-white/5 pt-4 flex flex-col gap-2 text-xs text-neutral-500">
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-brand-cyan shrink-0" />
            <span>Instant soft-pull credit check has 0% credit impact</span>
          </div>
          <div className="flex items-center gap-2">
            <Percent className="h-4 w-4 text-brand-indigo shrink-0" />
            <span>Pre-approved in under 60 seconds online</span>
          </div>
        </div>
      </Card>

      {/* Financing Tier Cards (Right Side) */}
      <div className="lg:col-span-7 flex flex-col gap-3">
        {tiers.map((tier) => {
          const payment = calculateMonthlyPayment(jobCost, tier.months, tier.apr);
          const totalPaid = payment * tier.months;
          const totalInterest = totalPaid - jobCost;

          return (
            <Card
              key={tier.months}
              className="p-5 flex flex-col sm:flex-row items-center justify-between gap-4 border-white/5 hover:border-brand-indigo/20 transition-all duration-300 relative group overflow-hidden bg-[#0a0a0c]"
            >
              {/* Promotional highlight decoration on 0% plan */}
              {tier.apr === 0 && (
                <div className="absolute top-0 right-0 w-24 h-24 bg-brand-indigo/5 rounded-full blur-2xl pointer-events-none" />
              )}

              <div className="flex-1 flex gap-4 items-start text-left">
                <div className="h-10 w-10 rounded-xl bg-white/[0.02] border border-white/10 flex items-center justify-center text-brand-indigo shrink-0 mt-0.5">
                  <Calendar className="h-5 w-5" />
                </div>
                <div className="flex flex-col gap-0.5">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-white leading-none">{tier.label}</span>
                    <span className="px-2 py-0.5 rounded-md text-[9px] font-bold uppercase tracking-wider bg-brand-indigo/10 border border-brand-indigo/25 text-brand-indigo leading-none">
                      {tier.months} Mo / {tier.apr}% APR
                    </span>
                  </div>
                  <p className="text-neutral-400 text-xs leading-relaxed mt-1.5 pr-2">
                    {tier.desc}
                  </p>
                </div>
              </div>

              {/* Monthly Cost Readout */}
              <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-3 sm:gap-1 shrink-0 w-full sm:w-auto border-t sm:border-t-0 border-white/5 pt-3 sm:pt-0">
                <div className="text-left sm:text-right">
                  <span className="text-[10px] uppercase font-semibold text-neutral-500 tracking-wider">
                    Monthly
                  </span>
                  <div className="text-2xl font-black text-white tracking-tight sm:-mt-0.5">
                    ${payment}
                    <span className="text-xs text-neutral-500 font-medium">/mo</span>
                  </div>
                </div>

                <a href={`/quote`} className="inline-flex shrink-0">
                  <Button
                    variant="glass"
                    size="sm"
                    className="h-8 px-3 text-xs gap-1 hover:border-brand-cyan group-hover:bg-brand-cyan/10 group-hover:text-brand-cyan border-white/5"
                  >
                    Select Plan <ArrowRight className="h-3 w-3" />
                  </Button>
                </a>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
export default FinancingCalculator;
