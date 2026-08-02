'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, ArrowRight, ArrowLeft, Loader2, Sparkles, AlertCircle, Phone } from 'lucide-react';
import { clientConfig } from '@/config/client.config';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

type Step = 'service' | 'urgency' | 'property' | 'addons' | 'contact' | 'success';

export function CostEstimator() {
  // Wizard State
  const [currentStep, setCurrentStep] = useState<Step>('service');
  const [selectedService, setSelectedService] = useState<string>('leak-detection');
  const [selectedUrgency, setSelectedUrgency] = useState<string>('routine');
  const [selectedProperty, setSelectedProperty] = useState<string>('residential');
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);
  
  // Form State
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [zip, setZip] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  // Submission State
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Flow pricing config references
  const pricing = clientConfig.pricing;
  const services = clientConfig.services;

  // Retrieve current active configurations
  const activeService = services.find((s) => s.slug === selectedService) || services[0];
  const activeUrgency = pricing.urgencyFactors.find((u) => u.value === selectedUrgency) || pricing.urgencyFactors[0];
  const activeProperty = pricing.propertyMultipliers.find((p) => p.value === selectedProperty) || pricing.propertyMultipliers[0];

  // Calculate dynamic quote range
  const baseRate = pricing.baseRates[selectedService] || 150;
  const propertyMult = activeProperty.multiplier;
  const urgencyMult = activeUrgency.multiplier;
  const urgencyFee = activeUrgency.fee;
  
  const addonsSum = selectedAddons.reduce((sum, addonVal) => {
    const addonObj = pricing.addOnOptions.find((a) => a.value === addonVal);
    return sum + (addonObj ? addonObj.price : 0);
  }, 0);

  // Min Estimate calculation formula
  const minEstimate = Math.round((baseRate * propertyMult * urgencyMult) + addonsSum);
  // Max Estimate calculation formula (typically base rate scaling, plus flat dispatch/urgency fees)
  const maxEstimate = Math.round((baseRate * 1.35 * propertyMult * urgencyMult) + addonsSum + urgencyFee);

  const toggleAddon = (value: string) => {
    setSelectedAddons((prev) =>
      prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]
    );
  };

  const handleNext = () => {
    const sequence: Step[] = ['service', 'urgency', 'property', 'addons', 'contact', 'success'];
    const currentIndex = sequence.indexOf(currentStep);
    if (currentIndex !== -1 && currentIndex < sequence.length - 1) {
      setCurrentStep(sequence[currentIndex + 1]);
    }
  };

  const handlePrev = () => {
    const sequence: Step[] = ['service', 'urgency', 'property', 'addons', 'contact', 'success'];
    const currentIndex = sequence.indexOf(currentStep);
    if (currentIndex > 0) {
      setCurrentStep(sequence[currentIndex - 1]);
    }
  };

  // Form Validation
  const validateForm = () => {
    const tempErrors: Record<string, string> = {};
    if (!name.trim()) tempErrors.name = 'Full name is required';
    if (!phone.trim()) {
      tempErrors.phone = 'Phone number is required';
    } else if (!/^\+?[\d\s\-()]{7,20}$/.test(phone)) {
      tempErrors.phone = 'Invalid phone number format';
    }
    if (!email.trim()) {
      tempErrors.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      tempErrors.email = 'Invalid email address';
    }
    if (!zip.trim()) {
      tempErrors.zip = 'ZIP code is required';
    } else if (!clientConfig.meta.address.zipCodes.includes(zip.trim())) {
      tempErrors.zip = 'We do not currently service this ZIP code';
    }
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  // Lead Conversion Submission Handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const response = await fetch('/api/quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          client: { name, phone, email, zip },
          estimate: {
            service: selectedService,
            urgency: selectedUrgency,
            property: selectedProperty,
            addons: selectedAddons,
            calculatedRange: `$${minEstimate} - $${maxEstimate}`,
          },
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit quote estimate. Please try again.');
      }

      setCurrentStep('success');
    } catch (err: any) {
      setSubmitError(err.message || 'An unexpected connection error occurred.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Steps breadcrumb indicator
  const stepsList: { label: string; id: Step }[] = [
    { label: 'Service', id: 'service' },
    { label: 'Urgency', id: 'urgency' },
    { label: 'Property', id: 'property' },
    { label: 'Options', id: 'addons' },
    { label: 'Details', id: 'contact' },
  ];

  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col gap-6">
      {/* Dynamic Progress Indicator */}
      {currentStep !== 'success' && (
        <div className="w-full flex items-center justify-between px-2 select-none">
          {stepsList.map((stepItem, idx) => {
            const isCompleted = stepsList.findIndex((s) => s.id === currentStep) > idx;
            const isActive = stepItem.id === currentStep;
            return (
              <React.Fragment key={stepItem.id}>
                {idx > 0 && (
                  <div className={`h-[1px] flex-1 mx-2 transition-all duration-500 ${isCompleted ? 'bg-brand-cyan/50' : 'bg-white/5'}`} />
                )}
                <div
                  className={`flex flex-col items-center gap-1.5 cursor-pointer`}
                  onClick={() => {
                    // Only allow clicking to steps we have passed or are on
                    const stepIdx = stepsList.findIndex((s) => s.id === stepItem.id);
                    const currentIdx = stepsList.findIndex((s) => s.id === currentStep);
                    if (stepIdx <= currentIdx) {
                      setCurrentStep(stepItem.id);
                    }
                  }}
                >
                  <div
                    className={`h-7 w-7 rounded-full flex items-center justify-center text-xs font-semibold border transition-all duration-500 ${
                      isActive
                        ? 'border-brand-cyan bg-brand-cyan/10 text-brand-cyan shadow-[0_0_15px_rgba(6,182,212,0.3)]'
                        : isCompleted
                        ? 'border-brand-indigo bg-brand-indigo/10 text-brand-indigo'
                        : 'border-white/10 text-neutral-500'
                    }`}
                  >
                    {isCompleted ? <Check className="h-3 w-3" /> : idx + 1}
                  </div>
                  <span className={`text-[10px] uppercase tracking-wider hidden sm:inline ${isActive ? 'text-brand-cyan font-bold' : 'text-neutral-500'}`}>
                    {stepItem.label}
                  </span>
                </div>
              </React.Fragment>
            );
          })}
        </div>
      )}

      {/* Main Wizard Shell Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Step Cards (Left Side) */}
        <Card className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-between min-h-[420px] transition-all duration-300">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.25 }}
              className="flex-1 flex flex-col h-full justify-between"
            >
              {/* STEP 1: SERVICE CATEGORY */}
              {currentStep === 'service' && (
                <div className="flex flex-col gap-4">
                  <div>
                    <h2 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
                      <Sparkles className="h-5 w-5 text-brand-cyan" />
                      Select Service Category
                    </h2>
                    <p className="text-neutral-400 text-sm mt-1">
                      Choose the primary home engineering service required.
                    </p>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
                    {services.map((serv) => (
                      <div
                        key={serv.slug}
                        onClick={() => setSelectedService(serv.slug)}
                        className={`p-4 rounded-2xl border transition-all duration-300 cursor-pointer select-none flex flex-col gap-2 relative overflow-hidden ${
                          selectedService === serv.slug
                            ? 'bg-brand-indigo/10 border-brand-indigo shadow-[0_0_20px_rgba(79,70,229,0.2)]'
                            : 'bg-white/[0.01] border-white/5 hover:border-white/10 hover:bg-white/[0.02]'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className={`text-sm font-bold ${selectedService === serv.slug ? 'text-brand-indigo' : 'text-white'}`}>
                            {serv.title.split(' ')[0]} {serv.title.split(' ')[1] || ''}
                          </span>
                          {selectedService === serv.slug && (
                            <div className="h-4.5 w-4.5 rounded-full bg-brand-indigo flex items-center justify-center text-white">
                              <Check className="h-2.5 w-2.5" />
                            </div>
                          )}
                        </div>
                        <p className="text-neutral-400 text-xs leading-relaxed line-clamp-2">
                          {serv.shortDesc}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* STEP 2: URGENCY LEVEL */}
              {currentStep === 'urgency' && (
                <div className="flex flex-col gap-4">
                  <div>
                    <h2 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
                      Dispatch Speed & Urgency
                    </h2>
                    <p className="text-neutral-400 text-sm mt-1">
                      Select required dispatch timeline. Emergency response includes rapid staging.
                    </p>
                  </div>
                  <div className="flex flex-col gap-3 mt-2">
                    {pricing.urgencyFactors.map((urg) => (
                      <div
                        key={urg.value}
                        onClick={() => setSelectedUrgency(urg.value)}
                        className={`p-4 rounded-2xl border transition-all duration-300 cursor-pointer select-none flex items-center justify-between ${
                          selectedUrgency === urg.value
                            ? 'bg-brand-cyan/10 border-brand-cyan shadow-[0_0_20px_rgba(6,182,212,0.15)]'
                            : 'bg-white/[0.01] border-white/5 hover:border-white/10'
                        }`}
                      >
                        <div className="flex flex-col gap-1">
                          <span className="text-sm font-bold text-white">{urg.label}</span>
                          <span className="text-xs text-neutral-400">
                            {urg.value === 'emergency' ? 'Dispatched within 10 minutes via GPS.' : 'Scheduled at your convenience.'}
                          </span>
                        </div>
                        <div className="flex items-center gap-3">
                          {urg.fee > 0 && (
                            <span className="text-xs font-semibold text-brand-cyan px-2 py-0.5 rounded-md bg-brand-cyan/10 border border-brand-cyan/25">
                              +${urg.fee} fee
                            </span>
                          )}
                          <div className={`h-5 w-5 rounded-full border flex items-center justify-center transition-all ${
                            selectedUrgency === urg.value ? 'bg-brand-cyan border-brand-cyan text-background-dark' : 'border-white/15'
                          }`}>
                            {selectedUrgency === urg.value && <Check className="h-3 w-3 stroke-[3]" />}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* STEP 3: PROPERTY TYPE */}
              {currentStep === 'property' && (
                <div className="flex flex-col gap-4">
                  <div>
                    <h2 className="text-2xl font-bold tracking-tight text-white">
                      Property Classification
                    </h2>
                    <p className="text-neutral-400 text-sm mt-1">
                      We scale structural rigging and pressure balancing to your estate layout.
                    </p>
                  </div>
                  <div className="flex flex-col gap-2.5 mt-2">
                    {pricing.propertyMultipliers.map((prop) => (
                      <div
                        key={prop.value}
                        onClick={() => setSelectedProperty(prop.value)}
                        className={`p-4 rounded-2xl border transition-all duration-300 cursor-pointer select-none flex items-center justify-between ${
                          selectedProperty === prop.value
                            ? 'bg-brand-indigo/10 border-brand-indigo'
                            : 'bg-white/[0.01] border-white/5 hover:border-white/10'
                        }`}
                      >
                        <span className="text-sm font-bold text-white">{prop.label}</span>
                        <div className="flex items-center gap-3">
                          <span className="text-xs text-neutral-400">
                            (x{prop.multiplier} complexity factor)
                          </span>
                          <div className={`h-5 w-5 rounded-full border flex items-center justify-center transition-all ${
                            selectedProperty === prop.value ? 'bg-brand-indigo border-brand-indigo text-white' : 'border-white/15'
                          }`}>
                            {selectedProperty === prop.value && <Check className="h-3 w-3 stroke-[3]" />}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* STEP 4: ADD-ON OPTIONS */}
              {currentStep === 'addons' && (
                <div className="flex flex-col gap-4">
                  <div>
                    <h2 className="text-2xl font-bold tracking-tight text-white">
                      Optional Add-On Rigging
                    </h2>
                    <p className="text-neutral-400 text-sm mt-1">
                      Enhance long-term reliability and secure premium warranty coverage.
                    </p>
                  </div>
                  <div className="flex flex-col gap-2.5 mt-2">
                    {pricing.addOnOptions.map((addon) => (
                      <div
                        key={addon.value}
                        onClick={() => toggleAddon(addon.value)}
                        className={`p-4 rounded-2xl border transition-all duration-300 cursor-pointer select-none flex items-center justify-between ${
                          selectedAddons.includes(addon.value)
                            ? 'bg-brand-cyan/5 border-brand-cyan/40'
                            : 'bg-white/[0.01] border-white/5 hover:border-white/10'
                        }`}
                      >
                        <div className="flex flex-col gap-0.5 pr-4">
                          <span className="text-sm font-bold text-white">{addon.label}</span>
                          <span className="text-xs text-neutral-500 leading-normal line-clamp-1">{addon.desc}</span>
                        </div>
                        <div className="flex items-center gap-3 shrink-0">
                          <span className="text-sm font-bold text-brand-cyan">+${addon.price}</span>
                          <div className={`h-5 w-5 rounded-md border flex items-center justify-center transition-all ${
                            selectedAddons.includes(addon.value) ? 'bg-brand-cyan border-brand-cyan text-background-dark' : 'border-white/15'
                          }`}>
                            {selectedAddons.includes(addon.value) && <Check className="h-3.5 w-3.5 stroke-[3]" />}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* STEP 5: CONTACT INFORMATION */}
              {currentStep === 'contact' && (
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <div>
                    <h2 className="text-2xl font-bold tracking-tight text-white">
                      Instant Quote Authorization
                    </h2>
                    <p className="text-neutral-400 text-sm mt-1">
                      Provide contact coordinates to instantly lock in your calculated price.
                    </p>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
                    <Input
                      label="Full Name"
                      placeholder="e.g. John Doe"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      error={errors.name}
                    />
                    <Input
                      label="Phone Number"
                      placeholder="e.g. (800) 555-FLOW"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      error={errors.phone}
                    />
                    <Input
                      label="Email Address"
                      placeholder="e.g. john@domain.com"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      error={errors.email}
                    />
                    <Input
                      label="Service ZIP Code"
                      placeholder="e.g. 94301"
                      value={zip}
                      onChange={(e) => setZip(e.target.value)}
                      error={errors.zip}
                    />
                  </div>
                  {submitError && (
                    <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center gap-2.5 text-xs text-rose-400 mt-2">
                      <AlertCircle className="h-4 w-4 shrink-0" />
                      <span>{submitError}</span>
                    </div>
                  )}
                </form>
              )}

              {/* STEP 6: SUCCESS / THANK YOU */}
              {currentStep === 'success' && (
                <div className="flex flex-col items-center justify-center text-center gap-5 py-8">
                  <div className="h-16 w-16 rounded-full bg-brand-cyan/10 border border-brand-cyan/30 flex items-center justify-center text-brand-cyan shadow-[0_0_30px_rgba(6,182,212,0.2)]">
                    <Check className="h-8 w-8 stroke-[3]" />
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold text-white tracking-tight">Price Locked In Successfully!</h2>
                    <p className="text-neutral-400 text-sm max-w-md mx-auto mt-2 leading-relaxed">
                      Thank you, <span className="text-white font-bold">{name}</span>. We have logged dispatch ticket <span className="text-brand-cyan font-semibold">#VTX-{Math.floor(1000 + Math.random() * 9000)}</span>.
                    </p>
                    <p className="text-neutral-500 text-xs max-w-sm mx-auto mt-2.5">
                      A certified technician will call you at <span className="text-white font-medium">{phone}</span> within 10 minutes to verify details and confirm arrival.
                    </p>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-3 mt-4 w-full justify-center">
                    <a href={`tel:${clientConfig.meta.phoneRaw}`} className="inline-flex">
                      <Button variant="primary" size="md" className="gap-2 w-full sm:w-auto">
                        <Phone className="h-4 w-4" /> Call Dispatch Center
                      </Button>
                    </a>
                    <Button
                      variant="glass"
                      size="md"
                      onClick={() => {
                        setName('');
                        setPhone('');
                        setEmail('');
                        setZip('');
                        setSelectedAddons([]);
                        setCurrentStep('service');
                      }}
                    >
                      Reset Quote Wizard
                    </Button>
                  </div>
                </div>
              )}

              {/* Bottom Wizard Actions */}
              {currentStep !== 'success' && (
                <div className="flex items-center justify-between border-t border-white/5 pt-5 mt-6 select-none">
                  <Button
                    variant="ghost"
                    onClick={handlePrev}
                    disabled={currentStep === 'service' || isSubmitting}
                    className="gap-1.5 disabled:opacity-30 disabled:pointer-events-none"
                  >
                    <ArrowLeft className="h-4 w-4" /> Back
                  </Button>

                  {currentStep === 'contact' ? (
                    <Button
                      variant="primary"
                      onClick={handleSubmit}
                      disabled={isSubmitting}
                      className="gap-2"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" /> Verifying Coverage...
                        </>
                      ) : (
                        <>
                          Lock In Price Range <Sparkles className="h-4 w-4" />
                        </>
                      )}
                    </Button>
                  ) : (
                    <Button
                      variant="glass"
                      onClick={handleNext}
                      className="gap-1.5"
                    >
                      Continue <ArrowRight className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </Card>

        {/* Real-time Dynamic Gauge Pricing Summary (Right Side) */}
        <Card className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between border-brand-indigo/10 relative overflow-hidden bg-gradient-to-b from-card-dark to-[#050507]">
          {/* Subtle Accent Glow */}
          <div className="absolute top-0 right-0 w-44 h-44 bg-brand-indigo/5 rounded-full blur-[100px] pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-44 h-44 bg-brand-cyan/5 rounded-full blur-[100px] pointer-events-none" />

          {/* Pricing Header */}
          <div className="flex flex-col gap-1.5 select-none relative z-10">
            <span className="text-[10px] uppercase font-bold tracking-widest text-brand-indigo">
              Dynamic Estimator Gauge
            </span>
            <h3 className="text-xl font-bold tracking-tight text-white">
              Estimated Pricing Range
            </h3>
            <div className="h-[1px] w-full bg-white/5 mt-3" />
          </div>

          {/* Graphical Price Gauge and Outputs */}
          <div className="my-8 flex flex-col items-center justify-center relative z-10">
            <div className="relative h-44 w-44 flex items-center justify-center">
              {/* Spinning Neon circular gradient stroke */}
              <svg className="absolute inset-0 h-full w-full rotate-[-90deg]">
                <circle
                  cx="88"
                  cy="88"
                  r="78"
                  stroke="rgba(255,255,255,0.03)"
                  strokeWidth="8"
                  fill="transparent"
                />
                <motion.circle
                  cx="88"
                  cy="88"
                  r="78"
                  stroke="url(#estimatorGradient)"
                  strokeWidth="8"
                  fill="transparent"
                  strokeDasharray="490"
                  initial={{ strokeDashoffset: 490 }}
                  animate={{ strokeDashoffset: 490 - (490 * Math.min(minEstimate, 2500)) / 2500 }}
                  transition={{ type: 'spring', damping: 25, stiffness: 80 }}
                />
                <defs>
                  <linearGradient id="estimatorGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#4f46e5" />
                    <stop offset="100%" stopColor="#06b6d4" />
                  </linearGradient>
                </defs>
              </svg>

              {/* Absolute Central Readout */}
              <div className="flex flex-col items-center text-center select-none">
                <span className="text-[10px] uppercase tracking-widest text-neutral-500 font-semibold mb-0.5">
                  Est. Total
                </span>
                <span className="text-3xl font-extrabold tracking-tighter text-white">
                  ${minEstimate}
                </span>
                <span className="text-neutral-500 text-xs mt-0.5 font-medium">
                  to ${maxEstimate}
                </span>
              </div>
            </div>
            <p className="text-[11px] text-neutral-500 text-center max-w-[240px] mt-6 leading-normal select-none">
              *Calculated dynamic pricing binds 100% to live inventory rates. Lock in to reserve quote.
            </p>
          </div>

          {/* Breakdown Details */}
          <div className="flex flex-col gap-3.5 relative z-10 select-none">
            <div className="h-[1px] w-full bg-white/5 mb-1" />
            <div className="flex justify-between items-center text-xs">
              <span className="text-neutral-500 font-medium">Base Service Rate:</span>
              <span className="text-neutral-300 font-semibold">${baseRate}</span>
            </div>
            <div className="flex justify-between items-center text-xs">
              <span className="text-neutral-500 font-medium">Property Size Factor:</span>
              <span className="text-neutral-300 font-semibold">{activeProperty.label} (x{propertyMult})</span>
            </div>
            <div className="flex justify-between items-center text-xs">
              <span className="text-neutral-500 font-medium">Timeline Dispatch:</span>
              <span className="text-neutral-300 font-semibold">{activeUrgency.label}</span>
            </div>
            {selectedAddons.length > 0 && (
              <div className="flex justify-between items-center text-xs">
                <span className="text-neutral-500 font-medium">Add-on Rigging Sum:</span>
                <span className="text-brand-cyan font-bold">+${addonsSum}</span>
              </div>
            )}
            <div className="h-[1px] w-full bg-white/5 mt-1" />
            <div className="flex justify-between items-center text-sm font-bold">
              <span className="text-white">Active Service Area:</span>
              <span className="text-brand-cyan uppercase tracking-widest text-[11px]">{clientConfig.meta.address.city}, {clientConfig.meta.address.state}</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
export default CostEstimator;
