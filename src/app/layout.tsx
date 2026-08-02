import type { Metadata } from 'next';
import React from 'react';
import { clientConfig } from '@/config/client.config';
import { SmoothScrollProvider } from '@/components/providers/smooth-scroll-provider';
import { WhatsappWidget } from '@/components/features/whatsapp-widget';
import { getLocalBusinessSchema } from '@/lib/seo/schema-generator';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: `${clientConfig.meta.name} | Professional Plumbing & Diagnostics`,
    template: `%s | ${clientConfig.meta.name}`,
  },
  description: 'Precision hydraulic engineering, acoustic leak detection, hydro-jetting, and trenchless sewer restoration.',
  metadataBase: new URL('https://vortexflow.com'),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Map color names to real CSS hex codes dynamically
  const colorMap: Record<string, string> = {
    indigo: '#4f46e5',
    cyan: '#06b6d4',
    blue: '#3b82f6',
    emerald: '#10b981',
    amber: '#f59e0b',
    rose: '#f43f5e',
  };

  const primaryHex = colorMap[clientConfig.theme.primaryAccent] || '#4f46e5';
  const secondaryHex = colorMap[clientConfig.theme.secondaryAccent] || '#06b6d4';

  const dynamicStyle = {
    '--accent-primary': primaryHex,
    '--accent-secondary': secondaryHex,
  } as React.CSSProperties;

  const schema = getLocalBusinessSchema();

  return (
    <html lang="en" style={dynamicStyle} suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      </head>
      <body className="antialiased selection:bg-brand-indigo/30 selection:text-white custom-scrollbar bg-background-dark text-white" suppressHydrationWarning>
        <SmoothScrollProvider>
          {children}
          <WhatsappWidget />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
