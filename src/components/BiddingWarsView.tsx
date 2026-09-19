import React, { useState, useEffect } from 'react';
import { Flame, Clock, Trophy, ArrowRight, ShieldAlert, Sparkles, TrendingUp, DollarSign } from 'lucide-react';
import { BiddingWar } from '../types';

interface BiddingWarsViewProps {
  wars: BiddingWar[];
  onPlaceCounterBid: (warId: string, slotId: string, currentBid: number) => void;
}

export const BiddingWarsView: React.FC<BiddingWarsViewProps> = ({
  wars,
  onPlaceCounterBid,
}) => {
  // Animated countdown timer simulation
  const [secondsMap, setSecondsMap] = useState<Record<string, number>>(() => {
    const init: Record<string, number> = {};
    wars.forEach((w) => {
      init[w.id] = w.timeLeftSeconds;
    });
    return init;
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setSecondsMap((prev) => {
        const next = { ...prev };
        Object.keys(next).forEach((id) => {
          if (next[id] > 0) next[id] -= 1;
        });
        return next;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (secs: number) => {
    const h = Math.floor(secs / 3600);
    const m = Math.floor((secs % 3600) / 60);
    const s = secs % 60;
    return `${h.toString().padStart(2, '0')}h ${m.toString().padStart(2, '0')}m ${s.toString().padStart(2, '0')}s`;
  };

  return (
    <div className="mx-auto max-w-7xl px-3 py-6 sm:px-6">
      {/* Header Banner */}
      <div className="mb-6 rounded-xl border border-red-500/30 bg-gradient-to-r from-red-950/40 via-[#0f172a] to-orange-950/30 p-5 shadow-lg">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-md bg-red-500/20 text-red-400">
                <Flame className="h-4 w-4" />
              </span>
              <h2 className="text-xl font-extrabold text-white">
                Live Brand Bidding Wars & Territory Clashes
              </h2>
            </div>
            <p className="mt-1 text-xs text-slate-300">
              High-stakes corporate bidding battles for prime coordinates on India&apos;s Million-Dollar Bharat Wall.
              Outbid the incumbent to take over their tile!
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="rounded-lg border border-red-500/40 bg-red-950/50 px-3 py-2 text-center">
              <span className="block text-[10px] uppercase font-bold text-red-300">Active Clashes</span>
              <span className="font-mono text-base font-black text-white">{wars.length}</span>
            </div>
            <div className="rounded-lg border border-amber-500/40 bg-amber-950/50 px-3 py-2 text-center">
              <span className="block text-[10px] uppercase font-bold text-amber-300">Total Bids Locked</span>
              <span className="font-mono text-base font-black text-white">₹3,35,000</span>
            </div>
          </div>
        </div>
      </div>

      {/* Battles Grid */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {wars.map((war) => {
          const timeLeft = secondsMap[war.id] ?? war.timeLeftSeconds;
          const totalPot = war.defender.bid + war.challenger.bid;
          const defenderPct = Math.round((war.defender.bid / totalPot) * 100);
          const challengerPct = 100 - defenderPct;

          return (
            <div
              key={war.id}
              className="flex flex-col justify-between rounded-xl border border-slate-800 bg-[#081224] p-5 shadow-xl transition-all hover:border-slate-700"
            >
              <div>
                {/* Header: Slot and Timer */}
                <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="rounded bg-slate-800 px-2 py-0.5 font-mono text-xs font-bold text-cyan-400">
                      Slot {war.slotId}
                    </span>
                    <span className="text-xs font-semibold text-slate-300">
                      {war.category}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 rounded-full bg-red-950/60 px-2.5 py-1 text-[11px] font-mono font-bold text-red-400 border border-red-500/30">
                    <Clock className="h-3 w-3" />
                    {formatTime(timeLeft)}
                  </div>
                </div>

                {/* Title and Story */}
                <h3 className="mt-3 text-base font-extrabold text-white">
                  {war.title}
                </h3>
                <p className="mt-1 text-xs leading-relaxed text-slate-400">
                  {war.story}
                </p>

                {/* Combatants Showcase */}
                <div className="mt-4 grid grid-cols-2 gap-3">
                  {/* Defender */}
                  <div className="rounded-lg border border-slate-800 bg-slate-900/80 p-3 text-center">
                    <div className="text-[10px] font-bold text-slate-500 uppercase">Current Holder</div>
                    <div className="mt-1 flex items-center justify-center gap-1.5">
                      <div className={`flex h-6 w-6 items-center justify-center rounded ${war.defender.color} text-white font-black text-xs`}>
                        {war.defender.logoText}
                      </div>
                      <span className="font-extrabold text-white text-sm">{war.defender.name}</span>
                    </div>
                    <div className="mt-2 font-mono text-sm font-bold text-slate-300">
                      ₹{war.defender.bid.toLocaleString('en-IN')}
                    </div>
                  </div>

                  {/* Challenger */}
                  <div className="rounded-lg border border-orange-500/40 bg-orange-950/30 p-3 text-center">
                    <div className="text-[10px] font-bold text-orange-400 uppercase">Highest Challenger</div>
                    <div className="mt-1 flex items-center justify-center gap-1.5">
                      <div className={`flex h-6 w-6 items-center justify-center rounded ${war.challenger.color} text-white font-black text-xs`}>
                        {war.challenger.logoText}
                      </div>
                      <span className="font-extrabold text-orange-300 text-sm">{war.challenger.name}</span>
                    </div>
                    <div className="mt-2 font-mono text-sm font-black text-emerald-400">
                      ₹{war.challenger.bid.toLocaleString('en-IN')}
                    </div>
                  </div>
                </div>

                {/* Tug of war meter */}
                <div className="mt-4">
                  <div className="flex justify-between text-[10px] font-bold text-slate-400 mb-1">
                    <span>{war.defender.name} ({defenderPct}%)</span>
                    <span>{war.challenger.name} ({challengerPct}%)</span>
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-slate-800 flex">
                    <div
                      style={{ width: `${defenderPct}%` }}
                      className="bg-red-500 transition-all duration-500"
                    />
                    <div
                      style={{ width: `${challengerPct}%` }}
                      className="bg-orange-500 transition-all duration-500"
                    />
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="mt-5 border-t border-slate-800/80 pt-3">
                <button
                  onClick={() => onPlaceCounterBid(war.id, war.slotId, war.challenger.bid)}
                  className="w-full flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-red-600 to-orange-600 px-4 py-2.5 text-xs font-bold text-white shadow-lg shadow-orange-600/20 transition-all hover:brightness-110 active:scale-98 cursor-pointer"
                >
                  <Flame className="h-4 w-4" />
                  <span>Submit Outbid (Min ₹{(war.challenger.bid + 5000).toLocaleString('en-IN')})</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
