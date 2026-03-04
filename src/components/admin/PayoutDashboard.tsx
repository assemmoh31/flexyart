import React, { useState } from 'react';
import { DollarSign, CheckCircle, Clock, AlertTriangle, Search, Filter, Download } from 'lucide-react';

// Mock Data
const mockPayouts = [
  { id: 1, creator: "NeonDreams", totalSales: 12500.00, fee: 625.00, net: 11875.00, status: "Pending", method: "PayPal" },
  { id: 2, creator: "CyberArtist_X", totalSales: 4500.50, fee: 225.02, net: 4275.48, status: "Processing", method: "Stripe" },
  { id: 3, creator: "FlowMaster", totalSales: 890.00, fee: 44.50, net: 845.50, status: "Paid", method: "Bank Transfer" },
  { id: 4, creator: "8BitWonder", totalSales: 3200.00, fee: 160.00, net: 3040.00, status: "Pending", method: "PayPal" },
  { id: 5, creator: "VaporWave_99", totalSales: 150.00, fee: 7.50, net: 142.50, status: "Paid", method: "Stripe" },
];

export default function PayoutDashboard() {
  const [payouts, setPayouts] = useState(mockPayouts);
  const [searchQuery, setSearchQuery] = useState('');

  const handleProcess = (id: number) => {
    setPayouts(payouts.map(p => p.id === id ? { ...p, status: 'Processing' } : p));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <DollarSign className="w-6 h-6 text-yellow-400" /> Payout Dashboard
          </h2>
          <p className="text-slate-400 text-sm">Manage creator earnings and process withdrawals.</p>
        </div>
        <div className="flex gap-2">
          <button className="bg-slate-800 hover:bg-slate-700 text-white px-4 py-2 rounded-lg border border-slate-700 flex items-center gap-2 transition-colors">
            <Download className="w-4 h-4" /> Export CSV
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-xl p-6">
          <p className="text-slate-400 text-sm uppercase tracking-wider mb-1">Pending Payouts</p>
          <p className="text-3xl font-bold text-white">€14,915.00</p>
          <div className="mt-2 text-sm text-yellow-400 flex items-center gap-1">
            <Clock className="w-4 h-4" /> 2 requests waiting
          </div>
        </div>
        <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-xl p-6">
          <p className="text-slate-400 text-sm uppercase tracking-wider mb-1">Processed (MTD)</p>
          <p className="text-3xl font-bold text-white">€45,200.50</p>
          <div className="mt-2 text-sm text-emerald-400 flex items-center gap-1">
            <CheckCircle className="w-4 h-4" /> 125 successful
          </div>
        </div>
        <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-xl p-6">
          <p className="text-slate-400 text-sm uppercase tracking-wider mb-1">Total Fees Earned</p>
          <p className="text-3xl font-bold text-white">€2,450.00</p>
          <div className="mt-2 text-sm text-cyan-400 flex items-center gap-1">
            <DollarSign className="w-4 h-4" /> 5% avg. fee
          </div>
        </div>
      </div>

      {/* Filter & Search */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input 
            type="text" 
            placeholder="Search creators..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-900 border border-slate-800 rounded-lg pl-10 pr-4 py-2 text-white focus:border-yellow-500 focus:outline-none transition-colors"
          />
        </div>
        <div className="flex gap-2">
          <select className="bg-slate-900 border border-slate-800 rounded-lg px-4 py-2 text-slate-300 focus:border-yellow-500 focus:outline-none">
            <option>All Status</option>
            <option>Pending</option>
            <option>Processing</option>
            <option>Paid</option>
          </select>
        </div>
      </div>

      {/* Payout Table */}
      <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-900/80 border-b border-slate-800">
                <th className="p-4 text-slate-400 font-medium text-sm">Creator</th>
                <th className="p-4 text-slate-400 font-medium text-sm">Method</th>
                <th className="p-4 text-slate-400 font-medium text-sm text-right">Total Sales</th>
                <th className="p-4 text-slate-400 font-medium text-sm text-right">Fee (5%)</th>
                <th className="p-4 text-slate-400 font-medium text-sm text-right">Net Payout</th>
                <th className="p-4 text-slate-400 font-medium text-sm text-center">Status</th>
                <th className="p-4 text-slate-400 font-medium text-sm text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {payouts.filter(p => p.creator.toLowerCase().includes(searchQuery.toLowerCase())).map((payout) => (
                <tr key={payout.id} className="hover:bg-slate-800/50 transition-colors group">
                  <td className="p-4">
                    <div className="font-bold text-white">{payout.creator}</div>
                  </td>
                  <td className="p-4 text-slate-300 text-sm">{payout.method}</td>
                  <td className="p-4 text-right text-slate-300">€{payout.totalSales.toFixed(2)}</td>
                  <td className="p-4 text-right text-red-400">-€{payout.fee.toFixed(2)}</td>
                  <td className="p-4 text-right font-bold text-emerald-400">€{payout.net.toFixed(2)}</td>
                  <td className="p-4 text-center">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      payout.status === 'Paid' ? 'bg-emerald-500/10 text-emerald-400' :
                      payout.status === 'Processing' ? 'bg-blue-500/10 text-blue-400' :
                      'bg-yellow-500/10 text-yellow-400'
                    }`}>
                      {payout.status}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    {payout.status === 'Pending' ? (
                      <button 
                        onClick={() => handleProcess(payout.id)}
                        className="bg-yellow-500 hover:bg-yellow-600 text-black px-3 py-1.5 rounded-lg text-sm font-bold transition-colors shadow-[0_0_10px_rgba(234,179,8,0.2)]"
                      >
                        Process Payout
                      </button>
                    ) : (
                      <button className="text-slate-500 hover:text-white transition-colors text-sm">
                        View Details
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
