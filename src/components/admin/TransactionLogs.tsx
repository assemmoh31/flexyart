import React, { useState, useEffect } from 'react';
import { DollarSign, ArrowUpRight, ArrowDownLeft, Filter, Download } from 'lucide-react';

// Mock Data
const mockTransactions = Array.from({ length: 20 }).map((_, i) => ({
  id: `txn_${1000 + i}`,
  date: new Date(Date.now() - i * 3600000).toLocaleString(),
  type: i % 3 === 0 ? 'Subscription' : 'Artwork Sale',
  amount: (Math.random() * 100 + 5).toFixed(2),
  fee: (Math.random() * 5).toFixed(2),
  status: i % 10 === 0 ? 'Failed' : 'Success',
  user: `User_${i + 1}`,
  item: i % 3 === 0 ? 'Pro Plan' : `Artwork #${i + 100}`
}));

export default function TransactionLogs() {
  const [logs, setLogs] = useState(mockTransactions);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <DollarSign className="w-6 h-6 text-yellow-400" /> Order & Transaction Logs
          </h2>
          <p className="text-slate-400 text-sm">Real-time feed of all financial activities.</p>
        </div>
        <div className="flex gap-2">
          <button className="bg-slate-800 hover:bg-slate-700 text-white px-4 py-2 rounded-lg border border-slate-700 flex items-center gap-2">
            <Download className="w-4 h-4" /> Export CSV
          </button>
        </div>
      </div>

      <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-900/80 border-b border-slate-800 text-slate-400 font-medium text-sm uppercase tracking-wider">
                <th className="p-4">Transaction ID</th>
                <th className="p-4">Date & Time</th>
                <th className="p-4">Type</th>
                <th className="p-4">User</th>
                <th className="p-4 text-right text-cyan-400">Fee (5%)</th>
                <th className="p-4 text-right text-yellow-400">Total Price</th>
                <th className="p-4 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-300 text-sm">
              {logs.map((log) => (
                <tr key={log.id} className="hover:bg-slate-800/50 transition-colors group">
                  <td className="p-4 font-mono text-slate-500 group-hover:text-white transition-colors">{log.id}</td>
                  <td className="p-4">{log.date}</td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded text-xs font-bold ${log.type === 'Subscription' ? 'bg-purple-500/10 text-purple-400 border border-purple-500/20' : 'bg-blue-500/10 text-blue-400 border border-blue-500/20'}`}>
                      {log.type}
                    </span>
                  </td>
                  <td className="p-4 font-medium text-white">{log.user}</td>
                  <td className="p-4 text-right font-mono text-cyan-400 font-bold">+€{log.fee}</td>
                  <td className="p-4 text-right font-mono text-yellow-400 font-bold">€{log.amount}</td>
                  <td className="p-4 text-center">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      log.status === 'Success' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/10 text-red-400'
                    }`}>
                      {log.status === 'Success' ? <ArrowUpRight className="w-3 h-3 mr-1" /> : <ArrowDownLeft className="w-3 h-3 mr-1" />}
                      {log.status}
                    </span>
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
