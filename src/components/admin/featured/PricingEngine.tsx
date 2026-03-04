import React, { useState } from 'react';
import { DollarSign, Calendar, Zap, TrendingUp, AlertTriangle } from 'lucide-react';

interface PricingEngineProps {
  basePrice: number;
  setBasePrice: (price: number) => void;
  multipliers: Record<string, number>;
  setMultipliers: (multipliers: Record<string, number>) => void;
  isSaleMode: boolean;
  setIsSaleMode: (isSaleMode: boolean) => void;
}

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

export default function PricingEngine({
  basePrice,
  setBasePrice,
  multipliers,
  setMultipliers,
  isSaleMode,
  setIsSaleMode
}: PricingEngineProps) {
  
  const handleMultiplierChange = (day: string, value: number) => {
    setMultipliers({ ...multipliers, [day]: value });
  };

  return (
    <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-xl p-6 flex flex-col gap-6 shadow-xl">
      <div className="flex items-center gap-2 mb-2">
        <div className="p-2 bg-emerald-500/10 rounded-lg border border-emerald-500/20">
          <DollarSign className="w-5 h-5 text-emerald-400" />
        </div>
        <h3 className="text-lg font-bold text-white">Pricing Engine</h3>
      </div>

      {/* Base Price Control */}
      <div className="space-y-2">
        <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Global Base Price (24h)</label>
        <div className="relative group">
          <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-emerald-400 transition-colors" />
          <input 
            type="number" 
            value={isNaN(basePrice) ? '' : basePrice}
            onChange={(e) => setBasePrice(parseFloat(e.target.value))}
            className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-10 pr-4 py-3 text-white font-mono font-bold focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500/50 transition-all"
          />
        </div>
        <p className="text-xs text-slate-500">Standard cost for a 24-hour featured slot.</p>
      </div>

      {/* Day Multipliers */}
      <div className="pr-2">
        <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 block">Day-of-Week Multipliers</label>
        <div className="space-y-3">
          {DAYS.map((day) => (
            <div key={day} className="flex items-center justify-between p-3 bg-slate-950/50 border border-slate-800 rounded-lg hover:border-slate-700 transition-colors">
              <span className="text-sm font-medium text-slate-300">{day}</span>
              <div className="flex items-center gap-2">
                <input 
                  type="number" 
                  value={isNaN(multipliers[day]) ? '' : multipliers[day] || 0}
                  onChange={(e) => handleMultiplierChange(day, parseInt(e.target.value))}
                  className={`w-16 bg-slate-900 border border-slate-700 rounded px-2 py-1 text-right text-xs font-mono font-bold focus:outline-none ${
                    (multipliers[day] || 0) > 0 ? 'text-emerald-400 border-emerald-500/30' : 'text-slate-400'
                  }`}
                />
                <span className="text-xs text-slate-500 font-bold">%</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Event Surge Toggle */}
      <div className="pt-4 border-t border-slate-800">
        <div className={`p-4 rounded-xl border transition-all duration-300 ${
          isSaleMode 
            ? 'bg-amber-500/10 border-amber-500/50 shadow-[0_0_20px_rgba(245,158,11,0.2)]' 
            : 'bg-slate-950 border-slate-800'
        }`}>
          <div className="flex justify-between items-center mb-2">
            <div className="flex items-center gap-2">
              <Zap className={`w-5 h-5 ${isSaleMode ? 'text-amber-400 fill-amber-400' : 'text-slate-500'}`} />
              <span className={`font-bold ${isSaleMode ? 'text-amber-400' : 'text-slate-400'}`}>Event Surge Mode</span>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" checked={isSaleMode} onChange={(e) => setIsSaleMode(e.target.checked)} className="sr-only peer" />
              <div className="w-11 h-6 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-500"></div>
            </label>
          </div>
          <p className="text-xs text-slate-500 mb-3">
            Instantly adds <span className="text-emerald-400 font-bold">+$2.00</span> to all slots during high-traffic events.
          </p>
          {isSaleMode && (
            <div className="flex items-center gap-2 text-xs text-amber-400 font-bold animate-pulse">
              <AlertTriangle className="w-3 h-3" />
              <span>SURGE PRICING ACTIVE</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
