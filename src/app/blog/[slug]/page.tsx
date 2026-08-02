import React from 'react';
import { clientConfig } from '@/config/client.config';
import { EmergencyBanner } from '@/components/layout/emergency-banner';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight, Calendar, Clock, User, Phone, Sparkles } from 'lucide-react';

// Generates static parameter slugs at build time for strict static site generation (SSG) compliance
export async function generateStaticParams() {
  return clientConfig.blog.map((post) => ({
    slug: post.slug,
  }));
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function BlogPostDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const post = clientConfig.blog.find((b) => b.slug === slug);

  if (!post) {
    return (
      <div className="min-h-screen bg-background-dark text-white flex flex-col justify-center items-center p-6">
        <h1 className="text-2xl font-bold">Article Not Found</h1>
        <a href="/blog" className="text-brand-cyan hover:underline mt-4">Back to All Articles</a>
      </div>
    );
  }

  // Related articles lookup
  const relatedPosts = clientConfig.blog.filter(
    (b) => post.relatedSlugs.includes(b.slug) && b.slug !== post.slug
  );

  const getBlogImage = (val: string) => {
    switch (val) {
      case 'signs-slab-leak-foundation':
        return 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&w=800&q=80';
      case 'how-ultrasonic-leak-detection-saves-drywall':
        return 'https://images.unsplash.com/photo-1542013936693-8848e574047e?auto=format&fit=crop&w=800&q=80';
      default:
        return 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&w=800&q=80';
    }
  };

  return (
    <div className="min-h-screen bg-background-dark text-white flex flex-col relative overflow-x-clip">
      {/* Dynamic inline client scrolling reading indicator wrapper could be handled here or kept clean */}
      <EmergencyBanner />
      <Navbar />

      {/* Header back button */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 select-none z-10 w-full text-left">
        <a href="/blog" className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-neutral-500 hover:text-white transition-colors">
          <ArrowLeft className="h-4 w-4" /> Back to Blog
        </a>
      </div>

      {/* Hero Header */}
      <header className="relative w-full pt-6 pb-12 text-left px-4 overflow-hidden select-none max-w-4xl mx-auto">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_10%_40%,rgba(79,70,229,0.04),transparent)] pointer-events-none" />
        <div className="flex flex-col gap-4 relative z-10">
          <div className="flex items-center gap-3 text-xs font-semibold text-neutral-500 uppercase tracking-widest">
            <span className="flex items-center gap-1"><Calendar className="h-3.5 w-3.5" /> {post.date}</span>
            <span>•</span>
            <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> {post.readTime}</span>
          </div>
          <Badge variant="primary" className="w-fit">{post.category}</Badge>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-white to-neutral-400 bg-clip-text text-transparent leading-[1.12]">
            {post.title}
          </h1>

          {/* Author details block */}
          <div className="flex items-center gap-3 mt-2 border-t border-b border-white/5 py-4">
            <div className="h-9 w-9 rounded-full bg-white/10 flex items-center justify-center font-bold text-neutral-300 text-xs">
              MT
            </div>
            <div className="flex flex-col text-left">
              <span className="text-xs font-bold text-white">{post.author.name}</span>
              <span className="text-[10px] text-neutral-500 uppercase tracking-wider">{post.author.role}</span>
            </div>
          </div>
        </div>
      </header>

      {/* Article Content Area */}
      <article className="py-6 pb-24 relative z-10 max-w-4xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main article texts (Left side - 8 Cols) */}
          <div className="lg:col-span-8 flex flex-col gap-6 text-left text-neutral-300 text-sm sm:text-base leading-relaxed">
            <div className="w-full h-56 sm:h-72 overflow-hidden rounded-3xl relative mb-4">
              <img
                src={getBlogImage(post.slug)}
                alt={post.title}
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>

            {post.content.map((p, idx) => (
              <p key={idx} className="font-medium">
                {p}
              </p>
            ))}

            {/* Inline Dynamic High-Converting CTA block */}
            <Card className="p-6 sm:p-8 border-brand-indigo/15 bg-gradient-to-r from-brand-indigo/10 to-transparent mt-8 select-none">
              <div className="flex flex-col gap-2">
                <Badge variant="primary" className="w-fit">Stabilize your assets</Badge>
                <h4 className="text-lg font-bold text-white tracking-tight mt-1">Suspect a Hidden Leak in Palo Alto?</h4>
                <p className="text-neutral-400 text-xs leading-relaxed max-w-md mt-1">
                  Do not wait for active flooding. Vortex Flow pinpoint ultrasonic scans find pipe ruptures with millimetric accuracy without structure demolition.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 mt-6">
                <a href="/quote" className="inline-flex">
                  <Button variant="primary" size="sm" className="gap-1.5 text-xs font-bold">
                    Calculate Repair Quote <ArrowRight className="h-3.5 w-3.5" />
                  </Button>
                </a>
                <a href={`tel:${clientConfig.meta.phoneRaw}`} className="inline-flex">
                  <Button variant="glass" size="sm" className="text-xs font-bold gap-2 border-white/5">
                    <Phone className="h-3.5 w-3.5 text-brand-cyan" /> Call Local Center
                  </Button>
                </a>
              </div>
            </Card>
          </div>

          {/* Sidebar / Related guides (Right side - 4 Cols) */}
          <div className="lg:col-span-4 lg:sticky lg:top-24 flex flex-col gap-5 text-left select-none">
            {relatedPosts.length > 0 && (
              <Card className="p-5 border-white/5 bg-[#0a0a0c]">
                <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">Related Guides</h4>
                <div className="flex flex-col gap-4">
                  {relatedPosts.map((rel) => (
                    <a
                      key={rel.slug}
                      href={`/blog/${rel.slug}`}
                      className="flex flex-col gap-1.5 hover:opacity-80 transition-opacity group"
                    >
                      <span className="text-[9px] font-bold text-brand-cyan uppercase tracking-widest">{rel.category}</span>
                      <span className="text-xs font-bold text-white group-hover:text-brand-cyan transition-colors line-clamp-2">
                        {rel.title}
                      </span>
                    </a>
                  ))}
                </div>
              </Card>
            )}

            {/* Verification trust lock card */}
            <Card className="p-5 border-white/5 bg-gradient-to-b from-card-dark to-[#050507] text-xs text-neutral-400 flex flex-col gap-3">
              <span className="text-[9px] font-bold uppercase tracking-widest text-neutral-500">Document Authority</span>
              <p className="leading-relaxed">
                Vortex Flow publications are curated and peer-reviewed by CA certified Journeyman plumbers to ensure complete compliance with local building codes.
              </p>
            </Card>
          </div>
        </div>
      </article>

      <Footer />
    </div>
  );
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const post = clientConfig.blog.find((b) => b.slug === slug);
  return {
    title: post ? post.metaTitle : 'Diagnostic Article',
    description: post ? post.metaDesc : 'Vortex Flow & Plumbing diagnostic guides.',
  };
}
