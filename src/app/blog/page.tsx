'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Calendar, User, Clock, ArrowRight, Star } from 'lucide-react';
import { clientConfig } from '@/config/client.config';
import { EmergencyBanner } from '@/components/layout/emergency-banner';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { Card, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function BlogGridPage() {
  const [search, setSearch] = useState('');
  const [selectedTag, setSelectedTag] = useState<string>('All');

  const blogPosts = clientConfig.blog;

  // Sourcing all distinct tags from our dataset dynamically
  const allTags = ['All', ...Array.from(new Set(blogPosts.flatMap((post) => post.tags)))];

  const filteredPosts = blogPosts.filter((post) => {
    const matchesTag = selectedTag === 'All' || post.tags.includes(selectedTag);
    const matchesSearch =
      post.title.toLowerCase().includes(search.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(search.toLowerCase());
    return matchesTag && matchesSearch;
  });

  const featuredPost = blogPosts[0];

  // Map local paths to CDN unsplash images to preserve premium aesthetic
  const getBlogImage = (slug: string) => {
    switch (slug) {
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
      <EmergencyBanner />
      <Navbar />

      {/* Hero Header */}
      <header className="relative w-full pt-32 pb-12 md:pt-40 md:pb-16 text-center px-4 overflow-hidden select-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_40%,rgba(79,70,229,0.05),transparent)] pointer-events-none" />
        <div className="max-w-4xl mx-auto flex flex-col items-center gap-4 relative z-10">
          <Badge variant="primary">Industry Insights</Badge>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight bg-gradient-to-b from-white to-neutral-400 bg-clip-text text-transparent">
            Flow Diagnostics Blog
          </h1>
          <p className="text-neutral-400 text-sm sm:text-base max-w-xl leading-relaxed mt-1">
            Expert diagnostic guides, engineering tips, and home asset stabilization blueprints.
          </p>
        </div>
      </header>

      {/* Featured Hero Card (Selects first blog post) */}
      {featuredPost && (
        <section className="py-6 select-none relative z-10 max-w-5xl mx-auto w-full px-4">
          <Card className="p-1 border-white/5 bg-gradient-to-b from-card-dark to-[#050507] hover:border-brand-indigo/15">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch p-4">
              <div className="md:col-span-6 overflow-hidden rounded-2xl h-[200px] sm:h-full min-h-[220px] relative">
                <img
                  src={getBlogImage(featuredPost.slug)}
                  alt={featuredPost.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>

              <div className="md:col-span-6 flex flex-col justify-between text-left p-2">
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-3 text-[10px] font-semibold text-neutral-500 uppercase tracking-widest">
                    <span className="flex items-center gap-1"><Calendar className="h-3.5 w-3.5" /> {featuredPost.date}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> {featuredPost.readTime}</span>
                  </div>
                  <Badge variant="primary" className="w-fit">{featuredPost.category}</Badge>
                  <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight leading-tight">
                    {featuredPost.title}
                  </h2>
                  <p className="text-neutral-400 text-xs leading-relaxed font-medium line-clamp-3">
                    {featuredPost.excerpt}
                  </p>
                </div>

                <div className="border-t border-white/5 pt-4 mt-6 flex justify-between items-center">
                  <div className="flex items-center gap-2.5">
                    <div className="h-7 w-7 rounded-full bg-white/10 flex items-center justify-center font-bold text-neutral-300 text-[10px]">
                      MT
                    </div>
                    <span className="text-[10px] font-bold text-white uppercase tracking-wider">{featuredPost.author.name}</span>
                  </div>
                  <a href={`/blog/${featuredPost.slug}`} className="inline-flex">
                    <Button variant="glass" size="sm" className="text-xs font-semibold gap-1.5 border-white/5 hover:border-brand-cyan">
                      Read Guide <ArrowRight className="h-3.5 w-3.5" />
                    </Button>
                  </a>
                </div>
              </div>
            </div>
          </Card>
        </section>
      )}

      {/* Search & Tag Filter triggers */}
      <section className="py-6 select-none relative z-10 flex flex-col items-center gap-5 max-w-2xl mx-auto w-full px-4 mt-6">
        <div className="w-full relative">
          <Input
            placeholder="Search guides or diagnostic criteria..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-11 border-white/10 pl-11"
          />
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-500" />
        </div>

        <div className="flex flex-wrap gap-2 justify-center">
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className={`px-3 py-1 rounded-xl text-[10px] font-bold uppercase tracking-wider transition-all duration-300 outline-none ${
                selectedTag === tag
                  ? 'bg-brand-indigo text-white shadow-[0_0_15px_rgba(79,70,229,0.35)]'
                  : 'text-neutral-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </section>

      {/* Grid Post List */}
      <section className="py-12 pb-24 relative z-10 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            <AnimatePresence mode="popLayout">
              {filteredPosts.map((post) => (
                <motion.div
                  key={post.slug}
                  layout
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="flex flex-col justify-between h-full border-white/5 hover:border-brand-indigo/15 bg-gradient-to-b from-card-dark to-[#050507]">
                    <div className="p-5 flex flex-col gap-4 text-left">
                      <div className="w-full h-44 overflow-hidden rounded-2xl relative">
                        <img
                          src={getBlogImage(post.slug)}
                          alt={post.title}
                          className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                        />
                      </div>

                      <div className="flex items-center justify-between select-none">
                        <span className="text-[9px] font-semibold text-neutral-500 uppercase tracking-widest flex items-center gap-1">
                          <Calendar className="h-3 w-3" /> {post.date}
                        </span>
                        <Badge variant="primary" className="text-[9px]">{post.category}</Badge>
                      </div>

                      <h3 className="text-base font-bold text-white tracking-tight leading-tight line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="text-neutral-400 text-xs leading-relaxed font-medium line-clamp-3">
                        {post.excerpt}
                      </p>
                    </div>

                    <CardFooter className="p-5 pt-3 border-t border-white/5 flex items-center justify-between text-xs select-none">
                      <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider">
                        {post.author.name}
                      </span>
                      <a href={`/blog/${post.slug}`} className="inline-flex">
                        <Button variant="glass" size="sm" className="h-8 text-xs font-semibold gap-1 border-white/5 hover:border-brand-cyan">
                          Read Guide <ArrowRight className="h-3 w-3" />
                        </Button>
                      </a>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
