import React, { useState } from 'react';
import { ShieldAlert, Clock, User, Activity } from 'lucide-react';

// Mock Data
const mockLogs = Array.from({ length: 20 }).map((_, i) => ({
  id: `log_${1000 + i}`,
  timestamp: new Date(Date.now() - i * 1800000).toLocaleString(),
  admin: ['Admin_A', 'Admin_B', 'SuperAdmin'][i % 3],
  action: ['Deleted Artwork', 'Banned User', 'Updated Settings', 'Refunded Transaction'][i % 4],
  target: ['Artwork #123', 'User_X', 'Site Flags', 'Txn #999'][i % 4],
  severity: ['High', 'Medium', 'Low'][i % 3]
}));

export default function AuditLogs() {
  const [logs, setLogs] = useState(mockLogs);
  const [filter, setFilter] = useState('All');

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <ShieldAlert className="w-6 h-6 text-red-500" /> System Audit Logs
          </h2>
          <p className="text-slate-400 text-sm">Read-only log of all administrative actions for security and compliance.</p>
        </div>
        <div className="flex gap-2">
          <select 
            className="bg-slate-900 border border-slate-800 rounded-lg px-4 py-2 text-white focus:border-cyan-500 focus:outline-none"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="All">All Actions</option>
            <option value="High">High Severity</option>
            <option value="Medium">Medium Severity</option>
            <option value="Low">Low Severity</option>
          </select>
        </div>
      </div>

      <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left font-mono text-sm">
            <thead>
              <tr className="bg-slate-950 border-b border-slate-800 text-slate-500 uppercase tracking-wider">
                <th className="p-4 w-48">Timestamp</th>
                <th className="p-4 w-32">Admin</th>
                <th className="p-4">Action</th>
                <th className="p-4">Target</th>
                <th className="p-4 text-center w-24">Severity</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/50 text-slate-300">
              {logs.filter(l => filter === 'All' || l.severity === filter).map((log) => (
                <tr key={log.id} className="hover:bg-slate-800/30 transition-colors">
                  <td className="p-4 text-slate-500 flex items-center gap-2">
                    <Clock className="w-3 h-3" /> {log.timestamp}
                  </td>
                  <td className="p-4 font-bold text-cyan-400">
                    <span className="flex items-center gap-1"><User className="w-3 h-3" /> {log.admin}</span>
                  </td>
                  <td className="p-4 text-white">
                    <span className="flex items-center gap-2"><Activity className="w-3 h-3 text-slate-500" /> {log.action}</span>
                  </td>
                  <td className="p-4 text-slate-400">{log.target}</td>
                  <td className="p-4 text-center">
                    <span className={`inline-block w-2 h-2 rounded-full mr-2 ${
                      log.severity === 'High' ? 'bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.6)]' : 
                      log.severity === 'Medium' ? 'bg-yellow-500 shadow-[0_0_8px_rgba(234,179,8,0.6)]' : 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.6)]'
                    }`}></span>
                    {log.severity}
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
