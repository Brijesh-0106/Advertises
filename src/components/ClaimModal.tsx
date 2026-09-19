import React, { useState } from 'react';
import { X, QrCode, CheckCircle2, Sparkles, Shield, ArrowRight, Smartphone, AlertCircle } from 'lucide-react';
import { BrandPlot } from '../types';

interface ClaimModalProps {
  isOpen: boolean;
  onClose: () => void;
  plotToClaim: BrandPlot | null;
  onConfirmClaim: (newBrand: Partial<BrandPlot>) => void;
}

const COLOR_OPTIONS = [
  { label: 'Swiggy Orange', bg: 'bg-[#fc8019]', text: 'text-white', border: 'border-orange-400' },
  { label: 'Zomato Red', bg: 'bg-[#e23744]', text: 'text-white', border: 'border-red-400' },
  { label: 'Flipkart Blue', bg: 'bg-[#2874f0]', text: 'text-white', border: 'border-blue-400' },
  { label: 'Zepto Purple', bg: 'bg-[#6b21a8]', text: 'text-white', border: 'border-purple-400' },
  { label: 'Groww Emerald', bg: 'bg-[#003b2f]', text: 'text-emerald-300', border: 'border-emerald-500' },
  { label: 'Ola Gold', bg: 'bg-[#facc15]', text: 'text-black', border: 'border-yellow-400' },
  { label: 'CRED Slate', bg: 'bg-[#101216]', text: 'text-white', border: 'border-zinc-700' },
];

