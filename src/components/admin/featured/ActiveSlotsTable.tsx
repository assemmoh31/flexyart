import React, { useState } from 'react';
import { Clock, DollarSign, User, AlertTriangle, Trash2, ArrowUpCircle, MoreVertical, PlayCircle } from 'lucide-react';

const mockActiveSlots = [
  { id: 1, artist: 'NeonDreams', title: 'Cyberpunk City', timeLeft: '23:45:12', price: 14.99, status: 'Active' },
  { id: 2, artist: 'AbstractFlow', title: 'Liquid Gold', timeLeft: '18:30:05', price: 9.99, status: 'Active' },
  { id: 3, artist: 'RetroWave', title: 'Sunset Drive', timeLeft: '12:15:45', price: 12.50, status: 'Active' },
  { id: 4, artist: 'SpaceCadet', title: 'Nebula #42', timeLeft: '06:00:30', price: 8.99, status: 'Active' },
  { id: 5, artist: 'PixelMaster', title: '8-Bit Hero', timeLeft: '02:45:10', price: 11.00, status: 'Active' },
  { id: 6, artist: 'GlitchArt', title: 'System Error', timeLeft: '00:30:00', price: 15.00, status: 'Expiring Soon' },
];

const mockUpcoming = [
  { id: 7, artist: 'VaporWave', title: 'Mall Soft', waitTime: '30m', price: 10.00 },
  { id: 8, artist: 'DarkMode', title: 'Void', waitTime: '1h 15m', price: 12.00 },
  { id: 9, artist: 'LightMode', title: 'Flashbang', waitTime: '2h 30m', price: 9.50 },
];

export default function ActiveSlotsTable() {
  const [slots, setSlots] = useState(mockActiveSlots);
  const [upcoming, setUpcoming] = useState(mockUpcoming);
  const [queueLength, setQueueLength] = useState(42); // Example queue length

  const handleRemove = (id: number) => {
    setSlots(slots.filter(s => s.id !== id));
  };

  const handlePushToTop = (id: number) => {
    // Logic to push to top
    console.log(`Pushing ${id} to top`);
  };

  return (
    <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-xl overflow-hidden shadow-xl flex flex-col h-full">
      {/* Header */}
      <div className="p-6 border-b border-slate-800 bg-slate-950/50 flex justify-between items-center">
        <div>
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            <PlayCircle className="w-5 h-5 text-cyan-400" /> Active Slots (6/6)
          </h3>
          <p className="text-slate-400 text-sm">Real-time management of homepage featured slots.</p>
        </div>
        <div className={`px-4 py-2 rounded-lg border flex items-center gap-2 ${
          queueLength > 50 
            ? 'bg-red-500/10 border-red-500/50 text-red-400 animate-pulse shadow-[0_0_15px_rgba(239,68,68,0.4)]' 
            : 'bg-slate-800 border-slate-700 text-slate-300'
        }`}>
          <span className="text-xs font-bold uppercase tracking-wider">Queue Length:</span>
          <span className="text-lg font-mono font-bold">{queueLength}</span>
        </div>
      </div>

      {/* Active Slots List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar">
        {slots.map((slot, index) => (
          <div key={slot.id} className="group relative bg-slate-950 border border-slate-800 hover:border-cyan-500/30 rounded-xl p-4 transition-all duration-300 hover:shadow-[0_0_20px_rgba(6,182,212,0.1)]">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-slate-900 rounded-lg flex items-center justify-center font-bold text-slate-600 border border-slate-800 group-hover:border-cyan-500/50 group-hover:text-cyan-400 transition-colors">
                  #{index + 1}
                </div>
                <div>
                  <h4 className="font-bold text-white group-hover:text-cyan-400 transition-colors">{slot.title}</h4>
                  <p className="text-xs text-slate-500 flex items-center gap-1">
                    by <span className="text-slate-300 font-medium">@{slot.artist}</span>
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-6">
                <div className="text-right">
                  <div className="flex items-center gap-1 text-emerald-400 font-mono font-bold">
                    <DollarSign className="w-3 h-3" /> {slot.price.toFixed(2)}
                  </div>
                  <div className="text-[10px] text-slate-500 uppercase tracking-wider font-bold">Paid</div>
                </div>

                <div className="text-right w-24">
                  <div className={`flex items-center justify-end gap-1 font-mono font-bold ${
                    slot.status === 'Expiring Soon' ? 'text-amber-400 animate-pulse' : 'text-slate-300'
                  }`}>
                    <Clock className="w-3 h-3" /> {slot.timeLeft}
                  </div>
                  <div className="text-[10px] text-slate-500 uppercase tracking-wider font-bold">Time Left</div>
                </div>

                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button 
                    onClick={() => handlePushToTop(slot.id)}
                    className="p-2 bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 rounded-lg border border-cyan-500/20 transition-colors"
                    title="Push to Top"
                  >
                    <ArrowUpCircle className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => handleRemove(slot.id)}
                    className="p-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-lg border border-red-500/20 transition-colors"
                    title="Remove & Refund"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
            {/* Progress Bar */}
            <div className="absolute bottom-0 left-0 h-1 bg-slate-800 w-full rounded-b-xl overflow-hidden">
              <div 
                className={`h-full ${slot.status === 'Expiring Soon' ? 'bg-amber-500' : 'bg-cyan-500'}`} 
                style={{ width: `${Math.random() * 100}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>

      {/* Upcoming / Waiting Room */}
      <div className="border-t border-slate-800 bg-slate-950/30 p-4">
        <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3 flex items-center gap-2">
          <Clock className="w-3 h-3" /> Waiting Room (Next Up)
        </h4>
        <div className="space-y-2">
          {upcoming.map((item) => (
            <div key={item.id} className="flex items-center justify-between p-3 rounded-lg bg-slate-900/50 border border-slate-800/50 hover:bg-slate-800 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-slate-600"></div>
                <span className="text-sm font-medium text-slate-300">{item.title}</span>
                <span className="text-xs text-slate-500">@{item.artist}</span>
              </div>
              <div className="flex items-center gap-4 text-xs font-mono">
                <span className="text-slate-400">Wait: {item.waitTime}</span>
                <span className="text-emerald-500 font-bold">${item.price.toFixed(2)}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
