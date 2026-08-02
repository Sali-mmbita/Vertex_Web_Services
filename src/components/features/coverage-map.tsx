'use client';

import React, { useState } from 'react';
import { MapPin, Search, CheckCircle, XCircle, ChevronRight, Phone } from 'lucide-react';
import { clientConfig } from '@/config/client.config';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

interface Node {
  id: string;
  name: string;
  zip: string;
  x: number; // SVG coordinates percentage
  y: number;
}

export function CoverageMap() {
  const [zipInput, setZipInput] = useState('');
  const [lookupStatus, setLookupStatus] = useState<'idle' | 'success' | 'failed'>('idle');
  const [hoveredNode, setHoveredNode] = useState<Node | null>(null);
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);

  const zipCodes = clientConfig.meta.address.zipCodes;

  // Staged nodes representing regions of Silicon Valley (Palo Alto, Mountain View, Menlo Park, Sunnyvale)
  const coverageNodes: Node[] = [
    { id: '1', name: 'Downtown Palo Alto', zip: '94301', x: 45, y: 35 },
    { id: '2', name: 'East Palo Alto', zip: '94303', x: 68, y: 22 },
    { id: '3', name: 'Stanford / College Terrace', zip: '94304', x: 20, y: 55 },
    { id: '4', name: 'Menlo Park', zip: '94025', x: 22, y: 18 },
    { id: '5', name: 'Old Mountain View', zip: '94040', x: 52, y: 70 },
    { id: '6', name: 'North Mountain View', zip: '94043', x: 74, y: 48 },
    { id: '7', name: 'Sunnyvale West', zip: '94085', x: 82, y: 78 },
  ];

  const handleLookup = (e: React.FormEvent) => {
    e.preventDefault();
    const cleaned = zipInput.trim();
    if (!cleaned) return;

    if (zipCodes.includes(cleaned)) {
      setLookupStatus('success');
      const match = coverageNodes.find((n) => n.zip === cleaned);
      if (match) setSelectedNode(match);
    } else {
      setLookupStatus('failed');
      setSelectedNode(null);
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto flex flex-col gap-8">
      {/* Search Bar header */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 bg-[#0a0a0c] border border-white/5 p-6 sm:p-8 rounded-3xl select-none">
        <div className="max-w-md text-left">
          <h3 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
            <MapPin className="h-5 w-5 text-brand-cyan" />
            Vortex Regional Coverage Lookup
          </h3>
          <p className="text-neutral-400 text-xs mt-1 leading-relaxed">
            We operate fully equipped rolling service rigs across Silicon Valley. Enter your ZIP code to verify instantaneous dispatch availability.
          </p>
        </div>

        <form onSubmit={handleLookup} className="w-full md:w-auto flex flex-col sm:flex-row gap-3 items-stretch shrink-0">
          <div className="relative flex-1 min-w-[200px]">
            <Input
              placeholder="Enter ZIP (e.g. 94301)"
              value={zipInput}
              onChange={(e) => {
                setZipInput(e.target.value);
                setLookupStatus('idle');
                setSelectedNode(null);
              }}
              className="h-12 border-white/10"
              maxLength={5}
            />
            <Search className="absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-500" />
          </div>
          <Button variant="primary" type="submit" className="h-12 px-6">
            Verify Coverage
          </Button>
        </form>
      </div>

      {/* Grid Layout: SVG Map vs. Lookup Result */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Dynamic SVG Map Canvas (Left Side) */}
        <Card className="lg:col-span-8 p-5 relative overflow-hidden h-[450px] sm:h-[520px] flex flex-col justify-between border-white/5 bg-[#050507]">
          {/* Subtle grid mesh */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:20px] opacity-40 pointer-events-none" />

          {/* Map Header with minimum height to prevent layout jumps */}
          <div className="flex justify-between items-center z-10 select-none min-h-[36px]">
            <span className="text-[10px] uppercase font-bold tracking-widest text-neutral-500">
              Interactive Regional Nodes
            </span>
            {(hoveredNode || selectedNode) && (
              <span className="text-xs font-semibold text-brand-cyan bg-brand-cyan/5 px-2.5 py-1 rounded-md border border-brand-cyan/20">
                Active Region: {(hoveredNode || selectedNode)?.name}
              </span>
            )}
          </div>

          {/* SVG Map Core Canvas representation */}
          <div className="flex-1 w-full relative h-[220px] sm:h-[280px] my-4">
            <svg className="absolute inset-0 h-full w-full opacity-25 pointer-events-none select-none">
              {/* Hydraulic pipelines connecting nodes representing flows */}
              <path
                d="M 125,247 L 225,157 L 340,112 M 225,157 L 306,157 L 413,234 L 507,315"
                stroke="rgba(79,70,229,0.3)"
                strokeWidth="2"
                fill="none"
                strokeDasharray="5, 5"
              />
              <path
                d="M 340,112 L 413,234 L 546,234 L 594,360"
                stroke="rgba(6,182,212,0.3)"
                strokeWidth="1.5"
                fill="none"
              />
              {/* Dynamic flowing pulse animation path */}
              <circle r="4" fill="#06b6d4" className="motion-safe:animate-[bounce_3s_infinite]" style={{ transform: 'translate(413px, 234px)' }} />
            </svg>

            {/* Render Glowing Pulse Node Beacons */}
            {coverageNodes.map((node) => {
              const isSelected = selectedNode?.id === node.id;
              const isHovered = hoveredNode?.id === node.id;
              return (
                <div
                  key={node.id}
                  onMouseEnter={() => setHoveredNode(node)}
                  onMouseLeave={() => setHoveredNode(null)}
                  onClick={() => {
                    setZipInput(node.zip);
                    setLookupStatus('success');
                    setSelectedNode(node);
                  }}
                  className="absolute z-20 -translate-x-1/2 -translate-y-1/2 cursor-pointer group flex items-center gap-1.5"
                  style={{ left: `${node.x}%`, top: `${node.y}%` }}
                >
                  {/* Ping beacon ring - children are pointer-events-none to prevent boundary trigger loops */}
                  <div className={`h-4.5 w-4.5 rounded-full border flex items-center justify-center relative transition-all duration-300 shrink-0 pointer-events-none ${
                    isSelected || isHovered
                      ? 'border-brand-cyan bg-brand-cyan/20 shadow-[0_0_15px_rgba(6,182,212,0.45)]'
                      : 'border-brand-cyan/40 bg-brand-cyan/10 shadow-[0_0_10px_rgba(6,182,212,0.15)]'
                  }`}>
                    <span className="relative flex h-1.5 w-1.5 pointer-events-none">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-cyan opacity-80 pointer-events-none"></span>
                      <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-brand-cyan pointer-events-none"></span>
                    </span>
                  </div>

                  {/* Sleek, static, ultra-compact ZIP telemetry badge - pointer-events-none to eliminate jitter */}
                  <div className={`map-node-zip-badge text-[9px] font-bold transition-all duration-300 border px-1.5 py-0.5 rounded-full whitespace-nowrap select-none pointer-events-none ${
                    isSelected || isHovered
                      ? 'text-brand-cyan border-brand-cyan/40 bg-brand-cyan/10 shadow-[0_0_8px_rgba(6,182,212,0.2)]'
                      : 'text-neutral-400 border-white/10 bg-[#0a0a0c]/85 shadow-[0_2px_8px_rgba(0,0,0,0.5)]'
                  }`}>
                    {node.zip}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Interactive Regional Hubs Directory (Guarantees zero overlap + extreme accessibility) */}
          <div className="flex flex-col gap-2 border-t border-white/5 pt-3.5 z-10 select-none">
            <span className="text-[9px] uppercase font-bold tracking-wider text-neutral-500 text-left">
              Active Silicon Valley Service Hubs (Click to Select)
            </span>
            <div className="flex flex-wrap gap-2">
              {coverageNodes.map((node) => {
                const isSelected = selectedNode?.id === node.id;
                return (
                  <button
                    key={node.id}
                    onClick={() => {
                      setZipInput(node.zip);
                      setLookupStatus('success');
                      setSelectedNode(node);
                      setHoveredNode(node);
                    }}
                    onMouseEnter={() => setHoveredNode(node)}
                    onMouseLeave={() => setHoveredNode(null)}
                    className={`text-[10px] font-semibold px-2.5 py-1 rounded-full border transition-all duration-200 flex items-center gap-1.5 cursor-pointer outline-none ${
                      isSelected
                        ? 'bg-brand-cyan/10 text-brand-cyan border-brand-cyan/40'
                        : 'bg-white/5 hover:bg-brand-cyan/10 hover:text-brand-cyan border-white/5 hover:border-brand-cyan/30'
                    }`}
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-brand-cyan animate-pulse" />
                    <span>{node.name.split(' /')[0]} ({node.zip})</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Map Footer legend */}
          <div className="flex items-center justify-between text-[11px] text-neutral-500 z-10 select-none border-t border-white/5 pt-3.5 mt-2">
            <span>Tap any map node or list hub to verify dispatch</span>
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-brand-cyan" /> 24/7 Service</span>
              <span className="flex items-center gap-1.5"><span className="h-1.5 w-1.5 rounded-full bg-brand-indigo" /> Local Rig</span>
            </div>
          </div>
        </Card>

        {/* Action Panel / Response State Card (Right Side) */}
        <Card className="lg:col-span-4 p-6 sm:p-8 flex flex-col justify-between h-full bg-gradient-to-b from-card-dark to-[#050507] border-white/5 select-none text-center">
          {/* IDLE STATE */}
          {lookupStatus === 'idle' && (
            <div className="flex-1 flex flex-col justify-center items-center gap-4 py-8">
              <div className="h-12 w-12 rounded-full bg-white/5 flex items-center justify-center text-neutral-400">
                <Search className="h-5 w-5" />
              </div>
              <div>
                <h4 className="text-base font-bold text-white">Awaiting ZIP Lookup</h4>
                <p className="text-neutral-400 text-xs leading-relaxed max-w-[200px] mx-auto mt-1">
                  Type your 5-digit postal code above or tap any interactive map node.
                </p>
              </div>
            </div>
          )}

          {/* COVERAGE CONFIRMED SUCCESS STATE */}
          {lookupStatus === 'success' && (
            <div className="flex-1 flex flex-col justify-between py-2">
              <div className="flex flex-col items-center gap-4 mt-6">
                <div className="h-14 w-14 rounded-full bg-brand-cyan/10 border border-brand-cyan/25 flex items-center justify-center text-brand-cyan shadow-[0_0_20px_rgba(6,182,212,0.15)] animate-bounce">
                  <CheckCircle className="h-7 w-7" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-white tracking-tight">Zone Fully Covered!</h4>
                  <p className="text-brand-cyan text-[11px] font-bold uppercase tracking-wider mt-1.5 bg-brand-cyan/10 border border-brand-cyan/25 px-3 py-1 rounded-full inline-block">
                    ZIP: {zipInput} Verified
                  </p>
                  <p className="text-neutral-400 text-xs leading-relaxed mt-3 max-w-[220px] mx-auto">
                    Excellent news! Vortex Flow maintains 3 fully staged diagnostic rigs inside your sector. Guaranteed arrival in under <span className="text-white font-bold">45 minutes</span>.
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-2.5 mt-8">
                <a href={`tel:${clientConfig.meta.phoneRaw}`} className="inline-flex w-full">
                  <Button variant="primary" className="w-full gap-2 text-xs">
                    <Phone className="h-3.5 w-3.5" /> Call Local Dispatcher
                  </Button>
                </a>
                <Button
                  variant="glass"
                  className="w-full text-xs"
                  onClick={() => {
                    setZipInput('');
                    setLookupStatus('idle');
                    setSelectedNode(null);
                  }}
                >
                  Lookup Another ZIP
                </Button>
              </div>
            </div>
          )}

          {/* OUT OF COVERAGE STATE */}
          {lookupStatus === 'failed' && (
            <div className="flex-1 flex flex-col justify-between py-2">
              <div className="flex flex-col items-center gap-4 mt-6">
                <div className="h-14 w-14 rounded-full bg-rose-500/10 border border-rose-500/25 flex items-center justify-center text-rose-400">
                  <XCircle className="h-7 w-7" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-white tracking-tight">Outside Service Zone</h4>
                  <p className="text-rose-400 text-[11px] font-bold uppercase tracking-wider mt-1.5 bg-rose-500/10 border border-rose-500/25 px-3 py-1 rounded-full inline-block">
                    ZIP: {zipInput}
                  </p>
                  <p className="text-neutral-400 text-xs leading-relaxed mt-3 max-w-[220px] mx-auto">
                    We do not currently host rolling rigs inside {zipInput}. Join our Silicon Valley expansion waitlist to get notified of launches.
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-2.5 mt-8">
                <Button
                  variant="primary"
                  className="w-full text-xs"
                  onClick={() => {
                    alert('Added to expansion list successfully! Thank you.');
                    setLookupStatus('idle');
                    setZipInput('');
                    setSelectedNode(null);
                  }}
                >
                  Join Expansion Waitlist
                </Button>
                <Button
                  variant="glass"
                  className="w-full text-xs"
                  onClick={() => {
                    setLookupStatus('idle');
                    setZipInput('');
                    setSelectedNode(null);
                  }}
                >
                  Try Another ZIP
                </Button>
              </div>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
export default CoverageMap;
