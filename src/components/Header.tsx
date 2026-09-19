import React from 'react';
import { Plus, Flame, Sparkles, CheckCircle2, ChevronRight, Zap } from 'lucide-react';
import { ScreenView } from '../types';

interface HeaderProps {
  activeScreen: ScreenView;
  setActiveScreen: (screen: ScreenView) => void;
  claimedCount: number;
  totalPlots: number;
  onOpenClaimModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeScreen,
  setActiveScreen,
  claimedCount,
  totalPlots,
  onOpenClaimModal,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-[#070d19]/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-3 py-2.5 sm:px-6">

        {/* Left: Advertises.co.in — Smart advertising tools for Indian businesses Brand Logo */}
        <div
          onClick={() => setActiveScreen('grid')}
          className="group flex cursor-pointer items-center gap-3 select-none"
        >
          <div className="relative flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-[#0c1322] shadow-md shadow-amber-500/10 ring-1 ring-amber-400/30 transition-all duration-300 group-hover:scale-105 group-hover:ring-amber-400/60 group-hover:shadow-amber-500/20">
            <img
              src="/logo.png"
              alt="Advertises.co.in — Smart advertising tools for Indian businesses - Brands Belong Here"
              className="h-full w-full object-contain rounded-[10px]"
            />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="text-lg font-extrabold tracking-tight text-white transition-colors group-hover:text-orange-400">
                Advertises.co.in — Smart advertising tools for Indian businesses
              </span>
              <span className="inline-block h-2 w-2 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(6,182,212,0.9)] animate-pulse" />
            </div>
            <span className="text-[9px] font-semibold tracking-widest text-slate-400 uppercase">
              BRANDS BELONG HERE
            </span>
          </div>
        </div>

        {/* Center: Navigation Tabs */}
        <nav className="hidden md:flex items-center gap-1.5 rounded-full border border-slate-800 bg-[#0c1527]/70 p-1 text-xs">
          <button
            onClick={() => setActiveScreen('grid')}
            className={`flex items-center gap-1.5 rounded-full px-3.5 py-1.5 font-medium transition-all ${activeScreen === 'grid'
                ? 'bg-slate-800 text-white shadow-sm ring-1 ring-slate-700'
                : 'text-slate-400 hover:text-slate-200'
              }`}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-orange-500 shadow-[0_0_6px_#f97316]" />
            The 1,000 Grid Wall
          </button>

          <button
            onClick={() => setActiveScreen('wars')}
            className={`flex items-center gap-1.5 rounded-full px-3.5 py-1.5 font-medium transition-all ${activeScreen === 'wars'
                ? 'bg-slate-800 text-white shadow-sm ring-1 ring-slate-700'
                : 'text-slate-400 hover:text-slate-200'
              }`}
          >
            <Flame className="h-3.5 w-3.5 text-red-400" />
            Live Bids & Wars
            <span className="ml-1 rounded-full bg-red-500/20 px-1.5 py-0.2 text-[10px] font-bold text-red-400">
              HOT
            </span>
          </button>

          <button
            onClick={() => setActiveScreen('available')}
            className={`flex items-center gap-1.5 rounded-full px-3.5 py-1.5 font-medium transition-all ${activeScreen === 'available'
                ? 'bg-slate-800 text-white shadow-sm ring-1 ring-slate-700'
                : 'text-slate-400 hover:text-slate-200'
              }`}
          >
            <Zap className="h-3.5 w-3.5 text-emerald-400" />
            Available Plots
          </button>

          <div className="ml-1 rounded-full border border-teal-500/40 bg-teal-950/40 px-2.5 py-1 text-[11px] font-medium text-teal-300">
            Slots start at ₹1
          </div>
        </nav>

        {/* Right: Stats & Claim Button */}
        <div className="flex items-center gap-3 sm:gap-4">
          <div className="hidden sm:flex flex-col text-right text-xs">
            <div className="flex items-center justify-end gap-1.5">
              <span className="font-mono font-bold text-slate-200">{claimedCount}</span>
              <span className="text-slate-500">/</span>
              <span className="font-mono text-slate-400">{totalPlots}</span>
              <span className="text-slate-400 text-[11px]">Claimed</span>
            </div>
            <div className="text-[11px] text-slate-400">
              Next: <span className="font-mono font-semibold text-emerald-400">₹1</span>
            </div>
          </div>

          {/* Primary CTA Button */}
          <button
            onClick={onOpenClaimModal}
            className="flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-orange-500 to-[#f95721] px-3.5 py-2 text-xs font-bold text-white shadow-lg shadow-orange-500/25 transition-all hover:scale-105 hover:brightness-110 active:scale-95 cursor-pointer"
          >
            <Plus className="h-3.5 w-3.5 stroke-[3]" />
            <span>Claim from ₹1</span>
          </button>
        </div>

      </div>

      {/* Mobile Screen Selector Bar */}
      <div className="flex md:hidden border-t border-slate-800/80 bg-[#091222] px-3 py-1.5 text-xs overflow-x-auto gap-2">
        <button
          onClick={() => setActiveScreen('grid')}
          className={`px-3 py-1 rounded-full whitespace-nowrap ${activeScreen === 'grid' ? 'bg-orange-500/20 text-orange-400 font-semibold' : 'text-slate-400'
            }`}
        >
          • 1,000 Grid Wall
        </button>
        <button
          onClick={() => setActiveScreen('wars')}
          className={`px-3 py-1 rounded-full whitespace-nowrap ${activeScreen === 'wars' ? 'bg-red-500/20 text-red-400 font-semibold' : 'text-slate-400'
            }`}
        >
          🔥 Bids & Wars
        </button>
        <button
          onClick={() => setActiveScreen('available')}
          className={`px-3 py-1 rounded-full whitespace-nowrap ${activeScreen === 'available' ? 'bg-teal-500/20 text-teal-400 font-semibold' : 'text-slate-400'
            }`}
        >
          ⚡ Available Plots (₹1)
        </button>
      </div>
    </header>
  );
};
