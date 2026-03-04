import React, { useState } from 'react';
import { DollarSign, Users, Clock, TrendingUp, AlertTriangle, Zap } from 'lucide-react';
import PricingEngine from './featured/PricingEngine';
import ActiveSlotsTable from './featured/ActiveSlotsTable';
import LivePreviewCanvas from './featured/LivePreviewCanvas';
import RecentPaymentsFeed from './featured/RecentPaymentsFeed';

export default function FeaturedSlotManager() {
  const [basePrice, setBasePrice] = useState(4.99);
  const [multipliers, setMultipliers] = useState<Record<string, number>>({
    'Friday': 20,
    'Saturday': 50,
    'Sunday': 30
  });
  const [isSaleMode, setIsSaleMode] = useState(false);

  // Mock Stats
  const stats = {
    dailyRevenue: 1250.50,
    activeSlots: 6,
    queueLength: 42
  };

  return (
    <div className="flex flex-col gap-6 animate-in fade-in duration-500">
      {/* Top Bar - Stats & Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 flex-shrink-0">
        <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-xl p-6 flex items-center justify-between shadow-lg group hover:border-emerald-500/30 transition-all">
          <div>
            <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-1">Daily Revenue</p>
            <h3 className="text-3xl font-bold text-white font-mono group-hover:text-emerald-400 transition-colors">
              ${stats.dailyRevenue.toLocaleString(undefined, { minimumFractionDigits: 2 })}
            </h3>
          </div>
          <div className="p-3 bg-emerald-500/10 rounded-xl border border-emerald-500/20 group-hover:scale-110 transition-transform">
            <TrendingUp className="w-6 h-6 text-emerald-400" />
          </div>
        </div>

        <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-xl p-6 flex items-center justify-between shadow-lg group hover:border-cyan-500/30 transition-all">
          <div>
            <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-1">Active Features</p>
            <h3 className="text-3xl font-bold text-white font-mono group-hover:text-cyan-400 transition-colors">
              {stats.activeSlots} <span className="text-lg text-slate-500">/ 6</span>
            </h3>
          </div>
          <div className="p-3 bg-cyan-500/10 rounded-xl border border-cyan-500/20 group-hover:scale-110 transition-transform">
            <Zap className="w-6 h-6 text-cyan-400" />
          </div>
        </div>

        <div className={`bg-slate-900/60 backdrop-blur-xl border rounded-xl p-6 flex items-center justify-between shadow-lg group transition-all ${
          stats.queueLength > 50 
            ? 'border-red-500/50 hover:border-red-500 shadow-[0_0_15px_rgba(239,68,68,0.2)]' 
            : 'border-slate-800 hover:border-slate-700'
        }`}>
          <div>
            <p className={`text-xs font-bold uppercase tracking-wider mb-1 ${stats.queueLength > 50 ? 'text-red-400' : 'text-slate-400'}`}>Queue Length</p>
            <h3 className={`text-3xl font-bold font-mono transition-colors ${stats.queueLength > 50 ? 'text-red-500 animate-pulse' : 'text-white'}`}>
              {stats.queueLength}
            </h3>
          </div>
          <div className={`p-3 rounded-xl border transition-transform group-hover:scale-110 ${
            stats.queueLength > 50 ? 'bg-red-500/10 border-red-500/20' : 'bg-slate-800 border-slate-700'
          }`}>
            {stats.queueLength > 50 ? <AlertTriangle className="w-6 h-6 text-red-500" /> : <Users className="w-6 h-6 text-slate-400" />}
          </div>
        </div>
      </div>

      {/* Main Dashboard Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Sidebar - Pricing Engine */}
        <div className="col-span-1 lg:col-span-3 flex flex-col">
          <PricingEngine 
            basePrice={basePrice} 
            setBasePrice={setBasePrice} 
            multipliers={multipliers} 
            setMultipliers={setMultipliers}
            isSaleMode={isSaleMode}
            setIsSaleMode={setIsSaleMode}
          />
        </div>

        {/* Center - Active Slots & Preview */}
        <div className="col-span-1 lg:col-span-6 flex flex-col gap-6">
          <div className="h-[500px]">
            <ActiveSlotsTable />
          </div>
          <div className="h-[450px]">
            <LivePreviewCanvas />
          </div>
        </div>

        {/* Right Sidebar - Recent Payments & ROI */}
        <div className="col-span-1 lg:col-span-3 flex flex-col gap-6">
          <div className="h-[500px]">
            <RecentPaymentsFeed />
          </div>
          
          {/* ROI Stat Card */}
          <div className="bg-gradient-to-br from-indigo-900/50 to-purple-900/50 backdrop-blur-xl border border-indigo-500/30 rounded-xl p-6 shadow-lg relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/20 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 group-hover:bg-indigo-500/30 transition-colors"></div>
            <h4 className="text-indigo-300 font-bold uppercase tracking-wider text-xs mb-2">ROI Insight</h4>
            <p className="text-white font-medium text-sm leading-relaxed relative z-10">
              Average <span className="text-emerald-400 font-bold">$5.00</span> feature generates <span className="text-emerald-400 font-bold">$25.00</span> in artist sales.
            </p>
            <div className="mt-4 h-1 w-full bg-indigo-950 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 w-[80%] animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

