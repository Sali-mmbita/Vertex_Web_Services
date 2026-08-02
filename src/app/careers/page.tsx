'use client';

import React, { useState } from 'react';
import { Truck, GraduationCap, Heart, Check, ArrowRight, Loader2, CheckCircle, AlertCircle, Briefcase, MapPin, DollarSign } from 'lucide-react';
import { clientConfig } from '@/config/client.config';
import { EmergencyBanner } from '@/components/layout/emergency-banner';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Modal } from '@/components/ui/modal';
import { Input, Textarea } from '@/components/ui/input';

interface Job {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  salaryRange: string;
  description: string;
  requirements: string[];
  benefits: string[];
}

export default function CareersPage() {
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [isApplyOpen, setIsApplyOpen] = useState(false);

  // Form State
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [portfolio, setRef] = useState('');
  const [cover, setCover] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [applied, setApplied] = useState(false);

  const careersData = clientConfig.pageContent.careersPage;
  const openings = clientConfig.careers;

  const benefitIcons: Record<string, React.ReactNode> = {
    Truck: <Truck className="h-6 w-6 text-brand-cyan" />,
    GraduationCap: <GraduationCap className="h-6 w-6 text-brand-indigo" />,
    Heart: <Heart className="h-6 w-6 text-rose-500" />,
  };

  const handleOpenApply = (job: Job) => {
    setSelectedJob(job);
    setIsApplyOpen(true);
  };

  const validateForm = () => {
    const tempErrors: Record<string, string> = {};
    if (!name.trim()) tempErrors.name = 'Full name is required';
    if (!phone.trim()) tempErrors.phone = 'Phone number is required';
    if (!email.trim()) {
      tempErrors.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      tempErrors.email = 'Invalid email address';
    }
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleApplySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      console.log('[CAREERS APPLICATION SUBMITTED]:', {
        jobId: selectedJob?.id,
        jobTitle: selectedJob?.title,
        applicant: { name, phone, email, portfolio, cover },
      });
      // Delay transition
      await new Promise((resolve) => setTimeout(resolve, 1200));
      setApplied(true);
    } catch (err) {
      alert('Application failed. Please try again.');
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
          <Badge variant="primary">Work with us</Badge>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight bg-gradient-to-b from-white to-neutral-400 bg-clip-text text-transparent">
            {careersData.header}
          </h1>
          <p className="text-neutral-400 text-sm sm:text-base max-w-2xl leading-relaxed mt-1">
            {careersData.subHeader}
          </p>
        </div>
      </header>

      {/* Benefits section */}
      <section className="py-16 relative z-10 select-none">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-xl mx-auto text-center flex flex-col gap-2 mb-12">
            <Badge variant="secondary" className="mx-auto">Perks & Compensation</Badge>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              {careersData.benefitsTitle}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {careersData.benefits.map((b, idx) => (
              <Card key={idx} className="p-6 flex flex-col gap-4 text-left border-white/5">
                <div className="h-12 w-12 rounded-2xl bg-white/[0.02] border border-white/10 flex items-center justify-center">
                  {benefitIcons[b.icon] || <Heart className="h-6 w-6 text-brand-cyan" />}
                </div>
                <div>
                  <h4 className="text-base font-bold text-white tracking-tight">{b.title}</h4>
                  <p className="text-neutral-400 text-xs leading-relaxed mt-2 font-medium">{b.desc}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Openings Grid List Section */}
      <section className="py-16 pb-24 border-t border-white/5 bg-[#040406] relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-xl mx-auto text-center flex flex-col gap-2 mb-12 select-none">
            <Badge variant="primary" className="mx-auto">Open Positions</Badge>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              Current Career Openings
            </h2>
            <p className="text-neutral-400 text-xs mt-1">
              Select any listing to review structural descriptions and launch an online application.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
            {openings.map((job) => (
              <Card
                key={job.id}
                className="p-6 flex flex-col justify-between text-left border-white/5 bg-gradient-to-b from-card-dark to-[#050507]"
              >
                <div className="flex flex-col gap-4">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-1 rounded-md text-[9px] font-bold uppercase tracking-wider bg-brand-indigo/10 border border-brand-indigo/25 text-brand-indigo">
                      {job.department}
                    </span>
                    <span className="text-[10px] font-semibold text-neutral-500 uppercase tracking-widest">
                      {job.type}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-white tracking-tight flex items-center gap-1.5">
                      <Briefcase className="h-4.5 w-4.5 text-brand-cyan shrink-0" />
                      {job.title}
                    </h3>
                    <div className="flex gap-4 text-[10px] font-semibold text-neutral-400 uppercase tracking-wider mt-1.5 select-none">
                      <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5 text-brand-cyan" /> {job.location}</span>
                      <span className="flex items-center gap-0.5"><DollarSign className="h-3.5 w-3.5 text-brand-cyan" /> {job.salaryRange.split(' ')[0]} Base</span>
                    </div>
                    <p className="text-neutral-400 text-xs leading-relaxed mt-4 line-clamp-3">
                      {job.description}
                    </p>
                  </div>

                  {/* Requirements summary block */}
                  <div className="flex flex-col gap-2 text-xs text-neutral-400 mt-2 border-t border-white/5 pt-4">
                    <span className="text-[9px] font-bold uppercase tracking-widest text-neutral-500 mb-1 select-none">Pre-requisites:</span>
                    {job.requirements.slice(0, 2).map((req, rIdx) => (
                      <div key={rIdx} className="flex gap-2 items-start leading-normal">
                        <Check className="h-3.5 w-3.5 text-brand-cyan shrink-0 mt-0.5" />
                        <span className="line-clamp-1">{req}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border-t border-white/5 pt-4 mt-6 flex justify-end">
                  <Button
                    variant="glass"
                    size="sm"
                    onClick={() => handleOpenApply(job)}
                    className="text-xs font-semibold gap-1 border-white/5 hover:border-brand-cyan"
                  >
                    Review Position <ArrowRight className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stateful Inline Apply Form Modal */}
      <Modal
        isOpen={isApplyOpen}
        onClose={() => {
          setIsApplyOpen(false);
          setApplied(false);
          setName('');
          setPhone('');
          setEmail('');
          setRef('');
          setCover('');
        }}
        title={selectedJob ? `Application: ${selectedJob.title}` : 'Job details'}
        size="lg"
      >
        {selectedJob && (
          <div className="text-left flex flex-col gap-6">
            {applied ? (
              <div className="flex flex-col items-center justify-center text-center py-12 gap-5 select-none">
                <div className="h-16 w-16 rounded-full bg-brand-cyan/10 border border-brand-cyan/25 flex items-center justify-center text-brand-cyan shadow-[0_0_20px_rgba(6,182,212,0.15)] animate-bounce">
                  <CheckCircle className="h-8 w-8 stroke-[3]" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white tracking-tight">Application Transmitted!</h3>
                  <p className="text-neutral-400 text-xs leading-relaxed max-w-sm mx-auto mt-2">
                    Excellent, <span className="text-white font-bold">{name}</span>! We have securely captured your candidate files. Our field staffing dispatcher will call you at <span className="text-white font-semibold">{phone}</span> within 24 business hours.
                  </p>
                </div>
                <Button
                  variant="glass"
                  size="md"
                  onClick={() => {
                    setIsApplyOpen(false);
                    setApplied(false);
                  }}
                  className="mt-2"
                >
                  Close Window
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                {/* Left side detail summary */}
                <div className="md:col-span-5 flex flex-col gap-5 text-xs text-neutral-400 border-b md:border-b-0 md:border-r border-white/5 pb-5 md:pb-0 md:pr-5 select-none">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-brand-indigo block">Position Specs</span>
                    <span className="text-base font-bold text-white leading-tight mt-1 block">{selectedJob.title}</span>
                    <span className="text-[10px] text-neutral-500 font-bold block mt-1 uppercase tracking-wider">{selectedJob.department} / {selectedJob.type}</span>
                  </div>

                  <div>
                    <span className="text-[9px] font-bold uppercase tracking-widest text-neutral-500 block mb-1.5">Core Requirements</span>
                    <div className="flex flex-col gap-2">
                      {selectedJob.requirements.map((req, idx) => (
                        <div key={idx} className="flex gap-2 items-start leading-normal">
                          <Check className="h-3.5 w-3.5 text-brand-indigo shrink-0 mt-0.5" />
                          <span>{req}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <span className="text-[9px] font-bold uppercase tracking-widest text-neutral-500 block mb-1.5">Offered Benefits</span>
                    <div className="flex flex-col gap-2">
                      {selectedJob.benefits.map((b, idx) => (
                        <div key={idx} className="flex gap-2 items-start leading-normal">
                          <Check className="h-3.5 w-3.5 text-brand-cyan shrink-0 mt-0.5" />
                          <span>{b}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right side form block */}
                <form onSubmit={handleApplySubmit} className="md:col-span-7 flex flex-col gap-4">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-brand-cyan block">Form Fields</span>
                    <h4 className="text-base font-bold text-white tracking-tight mt-0.5">Submit Candidate Files</h4>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <Input
                      label="Full Name"
                      placeholder="e.g. John Doe"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      error={errors.name}
                      className="h-10"
                    />
                    <Input
                      label="Phone Number"
                      placeholder="e.g. (800) 555-FLOW"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      error={errors.phone}
                      className="h-10"
                    />
                  </div>

                  <Input
                    label="Email Address"
                    placeholder="e.g. john@vortex.com"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    error={errors.email}
                    className="h-10"
                  />

                  <Input
                    label="Journeyman / CSLB Reference #"
                    placeholder="e.g. CA-C36-84210"
                    value={portfolio}
                    onChange={(e) => setRef(e.target.value)}
                    className="h-10"
                  />

                  <Textarea
                    label="Candidate Statement"
                    placeholder="Briefly explain your field operations experience and why you'd like to work with Vortex Flow..."
                    value={cover}
                    onChange={(e) => setCover(e.target.value)}
                    rows={3}
                  />

                  <Button variant="primary" type="submit" disabled={isSubmitting} className="h-11 w-full mt-2 gap-2 text-xs">
                    {isSubmitting ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" /> Staging Candidate...
                      </>
                    ) : (
                      <>
                        Submit Files to Staffing Center <ArrowRight className="h-3.5 w-3.5" />
                      </>
                    )}
                  </Button>
                </form>
              </div>
            )}
          </div>
        )}
      </Modal>

      <Footer />
    </div>
  );
}
