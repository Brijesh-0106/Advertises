import React, { useState } from 'react';
import { Plus, Zap, Check, Shield, Search, ArrowRight, Sparkles } from 'lucide-react';
import { BrandPlot } from '../types';

interface AvailablePlotsViewProps {
  availablePlots: BrandPlot[];
  onClaimPlot: (plot: BrandPlot) => void;
}

export const AvailablePlotsView: React.FC<AvailablePlotsViewProps> = ({
  availablePlots,
  onClaimPlot,
}) => {
  const [priceTier, setPriceTier] = useState<'all' | '1' | 'low' | 'mid' | 'high'>('all');
  const [search, setSearch] = useState('');

  const filteredPlots = availablePlots.filter((p) => {
    const matchesSearch = p.id.toLowerCase().includes(search.toLowerCase()) || 
                          p.description?.toLowerCase().includes(search.toLowerCase());
    if (!matchesSearch) return false;

    const price = p.price || 1;
    if (priceTier === '1') return price === 1;
    if (priceTier === 'low') return price >= 2 && price <= 10;
    if (priceTier === 'mid') return price > 10 && price <= 50;
    if (priceTier === 'high') return price > 50;
    return true;
  });

  return (
    <div className="mx-auto max-w-7xl px-3 py-6 sm:px-6">
      {/* Intro Hero Banner */}
      <div className="mb-6 rounded-xl border border-teal-500/30 bg-gradient-to-r from-teal-950/40 via-[#071526] to-emerald-950/30 p-5 shadow-lg">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-md bg-teal-500/20 text-teal-400">
                <Zap className="h-4 w-4" />
              </span>
              <h2 className="text-xl font-extrabold text-white">
                Available Open Plots — Claim from ₹1
              </h2>
            </div>
            <p className="mt-1 text-xs text-slate-300">
              Own a permanent piece of India&apos;s Million-Dollar Bharat Wall. Instant activation via UPI (Google Pay, PhonePe, Paytm).
            </p>
          </div>

          <div className="flex items-center gap-2">
            <div className="rounded-lg border border-teal-500/40 bg-teal-950/50 px-3 py-2 text-center">
              <span className="block text-[10px] uppercase font-bold text-teal-300">Starting At</span>
              <span className="font-mono text-base font-black text-emerald-400">₹1.00</span>
            </div>
            <div className="rounded-lg border border-slate-700 bg-slate-900/60 px-3 py-2 text-center">
              <span className="block text-[10px] uppercase font-bold text-slate-400">Activation Time</span>
              <span className="font-mono text-base font-bold text-white">&lt; 30 sec</span>
            </div>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3 rounded-lg border border-slate-800 bg-[#091427] p-3 text-xs">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-slate-400 font-semibold mr-1">Filter by Price:</span>
          <button
            onClick={() => setPriceTier('all')}
            className={`px-2.5 py-1 rounded cursor-pointer transition-colors ${
              priceTier === 'all' ? 'bg-teal-500 text-slate-950 font-bold' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            All Prices
          </button>
          <button
            onClick={() => setPriceTier('1')}
            className={`px-2.5 py-1 rounded cursor-pointer transition-colors ${
              priceTier === '1' ? 'bg-teal-500 text-slate-950 font-bold' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            ₹1 Only (Frontier)
          </button>
          <button
            onClick={() => setPriceTier('low')}
            className={`px-2.5 py-1 rounded cursor-pointer transition-colors ${
              priceTier === 'low' ? 'bg-teal-500 text-slate-950 font-bold' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            ₹2 - ₹10 (Corridor)
          </button>
          <button
            onClick={() => setPriceTier('mid')}
            className={`px-2.5 py-1 rounded cursor-pointer transition-colors ${
              priceTier === 'mid' ? 'bg-teal-500 text-slate-950 font-bold' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            ₹25 - ₹50 (Central)
          </button>
          <button
            onClick={() => setPriceTier('high')}
            className={`px-2.5 py-1 rounded cursor-pointer transition-colors ${
              priceTier === 'high' ? 'bg-teal-500 text-slate-950 font-bold' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            ₹75 - ₹100 (Titan Edge)
          </button>
        </div>

        <div className="w-full sm:w-64">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search slot #..."
            className="w-full rounded border border-slate-800 bg-[#060c18] px-3 py-1.5 text-xs text-slate-200 placeholder-slate-500 outline-none focus:border-teal-500"
          />
        </div>
      </div>

      {/* Available Plots Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {filteredPlots.map((plot) => (
          <div
            key={plot.id}
            className="flex flex-col justify-between rounded-xl border border-teal-500/30 bg-[#081528] p-4 shadow-lg transition-all hover:border-teal-400 hover:shadow-teal-500/10 hover:scale-[1.02]"
          >
            <div>
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-cyan-400">
                  {plot.id}
                </span>
                <span className="rounded-full bg-emerald-500/20 px-2 py-0.5 text-[10px] font-bold text-emerald-300 border border-emerald-500/30">
                  Open for Claim
                </span>
              </div>

              <div className="mt-4 flex items-baseline gap-1.5">
                <span className="font-mono text-2xl font-black text-white">
                  ₹{plot.price}
                </span>
                <span className="text-xs text-slate-400">one-time UPI fee</span>
              </div>

              <p className="mt-2 text-xs text-slate-300 leading-relaxed">
                {plot.description || 'Prime plot ready for brand placement, backlinks, and ticker announcements.'}
              </p>

              <div className="mt-3 space-y-1.5 border-t border-slate-800/80 pt-3 text-[11px] text-slate-400">
                <div className="flex items-center gap-1.5">
                  <Check className="h-3.5 w-3.5 text-teal-400" />
                  <span>Permanent pixel placement</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Check className="h-3.5 w-3.5 text-teal-400" />
                  <span>Instant verified backlink</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Check className="h-3.5 w-3.5 text-teal-400" />
                  <span>Broadcast on Live Ad Stream</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => onClaimPlot(plot)}
              className="mt-5 flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-teal-500 to-emerald-500 px-4 py-2.5 text-xs font-bold text-slate-950 shadow-md shadow-emerald-500/20 transition-all hover:brightness-110 active:scale-98 cursor-pointer"
            >
              <Plus className="h-4 w-4 stroke-[3]" />
              <span>Claim Slot {plot.id} for ₹{plot.price}</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
