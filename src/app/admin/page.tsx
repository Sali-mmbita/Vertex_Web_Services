'use client';

import React, { useState, useEffect } from 'react';
import { 
  Settings, Save, RotateCcw, Download, Sparkles, CheckCircle, 
  MapPin, Phone, Mail, Activity, Eye, Briefcase, Image, HelpCircle,
  FileText, Star, Plus, Trash2, ArrowRight
} from 'lucide-react';
import { clientConfig } from '@/config/client.config';
import { EmergencyBanner } from '@/components/layout/emergency-banner';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input, Textarea } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ClientConfig, ServiceItem, GalleryItem, AIKnowledgeItem, FAQItem, BlogPost, Testimonial, JobOpening } from '@/types/config';

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<'meta' | 'theme' | 'services' | 'faq' | 'blog' | 'reviews' | 'gallery' | 'careers' | 'pages' | 'chatbot'>('meta');
  const [isSaved, setIsSaved] = useState(false);
  const [isReset, setIsReset] = useState(false);

  // Core state containing the entire ClientConfig, initialized on mount
  const [config, setConfig] = useState<ClientConfig | null>(null);

  useEffect(() => {
    // We import and load the clientConfig only on the client side
    setConfig(JSON.parse(JSON.stringify(clientConfig)));
  }, []);

  if (!config) {
    return (
      <div className="min-h-screen bg-background-dark text-white flex items-center justify-center">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-brand-cyan animate-ping" />
          <span className="text-sm font-semibold tracking-wider text-neutral-400">Loading No-Code Customizer Studio...</span>
        </div>
      </div>
    );
  }

  // Handle saving the visual configuration to local storage for real-time site-wide previews
  const handleSaveToLocalStorage = () => {
    localStorage.setItem('vortex-custom-config', JSON.stringify(config));
    setIsSaved(true);
    setTimeout(() => {
      setIsSaved(false);
      // Force page reload to ensure that all globally imported clientConfig contexts re-calibrate reactively
      window.location.reload();
    }, 1500);
  };

  // Reset to default repository values
  const handleResetToDefault = () => {
    if (confirm('Are you sure you want to revert all visual customizations and restore the default config?')) {
      localStorage.removeItem('vortex-custom-config');
      setIsReset(true);
      setTimeout(() => {
        setIsReset(false);
        window.location.reload();
      }, 1500);
    }
  };

  // Helper function to serialize the visual config state into the exact client.config.ts TypeScript file
  const handleDownloadConfigFile = () => {
    const serializedData = `import { ClientConfig } from '@/types/config';

// Default static fallback configuration (used during SSG build compile)
const defaultStaticConfig: ClientConfig = ${JSON.stringify(config, null, 2)};

// Reactively load and merge local storage customizations if running inside the browser
export const clientConfig: ClientConfig = (() => {
  if (typeof window !== 'undefined') {
    const stored = window.localStorage.getItem('vortex-custom-config');
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch (e) {
        console.error('Failed to parse customized local config:', e);
      }
    }
  }
  return defaultStaticConfig;
})();
`;
    const element = document.createElement('a');
    const file = new Blob([serializedData], { type: 'text/plain;charset=utf-8' });
    element.href = URL.createObjectURL(file);
    element.download = 'client.config.ts';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  // --- Handlers for Tab 1: Metadata Fields ---
  const updateMetaField = (key: string, value: any) => {
    setConfig((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        meta: {
          ...prev.meta,
          [key]: value
        }
      };
    });
  };

  const updateAddressField = (key: string, value: any) => {
    setConfig((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        meta: {
          ...prev.meta,
          address: {
            ...prev.meta.address,
            [key]: value
          }
        }
      };
    });
  };

  const updateLogoField = (key: string, value: any) => {
    setConfig((prev) => {
      if (!prev) return prev;
      const currentLogo = prev.meta.logo || { icon: 'Activity', primaryText: 'VORTEX', secondaryText: 'FLOW' };
      return {
        ...prev,
        meta: {
          ...prev.meta,
          logo: {
            ...currentLogo,
            [key]: value
          }
        }
      };
    });
  };

  // --- Handlers for Tab 2: Theme Settings ---
  const updateThemeField = (key: string, value: any) => {
    setConfig((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        theme: {
          ...prev.theme,
          [key]: value
        }
      };
    });
  };

  const updateGlassField = (key: string, value: any) => {
    setConfig((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        theme: {
          ...prev.theme,
          glassmorphism: {
            ...prev.theme.glassmorphism,
            [key]: value
          }
        }
      };
    });
  };

  // --- Handlers for Tab 3: Services Array ---
  const handleServiceChange = (index: number, key: keyof ServiceItem, value: any) => {
    setConfig((prev) => {
      if (!prev) return prev;
      const updatedServices = [...prev.services];
      updatedServices[index] = {
        ...updatedServices[index],
        [key]: value
      };
      return {
        ...prev,
        services: updatedServices
      };
    });
  };

  const handleAddService = () => {
    const newService: ServiceItem = {
      slug: 'new-service-' + Date.now(),
      title: 'New Service Title',
      icon: 'Settings',
      category: 'residential',
      shortDesc: 'Enter a short service description for the grid.',
      longDesc: 'Enter a comprehensive detailed description about the plumbing method, tools used, and results.',
      basePrice: 150,
      priceRange: '$150 - $350',
      benefits: ['Premium quality guaranteed', 'Licensed and insured field technicians'],
      steps: [
        { title: 'Diagnosis', desc: 'Surgically inspect and map current issues.' },
        { title: 'Restoration', desc: 'Repair utilizing seamless, heavy-duty parts.' }
      ],
      faqs: [
        { question: 'Is this covered by warranty?', answer: 'Yes! All standard repairs are covered by our 1-year labor guarantee.' }
      ],
      subServices: ['Custom Fitting', 'Manifold Calibration'],
      image: '/images/services/new-service.jpg',
      metaTitle: 'Professional Plumbing Service | Vortex Flow',
      metaDesc: 'Request standard plumbing diagnostics and professional water restorations.'
    };
    setConfig((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        services: [...prev.services, newService]
      };
    });
  };

  const handleDeleteService = (index: number) => {
    if (confirm('Are you sure you want to delete this service offering?')) {
      setConfig((prev) => {
        if (!prev) return prev;
        const updated = [...prev.services];
        updated.splice(index, 1);
        return {
          ...prev,
          services: updated
        };
      });
    }
  };

  // --- Handlers for Tab 4: FAQ Page List ---
  const handleFaqChange = (index: number, key: keyof FAQItem, value: any) => {
    setConfig((prev) => {
      if (!prev) return prev;
      const updatedFaqs = [...prev.faqs];
      updatedFaqs[index] = {
        ...updatedFaqs[index],
        [key]: value
      };
      return {
        ...prev,
        faqs: updatedFaqs
      };
    });
  };

  const handleAddFaq = () => {
    const newFaq: FAQItem = {
      category: 'General',
      question: 'New Accordion Question?',
      answer: 'Provide the structured helpful response for customers here.'
    };
    setConfig((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        faqs: [...prev.faqs, newFaq]
      };
    });
  };

  const handleDeleteFaq = (index: number) => {
    if (confirm('Are you sure you want to delete this FAQ item?')) {
      setConfig((prev) => {
        if (!prev) return prev;
        const updated = [...prev.faqs];
        updated.splice(index, 1);
        return {
          ...prev,
          faqs: updated
        };
      });
    }
  };

  // --- Handlers for Tab 5: Blog Article List ---
  const handleBlogChange = (index: number, key: keyof BlogPost, value: any) => {
    setConfig((prev) => {
      if (!prev) return prev;
      const updatedBlog = [...prev.blog];
      updatedBlog[index] = {
        ...updatedBlog[index],
        [key]: value
      };
      return {
        ...prev,
        blog: updatedBlog
      };
    });
  };

  const handleAddBlogPost = () => {
    const newPost: BlogPost = {
      slug: 'new-blog-post-' + Date.now(),
      title: 'Dynamic New Plumbing Insights',
      excerpt: 'Read about the latest guidelines regarding home diagnostic scanners and leak localization.',
      content: ['Enter the first main paragraph.', 'Enter the second main paragraph.'],
      author: {
        name: 'Marcus Thorne',
        role: 'Master Diagnostic Plumber',
        avatar: '/images/team-marcus.jpg'
      },
      date: 'August 2, 2026',
      category: 'Diagnostics',
      readTime: '4 min read',
      image: '/images/blog/slab-leak.jpg',
      tags: ['Diagnostics', 'Home Maintenance'],
      relatedSlugs: [],
      metaTitle: 'Professional Plumbing Insights | Vortex Flow',
      metaDesc: 'Discover the latest tips on sub-slab diagnostics and home plumbing maintenance.'
    };
    setConfig((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        blog: [...prev.blog, newPost]
      };
    });
  };

  const handleDeleteBlogPost = (index: number) => {
    if (confirm('Are you sure you want to delete this blog post?')) {
      setConfig((prev) => {
        if (!prev) return prev;
        const updated = [...prev.blog];
        updated.splice(index, 1);
        return {
          ...prev,
          blog: updated
        };
      });
    }
  };

  // --- Handlers for Tab 6: Testimonials Reviews ---
  const handleReviewChange = (index: number, key: keyof Testimonial, value: any) => {
    setConfig((prev) => {
      if (!prev) return prev;
      const updatedReviews = [...prev.testimonials];
      updatedReviews[index] = {
        ...updatedReviews[index],
        [key]: value
      };
      return {
        ...prev,
        testimonials: updatedReviews
      };
    });
  };

  const handleAddReview = () => {
    const newReview: Testimonial = {
      id: 't-' + Date.now(),
      author: 'John Miller',
      role: 'Local Resident',
      text: 'Vortex Flow provided spectacular hydro-jetting diagnostics. Completely upfront pricing and clean execution!',
      rating: 5,
      source: 'Verified',
      date: 'August 1, 2026',
      avatar: '/images/testimonials/avatar-1.jpg'
    };
    setConfig((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        testimonials: [...prev.testimonials, newReview]
      };
    });
  };

  const handleDeleteReview = (index: number) => {
    if (confirm('Are you sure you want to delete this review?')) {
      setConfig((prev) => {
        if (!prev) return prev;
        const updated = [...prev.testimonials];
        updated.splice(index, 1);
        return {
          ...prev,
          testimonials: updated
        };
      });
    }
  };

  // --- Handlers for Tab 7: Gallery Array ---
  const handleGalleryChange = (index: number, key: keyof GalleryItem, value: any) => {
    setConfig((prev) => {
      if (!prev) return prev;
      const updatedGallery = [...prev.gallery];
      updatedGallery[index] = {
        ...updatedGallery[index],
        [key]: value
      };
      return {
        ...prev,
        gallery: updatedGallery
      };
    });
  };

  const handleAddGalleryItem = () => {
    const newItem: GalleryItem = {
      id: 'g-' + Date.now(),
      title: 'Water Line Replacement',
      category: 'leak-detection',
      description: 'Replacing standard rusted copper joints with high-integrity PEX-a piping loops.',
      beforeImage: '/images/gallery/leak-before.jpg',
      afterImage: '/images/gallery/leak-after.jpg'
    };
    setConfig((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        gallery: [...prev.gallery, newItem]
      };
    });
  };

  const handleDeleteGalleryItem = (index: number) => {
    if (confirm('Are you sure you want to delete this gallery item?')) {
      setConfig((prev) => {
        if (!prev) return prev;
        const updated = [...prev.gallery];
        updated.splice(index, 1);
        return {
          ...prev,
          gallery: updated
        };
      });
    }
  };

  // --- Handlers for Tab 8: Careers Openings (careers array) ---
  const handleJobChange = (index: number, key: keyof JobOpening, value: any) => {
    setConfig((prev) => {
      if (!prev) return prev;
      const updatedJobs = [...prev.careers];
      updatedJobs[index] = {
        ...updatedJobs[index],
        [key]: value
      };
      return {
        ...prev,
        careers: updatedJobs
      };
    });
  };

  const handleAddJob = () => {
    const newJob: JobOpening = {
      id: 'job-' + Date.now(),
      title: 'Licensed Field Technician',
      department: 'Operations',
      location: 'Palo Alto, CA',
      type: 'Full-time',
      salaryRange: '$85,000 - $115,000 / year',
      description: 'Enter a comprehensive overview of the role, team environment, and daily dispatch guidelines.',
      requirements: ['Licensed residential plumber (Minimum 3 years)', 'Clean driving record'],
      benefits: ['Premium healthcare package', 'Take-home corporate tech Sprinter van']
    };
    setConfig((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        careers: [...prev.careers, newJob]
      };
    });
  };

  const handleDeleteJob = (index: number) => {
    if (confirm('Are you sure you want to delete this job opening?')) {
      setConfig((prev) => {
        if (!prev) return prev;
        const updated = [...prev.careers];
        updated.splice(index, 1);
        return {
          ...prev,
          careers: updated
        };
      });
    }
  };

  // --- Handlers for Tab 9: Pages Static Texts ---
  const handleHomeHeroChange = (key: string, value: any) => {
    setConfig((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        pageContent: {
          ...prev.pageContent,
          home: {
            ...prev.pageContent.home,
            hero: {
              ...prev.pageContent.home.hero,
              [key]: value
            }
          }
        }
      };
    });
  };

  const handleAboutStoryChange = (key: string, value: any) => {
    setConfig((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        pageContent: {
          ...prev.pageContent,
          about: {
            ...prev.pageContent.about,
            story: {
              ...prev.pageContent.about.story,
              [key]: value
            }
          }
        }
      };
    });
  };

  const handleCareersPageChange = (key: string, value: any) => {
    setConfig((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        pageContent: {
          ...prev.pageContent,
          careersPage: {
            ...prev.pageContent.careersPage,
            [key]: value
          }
        }
      };
    });
  };

  // --- Handlers for Tab 10: AI Assistant ---
  const updateBotField = (key: string, value: any) => {
    setConfig((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        aiAssistant: {
          ...prev.aiAssistant,
          [key]: value
        }
      };
    });
  };

  const handleBotKnowledgeChange = (index: number, key: keyof AIKnowledgeItem, value: any) => {
    setConfig((prev) => {
      if (!prev) return prev;
      const updatedKnowledge = [...prev.aiAssistant.knowledgeBase];
      updatedKnowledge[index] = {
        ...updatedKnowledge[index],
        [key]: value
      };
      return {
        ...prev,
        aiAssistant: {
          ...prev.aiAssistant,
          knowledgeBase: updatedKnowledge
        }
      };
    });
  };

  const handleAddBotKnowledge = () => {
    const newItem: AIKnowledgeItem = {
      keywords: ['keyword1', 'keyword2'],
      response: 'Enter the custom assistant response here.'
    };
    setConfig((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        aiAssistant: {
          ...prev.aiAssistant,
          knowledgeBase: [...prev.aiAssistant.knowledgeBase, newItem]
        }
      };
    });
  };

  const handleDeleteBotKnowledge = (index: number) => {
    if (confirm('Are you sure you want to delete this chatbot knowledge node?')) {
      setConfig((prev) => {
        if (!prev) return prev;
        const updated = [...prev.aiAssistant.knowledgeBase];
        updated.splice(index, 1);
        return {
          ...prev,
          aiAssistant: {
            ...prev.aiAssistant,
            knowledgeBase: updated
          }
        };
      });
    }
  };

  return (
    <div className="min-h-screen bg-background-dark text-white flex flex-col relative overflow-x-clip">
      <EmergencyBanner />
      <Navbar />

      {/* Hero Header */}
      <header className="relative w-full pt-32 pb-8 text-center px-4 overflow-hidden select-none animate-fade-in">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_40%,rgba(79,70,229,0.06),transparent)] pointer-events-none" />
        <div className="max-w-4xl mx-auto flex flex-col items-center gap-3 relative z-10">
          <Badge variant="primary">Control Center</Badge>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight bg-gradient-to-b from-white to-neutral-400 bg-clip-text text-transparent">
            Agency Visual CMS Studio
          </h1>
          <p className="text-neutral-400 text-xs sm:text-sm max-w-xl leading-relaxed mt-1">
            Dynamic, visual site customizer. Edit corporate branding logos, colors from our active palette, service grids, blog feeds, testimonials, FAQs, and static page heroes in real-time.
          </p>
        </div>
      </header>

      {/* Action Command Row */}
      <section className="py-2 z-10 px-4">
        <div className="max-w-7xl mx-auto flex flex-wrap gap-4 items-center justify-between bg-[#0a0a0c] border border-white/5 p-4 rounded-2xl select-none">
          <div className="flex items-center gap-2">
            <Settings className="h-5 w-5 text-brand-cyan animate-spin [animation-duration:10s]" />
            <span className="text-xs font-semibold tracking-wider text-neutral-400 uppercase">Interactive Studio Controls</span>
          </div>

          <div className="flex flex-wrap gap-2.5">
            <Button variant="danger" size="sm" onClick={handleResetToDefault} className="text-xs gap-1.5 h-10 px-4">
              <RotateCcw className="h-3.5 w-3.5" /> Revert Defaults
            </Button>
            <Button variant="glass" size="sm" onClick={handleDownloadConfigFile} className="text-xs gap-1.5 h-10 px-4 text-brand-cyan hover:text-white border-brand-cyan/20">
              <Download className="h-3.5 w-3.5" /> Download client.config.ts
            </Button>
            <Button variant="primary" size="sm" onClick={handleSaveToLocalStorage} className="text-xs gap-1.5 h-10 px-5 shadow-[0_0_15px_rgba(6,182,212,0.35)]">
              <Save className="h-3.5 w-3.5" /> Save & Apply Preview
            </Button>
          </div>
        </div>

        {/* Floating Success indicators */}
        {isSaved && (
          <div className="max-w-xs mx-auto mt-4 p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/25 flex items-center justify-center gap-2 text-emerald-400 text-xs font-semibold">
            <CheckCircle className="h-4 w-4" /> Customized Config Applied! Reloading...
          </div>
        )}
        {isReset && (
          <div className="max-w-xs mx-auto mt-4 p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/25 flex items-center justify-center gap-2 text-rose-400 text-xs font-semibold">
            <CheckCircle className="h-4 w-4" /> Restored Default Config! Reloading...
          </div>
        )}
      </section>

      {/* Editor Main Content Area */}
      <section className="py-6 pb-24 z-10 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Left Navigation Column - Tabs List (3 Cols) */}
          <div className="lg:col-span-3 flex flex-col gap-2 select-none">
            {[
              { id: 'meta', label: 'Company & Logo', icon: MapPin },
              { id: 'theme', label: 'Palette & Theme', icon: Activity },
              { id: 'services', label: 'Services Catalog', icon: Briefcase },
              { id: 'faq', label: 'Searchable FAQs', icon: HelpCircle },
              { id: 'blog', label: 'Blog Posts', icon: FileText },
              { id: 'reviews', label: 'Reviews Feed', icon: Star },
              { id: 'gallery', label: 'Before/After Sliders', icon: Image },
              { id: 'careers', label: 'Careers Openings', icon: Briefcase },
              { id: 'pages', label: 'Page Content Heroes', icon: FileText },
              { id: 'chatbot', label: 'Gemini AI Assistant', icon: Sparkles },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl border text-xs font-bold uppercase tracking-wider text-left transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'bg-brand-indigo/10 border-brand-indigo/30 text-brand-cyan'
                      : 'bg-white/5 border-white/5 text-neutral-400 hover:text-white hover:border-white/10'
                  }`}
                >
                  <Icon className={`h-4.5 w-4.5 ${isActive ? 'text-brand-cyan' : 'text-neutral-500'}`} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Right Editor Pane - Tab Forms Content (9 Cols) */}
          <div className="lg:col-span-9">
            
            {/* TABS CONTENT 1: METADATA & LOGO */}
            {activeTab === 'meta' && (
              <Card className="p-6 sm:p-8 flex flex-col gap-6 animate-fade-in">
                <div>
                  <h3 className="text-lg font-bold text-white tracking-tight">Client Corporate Metadata</h3>
                  <p className="text-neutral-400 text-xs mt-0.5">Manage the client company details, phone support links, emails, logo texts, and address areas.</p>
                </div>

                <div className="border-t border-white/5 pt-5">
                  <h4 className="text-xs font-bold text-neutral-300 uppercase tracking-widest mb-4 flex items-center gap-1"><Sparkles className="h-3.5 w-3.5 text-brand-cyan" /> Customizable Logo</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <Input
                      label="Logo Lucide Icon Name"
                      value={config.meta.logo?.icon || 'Activity'}
                      onChange={(e) => updateLogoField('icon', e.target.value)}
                    />
                    <Input
                      label="Logo Primary Text"
                      value={config.meta.logo?.primaryText || 'VORTEX'}
                      onChange={(e) => updateLogoField('primaryText', e.target.value)}
                    />
                    <Input
                      label="Logo Secondary Text"
                      value={config.meta.logo?.secondaryText || 'FLOW'}
                      onChange={(e) => updateLogoField('secondaryText', e.target.value)}
                    />
                  </div>
                </div>

                <div className="border-t border-white/5 pt-5">
                  <h4 className="text-xs font-bold text-neutral-300 uppercase tracking-widest mb-4">Contact Info</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input
                      label="Corporate Name"
                      value={config.meta.name}
                      onChange={(e) => updateMetaField('name', e.target.value)}
                    />
                    <Input
                      label="CSLB License Badge"
                      value={config.meta.licenseNumber}
                      onChange={(e) => updateMetaField('licenseNumber', e.target.value)}
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-3">
                    <Input
                      label="Formatted Telephone"
                      value={config.meta.phone}
                      onChange={(e) => updateMetaField('phone', e.target.value)}
                    />
                    <Input
                      label="Emergency hotline Phone"
                      value={config.meta.emergencyPhone}
                      onChange={(e) => updateMetaField('emergencyPhone', e.target.value)}
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-3">
                    <Input
                      label="Support Email"
                      value={config.meta.email}
                      onChange={(e) => updateMetaField('email', e.target.value)}
                    />
                    <Input
                      label="Operating established Year"
                      type="number"
                      value={config.meta.establishedYear}
                      onChange={(e) => updateMetaField('establishedYear', parseInt(e.target.value))}
                    />
                  </div>
                </div>

                <div className="border-t border-white/5 pt-5">
                  <h4 className="text-xs font-bold text-neutral-300 uppercase tracking-widest mb-4">Location Coordinates & Radius</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input
                      label="Street Address"
                      value={config.meta.address.street}
                      onChange={(e) => updateAddressField('street', e.target.value)}
                    />
                    <Input
                      label="City"
                      value={config.meta.address.city}
                      onChange={(e) => updateAddressField('city', e.target.value)}
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-3">
                    <Input
                      label="State"
                      value={config.meta.address.state}
                      onChange={(e) => updateAddressField('state', e.target.value)}
                    />
                    <Input
                      label="ZIP Code"
                      value={config.meta.address.zip}
                      onChange={(e) => updateAddressField('zip', e.target.value)}
                    />
                    <Input
                      label="Service Radius (Miles)"
                      type="number"
                      value={config.meta.address.serviceRadiusMiles}
                      onChange={(e) => updateAddressField('serviceRadiusMiles', parseInt(e.target.value))}
                    />
                  </div>
                </div>
              </Card>
            )}

            {/* TABS CONTENT 2: THEME PALETTE & COLOR PICKER REVIEW */}
            {activeTab === 'theme' && (
              <Card className="p-6 sm:p-8 flex flex-col gap-6 animate-fade-in">
                <div>
                  <h3 className="text-lg font-bold text-white tracking-tight">Interactive Theme & Color Palette Picker</h3>
                  <p className="text-neutral-400 text-xs mt-0.5">Visually choose custom colors using drag wheels and review how they harmonize in real-time.</p>
                </div>

                {/* Live Swatch Review Board */}
                <div className="p-5 rounded-2xl bg-black border border-white/5 flex flex-col sm:flex-row items-center justify-around gap-6 select-none my-2">
                  <div className="flex flex-col items-center gap-2">
                    <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest">Primary Accent Glow</span>
                    <div 
                      className="h-16 w-16 rounded-full blur-md animate-pulse border border-white/10"
                      style={{ 
                        backgroundColor: config.theme.primaryAccent,
                        boxShadow: `0 0 35px ${config.theme.primaryAccent}`
                      }}
                    />
                    <span className="text-xs font-bold text-white uppercase">{config.theme.primaryAccent}</span>
                  </div>

                  <div className="h-[1px] w-20 sm:h-20 sm:w-[1px] bg-white/5" />

                  <div className="flex flex-col items-center gap-2">
                    <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest">Secondary Accent Glow</span>
                    <div 
                      className="h-16 w-16 rounded-full blur-md animate-pulse border border-white/10"
                      style={{ 
                        backgroundColor: config.theme.secondaryAccent,
                        boxShadow: `0 0 35px ${config.theme.secondaryAccent}`
                      }}
                    />
                    <span className="text-xs font-bold text-white uppercase">{config.theme.secondaryAccent}</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-3">
                  <div className="flex flex-col gap-3 text-left">
                    <label className="text-xs font-bold uppercase tracking-wider text-neutral-300">
                      Primary Accent Color
                    </label>
                    <div className="flex items-center gap-3">
                      {/* Native HTML5 Color Wheel Picker */}
                      <input
                        type="color"
                        value={config.theme.primaryAccent.startsWith('#') ? config.theme.primaryAccent : '#4f46e5'}
                        onChange={(e) => updateThemeField('primaryAccent', e.target.value)}
                        className="h-12 w-14 rounded-xl border border-white/15 bg-white/5 p-1 cursor-pointer outline-none"
                      />
                      <Input
                        placeholder="HEX, HSL, RGB, or Name"
                        value={config.theme.primaryAccent}
                        onChange={(e) => updateThemeField('primaryAccent', e.target.value)}
                        className="flex-1 h-12"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-3 text-left">
                    <label className="text-xs font-bold uppercase tracking-wider text-neutral-300">
                      Secondary Accent Color
                    </label>
                    <div className="flex items-center gap-3">
                      {/* Native HTML5 Color Wheel Picker */}
                      <input
                        type="color"
                        value={config.theme.secondaryAccent.startsWith('#') ? config.theme.secondaryAccent : '#06b6d4'}
                        onChange={(e) => updateThemeField('secondaryAccent', e.target.value)}
                        className="h-12 w-14 rounded-xl border border-white/15 bg-white/5 p-1 cursor-pointer outline-none"
                      />
                      <Input
                        placeholder="HEX, HSL, RGB, or Name"
                        value={config.theme.secondaryAccent}
                        onChange={(e) => updateThemeField('secondaryAccent', e.target.value)}
                        className="flex-1 h-12"
                      />
                    </div>
                  </div>
                </div>

                <div className="border-t border-white/5 pt-5">
                  <h4 className="text-xs font-bold text-neutral-300 uppercase tracking-widest mb-4">Glassmorphism Options</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input
                      label="Blur Intensity class (e.g. md, lg, xl)"
                      value={config.theme.glassmorphism.blur}
                      onChange={(e) => updateGlassField('blur', e.target.value)}
                    />
                    <Input
                      label="Glass overlay Background Opacity (0.0 to 1.0)"
                      type="number"
                      step="0.01"
                      value={config.theme.glassmorphism.bgOpacity}
                      onChange={(e) => updateGlassField('bgOpacity', parseFloat(e.target.value))}
                    />
                  </div>
                </div>
              </Card>
            )}

            {/* TABS CONTENT 3: SERVICES CATALOG */}
            {activeTab === 'services' && (
              <div className="flex flex-col gap-4 animate-fade-in">
                <div className="flex justify-between items-center bg-[#0a0a0c] border border-white/5 p-4 rounded-2xl select-none">
                  <div className="text-left">
                    <h3 className="text-sm font-bold text-white uppercase tracking-wider">Services Catalog (Cost + FAQ Integrated)</h3>
                    <p className="text-neutral-400 text-xs">Total Services Registered: {config.services.length}</p>
                  </div>
                  <Button variant="primary" size="sm" onClick={handleAddService} className="text-xs h-9 px-3 gap-1">
                    <Plus className="h-3.5 w-3.5" /> Add Custom Service
                  </Button>
                </div>

                {config.services.map((s, idx) => (
                  <Card key={idx} className="p-6 sm:p-8 flex flex-col gap-4">
                    <div className="flex justify-between items-center border-b border-white/5 pb-4">
                      <div className="text-left">
                        <span className="text-[10px] font-bold text-brand-cyan bg-brand-cyan/5 px-2 py-0.5 rounded border border-brand-cyan/25">Service #{idx + 1}</span>
                        <h4 className="text-base font-extrabold text-white mt-1">{s.title || 'Untitled Service'}</h4>
                      </div>
                      <Button variant="danger" size="sm" onClick={() => handleDeleteService(idx)} className="h-8 text-[10px] px-2.5">
                        Remove Service
                      </Button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <Input
                        label="Service Title"
                        value={s.title}
                        onChange={(e) => handleServiceChange(idx, 'title', e.target.value)}
                      />
                      <Input
                        label="Route Slug (URL safe e.g. leak-detection)"
                        value={s.slug}
                        onChange={(e) => handleServiceChange(idx, 'slug', e.target.value)}
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <Input
                        label="Lucide Icon Name"
                        value={s.icon}
                        onChange={(e) => handleServiceChange(idx, 'icon', e.target.value)}
                      />
                      <Input
                        label="Base Price ($)"
                        type="number"
                        value={s.basePrice}
                        onChange={(e) => handleServiceChange(idx, 'basePrice', parseInt(e.target.value))}
                      />
                      <Input
                        label="Price Range (display)"
                        value={s.priceRange}
                        onChange={(e) => handleServiceChange(idx, 'priceRange', e.target.value)}
                      />
                    </div>

                    <Textarea
                      label="Short Grid Description"
                      rows={2}
                      value={s.shortDesc}
                      onChange={(e) => handleServiceChange(idx, 'shortDesc', e.target.value)}
                    />

                    <Textarea
                      label="Long Page Description"
                      rows={4}
                      value={s.longDesc}
                      onChange={(e) => handleServiceChange(idx, 'longDesc', e.target.value)}
                    />
                  </Card>
                ))}
              </div>
            )}

            {/* TABS CONTENT 4: FAQ LIST EDITOR */}
            {activeTab === 'faq' && (
              <div className="flex flex-col gap-4 animate-fade-in">
                <div className="flex justify-between items-center bg-[#0a0a0c] border border-white/5 p-4 rounded-2xl select-none">
                  <div className="text-left">
                    <h3 className="text-sm font-bold text-white uppercase tracking-wider">Dynamic FAQ Accordions (FAQPage Schema)</h3>
                    <p className="text-neutral-400 text-xs">Total FAQ Accordions Registered: {config.faqs.length}</p>
                  </div>
                  <Button variant="primary" size="sm" onClick={handleAddFaq} className="text-xs h-9 px-3 gap-1">
                    <Plus className="h-3.5 w-3.5" /> Add FAQ Item
                  </Button>
                </div>

                {config.faqs.map((f, idx) => (
                  <Card key={idx} className="p-6 sm:p-8 flex flex-col gap-4">
                    <div className="flex justify-between items-center border-b border-white/5 pb-4">
                      <div className="text-left">
                        <span className="text-[10px] font-bold text-brand-cyan bg-brand-cyan/5 px-2 py-0.5 rounded border border-brand-cyan/25">Accordion Item #{idx + 1}</span>
                      </div>
                      <Button variant="danger" size="sm" onClick={() => handleDeleteFaq(idx)} className="h-8 text-[10px] px-2.5">
                        Remove Accordion
                      </Button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <Input
                        label="FAQ Classification Group"
                        value={f.category}
                        onChange={(e) => handleFaqChange(idx, 'category', e.target.value)}
                      />
                      <Input
                        label="Accordion Question Text"
                        value={f.question}
                        onChange={(e) => handleFaqChange(idx, 'question', e.target.value)}
                      />
                    </div>

                    <Textarea
                      label="Detailed Answer Text"
                      rows={3}
                      value={f.answer}
                      onChange={(e) => handleFaqChange(idx, 'answer', e.target.value)}
                    />
                  </Card>
                ))}
              </div>
            )}

            {/* TABS CONTENT 5: BLOG ARTICLES */}
            {activeTab === 'blog' && (
              <div className="flex flex-col gap-4 animate-fade-in">
                <div className="flex justify-between items-center bg-[#0a0a0c] border border-white/5 p-4 rounded-2xl select-none">
                  <div className="text-left">
                    <h3 className="text-sm font-bold text-white uppercase tracking-wider">Dynamic Blog Post Grid</h3>
                    <p className="text-neutral-400 text-xs">Total Articles Registered: {config.blog.length}</p>
                  </div>
                  <Button variant="primary" size="sm" onClick={handleAddBlogPost} className="text-xs h-9 px-3 gap-1">
                    <Plus className="h-3.5 w-3.5" /> Write Blog Article
                  </Button>
                </div>

                {config.blog.map((b, idx) => (
                  <Card key={idx} className="p-6 sm:p-8 flex flex-col gap-4">
                    <div className="flex justify-between items-center border-b border-white/5 pb-4">
                      <div className="text-left">
                        <span className="text-[10px] font-bold text-brand-cyan bg-brand-cyan/5 px-2 py-0.5 rounded border border-brand-cyan/25">Article #{idx + 1}</span>
                        <h4 className="text-base font-extrabold text-white mt-1">{b.title || 'Untitled Article'}</h4>
                      </div>
                      <Button variant="danger" size="sm" onClick={() => handleDeleteBlogPost(idx)} className="h-8 text-[10px] px-2.5">
                        Remove Article
                      </Button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <Input
                        label="Article Title"
                        value={b.title}
                        onChange={(e) => handleBlogChange(idx, 'title', e.target.value)}
                      />
                      <Input
                        label="URL Slug (e.g. signs-slab-leak)"
                        value={b.slug}
                        onChange={(e) => handleBlogChange(idx, 'slug', e.target.value)}
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <Input
                        label="Author Full Name"
                        value={b.author.name}
                        onChange={(e) => {
                          const updated = { ...b.author, name: e.target.value };
                          handleBlogChange(idx, 'author', updated);
                        }}
                      />
                      <Input
                        label="Author Role Subtitle"
                        value={b.author.role}
                        onChange={(e) => {
                          const updated = { ...b.author, role: e.target.value };
                          handleBlogChange(idx, 'author', updated);
                        }}
                      />
                      <Input
                        label="Article Post Date"
                        value={b.date}
                        onChange={(e) => handleBlogChange(idx, 'date', e.target.value)}
                      />
                    </div>

                    <Textarea
                      label="Snippet Excerpt Text"
                      rows={2}
                      value={b.excerpt}
                      onChange={(e) => handleBlogChange(idx, 'excerpt', e.target.value)}
                    />

                    <div className="flex flex-col gap-2.5">
                      <label className="text-xs font-semibold uppercase tracking-wider text-neutral-400 select-none">
                        Article Main Content (Paragraph 1)
                      </label>
                      <Textarea
                        rows={4}
                        value={b.content[0] || ''}
                        onChange={(e) => {
                          const contentCopy = [...b.content];
                          contentCopy[0] = e.target.value;
                          handleBlogChange(idx, 'content', contentCopy);
                        }}
                      />
                    </div>
                  </Card>
                ))}
              </div>
            )}

            {/* TABS CONTENT 6: REVIEWS FEED */}
            {activeTab === 'reviews' && (
              <div className="flex flex-col gap-4 animate-fade-in">
                <div className="flex justify-between items-center bg-[#0a0a0c] border border-white/5 p-4 rounded-2xl select-none">
                  <div className="text-left">
                    <h3 className="text-sm font-bold text-white uppercase tracking-wider">Testimonial Reviews Grid</h3>
                    <p className="text-neutral-400 text-xs">Total Reviews Registered: {config.testimonials.length}</p>
                  </div>
                  <Button variant="primary" size="sm" onClick={handleAddReview} className="text-xs h-9 px-3 gap-1">
                    <Plus className="h-3.5 w-3.5" /> Add Review Card
                  </Button>
                </div>

                {config.testimonials.map((t, idx) => (
                  <Card key={idx} className="p-6 sm:p-8 flex flex-col gap-4">
                    <div className="flex justify-between items-center border-b border-white/5 pb-4">
                      <div className="text-left">
                        <span className="text-[10px] font-bold text-brand-cyan bg-brand-cyan/5 px-2 py-0.5 rounded border border-brand-cyan/25">Customer Review #{idx + 1}</span>
                      </div>
                      <Button variant="danger" size="sm" onClick={() => handleDeleteReview(idx)} className="h-8 text-[10px] px-2.5">
                        Remove Review
                      </Button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <Input
                        label="Customer Full Name"
                        value={t.author}
                        onChange={(e) => handleReviewChange(idx, 'author', e.target.value)}
                      />
                      <Input
                        label="Customer Role Subtitle"
                        value={t.role}
                        onChange={(e) => handleReviewChange(idx, 'role', e.target.value)}
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <Input
                        label="Star Rating (1 to 5)"
                        type="number"
                        min={1}
                        max={5}
                        value={t.rating}
                        onChange={(e) => handleReviewChange(idx, 'rating', parseInt(e.target.value))}
                      />
                      <Input
                        label="Review Source (Google, Yelp)"
                        value={t.source}
                        onChange={(e) => handleReviewChange(idx, 'source', e.target.value)}
                      />
                      <Input
                        label="Review Date"
                        value={t.date}
                        onChange={(e) => handleReviewChange(idx, 'date', e.target.value)}
                      />
                    </div>

                    <Textarea
                      label="Customer Review Text"
                      rows={3}
                      value={t.text}
                      onChange={(e) => handleReviewChange(idx, 'text', e.target.value)}
                    />
                  </Card>
                ))}
              </div>
            )}

            {/* TABS CONTENT 7: BEFORE/AFTER GALLERY SHOWCASE */}
            {activeTab === 'gallery' && (
              <div className="flex flex-col gap-4 animate-fade-in">
                <div className="flex justify-between items-center bg-[#0a0a0c] border border-white/5 p-4 rounded-2xl select-none">
                  <div className="text-left">
                    <h3 className="text-sm font-bold text-white uppercase tracking-wider">Before & After Showcase Items</h3>
                    <p className="text-neutral-400 text-xs">Total Items Registered: {config.gallery.length}</p>
                  </div>
                  <Button variant="primary" size="sm" onClick={handleAddGalleryItem} className="text-xs h-9 px-3 gap-1">
                    <Plus className="h-3.5 w-3.5" /> Add Project Item
                  </Button>
                </div>

                {config.gallery.map((g, idx) => (
                  <Card key={idx} className="p-6 sm:p-8 flex flex-col gap-4">
                    <div className="flex justify-between items-center border-b border-white/5 pb-4">
                      <div className="text-left">
                        <span className="text-[10px] font-bold text-brand-cyan bg-brand-cyan/5 px-2 py-0.5 rounded border border-brand-cyan/25">Showcase Item #{idx + 1}</span>
                        <h4 className="text-base font-extrabold text-white mt-1">{g.title || 'Untitled Project'}</h4>
                      </div>
                      <Button variant="danger" size="sm" onClick={() => handleDeleteGalleryItem(idx)} className="h-8 text-[10px] px-2.5">
                        Remove Item
                      </Button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <Input
                        label="Project Title"
                        value={g.title}
                        onChange={(e) => handleGalleryChange(idx, 'title', e.target.value)}
                      />
                      <Input
                        label="Related Service Category (slug)"
                        value={g.category}
                        onChange={(e) => handleGalleryChange(idx, 'category', e.target.value)}
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <Input
                        label="Before Image URL / Path"
                        value={g.beforeImage}
                        onChange={(e) => handleGalleryChange(idx, 'beforeImage', e.target.value)}
                      />
                      <Input
                        label="After Image URL / Path"
                        value={g.afterImage}
                        onChange={(e) => handleGalleryChange(idx, 'afterImage', e.target.value)}
                      />
                    </div>

                    <Textarea
                      label="Detailed Project Description"
                      rows={3}
                      value={g.description}
                      onChange={(e) => handleGalleryChange(idx, 'description', e.target.value)}
                    />
                  </Card>
                ))}
              </div>
            )}

            {/* TABS CONTENT 8: CAREERS OPENINGS LIST */}
            {activeTab === 'careers' && (
              <div className="flex flex-col gap-4 animate-fade-in">
                <div className="flex justify-between items-center bg-[#0a0a0c] border border-white/5 p-4 rounded-2xl select-none">
                  <div className="text-left">
                    <h3 className="text-sm font-bold text-white uppercase tracking-wider">Careers Active Openings</h3>
                    <p className="text-neutral-400 text-xs">Total Active Positions: {config.careers.length}</p>
                  </div>
                  <Button variant="primary" size="sm" onClick={handleAddJob} className="text-xs h-9 px-3 gap-1">
                    <Plus className="h-3.5 w-3.5" /> Post Open Position
                  </Button>
                </div>

                {config.careers.map((j, idx) => (
                  <Card key={idx} className="p-6 sm:p-8 flex flex-col gap-4">
                    <div className="flex justify-between items-center border-b border-white/5 pb-4">
                      <div className="text-left">
                        <span className="text-[10px] font-bold text-brand-cyan bg-brand-cyan/5 px-2 py-0.5 rounded border border-brand-cyan/25">Position #{idx + 1}</span>
                        <h4 className="text-base font-extrabold text-white mt-1">{j.title || 'Untitled Role'}</h4>
                      </div>
                      <Button variant="danger" size="sm" onClick={() => handleDeleteJob(idx)} className="h-8 text-[10px] px-2.5">
                        Remove Role
                      </Button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <Input
                        label="Job Title"
                        value={j.title}
                        onChange={(e) => handleJobChange(idx, 'title', e.target.value)}
                      />
                      <Input
                        label="Department Area"
                        value={j.department}
                        onChange={(e) => handleJobChange(idx, 'department', e.target.value)}
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <Input
                        label="Geographic Location"
                        value={j.location}
                        onChange={(e) => handleJobChange(idx, 'location', e.target.value)}
                      />
                      <Input
                        label="Contract Type (e.g. Full-time)"
                        value={j.type}
                        onChange={(e) => handleJobChange(idx, 'type', e.target.value)}
                      />
                      <Input
                        label="Salary Range Bracket"
                        value={j.salaryRange}
                        onChange={(e) => handleJobChange(idx, 'salaryRange', e.target.value)}
                      />
                    </div>

                    <Textarea
                      label="Job Summary Description"
                      rows={3}
                      value={j.description}
                      onChange={(e) => handleJobChange(idx, 'description', e.target.value)}
                    />
                  </Card>
                ))}
              </div>
            )}

            {/* TABS CONTENT 9: PAGES HEROES & HEADERS */}
            {activeTab === 'pages' && (
              <div className="flex flex-col gap-6 animate-fade-in">
                
                {/* Home Page Hero Section */}
                <Card className="p-6 sm:p-8 flex flex-col gap-4">
                  <div className="border-b border-white/5 pb-3">
                    <h3 className="text-base font-bold text-white uppercase tracking-wider flex items-center gap-1.5"><FileText className="h-4.5 w-4.5 text-brand-cyan" /> Home Page Hero & Metrics</h3>
                    <p className="text-neutral-400 text-xs">Visually update the text layers on your homepage hero section.</p>
                  </div>
                  <Input
                    label="Home Hero Badge"
                    value={config.pageContent.home.hero.badge}
                    onChange={(e) => handleHomeHeroChange('badge', e.target.value)}
                  />
                  <Input
                    label="Home Hero Main Heading"
                    value={config.pageContent.home.hero.title}
                    onChange={(e) => handleHomeHeroChange('title', e.target.value)}
                  />
                  <Textarea
                    label="Home Hero Subtitle Summary"
                    rows={3}
                    value={config.pageContent.home.hero.subtitle}
                    onChange={(e) => handleHomeHeroChange('subtitle', e.target.value)}
                  />
                </Card>

                {/* About Story Page Content */}
                <Card className="p-6 sm:p-8 flex flex-col gap-4">
                  <div className="border-b border-white/5 pb-3">
                    <h3 className="text-base font-bold text-white uppercase tracking-wider flex items-center gap-1.5"><FileText className="h-4.5 w-4.5 text-brand-cyan" /> About Story Paragraphs</h3>
                    <p className="text-neutral-400 text-xs">Visually update the narrative content displayed on your About page.</p>
                  </div>
                  <Input
                    label="About Story Main Title"
                    value={config.pageContent.about.story.title}
                    onChange={(e) => handleAboutStoryChange('title', e.target.value)}
                  />
                  <div className="flex flex-col gap-2.5">
                    <label className="text-xs font-semibold uppercase tracking-wider text-neutral-400 select-none">
                      Story Content (Paragraph 1)
                    </label>
                    <Textarea
                      rows={4}
                      value={config.pageContent.about.story.paragraphs[0] || ''}
                      onChange={(e) => {
                        const parasCopy = [...config.pageContent.about.story.paragraphs];
                        parasCopy[0] = e.target.value;
                        handleAboutStoryChange('paragraphs', parasCopy);
                      }}
                    />
                  </div>
                </Card>

                {/* Careers Page Static Content */}
                <Card className="p-6 sm:p-8 flex flex-col gap-4">
                  <div className="border-b border-white/5 pb-3">
                    <h3 className="text-base font-bold text-white uppercase tracking-wider flex items-center gap-1.5"><FileText className="h-4.5 w-4.5 text-brand-cyan" /> Careers Page Header</h3>
                    <p className="text-neutral-400 text-xs">Visually update headers on your Careers layout.</p>
                  </div>
                  <Input
                    label="Careers Section Main Title"
                    value={config.pageContent.careersPage.header}
                    onChange={(e) => handleCareersPageChange('header', e.target.value)}
                  />
                  <Textarea
                    label="Careers Section Sub-Header"
                    rows={2.5}
                    value={config.pageContent.careersPage.subHeader}
                    onChange={(e) => handleCareersPageChange('subHeader', e.target.value)}
                  />
                </Card>
              </div>
            )}

            {/* TABS CONTENT 10: AI CHATBOT SYSTEM KNOWLEDGE */}
            {activeTab === 'chatbot' && (
              <div className="flex flex-col gap-4 animate-fade-in">
                <Card className="p-6 sm:p-8 flex flex-col gap-6">
                  <div>
                    <h3 className="text-lg font-bold text-white tracking-tight">Gemini AI Assistant Configuration</h3>
                    <p className="text-neutral-400 text-xs mt-0.5">Control the chatbot's name, personality header, greeting, and custom intents.</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input
                      label="Assistant Agent Name"
                      value={config.aiAssistant.botName}
                      onChange={(e) => updateBotField('botName', e.target.value)}
                    />
                    <Input
                      label="Personality Subheader"
                      value={config.aiAssistant.personalityTitle}
                      onChange={(e) => updateBotField('personalityTitle', e.target.value)}
                    />
                  </div>

                  <Textarea
                    label="Initial Greeting Message (Welcome)"
                    rows={2}
                    value={config.aiAssistant.welcomeMessage}
                    onChange={(e) => updateBotField('welcomeMessage', e.target.value)}
                  />

                  <Textarea
                    label="Fallback Response (When no keywords are matched)"
                    rows={3}
                    value={config.aiAssistant.fallbackResponse}
                    onChange={(e) => updateBotField('fallbackResponse', e.target.value)}
                  />
                </Card>

                <div className="flex justify-between items-center bg-[#0a0a0c] border border-white/5 p-4 rounded-2xl select-none">
                  <div className="text-left">
                    <h3 className="text-sm font-bold text-white uppercase tracking-wider">Specialized NLP Knowledge Base</h3>
                    <p className="text-neutral-400 text-xs">Total custom intents defined: {config.aiAssistant.knowledgeBase.length}</p>
                  </div>
                  <Button variant="primary" size="sm" onClick={handleAddBotKnowledge} className="text-xs h-9 px-3 gap-1">
                    <Sparkles className="h-3.5 w-3.5" /> Add Knowledge Node
                  </Button>
                </div>

                {config.aiAssistant.knowledgeBase.map((k, idx) => (
                  <Card key={idx} className="p-6 sm:p-8 flex flex-col gap-4">
                    <div className="flex justify-between items-center border-b border-white/5 pb-4">
                      <div className="text-left">
                        <span className="text-[10px] font-bold text-brand-cyan bg-brand-cyan/5 px-2 py-0.5 rounded border border-brand-cyan/25">Intent Node #{idx + 1}</span>
                        <h4 className="text-base font-extrabold text-white mt-1">Keywords: {k.keywords.join(', ')}</h4>
                      </div>
                      <Button variant="danger" size="sm" onClick={() => handleDeleteBotKnowledge(idx)} className="h-8 text-[10px] px-2.5">
                        Remove Node
                      </Button>
                    </div>

                    <Input
                      label="Trigger Keywords (Comma separated e.g. warranty, years, guarantee)"
                      value={k.keywords.join(', ')}
                      onChange={(e) => {
                        const keywordsArr = e.target.value.split(',').map((val) => val.trim()).filter(Boolean);
                        handleBotKnowledgeChange(idx, 'keywords', keywordsArr);
                      }}
                    />

                    <Textarea
                      label="Detailed Markdown AI Response (supports double stars for bold and single asterisks for lists)"
                      rows={5}
                      value={k.response}
                      onChange={(e) => handleBotKnowledgeChange(idx, 'response', e.target.value)}
                    />
                  </Card>
                ))}
              </div>
            )}

          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
