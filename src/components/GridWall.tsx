import React from 'react';
import { BrandPlot } from '../types';
import { PlotCard } from './PlotCard';
import { Zap, ShieldCheck, Sparkles, Trophy } from 'lucide-react';

interface GridWallProps {
  plots: BrandPlot[];
  onSelectBrand: (plot: BrandPlot) => void;
  onClaimPlot: (plot: BrandPlot) => void;
  onOpenWar: (slotId: string) => void;
  zoomLevel: number;
}

export const GridWall: React.FC<GridWallProps> = ({
  plots,
  onSelectBrand,
  onClaimPlot,
  onOpenWar,
  zoomLevel,
}) => {
  return (
    <div className="w-full">
      {/* Wall Subheader Banner */}
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-3 py-3 sm:px-6">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399] animate-pulse" />
          <span className="text-xs font-bold tracking-wider text-slate-200 uppercase">
            LIVE MILLION-DOLLAR BHARAT WALL
          </span>
          <span className="hidden sm:inline text-slate-500">•</span>
          <span className="hidden sm:inline text-xs text-slate-400">
            Interactive Pixel Mosaic of India&apos;s Startup Universe
          </span>
        </div>

        <div className="flex items-center gap-3 text-xs">
          <div className="rounded border border-slate-800 bg-[#091427] px-2.5 py-1 text-slate-300">
            Base Plot: <span className="font-mono font-bold text-emerald-400">₹1.00</span>
          </div>
          <span className="text-slate-400 text-[11px]">
            Hover to Inspect • Tap to Open/Bid
          </span>
        </div>
      </div>

      {/* Main Grid Wall Container */}
      <div className="mx-auto max-w-7xl px-3 pb-6 sm:px-6">
        <div 
          className="relative rounded-xl border border-slate-800/80 bg-[#050c18] p-3 sm:p-5 shadow-2xl transition-transform duration-200"
          style={{ transform: `scale(${zoomLevel / 100})`, transformOrigin: 'top center' }}
        >
          {/* Subtle Grid Accent overlay */}
          <div className="pointer-events-none absolute inset-0 bg-cyber-grid rounded-xl opacity-80" />

          {/* 12-Column Responsive Mosaic Grid */}
          <div className="relative z-10 grid grid-cols-12 gap-2.5 sm:gap-3">
            {plots.map((plot) => (
              <PlotCard
                key={plot.id}
                plot={plot}
                onSelectBrand={onSelectBrand}
                onClaimPlot={onClaimPlot}
                onOpenWar={onOpenWar}
              />
            ))}
          </div>
        </div>

        {/* Legend & Feature Bar below Grid */}
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 rounded-lg border border-slate-800/80 bg-[#081222]/90 px-4 py-2.5 text-xs text-slate-400">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_6px_#34d399]" />
              <span className="text-slate-300 font-medium">Open to Claim (from ₹1)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-blue-400 shadow-[0_0_6px_#60a5fa]" />
              <span className="text-slate-300 font-medium">Live Bidding</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-cyan-400 shadow-[0_0_6px_#22d3ee]" />
              <span className="text-slate-300 font-medium">Verified Corporates & Unicorns</span>
            </div>
          </div>

          <div className="flex items-center gap-2 text-slate-400 text-[11px]">
            <Zap className="h-3.5 w-3.5 text-yellow-400 shrink-0" />
            <span className="text-slate-300 font-medium">
              Instant UPI Activation (GPay / PhonePe / Paytm)
            </span>
            <span className="text-slate-600">|</span>
            <span>Base price ₹1 → increments dynamically with demand</span>
          </div>
        </div>
      </div>
    </div>
  );
};
