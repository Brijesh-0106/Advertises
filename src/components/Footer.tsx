import React from 'react';
import { ScreenView } from '../types';

interface FooterProps {
  setActiveScreen: (screen: ScreenView) => void;
  onOpenClaimModal: () => void;
  onOpenHelp: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  setActiveScreen,
  onOpenClaimModal,
  onOpenHelp,
}) => {
  return (
    <footer className="w-full border-t border-slate-800/80 bg-[#050b17] py-4 text-xs text-slate-400">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-3 sm:px-6">

        {/* Left: Brand & Copyright */}
        <div className="flex items-center gap-3">
          <img
            src="/logo.png"
            alt="Advertises.co.in — Smart advertising tools for Indian businesses"
            className="h-6 w-6 rounded-md object-contain ring-1 ring-amber-400/30 shadow-sm"
          />
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-white">Advertises.co.in — Smart advertising tools for Indian businesses</span>
            <span className="text-slate-600">|</span>
            <span className="text-[11px] text-slate-400">
              © 2025 Advertises.co.in — Smart advertising tools for Indian businesses — The Million Rupee Billboard Wall. Brands Belong Here.
            </span>
          </div>
        </div>

        {/* Right: Quick Links */}
        <div className="flex flex-wrap items-center gap-4 text-[11px]">
          <button
            onClick={() => setActiveScreen('grid')}
            className="hover:text-white transition-colors cursor-pointer"
          >
            The 1000 Wall
          </button>
          <button
            onClick={onOpenClaimModal}
            className="text-orange-400 hover:text-orange-300 font-semibold transition-colors cursor-pointer"
          >
            Claim Slot from ₹1
          </button>
          <button
            onClick={onOpenHelp}
            className="hover:text-white transition-colors cursor-pointer"
          >
            Support & UPI Help
          </button>
          <div className="flex items-center gap-1.5 text-emerald-400 font-medium">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_#34d399]" />
            <span>100% Online</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
