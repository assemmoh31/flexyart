import React from 'react';
import { DollarSign, Clock, User } from 'lucide-react';

const mockPayments = [
  { id: 1, artist: 'ArtistX', amount: 0.50, duration: '24h', time: '2 mins ago' },
  { id: 2, artist: 'CreatorY', amount: 1.20, duration: '48h', time: '5 mins ago' },
  { id: 3, artist: 'StudioZ', amount: 5.00, duration: '7d', time: '12 mins ago' },
  { id: 4, artist: 'IndieDev', amount: 0.50, duration: '24h', time: '20 mins ago' },
  { id: 5, artist: 'PixelArt', amount: 2.50, duration: '3d', time: '35 mins ago' },
];

export default function RecentPaymentsFeed() {
  return (
    <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-xl p-6 h-full shadow-xl flex flex-col">
      <div className="flex items-center gap-2 mb-4">
        <div className="p-2 bg-yellow-500/10 rounded-lg border border-yellow-500/20">
          <DollarSign className="w-5 h-5 text-yellow-400" />
        </div>
        <h3 className="text-lg font-bold text-white">Recent Payments</h3>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar space-y-3 pr-2">
        {mockPayments.map((payment) => (
          <div key={payment.id} className="p-3 bg-slate-950/50 border border-slate-800 rounded-lg hover:bg-slate-900 transition-colors group">
            <div className="flex justify-between items-start mb-1">
              <span className="font-bold text-white group-hover:text-cyan-400 transition-colors">@{payment.artist}</span>
              <span className="text-emerald-400 font-mono font-bold text-sm">+${payment.amount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-xs text-slate-500">
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" /> {payment.duration}
              </span>
              <span>{payment.time}</span>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-4 pt-4 border-t border-slate-800 text-center">
        <button className="text-xs text-slate-400 hover:text-white transition-colors uppercase tracking-wider font-bold">View All History</button>
      </div>
    </div>
  );
}
