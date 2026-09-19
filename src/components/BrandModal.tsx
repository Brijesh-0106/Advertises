import React from 'react';
import { X, ExternalLink, CheckCircle2, Shield, Calendar, Users, DollarSign, Flame, Sparkles } from 'lucide-react';
import { BrandPlot } from '../types';

interface BrandModalProps {
  brand: BrandPlot | null;
  onClose: () => void;
  onInitiateOutbid: (slotId: string, currentBid?: number) => void;
  onClaimAdjacent: (plotId: string) => void;
}

export const BrandModal: React.FC<BrandModalProps> = ({
  brand,
  onClose,
  onInitiateOutbid,
  onClaimAdjacent,
}) => {
  if (!brand) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm">
      <div className="relative w-full max-w-lg rounded-2xl border border-slate-700/80 bg-[#091325] p-6 shadow-2xl">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-slate-400 hover:text-white transition-colors cursor-pointer"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Brand Header Banner */}
        <div className="flex items-start gap-4">
          <div
            className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-xl ${
              brand.bgColor || 'bg-slate-800'
            } text-2xl font-black text-white shadow-lg border ${brand.borderColor || 'border-slate-700'}`}
          >
            {brand.logoText || brand.name.charAt(0)}
          </div>

          <div className="flex-1">
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-bold text-cyan-400">
                Slot {brand.id}
              </span>
              {brand.verified && (
                <span className="flex items-center gap-1 rounded-full bg-cyan-950/80 px-2 py-0.5 text-[10px] font-bold text-cyan-300 border border-cyan-500/30">
                  <CheckCircle2 className="h-3 w-3" />
                  Verified Corporate
                </span>
              )}
            </div>

            <h3 className="mt-1 text-xl font-extrabold text-white">
              {brand.name}
            </h3>
            <p className="text-xs text-slate-300 font-medium">
              {brand.tagline}
            </p>
          </div>
        </div>

        {/* Core Stats Grid */}
        <div className="mt-5 grid grid-cols-2 gap-3 text-xs">
          {brand.valuation && (
            <div className="rounded-lg border border-slate-800 bg-[#060e1d] p-3">
              <div className="text-[10px] font-bold text-slate-400 uppercase flex items-center gap-1">
                <DollarSign className="h-3 w-3 text-emerald-400" />
                Valuation / Cap
              </div>
              <div className="mt-1 font-mono text-sm font-extrabold text-emerald-400">
                {brand.valuation}
              </div>
            </div>
          )}

          {brand.category && (
            <div className="rounded-lg border border-slate-800 bg-[#060e1d] p-3">
              <div className="text-[10px] font-bold text-slate-400 uppercase flex items-center gap-1">
                <Shield className="h-3 w-3 text-cyan-400" />
                Sector / Tier
              </div>
              <div className="mt-1 font-bold text-white">
                {brand.category}
              </div>
            </div>
          )}

          {brand.founders && (
            <div className="rounded-lg border border-slate-800 bg-[#060e1d] p-3">
              <div className="text-[10px] font-bold text-slate-400 uppercase flex items-center gap-1">
                <Users className="h-3 w-3 text-purple-400" />
                Founders / Promoters
              </div>
              <div className="mt-1 font-semibold text-slate-200 truncate" title={brand.founders}>
                {brand.founders}
              </div>
            </div>
          )}

          {brand.founded && (
            <div className="rounded-lg border border-slate-800 bg-[#060e1d] p-3">
              <div className="text-[10px] font-bold text-slate-400 uppercase flex items-center gap-1">
                <Calendar className="h-3 w-3 text-amber-400" />
                Founded
              </div>
              <div className="mt-1 font-mono font-bold text-slate-200">
                {brand.founded}
              </div>
            </div>
          )}
        </div>

        {/* Narrative Description */}
        {brand.description && (
          <div className="mt-4 rounded-lg border border-slate-800/80 bg-[#060d1b] p-3 text-xs leading-relaxed text-slate-300">
            {brand.description}
          </div>
        )}

        {/* Actions Bar */}
        <div className="mt-5 flex flex-wrap items-center gap-3 border-t border-slate-800 pt-4">
          {brand.websiteUrl && (
            <a
              href={brand.websiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-1.5 rounded-lg border border-slate-700 bg-slate-800/80 py-2.5 text-xs font-semibold text-white hover:bg-slate-700 transition-colors"
            >
              <span>Visit Official Website</span>
              <ExternalLink className="h-3.5 w-3.5 text-slate-400" />
            </a>
          )}

          <button
            onClick={() => {
              onClose();
              onInitiateOutbid(brand.id, brand.currentBid || 50000);
            }}
            className="flex-1 flex items-center justify-center gap-1.5 rounded-lg bg-gradient-to-r from-red-600 to-orange-600 py-2.5 text-xs font-bold text-white shadow-md shadow-orange-600/20 hover:brightness-110 transition-all cursor-pointer"
          >
            <Flame className="h-3.5 w-3.5" />
            <span>Challenge Slot</span>
          </button>
        </div>

      </div>
    </div>
  );
};
