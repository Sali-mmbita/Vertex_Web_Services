'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Phone, ArrowRight, Activity, Sun, Moon } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { clientConfig } from '@/config/client.config';
import { Button } from '@/components/ui/button';

export function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);

    // Persist and check local storage theme
    const stored = localStorage.getItem('vortex-theme') as 'dark' | 'light' | null;
    if (stored) {
      setTheme(stored);
      if (stored === 'light') {
        document.documentElement.classList.add('light');
      } else {
        document.documentElement.classList.remove('light');
      }
    }

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    localStorage.setItem('vortex-theme', next);
    if (next === 'light') {
      document.documentElement.classList.add('light');
    } else {
      document.documentElement.classList.remove('light');
    }
  };

  const navLinks = [
    { label: 'Services', href: '/services' },
    { label: 'Gallery', href: '/gallery' },
    { label: 'Reviews', href: '/testimonials' },
    { label: 'FAQ', href: '/faq' },
    { label: 'Blog', href: '/blog' },
    { label: 'About', href: '/about' },
    { label: 'Careers', href: '/careers' },
    { label: 'Contact', href: '/contact' },
  ];

  return (
    <>
      <nav
        className={`sticky top-0 w-full z-40 transition-all duration-500 select-none ${
          scrolled
            ? 'bg-black/85 backdrop-blur-xl border-b border-white/5 py-3'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo brand */}
          <a href="/" className="flex items-center gap-2 group outline-none">
            <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-brand-indigo to-brand-cyan p-[1px]">
              <div className="h-full w-full bg-[#030303] rounded-xl flex items-center justify-center text-white transition-colors group-hover:bg-brand-indigo/10">
                <Activity className="h-4.5 w-4.5 text-brand-cyan group-hover:scale-110 transition-transform" />
              </div>
            </div>
            <span className="text-base font-black tracking-tight text-white group-hover:text-neutral-200 transition-colors">
              {clientConfig.meta.logo?.primaryText || 'VORTEX'}<span className="text-brand-cyan">{clientConfig.meta.logo?.secondaryText || 'FLOW'}</span>
            </span>
          </a>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
              return (
                <a
                  key={link.href}
                  href={link.href}
                  className={`text-xs font-semibold uppercase tracking-wider transition-colors outline-none relative py-1 ${
                    isActive
                      ? 'text-brand-cyan font-bold'
                      : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <motion.div
                      layoutId="activeNavLink"
                      className="absolute bottom-0 inset-x-0 h-[2px] bg-gradient-to-r from-brand-indigo to-brand-cyan rounded-full"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </a>
              );
            })}
          </div>

          {/* Right Desktop CTA Action */}
          <div className="hidden lg:flex items-center gap-4">
            <button
              onClick={toggleTheme}
              className="h-8 w-8 rounded-full bg-white/5 hover:bg-white/10 border border-white/5 flex items-center justify-center text-neutral-300 hover:text-white transition-all duration-200 outline-none"
              title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {theme === 'dark' ? <Sun className="h-3.5 w-3.5" /> : <Moon className="h-3.5 w-3.5" />}
            </button>
            <a
              href={`tel:${clientConfig.meta.phoneRaw}`}
              className="text-xs font-semibold text-neutral-300 hover:text-white flex items-center gap-2 pr-2"
            >
              <Phone className="h-3.5 w-3.5 text-brand-cyan" />
              {clientConfig.meta.phone}
            </a>
            <a href="/quote" className="inline-flex">
              <Button variant="primary" size="sm" className="text-xs font-bold tracking-tight gap-1">
                Instant Quote <ArrowRight className="h-3 w-3" />
              </Button>
            </a>
          </div>

          {/* Mobile menu toggle */}
          <div className="flex lg:hidden items-center gap-3">
            <button
              onClick={toggleTheme}
              className="h-9 w-9 rounded-full bg-white/5 border border-white/5 flex items-center justify-center text-neutral-300 hover:text-white transition-all duration-200 outline-none"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>
            <a
              href={`tel:${clientConfig.meta.phoneRaw}`}
              className="h-9 w-9 rounded-full bg-white/5 flex items-center justify-center border border-white/5 text-neutral-300"
            >
              <Phone className="h-4 w-4" />
            </a>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="h-9 w-9 rounded-full bg-white/5 border border-white/5 flex items-center justify-center text-neutral-300 hover:text-white"
            >
              {isOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="fixed inset-x-0 top-[60px] z-35 bg-[#030303] border-b border-white/10 p-6 flex flex-col gap-5 lg:hidden shadow-2xl select-none"
          >
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => {
                const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className={`text-sm font-bold uppercase tracking-wider py-1.5 border-b border-white/5 flex items-center justify-between ${
                      isActive
                        ? 'text-brand-cyan border-brand-cyan/40'
                        : 'text-neutral-400 hover:text-white'
                    }`}
                  >
                    <span>{link.label}</span>
                    {isActive && <span className="h-1.5 w-1.5 rounded-full bg-brand-cyan shadow-[0_0_8px_rgba(6,182,212,0.8)]" />}
                  </a>
                );
              })}
            </div>

            <div className="flex flex-col gap-4 mt-2">
              <a
                href={`tel:${clientConfig.meta.phoneRaw}`}
                className="flex items-center gap-2.5 text-xs font-semibold text-neutral-300 hover:text-white py-1"
              >
                <Phone className="h-4 w-4 text-brand-cyan" />
                Call Local Center: {clientConfig.meta.phone}
              </a>
              <a href="/quote" onClick={() => setIsOpen(false)} className="inline-flex w-full">
                <Button variant="primary" size="md" className="w-full text-xs gap-1">
                  Request Instant Quote <ArrowRight className="h-3.5 w-3.5" />
                </Button>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
export default Navbar;
