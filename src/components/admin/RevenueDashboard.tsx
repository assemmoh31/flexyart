import React, { useState } from 'react';
import { 
  DollarSign, 
  CreditCard, 
  TrendingUp, 
  Wallet, 
  Users, 
  Activity, 
  ArrowUpRight, 
  ArrowDownRight, 
  Download, 
  Filter, 
  Search,
  CheckCircle,
  Clock
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell,
  PieChart,
  Pie
} from 'recharts';

// --- Types ---
interface Transaction {
  id: string;
  date: string;
  user: string;
  type: 'Subscription' | 'Marketplace Fee' | 'Withdrawal';
  planOrItem: string;
  amount: number;
  status: 'Completed' | 'Pending' | 'Failed';
}

interface Withdrawal {
  id: string;
  date: string;
  amount: number;
  status: 'Completed' | 'Pending';
}

// --- Mock Data ---
const transactions: Transaction[] = [
  { id: 'tx_1', date: '2024-03-15', user: 'NeonDreams', type: 'Subscription', planOrItem: 'Elite Tier', amount: 19.99, status: 'Completed' },
  { id: 'tx_2', date: '2024-03-14', user: 'PixelMaster', type: 'Marketplace Fee', planOrItem: 'Cyberpunk City', amount: 2.50, status: 'Completed' },
  { id: 'tx_3', date: '2024-03-14', user: 'RetroVibes', type: 'Subscription', planOrItem: 'Creator Tier', amount: 9.99, status: 'Completed' },
  { id: 'tx_4', date: '2024-03-13', user: 'ArtisticSoul', type: 'Marketplace Fee', planOrItem: 'Abstract Flow', amount: 1.25, status: 'Completed' },
  { id: 'tx_5', date: '2024-03-12', user: 'DesignPro', type: 'Subscription', planOrItem: 'Artist Tier', amount: 4.99, status: 'Completed' },
];

const withdrawals: Withdrawal[] = [
  { id: 'wd_1', date: '2024-03-01', amount: 1500.00, status: 'Completed' },
  { id: 'wd_2', date: '2024-02-01', amount: 1200.00, status: 'Completed' },
  { id: 'wd_3', date: '2024-01-01', amount: 950.00, status: 'Completed' },
];

const tierData = [
  { name: 'Artist ($4.99)', value: 450, color: '#22d3ee' }, // Cyan
  { name: 'Creator ($9.99)', value: 300, color: '#a855f7' }, // Purple
  { name: 'Elite ($19.99)', value: 150, color: '#facc15' }, // Yellow
];

