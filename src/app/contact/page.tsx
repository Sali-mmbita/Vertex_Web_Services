'use client';

import React, { useState } from 'react';
import { Phone, Mail, MapPin, Send, Loader2, CheckCircle, Flame, AlertCircle } from 'lucide-react';
import { clientConfig } from '@/config/client.config';
import { EmergencyBanner } from '@/components/layout/emergency-banner';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input, Textarea } from '@/components/ui/input';

export default function ContactPage() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('residential');
  const [message, setMessage] = useState('');
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const meta = clientConfig.meta;

  const validateForm = () => {
    const tempErrors: Record<string, string> = {};
    if (!name.trim()) tempErrors.name = 'Full name is required';
    if (!phone.trim()) tempErrors.phone = 'Phone number is required';
    if (!email.trim()) {
      tempErrors.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      tempErrors.email = 'Invalid email address';
    }
    if (!message.trim()) tempErrors.message = 'Message text is required';
    
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      // Mock API dispatch log
      console.log('[SUPPORT EMAIL TICKET SENT]:', { name, phone, email, subject, message });
      
      // Simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setSubmitted(true);
    } catch (err) {
      setSubmitError('Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
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
          <Badge variant="primary">Get in Touch</Badge>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight bg-gradient-to-b from-white to-neutral-400 bg-clip-text text-transparent">
            Contact Coordinate Center
          </h1>
          <p className="text-neutral-400 text-sm sm:text-base max-w-xl leading-relaxed mt-1">
            Reach out to our administrative operations team or call the emergency dispatch line for immediate assistance.
          </p>
        </div>
      </header>

      {/* Grid Layout: Coordinates Info (Left) vs Contact Form (Right) */}
      <section className="py-12 pb-24 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Coordinates Column (Left - 5 Cols) */}
          <div className="lg:col-span-5 flex flex-col gap-6 text-left select-none">
            {/* Quick emergency callout */}
            <Card className="p-6 border-rose-500/10 bg-rose-500/[0.02]">
              <h4 className="text-rose-400 font-bold text-sm uppercase tracking-widest flex items-center gap-2">
                <Flame className="h-4.5 w-4.5 animate-pulse" /> 24/7 Priority Emergency
              </h4>
              <p className="text-neutral-300 text-xs leading-relaxed mt-2.5">
                Active plumbing disaster or flooding? Skip our standard email form and dial our staging dispatch center directly for a rig response in minutes.
              </p>
              <a href={`tel:${meta.emergencyPhoneRaw}`} className="inline-flex mt-4 w-full">
                <Button variant="danger" size="md" className="w-full gap-2 text-xs">
                  <Phone className="h-4 w-4 stroke-[2.5]" /> Call Emergency: {meta.emergencyPhone}
                </Button>
              </a>
            </Card>

            {/* Standard coordinate info card */}
            <Card className="p-6 sm:p-7 border-white/5 bg-gradient-to-b from-card-dark to-[#050507] flex flex-col gap-6">
              <h4 className="text-white font-bold text-sm uppercase tracking-wider">Office Information</h4>
              
              <div className="flex flex-col gap-5 text-xs text-neutral-400">
                <a href={`tel:${meta.phoneRaw}`} className="flex items-center gap-3.5 hover:text-white transition-colors">
                  <div className="h-9 w-9 rounded-xl bg-white/[0.02] border border-white/10 flex items-center justify-center text-brand-cyan shrink-0">
                    <Phone className="h-4.5 w-4.5" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-white font-bold">Standard Support Line</span>
                    <span>{meta.phone}</span>
                  </div>
                </a>

                <a href={`mailto:${meta.email}`} className="flex items-center gap-3.5 hover:text-white transition-colors">
                  <div className="h-9 w-9 rounded-xl bg-white/[0.02] border border-white/10 flex items-center justify-center text-brand-indigo shrink-0">
                    <Mail className="h-4.5 w-4.5" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-white font-bold">Operations Support Email</span>
                    <span>{meta.email}</span>
                  </div>
                </a>

                <div className="flex items-start gap-3.5">
                  <div className="h-9 w-9 rounded-xl bg-white/[0.02] border border-white/10 flex items-center justify-center text-brand-cyan shrink-0 mt-0.5">
                    <MapPin className="h-4.5 w-4.5" />
                  </div>
                  <div className="flex flex-col leading-relaxed">
                    <span className="text-white font-bold">Headquarters Address</span>
                    <span>{meta.address.street},<br />{meta.address.city}, {meta.address.state} {meta.address.zip}</span>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Interactive Form Card (Right - 7 Cols) */}
          <Card className="lg:col-span-7 p-6 sm:p-8 border-white/5 bg-gradient-to-b from-card-dark to-[#050507]">
            {submitted ? (
              <div className="flex flex-col items-center justify-center text-center py-16 gap-5 select-none">
                <div className="h-16 w-16 rounded-full bg-brand-cyan/10 border border-brand-cyan/25 flex items-center justify-center text-brand-cyan shadow-[0_0_20px_rgba(6,182,212,0.15)] animate-bounce">
                  <CheckCircle className="h-8 w-8 stroke-[3]" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white tracking-tight">Message Transmitted!</h3>
                  <p className="text-neutral-400 text-xs leading-relaxed max-w-xs mx-auto mt-2">
                    Thank you, <span className="text-white font-bold">{name}</span>. We have logged support ticket <span className="text-brand-cyan font-bold">#SUP-{Math.floor(1000 + Math.random() * 9000)}</span>. Our dispatch clerk will follow up via email at <span className="text-white font-semibold">{email}</span> within 2 hours.
                  </p>
                </div>
                <Button variant="glass" size="md" onClick={() => setSubmitted(false)} className="mt-4">
                  Send Another Message
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5 text-left">
                <div>
                  <h3 className="text-xl font-bold text-white tracking-tight">Send Operations Inquiry</h3>
                  <p className="text-neutral-500 text-xs leading-normal mt-1">
                    Complete the form coordinates. For instant service quotes, use our dedicated quote page.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    label="Full Name"
                    placeholder="e.g. Jane Smith"
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
                </div>

                <Input
                  label="Email Address"
                  placeholder="e.g. jane@domain.com"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  error={errors.email}
                />

                <div className="flex flex-col gap-2.5 mb-2.5">
                  <label className="text-xs font-semibold uppercase tracking-wider text-neutral-400 select-none mb-1 block">
                    Inquiry Classification
                  </label>
                  <select
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full h-13 px-4.5 py-3 rounded-xl bg-white/[0.02] border border-white/10 text-white font-medium text-sm transition-all outline-none focus:border-brand-indigo/50 focus:bg-white/[0.04] appearance-none cursor-pointer"
                  >
                    <option value="residential" className="bg-background-dark">Residential Operations</option>
                    <option value="commercial" className="bg-background-dark">Commercial Facilities / AWWA</option>
                    <option value="billing" className="bg-background-dark">Billing & Accounting Support</option>
                    <option value="careers" className="bg-background-dark">Careers & Recruiting Office</option>
                  </select>
                </div>

                <Textarea
                  label="Inquiry Details"
                  placeholder="Describe your project, repair requirements, or compliance request in detail..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  error={errors.message}
                />

                {submitError && (
                  <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center gap-2.5 text-xs text-rose-400">
                    <AlertCircle className="h-4 w-4" />
                    <span>{submitError}</span>
                  </div>
                )}

                <Button variant="primary" type="submit" disabled={isSubmitting} className="h-12 w-full mt-2 gap-2">
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" /> Dispatching Message...
                    </>
                  ) : (
                    <>
                      Transmit Inquiry Ticket <Send className="h-4 w-4" />
                    </>
                  )}
                </Button>
              </form>
            )}
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
}