export const ClaimModal: React.FC<ClaimModalProps> = ({
  isOpen,
  onClose,
  plotToClaim,
  onConfirmClaim,
}) => {
  const [brandName, setBrandName] = useState('');
  const [tagline, setTagline] = useState('');
  const [websiteUrl, setWebsiteUrl] = useState('https://');
  const [logoSymbol, setLogoSymbol] = useState('🚀');
  const [selectedColor, setSelectedColor] = useState(COLOR_OPTIONS[0]);
  const [upiId, setUpiId] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentStep, setPaymentStep] = useState<'form' | 'upi' | 'success'>('form');

  if (!isOpen) return null;

  const price = plotToClaim?.price || 1;
  const slotId = plotToClaim?.id || '#013';

  const handleProceedToUpi = (e: React.FormEvent) => {
    e.preventDefault();
    if (!brandName.trim()) return;
    setPaymentStep('upi');
  };

  const handleSimulatePayment = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setPaymentStep('success');

      setTimeout(() => {
        onConfirmClaim({
          id: slotId,
          name: brandName,
          tagline: tagline || 'Building for Bharat',
          category: 'Consumer',
          status: 'claimed',
          bgColor: selectedColor.bg,
          textColor: selectedColor.text,
          borderColor: selectedColor.border,
          logoText: logoSymbol || brandName.charAt(0).toUpperCase(),
          logoBg: 'bg-white/20',
          websiteUrl: websiteUrl || 'https://example.com',
          description: `Claimed on Advertises.co.in — Smart advertising tools for Indian businesses Bharat Wall for ₹${price} via UPI.`,
          founded: '2025',
          verified: true,
        });
        onClose();
        // Reset
        setPaymentStep('form');
        setBrandName('');
        setTagline('');
      }, 1400);
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm">
      <div className="relative w-full max-w-lg rounded-2xl border border-slate-700/80 bg-[#091322] p-6 shadow-2xl">

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-slate-400 hover:text-white transition-colors cursor-pointer"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3">
          <div className="relative flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-slate-900 p-0.5 shadow-md ring-1 ring-amber-400/40">
            <img src="/logo.png" alt="Advertises.co.in — Smart advertising tools for Indian businesses" className="h-full w-full object-contain rounded-[10px]" />
          </div>
          <div>
            <h3 className="text-lg font-extrabold text-white">
              Claim Slot <span className="text-orange-400 font-mono">{slotId}</span> for ₹{price}
            </h3>
            <p className="text-xs text-slate-400">
              Instant UPI activation • Permanent Bharat Wall plot
            </p>
          </div>
        </div>

        {paymentStep === 'form' && (
          <form onSubmit={handleProceedToUpi} className="mt-5 space-y-4 text-xs">
            {/* Brand Name */}
            <div>
              <label className="block font-semibold text-slate-300 mb-1">
                Brand / Startup / Project Name *
              </label>
              <input
                type="text"
                required
                value={brandName}
                onChange={(e) => setBrandName(e.target.value)}
                placeholder="e.g. Acme Tech, KiranaPay, SuperAI"
                className="w-full rounded-lg border border-slate-700 bg-[#060c18] px-3 py-2 text-white placeholder-slate-500 outline-none focus:border-orange-500"
              />
            </div>

            {/* Tagline */}
            <div>
              <label className="block font-semibold text-slate-300 mb-1">
                Tagline / Pitch
              </label>
              <input
                type="text"
                value={tagline}
                onChange={(e) => setTagline(e.target.value)}
                placeholder="e.g. 10-Min Fast Groceries, AI for Bharat"
                className="w-full rounded-lg border border-slate-700 bg-[#060c18] px-3 py-2 text-white placeholder-slate-500 outline-none focus:border-orange-500"
              />
            </div>

            {/* Website URL */}
            <div>
              <label className="block font-semibold text-slate-300 mb-1">
                Website / App / Twitter URL
              </label>
              <input
                type="url"
                value={websiteUrl}
                onChange={(e) => setWebsiteUrl(e.target.value)}
                placeholder="https://yourbrand.in"
                className="w-full rounded-lg border border-slate-700 bg-[#060c18] px-3 py-2 text-white placeholder-slate-500 outline-none focus:border-orange-500"
              />
            </div>

            {/* Logo Symbol & Colors */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold text-slate-300 mb-1">
                  Logo / Emoji / Initial
                </label>
                <input
                  type="text"
                  maxLength={4}
                  value={logoSymbol}
                  onChange={(e) => setLogoSymbol(e.target.value)}
                  placeholder="🚀 or A"
                  className="w-full rounded-lg border border-slate-700 bg-[#060c18] px-3 py-2 text-white placeholder-slate-500 outline-none focus:border-orange-500 text-center font-bold"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1">
                  Card Theme
                </label>
                <div className="flex items-center gap-1.5 pt-1">
                  {COLOR_OPTIONS.map((c) => (
                    <button
                      key={c.label}
                      type="button"
                      onClick={() => setSelectedColor(c)}
                      className={`h-6 w-6 rounded-full ${c.bg} transition-all cursor-pointer ${selectedColor.label === c.label ? 'ring-2 ring-white scale-110' : 'opacity-70 hover:opacity-100'
                        }`}
                      title={c.label}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Preview Card */}
            <div className="rounded-lg border border-slate-800 bg-[#060e1c] p-3 text-center">
              <span className="text-[10px] text-slate-400 uppercase tracking-wider block mb-2 font-bold">
                Live Tile Preview
              </span>
              <div
                className={`mx-auto max-w-[180px] rounded-lg p-2.5 shadow-md ${selectedColor.bg} ${selectedColor.text} border ${selectedColor.border}`}
              >
                <div className="flex justify-between text-[9px] font-mono opacity-80 mb-1">
                  <span>{slotId}</span>
                  <span className="text-cyan-300 font-bold">NEW</span>
                </div>
                <div className="flex h-6 w-6 mx-auto items-center justify-center rounded bg-white/20 text-xs font-black">
                  {logoSymbol || '🚀'}
                </div>
                <div className="font-extrabold text-xs mt-1 truncate">
                  {brandName || 'Your Brand Name'}
                </div>
                <div className="text-[9px] opacity-80 truncate">
                  {tagline || 'Your Tagline here'}
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-orange-500 to-[#f95721] py-3 text-xs font-bold text-white shadow-lg shadow-orange-500/20 transition-all hover:brightness-110 cursor-pointer"
            >
              <span>Continue to UPI Payment (₹{price})</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </form>
        )}

        {paymentStep === 'upi' && (
          <div className="mt-5 space-y-4 text-center">
            <div className="mx-auto w-48 rounded-xl border border-slate-700 bg-white p-3 shadow-lg">
              {/* Dynamic QR code representation */}
              <div className="flex flex-col items-center justify-center">
                <QrCode className="h-32 w-32 text-slate-900" />
                <div className="mt-1 font-mono text-[10px] font-bold text-slate-800">
                  Advertises.co.in — Smart advertising tools for Indian businesses@{brandName.toLowerCase().replace(/[^a-z]/g, '') || 'upi'}
                </div>
              </div>
            </div>

            <div>
              <div className="font-mono text-xl font-extrabold text-emerald-400">
                ₹{price}.00
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Scan with Google Pay, PhonePe, Paytm, CRED or BHIM
              </p>
            </div>

            <div className="flex justify-center gap-2 text-xs">
              <span className="rounded bg-slate-800 px-2.5 py-1 text-slate-300 font-semibold border border-slate-700">GPay</span>
              <span className="rounded bg-purple-950 px-2.5 py-1 text-purple-300 font-semibold border border-purple-800">PhonePe</span>
              <span className="rounded bg-blue-950 px-2.5 py-1 text-blue-300 font-semibold border border-blue-800">Paytm</span>
              <span className="rounded bg-zinc-800 px-2.5 py-1 text-zinc-200 font-semibold border border-zinc-700">CRED</span>
            </div>

            <div className="border-t border-slate-800 pt-3">
              <button
                disabled={isProcessing}
                onClick={handleSimulatePayment}
                className="w-full flex items-center justify-center gap-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 py-3 text-xs font-bold text-slate-950 shadow-lg shadow-emerald-500/20 transition-all active:scale-98 cursor-pointer disabled:opacity-50"
              >
                {isProcessing ? (
                  <>
                    <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-slate-900 border-t-transparent" />
                    <span>Verifying with NPCI & UPI Switch...</span>
                  </>
                ) : (
                  <>
                    <Smartphone className="h-4 w-4" />
                    <span>Simulate Instant UPI Success (₹{price})</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={() => setPaymentStep('form')}
                className="mt-2 text-[11px] text-slate-400 hover:text-white"
              >
                ← Back to brand details
              </button>
            </div>
          </div>
        )}

        {paymentStep === 'success' && (
          <div className="py-8 text-center space-y-3">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
              <CheckCircle2 className="h-8 w-8" />
            </div>
            <h4 className="text-lg font-extrabold text-white">
              UPI Payment Confirmed!
            </h4>
            <p className="text-xs text-slate-300">
              <span className="font-bold text-orange-400">{brandName}</span> has claimed Slot{' '}
              <span className="font-mono font-bold text-cyan-400">{slotId}</span>.
            </p>
            <div className="text-[11px] text-emerald-400 font-medium">
              Updating the 1,000 Grid Wall & Broadcasting Live...
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
