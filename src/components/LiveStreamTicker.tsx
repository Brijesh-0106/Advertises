import React from 'react';
import { TickerEvent } from '../types';
import { Zap, Radio } from 'lucide-react';

interface LiveStreamTickerProps {
  events: TickerEvent[];
}

export const LiveStreamTicker: React.FC<LiveStreamTickerProps> = ({ events }) => {
  return (
    <div className="w-full border-t border-b border-slate-800/90 bg-[#070e1d] py-2 text-xs">
      <div className="mx-auto flex max-w-7xl items-center overflow-hidden px-3 sm:px-6">
        
        {/* Fixed Title Tag */}
        <div className="flex shrink-0 items-center gap-2 pr-4 border-r border-slate-800">
          <span className="h-2 w-2 rounded-full bg-orange-500 animate-pulse shadow-[0_0_8px_#f97316]" />
          <span className="font-extrabold tracking-wider text-orange-400 uppercase text-[11px]">
            LIVE AD STREAM:
          </span>
        </div>

        {/* Scrolling or Static events track */}
        <div className="flex items-center gap-8 overflow-x-auto pl-4 no-scrollbar whitespace-nowrap">
          {events.map((evt, idx) => (
            <div key={evt.id} className="flex items-center gap-2">
              <span className={`text-xs ${evt.highlight ? 'text-slate-100 font-semibold' : 'text-slate-300'}`}>
                {evt.message}
              </span>
              <span className="text-[10px] text-slate-400 font-mono">
                [{evt.timestamp}]
              </span>
              {idx < events.length - 1 && (
                <span className="text-slate-600 font-bold ml-4">•</span>
              )}
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};
