import React from 'react';
import { Search, ZoomIn, ZoomOut, X, Sparkles, Filter } from 'lucide-react';
import { PlotFilter } from '../types';

interface FilterToolbarProps {
  currentFilter: PlotFilter;
  setFilter: (filter: PlotFilter) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  zoomLevel: number;
  setZoomLevel: (updater: (prev: number) => number) => void;
  resetZoom: () => void;
}

export const FilterToolbar: React.FC<FilterToolbarProps> = ({
  currentFilter,
  setFilter,
  searchQuery,
  setSearchQuery,
  zoomLevel,
  setZoomLevel,
  resetZoom,
}) => {
  return (
    <div className="w-full border-b border-slate-800/80 bg-[#081121]/80 px-3 py-2.5 sm:px-6">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3">
        
        {/* Left: Filter Buttons */}
        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
          <button
            onClick={() => setFilter('all')}
            className={`rounded-md px-3 py-1.5 text-xs font-semibold transition-all cursor-pointer ${
              currentFilter === 'all'
                ? 'bg-slate-700/80 text-white shadow ring-1 ring-slate-600'
                : 'bg-slate-900/60 text-slate-400 hover:bg-slate-800 hover:text-slate-200 border border-slate-800'
            }`}
          >
            All 1,000 Plots
          </button>

          <button
            onClick={() => setFilter('claimable')}
            className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-semibold transition-all cursor-pointer ${
              currentFilter === 'claimable'
                ? 'bg-emerald-950/80 text-emerald-300 ring-1 ring-emerald-500/60'
                : 'bg-slate-900/60 text-slate-400 hover:bg-slate-800 hover:text-slate-200 border border-slate-800'
            }`}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_#34d399]" />
            Claimable (From ₹1)
          </button>

          <button
            onClick={() => setFilter('wars')}
            className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-semibold transition-all cursor-pointer ${
              currentFilter === 'wars'
                ? 'bg-red-950/80 text-red-300 ring-1 ring-red-500/60'
                : 'bg-slate-900/60 text-slate-400 hover:bg-slate-800 hover:text-slate-200 border border-slate-800'
            }`}
          >
            Bidding Wars
          </button>

          <button
            onClick={() => setFilter('unicorns')}
            className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-semibold transition-all cursor-pointer ${
              currentFilter === 'unicorns'
                ? 'bg-amber-950/80 text-amber-300 ring-1 ring-amber-500/60'
                : 'bg-slate-900/60 text-slate-400 hover:bg-slate-800 hover:text-slate-200 border border-slate-800'
            }`}
          >
            Unicorns & Giants
          </button>
        </div>

        {/* Right: Search & Zoom Controls */}
        <div className="flex flex-1 sm:flex-initial items-center gap-2 justify-end">
          {/* Search Input */}
          <div className="relative flex-1 sm:w-64 md:w-72">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search Tata, Swiggy, CRED, ₹1 plot..."
              className="w-full rounded-md border border-slate-800 bg-[#091427] py-1.5 pl-8 pr-7 text-xs text-slate-200 placeholder-slate-500 outline-none transition-colors focus:border-slate-600 focus:ring-1 focus:ring-slate-600"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200"
              >
                <X className="h-3 w-3" />
              </button>
            )}
          </div>

          {/* Zoom Group */}
          <div className="hidden sm:flex items-center rounded-md border border-slate-800 bg-[#091427] p-0.5 text-slate-400">
            <button
              onClick={() => setZoomLevel((prev) => Math.max(70, prev - 15))}
              title="Zoom Out"
              className="p-1.5 hover:text-white transition-colors cursor-pointer"
            >
              <ZoomOut className="h-3.5 w-3.5" />
            </button>
            <button
              onClick={resetZoom}
              title="Reset Zoom"
              className="px-2 text-[11px] font-mono font-medium hover:text-white transition-colors cursor-pointer"
            >
              {zoomLevel}%
            </button>
            <button
              onClick={() => setZoomLevel((prev) => Math.min(130, prev + 15))}
              title="Zoom In"
              className="p-1.5 hover:text-white transition-colors cursor-pointer"
            >
              <ZoomIn className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
