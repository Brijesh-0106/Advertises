import React from 'react';
import { X, ShieldCheck, Zap, HelpCircle, ArrowRight } from 'lucide-react';

interface HelpModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenClaim: () => void;
}

export const HelpModal: React.FC<HelpModalProps> = ({
  isOpen,
  onClose,
  onOpenClaim,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm">
      <div className="relative w-full max-w-lg rounded-2xl border border-slate-700/80 bg-[#091322] p-6 shadow-2xl text-xs">

        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-slate-400 hover:text-white transition-colors cursor-pointer"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="relative flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-slate-900 p-0.5 shadow-md ring-1 ring-amber-400/40">
            <img src="/logo.png" alt="Advertises.co.in — Smart advertising tools for Indian businesses" className="h-full w-full object-contain rounded-[9px]" />
          </div>
          <div>
            <h3 className="text-base font-extrabold text-white">
              Advertises.co.in — Smart advertising tools for Indian businesses & UPI Help Desk
            </h3>
            <p className="text-[11px] text-slate-400">
              Everything you need to know about the Million Rupee Bharat Wall
            </p>
          </div>
        </div>

        <div className="space-y-3 text-slate-300">
          <div className="rounded-lg border border-slate-800 bg-[#060c18] p-3">
            <h4 className="font-bold text-white mb-1 flex items-center gap-1.5">
              <Zap className="h-3.5 w-3.5 text-yellow-400" />
              How does the ₹1 Plot Claiming work?
            </h4>
            <p className="text-[11px] leading-relaxed text-slate-400">
              The first wave of frontier plots start at ₹1.00. Once you pay via any UPI app (Google Pay, PhonePe, Paytm, CRED), your custom brand tile, logo, and backlink are permanently placed onto the wall and broadcast to the live ad ticker.
            </p>
          </div>

          <div className="rounded-lg border border-slate-800 bg-[#060c18] p-3">
            <h4 className="font-bold text-white mb-1 flex items-center gap-1.5">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
              What are Bidding Wars?
            </h4>
            <p className="text-[11px] leading-relaxed text-slate-400">
              Certain high-traffic corridor plots (like food delivery, fintech, e-commerce) can be contested in live bidding battles. The highest bidder at timer expiry takes the slot, while the previous holder receives their bid back plus an exit yield bonus.
            </p>
          </div>

          <div className="rounded-lg border border-slate-800 bg-[#060c18] p-3">
            <h4 className="font-bold text-white mb-1 flex items-center gap-1.5">
              <ShieldCheck className="h-3.5 w-3.5 text-cyan-400" />
              Can I lock my slot against outbids?
            </h4>
            <p className="text-[11px] leading-relaxed text-slate-400">
              Yes! You can activate a 90-day or 365-day Billboard Shield (similar to Groww on Slot #027), ensuring no competitor can challenge your space.
            </p>
          </div>
        </div>

        <div className="mt-5 flex items-center justify-end gap-2 border-t border-slate-800 pt-4">
          <button
            onClick={onClose}
            className="rounded-lg border border-slate-700 bg-slate-800 px-4 py-2 text-slate-300 hover:text-white"
          >
            Close
          </button>
          <button
            onClick={() => {
              onClose();
              onOpenClaim();
            }}
            className="rounded-lg bg-orange-500 hover:bg-orange-400 px-4 py-2 font-bold text-white shadow"
          >
            Claim a Plot Now
          </button>
        </div>

      </div>
    </div>
  );
};