export default function RevenueDashboard() {
  const [filterType, setFilterType] = useState<'All' | 'Subscription' | 'Marketplace Fee'>('All');

  const filteredTransactions = transactions.filter(t => 
    filterType === 'All' ? true : t.type === filterType
  );

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-white tracking-tight">Financial Analytics</h2>
          <p className="text-slate-400 mt-1">Real-time revenue breakdown and subscription metrics.</p>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm text-slate-500 flex items-center gap-2 bg-slate-900/50 px-3 py-1.5 rounded-lg border border-slate-800">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
            Live Data
          </span>
          <button className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-lg transition-colors border border-slate-700">
            <Download className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Executive Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <SummaryCard 
          title="Total Revenue (MTD)" 
          value="$12,450.00" 
          change="+12.5%" 
          isPositive={true}
          icon={<DollarSign className="w-6 h-6 text-emerald-400" />}
          bg="bg-emerald-500/10"
          border="border-emerald-500/20"
        />
        <SummaryCard 
          title="Transaction Fees" 
          value="$1,240.50" 
          change="+5.2%" 
          isPositive={true}
          icon={<CreditCard className="w-6 h-6 text-cyan-400" />}
          bg="bg-cyan-500/10"
          border="border-cyan-500/20"
        />
        <SummaryCard 
          title="Subscription Revenue" 
          value="$8,500.00" 
          change="+8.1%" 
          isPositive={true}
          icon={<Users className="w-6 h-6 text-purple-400" />}
          bg="bg-purple-500/10"
          border="border-purple-500/20"
        />
        <SummaryCard 
          title="Available Balance" 
          value="$3,450.00" 
          icon={<Wallet className="w-6 h-6 text-yellow-400" />}
          bg="bg-yellow-500/10"
          border="border-yellow-500/20"
          highlight
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Subscription Deep-Dive */}
        <div className="lg:col-span-2 bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-2xl p-6 shadow-xl">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <Activity className="w-5 h-5 text-cyan-400" /> Subscription Deep-Dive
            </h3>
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-2">
                <span className="text-slate-400">Active Subs:</span>
                <span className="text-white font-bold text-lg">900</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-slate-400">Churn Rate:</span>
                <span className="text-red-400 font-bold">2.4%</span>
              </div>
            </div>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={tierData} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" horizontal={false} />
                <XAxis type="number" stroke="#64748b" />
                <YAxis dataKey="name" type="category" stroke="#94a3b8" width={100} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', color: '#f8fafc' }}
                  itemStyle={{ color: '#f8fafc' }}
                  cursor={{ fill: '#1e293b', opacity: 0.4 }}
                />
                <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={32}>
                  {tierData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Withdrawal Module */}
        <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <Wallet className="w-5 h-5 text-yellow-400" /> Finance
            </h3>
          </div>

          <div className="bg-slate-950/50 rounded-xl p-6 border border-slate-800 mb-6 text-center">
            <p className="text-slate-400 text-sm mb-1">Available for Withdrawal</p>
            <h4 className="text-4xl font-extrabold text-white mb-6">$3,450.00</h4>
            <button className="w-full py-3 rounded-xl bg-yellow-500 hover:bg-yellow-400 text-black font-bold text-lg shadow-[0_0_20px_rgba(234,179,8,0.3)] transition-all hover:scale-[1.02] active:scale-[0.98]">
              Withdraw Funds
            </button>
          </div>

          <div className="flex-1 overflow-hidden">
            <h4 className="text-sm font-semibold text-slate-300 uppercase tracking-wider mb-3">Recent Withdrawals</h4>
            <div className="space-y-3">
              {withdrawals.map((wd) => (
                <div key={wd.id} className="flex items-center justify-between p-3 rounded-lg bg-slate-950 border border-slate-800">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-full bg-slate-900 border border-slate-800">
                      {wd.status === 'Completed' ? <CheckCircle className="w-4 h-4 text-emerald-500" /> : <Clock className="w-4 h-4 text-yellow-500" />}
                    </div>
                    <div>
                      <p className="text-white font-medium">${wd.amount.toLocaleString()}</p>
                      <p className="text-xs text-slate-500">{wd.date}</p>
                    </div>
                  </div>
                  <span className={`text-xs font-bold px-2 py-1 rounded-full ${wd.status === 'Completed' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-yellow-500/10 text-yellow-400'}`}>
                    {wd.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Transaction Log */}
      <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-2xl p-6 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <h3 className="text-xl font-bold text-white">Transaction Log</h3>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <select 
                value={filterType}
                onChange={(e) => setFilterType(e.target.value as any)}
                className="pl-9 pr-4 py-2 bg-slate-950 border border-slate-800 rounded-lg text-sm text-white focus:outline-none focus:border-cyan-500 appearance-none cursor-pointer"
              >
                <option value="All">All Types</option>
                <option value="Subscription">Subscriptions</option>
                <option value="Marketplace Fee">Marketplace Fees</option>
              </select>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 text-xs uppercase tracking-wider">
                <th className="py-4 px-4 font-semibold">Date</th>
                <th className="py-4 px-4 font-semibold">User</th>
                <th className="py-4 px-4 font-semibold">Type</th>
                <th className="py-4 px-4 font-semibold">Plan / Item</th>
                <th className="py-4 px-4 font-semibold">Amount</th>
                <th className="py-4 px-4 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody className="text-sm text-slate-300">
              {filteredTransactions.map((tx) => (
                <tr key={tx.id} className="border-b border-slate-800/50 hover:bg-slate-800/30 transition-colors">
                  <td className="py-4 px-4">{tx.date}</td>
                  <td className="py-4 px-4 font-medium text-white">{tx.user}</td>
                  <td className="py-4 px-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      tx.type === 'Subscription' ? 'bg-purple-500/10 text-purple-400 border border-purple-500/20' : 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20'
                    }`}>
                      {tx.type}
                    </span>
                  </td>
                  <td className="py-4 px-4">{tx.planOrItem}</td>
                  <td className="py-4 px-4 font-bold text-white">${tx.amount.toFixed(2)}</td>
                  <td className="py-4 px-4">
                    <span className="inline-flex items-center gap-1.5 text-emerald-400">
                      <CheckCircle className="w-3.5 h-3.5" /> {tx.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* SQL Queries Documentation (Hidden in UI, visible in code) */}
      {/* 
        -- SQL Queries for Cloudflare D1 --

        -- 1. Total Revenue (MTD)
        SELECT SUM(amount) as total_revenue FROM payments WHERE status = 'completed' AND created_at >= date('now', 'start of month');

        -- 2. Transaction Fees (MTD)
        SELECT SUM(fee_amount) as total_fees FROM payments WHERE type = 'marketplace_sale' AND status = 'completed' AND created_at >= date('now', 'start of month');

        -- 3. Subscription Revenue (MTD)
        SELECT SUM(amount) as sub_revenue FROM payments WHERE type = 'subscription' AND status = 'completed' AND created_at >= date('now', 'start of month');

        -- 4. Available for Withdrawal
        SELECT balance FROM wallets WHERE user_id = 'admin_wallet_id';

        -- 5. Active Subscriber Count
        SELECT COUNT(*) as active_subs FROM subscriptions WHERE status = 'active';

        -- 6. Tier Breakdown
        SELECT plan_id, COUNT(*) as count FROM subscriptions WHERE status = 'active' GROUP BY plan_id;

        -- 7. Churn Rate (This Month)
        SELECT COUNT(*) as churned FROM subscriptions WHERE status = 'cancelled' AND updated_at >= date('now', 'start of month');
      */}
    </div>
  );
}

const SummaryCard = ({ title, value, change, isPositive, icon, bg, border, highlight }: any) => (
  <div className={`p-6 rounded-xl border ${border} ${bg} backdrop-blur-sm relative overflow-hidden transition-all hover:scale-[1.02] ${highlight ? 'ring-2 ring-yellow-500/50 shadow-[0_0_20px_rgba(234,179,8,0.2)]' : ''}`}>
    <div className="flex items-center justify-between mb-4">
      <span className={`font-medium ${highlight ? 'text-yellow-200' : 'text-slate-400'}`}>{title}</span>
      <div className={`p-2 rounded-lg ${highlight ? 'bg-yellow-500/20' : 'bg-slate-950/30'}`}>
        {icon}
      </div>
    </div>
    <div className="flex items-end justify-between">
      <div className={`text-3xl font-bold ${highlight ? 'text-yellow-400' : 'text-white'}`}>{value}</div>
      {change && (
        <div className={`flex items-center text-sm font-bold ${isPositive ? 'text-emerald-400' : 'text-red-400'}`}>
          {isPositive ? <ArrowUpRight className="w-4 h-4 mr-1" /> : <ArrowDownRight className="w-4 h-4 mr-1" />}
          {change}
        </div>
      )}
    </div>
  </div>
);
