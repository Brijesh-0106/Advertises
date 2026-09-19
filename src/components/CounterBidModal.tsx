import React, { useState } from 'react';
import { X, Flame, QrCode, Smartphone, CheckCircle2, ArrowRight } from 'lucide-react';

interface CounterBidModalProps {
  isOpen: boolean;
  onClose: () => void;
  warSlotId: string;
  currentHighBid: number;
  onConfirmBid: (slotId: string, challengerName: string, amount: number) => void;
}

export const CounterBidModal: React.FC<CounterBidModalProps> = ({
  isOpen,
  onClose,
  warSlotId,
  currentHighBid,
  onConfirmBid,
}) => {
  const [challengerName, setChallengerName] = useState('');
  const [bidAmount, setBidAmount] = useState(currentHighBid + 5000);
  const [step, setStep] = useState<'details' | 'upi' | 'success'>('details');
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isOpen) return null;

  const handleProceed = (e: React.FormEvent) => {
    e.preventDefault();
    if (!challengerName.trim() || bidAmount <= currentHighBid) return;
    setStep('upi');
  };

  const handleSimulatePayment = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setStep('success');

      setTimeout(() => {
        onConfirmBid(warSlotId, challengerName, bidAmount);
        onClose();
        setStep('details');
      }, 1300);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm">
      <div className="relative w-full max-w-md rounded-2xl border border-red-500/40 bg-[#091322] p-6 shadow-2xl text-xs">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-slate-400 hover:text-white transition-colors cursor-pointer"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="flex items-center gap-2.5 mb-4">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-red-500/20 text-red-400 border border-red-500/30">
            <Flame className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-base font-extrabold text-white">
              Submit Counter-Bid for Slot {warSlotId}
            </h3>
            <p className="text-[11px] text-slate-400">
              Current highest bid: <span className="font-mono font-bold text-emerald-400">₹{currentHighBid.toLocaleString('en-IN')}</span>
            </p>
          </div>
        </div>

        {step === 'details' && (
          <form onSubmit={handleProceed} className="space-y-4">
            <div>
              <label className="block font-semibold text-slate-300 mb-1">
                Your Brand / Company / Entity Name *
              </label>
              <input
                type="text"
                required
                value={challengerName}
                onChange={(e) => setChallengerName(e.target.value)}
                placeholder="e.g. Swiggy Instamart, Zepto, Zepto VIP"
                className="w-full rounded-lg border border-slate-700 bg-[#060c18] px-3 py-2 text-white outline-none focus:border-red-500"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-300 mb-1">
                Your Outbid Amount (₹ INR) *
              </label>
              <input
                type="number"
                required
                min={currentHighBid + 1000}
                step={1000}
                value={bidAmount}
                onChange={(e) => setBidAmount(Number(e.target.value))}
                className="w-full rounded-lg border border-slate-700 bg-[#060c18] px-3 py-2 font-mono font-bold text-emerald-400 outline-none focus:border-red-500 text-base"
              />
              <span className="text-[10px] text-slate-400 mt-1 block">
                Minimum increment is ₹1,000 above current bid.
              </span>
            </div>

            <div className="rounded-lg border border-red-500/20 bg-red-950/20 p-3 text-[11px] text-red-200">
              ⚡ Funds are held in escrow via verified UPI. If you are outbid before the round ends, your deposit is automatically refunded.
            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-red-600 to-orange-600 py-3 font-bold text-white shadow-lg shadow-red-600/20 hover:brightness-110 cursor-pointer"
            >
              <span>Continue to Escrow Deposit (₹{bidAmount.toLocaleString('en-IN')})</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </form>
        )}

        {step === 'upi' && (
          <div className="space-y-4 text-center">
            <div className="mx-auto w-40 rounded-xl border border-slate-700 bg-white p-3 shadow-lg">
              <QrCode className="h-28 w-28 text-slate-900 mx-auto" />
              <div className="mt-1 font-mono text-[9px] font-bold text-slate-800">
                escrow.Advertises.co.in — Smart advertising tools for Indian businesses@upi
              </div>
            </div>

            <div>
              <div className="font-mono text-xl font-black text-emerald-400">
                ₹{bidAmount.toLocaleString('en-IN')}.00
              </div>
              <p className="text-xs text-slate-400">
                Deposit bid guarantee via Google Pay / PhonePe / Paytm / CRED
              </p>
            </div>

            <button
              disabled={isProcessing}
              onClick={handleSimulatePayment}
              className="w-full flex items-center justify-center gap-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 py-3 font-bold text-slate-950 shadow-lg cursor-pointer disabled:opacity-50"
            >
              {isProcessing ? (
                <>
                  <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-slate-900 border-t-transparent" />
                  <span>Locking Escrow Deposit...</span>
                </>
              ) : (
                <>
                  <Smartphone className="h-4 w-4" />
                  <span>Simulate Instant Escrow UPI (₹{bidAmount.toLocaleString('en-IN')})</span>
                </>
              )}
            </button>
          </div>
        )}

        {step === 'success' && (
          <div className="py-6 text-center space-y-2">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
              <CheckCircle2 className="h-6 w-6" />
            </div>
            <h4 className="text-base font-extrabold text-white">Outbid Placed!</h4>
            <p className="text-xs text-slate-300">
              <span className="font-bold text-orange-400">{challengerName}</span> is now the highest bidder with{' '}
              <span className="font-mono font-bold text-emerald-400">₹{bidAmount.toLocaleString('en-IN')}</span> on Slot {warSlotId}!
            </p>
          </div>
        )}

      </div>
    </div>
  );
};
