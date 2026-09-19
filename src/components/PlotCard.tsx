import React from 'react';
import { Plus, CheckCircle2, Lock, Flame, Shield, ArrowUpRight } from 'lucide-react';
import { BrandPlot } from '../types';

interface PlotCardProps {
  plot: BrandPlot;
  onSelectBrand: (plot: BrandPlot) => void;
  onClaimPlot: (plot: BrandPlot) => void;
  onOpenWar: (slotId: string) => void;
}

export const PlotCard: React.FC<PlotCardProps> = ({
  plot,
  onSelectBrand,
  onClaimPlot,
  onOpenWar,
}) => {
  const isAvailable = plot.status === 'available';
  const isWar = plot.status === 'war';
  const isLocked = plot.status === 'locked';

  if (isAvailable) {
    return (
      <div
        onClick={() => onClaimPlot(plot)}
        className={`${plot.colSpan} group relative flex min-h-[96px] cursor-pointer flex-col justify-between rounded-lg border-2 border-dashed border-teal-500/50 bg-[#071322]/90 p-2.5 transition-all duration-200 hover:border-teal-400 hover:bg-[#0b1c33] hover:shadow-[0_0_15px_rgba(20,184,166,0.25)] hover:scale-[1.02]`}
      >
        {/* Slot ID */}
        <div className="flex items-center justify-between">
          <span className="font-mono text-[10px] font-semibold text-slate-400">
            {plot.id}
          </span>
          <span className="h-1.5 w-1.5 rounded-full bg-teal-400 animate-ping opacity-75" />
        </div>

        {/* Plus Icon & Buy Price */}
        <div className="flex flex-col items-center justify-center my-auto py-1">
          <div className="flex h-5 w-5 items-center justify-center rounded border border-teal-400/60 bg-teal-950/60 text-teal-300 transition-transform group-hover:scale-110">
            <Plus className="h-3 w-3 stroke-[3]" />
          </div>
          <span className="mt-1 font-mono text-[11px] font-extrabold tracking-wide text-teal-400 group-hover:text-teal-300">
            BUY ₹{plot.price || 1}
          </span>
        </div>

        <div className="text-center text-[9px] text-slate-400 group-hover:text-slate-300">
          Instant UPI
        </div>
      </div>
    );
  }

  // Claimed Brand Card
  return (
    <div
      onClick={() => {
        if (isWar) {
          onOpenWar(plot.id);
        } else {
          onSelectBrand(plot);
        }
      }}
      className={`${plot.colSpan} ${plot.bgColor} ${plot.textColor} group relative flex min-h-[96px] cursor-pointer flex-col justify-between rounded-lg p-3 shadow-md border ${
        plot.borderColor || 'border-slate-800'
      } transition-all duration-200 hover:scale-[1.02] hover:shadow-xl hover:brightness-105`}
    >
      {/* Top Meta Bar: Slot ID & Badges */}
      <div className="flex items-center justify-between gap-1">
        <div className="flex items-center gap-1">
          <span className="font-mono text-[10px] font-semibold opacity-75">
            {plot.id}
          </span>
          {plot.verified && (
            <CheckCircle2 className="h-3 w-3 text-cyan-400" />
          )}
        </div>

        {/* Dynamic Badges */}
        {plot.badge && (
          <div>
            {plot.badge.type === 'titan' && (
              <span className="rounded bg-slate-900/60 px-1.5 py-0.5 text-[9px] font-bold tracking-wider text-cyan-300 uppercase border border-cyan-400/30">
                {plot.badge.text}
              </span>
            )}
            {plot.badge.type === 'war' && (
              <span className="flex items-center gap-0.5 rounded bg-black/40 px-1.5 py-0.5 text-[9px] font-black tracking-tight text-white border border-white/20 animate-pulse">
                <Flame className="h-2.5 w-2.5 text-yellow-300" />
                {plot.badge.text}
              </span>
            )}
            {plot.badge.type === 'users' && (
              <span className="rounded bg-black/25 px-1.5 py-0.5 text-[9px] font-bold tracking-tight opacity-90">
                {plot.badge.text}
              </span>
            )}
            {plot.badge.type === 'instamart' && (
              <span className="rounded bg-black/30 px-1.5 py-0.5 text-[9px] font-black tracking-wider text-white">
                {plot.badge.text}
              </span>
            )}
            {plot.badge.type === 'bootstrapped' && (
              <span className="rounded bg-blue-900/40 px-1.5 py-0.5 text-[9px] font-bold text-sky-300 border border-sky-400/20">
                {plot.badge.text}
              </span>
            )}
            {plot.badge.type === 'bid' && (
              <span className="rounded-full bg-pink-500/30 px-2 py-0.5 text-[9px] font-extrabold text-pink-200 border border-pink-400/40">
                {plot.badge.text}
              </span>
            )}
            {plot.badge.type === 'ecommerce' && (
              <span className="rounded bg-amber-400 px-1.5 py-0.5 text-[9px] font-black text-slate-900">
                {plot.badge.text}
              </span>
            )}
            {plot.badge.type === 'global' && (
              <span className="rounded bg-white/20 px-1.5 py-0.5 text-[9px] font-bold text-white">
                {plot.badge.text}
              </span>
            )}
            {plot.badge.type === 'locked' && (
              <span className="flex items-center gap-0.5 rounded bg-emerald-950/80 px-1.5 py-0.5 text-[9px] font-bold text-emerald-300 border border-emerald-400/30">
                <Lock className="h-2.5 w-2.5" />
                {plot.badge.text}
              </span>
            )}
            {plot.badge.type === 'club' && (
              <span className="rounded bg-white/10 px-1.5 py-0.5 text-[9px] font-mono font-bold text-white">
                {plot.badge.text}
              </span>
            )}
            {plot.badge.type === 'soundbox' && (
              <span className="rounded bg-sky-950/60 px-1.5 py-0.5 text-[9px] font-bold text-sky-300">
                {plot.badge.text}
              </span>
            )}
          </div>
        )}
      </div>

      {/* Main Content Area */}
      <div className="my-auto flex flex-col items-center text-center py-1">
        {/* Logo Element */}
        {plot.logoText && (
          <div
            className={`flex h-8 w-8 items-center justify-center rounded-md ${
              plot.logoBg || 'bg-white/20'
            } shadow-sm transition-transform group-hover:scale-105 mb-1`}
          >
            <span className="text-sm font-black">{plot.logoText}</span>
          </div>
        )}

        {/* Brand Name */}
        <h3 className="text-sm font-extrabold tracking-tight leading-tight line-clamp-1">
          {plot.name}
        </h3>

        {/* Tagline / Subtitle */}
        {plot.tagline && (
          <p className="text-[10px] font-medium opacity-80 line-clamp-1 mt-0.5">
            {plot.tagline}
          </p>
        )}
      </div>

      {/* Bottom info: Hover prompt / Action indicator */}
      <div className="flex items-center justify-between text-[9px] opacity-60 group-hover:opacity-100 transition-opacity">
        <span className="truncate">
          {isWar ? '🔥 Ongoing Battle' : isLocked ? '🛡️ 90D Protected' : 'Tap to inspect'}
        </span>
        <ArrowUpRight className="h-3 w-3 shrink-0" />
      </div>
    </div>
  );
};
