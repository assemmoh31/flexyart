import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Image as ImageIcon, 
  DollarSign, 
  Wallet, 
  TrendingUp, 
  Clock, 
  CheckCircle, 
  XCircle, 
  MoreVertical, 
  Edit, 
  Trash2, 
  AlertCircle,
  ChevronRight
} from 'lucide-react';
import { Link } from 'react-router-dom';
import CreatorBadge, { getCreatorLevel, getNextLevel } from '../components/CreatorBadge';

// Mock Data
const stats = {
  totalSales: 142,
  netRevenue: 1240.50,
  withdrawable: 450.00,
  pendingApprovals: 3
};

const artworks = [
  {
    id: 1,
    title: "Neon City Lights",
    price: 15.00,
    status: "Live",
    image: "https://picsum.photos/seed/art1/100/100",
    date: "2023-10-15"
  },
  {
    id: 2,
    title: "Cyberpunk Character Pack",
    price: 25.00,
    status: "Pending",
    image: "https://picsum.photos/seed/art2/100/100",
    date: "2023-10-28"
  },
  {
    id: 3,
    title: "Abstract Glitch Textures",
    price: 8.50,
    status: "Rejected",
    reason: "Low resolution preview images.",
    image: "https://picsum.photos/seed/art3/100/100",
    date: "2023-10-01"
  },
  {
    id: 4,
    title: "Retro Wave Backgrounds",
    price: 12.00,
    status: "Live",
    image: "https://picsum.photos/seed/art4/100/100",
    date: "2023-09-20"
  }
];

const salesHistory = [
  { id: 101, date: "2023-10-30", artwork: "Neon City Lights", amount: 12.75 },
  { id: 102, date: "2023-10-29", artwork: "Retro Wave Backgrounds", amount: 10.20 },
  { id: 103, date: "2023-10-28", artwork: "Neon City Lights", amount: 12.75 },
  { id: 104, date: "2023-10-25", artwork: "Neon City Lights", amount: 12.75 },
  { id: 105, date: "2023-10-22", artwork: "Retro Wave Backgrounds", amount: 10.20 },
];

export default function CreatorStudio() {
  const [activeTab, setActiveTab] = useState('overview');

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return <OverviewTab />;
      case 'artworks':
        return <ArtworksTab />;
      case 'sales':
        return <SalesTab />;
      case 'payouts':
        return <PayoutsTab />;
      default:
        return <OverviewTab />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 flex flex-col md:flex-row">
      {/* Sidebar Navigation */}
      <aside className="w-full md:w-64 bg-slate-900/50 border-r border-slate-800 flex-shrink-0">
        <div className="p-6">
          <h1 className="text-xl font-bold text-white flex items-center gap-2">
            <LayoutDashboard className="w-6 h-6 text-cyan-400" />
            Creator Studio
          </h1>
        </div>
        <nav className="px-4 space-y-2">
          <SidebarItem 
            icon={<TrendingUp className="w-5 h-5" />} 
            label="Overview" 
            active={activeTab === 'overview'} 
            onClick={() => setActiveTab('overview')} 
          />
          <SidebarItem 
            icon={<ImageIcon className="w-5 h-5" />} 
            label="My Artworks" 
            active={activeTab === 'artworks'} 
            onClick={() => setActiveTab('artworks')} 
          />
          <SidebarItem 
            icon={<Clock className="w-5 h-5" />} 
            label="Sales History" 
            active={activeTab === 'sales'} 
            onClick={() => setActiveTab('sales')} 
          />
          <SidebarItem 
            icon={<Wallet className="w-5 h-5" />} 
            label="Payouts" 
            active={activeTab === 'payouts'} 
            onClick={() => setActiveTab('payouts')} 
          />
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-8 overflow-y-auto">
        {renderContent()}
      </main>
    </div>
  );
}

const SidebarItem = ({ icon, label, active, onClick }: { icon: React.ReactNode, label: string, active: boolean, onClick: () => void }) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
      active 
        ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20' 
        : 'text-slate-400 hover:bg-slate-800 hover:text-white'
    }`}
  >
    {icon}
    <span className="font-medium">{label}</span>
    {active && <ChevronRight className="w-4 h-4 ml-auto" />}
  </button>
);

const OverviewTab = () => {
  const currentLevel = getCreatorLevel(stats.netRevenue);
  const nextLevel = getNextLevel(stats.netRevenue);
  
  // Calculate progress percentage
  let progress = 0;
  if (nextLevel) {
    const prevThreshold = currentLevel ? (
      currentLevel.level === 1 ? 50 :
      currentLevel.level === 2 ? 250 :
      currentLevel.level === 3 ? 1000 : 1500
    ) : 0;
    
    const totalNeeded = nextLevel.threshold - prevThreshold;
    const currentProgress = stats.netRevenue - prevThreshold;
    progress = Math.min(100, Math.max(0, (currentProgress / totalNeeded) * 100));
  } else {
    progress = 100; // Max level reached
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Dashboard Overview</h2>
        {currentLevel && (
          <div className="flex items-center gap-3 bg-slate-900/50 px-4 py-2 rounded-full border border-slate-800">
            <span className="text-sm text-slate-400">Current Rank:</span>
            <div className="flex items-center gap-2">
              <CreatorBadge totalRevenue={stats.netRevenue} size="sm" />
              <span className={`text-sm font-bold ${currentLevel.color}`}>{currentLevel.name}</span>
            </div>
          </div>
        )}
      </div>
      
      {/* Level Progress Bar */}
      {nextLevel && (
        <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-24 bg-purple-500/5 rounded-full blur-3xl -mr-12 -mt-12 pointer-events-none"></div>
          
          <div className="flex items-center justify-between mb-2 relative z-10">
            <div>
              <h3 className="text-lg font-semibold text-white">Level Progress</h3>
              <p className="text-sm text-slate-400">
                Earn <span className="text-white font-medium">€{(nextLevel.threshold - stats.netRevenue).toFixed(2)}</span> more to reach <span className="text-cyan-400 font-bold">{nextLevel.name}</span> status.
              </p>
            </div>
            <div className="text-right">
              <span className="text-2xl font-bold text-white">€{stats.netRevenue.toFixed(2)}</span>
              <span className="text-sm text-slate-500"> / €{nextLevel.threshold.toFixed(2)}</span>
            </div>
          </div>
          
          <div className="h-3 w-full bg-slate-800 rounded-full overflow-hidden relative z-10">
            <div 
              className="h-full bg-gradient-to-r from-cyan-500 to-purple-500 transition-all duration-1000 ease-out relative"
              style={{ width: `${progress}%` }}
            >
              <div className="absolute inset-0 bg-white/20 animate-[shimmer_2s_infinite]" />
            </div>
          </div>
        </div>
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Total Sales" 
          value={stats.totalSales} 
          icon={<TrendingUp className="w-6 h-6 text-emerald-400" />} 
          bg="bg-emerald-500/10" 
          border="border-emerald-500/20"
        />
        <StatCard 
          title="Net Revenue" 
          value={`€${stats.netRevenue.toFixed(2)}`} 
          icon={<DollarSign className="w-6 h-6 text-cyan-400" />} 
          bg="bg-cyan-500/10" 
          border="border-cyan-500/20"
        />
        <StatCard 
          title="Withdrawable" 
          value={`€${stats.withdrawable.toFixed(2)}`} 
          icon={<Wallet className="w-6 h-6 text-purple-400" />} 
          bg="bg-purple-500/10" 
          border="border-purple-500/20"
        />
        <StatCard 
          title="Pending Approvals" 
          value={stats.pendingApprovals} 
          icon={<Clock className="w-6 h-6 text-amber-400" />} 
          bg="bg-amber-500/10" 
          border="border-amber-500/20"
        />
      </div>

      {/* Recent Activity or Quick Actions could go here */}
      <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Quick Actions</h3>
        <div className="flex gap-4">
          <Link to="/upload" className="px-4 py-2 bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg font-medium transition-colors">
            Upload New Artwork
          </Link>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ title, value, icon, bg, border }: any) => (
  <div className={`p-6 rounded-xl border ${border} ${bg} backdrop-blur-sm`}>
    <div className="flex items-center justify-between mb-4">
      <span className="text-slate-400 font-medium">{title}</span>
      {icon}
    </div>
    <div className="text-3xl font-bold text-white">{value}</div>
  </div>
);

const ArtworksTab = () => (
  <div className="space-y-6">
    <div className="flex items-center justify-between">
      <h2 className="text-2xl font-bold text-white">Manage Artworks</h2>
      <Link to="/upload" className="px-4 py-2 bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg font-medium transition-colors flex items-center gap-2">
        <ImageIcon className="w-4 h-4" /> Upload New
      </Link>
    </div>

    <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-950/50 border-b border-slate-800 text-xs uppercase text-slate-400 font-semibold tracking-wider">
              <th className="px-6 py-4">Artwork</th>
              <th className="px-6 py-4">Price</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Date</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {artworks.map((art) => (
              <tr key={art.id} className="hover:bg-slate-800/50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-4">
                    <img src={art.image} alt={art.title} className="w-12 h-12 rounded-lg object-cover bg-slate-800" />
                    <span className="font-medium text-white">{art.title}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-slate-300">€{art.price.toFixed(2)}</td>
                <td className="px-6 py-4">
                  <StatusBadge status={art.status} reason={art.reason} />
                </td>
                <td className="px-6 py-4 text-slate-400 text-sm">{art.date}</td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button className="p-2 text-slate-400 hover:text-cyan-400 transition-colors" title="Edit">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-slate-400 hover:text-red-400 transition-colors" title="Delete">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
);

const StatusBadge = ({ status, reason }: { status: string, reason?: string }) => {
  if (status === 'Live') {
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
        <CheckCircle className="w-3 h-3" /> Live
      </span>
    );
  }
  if (status === 'Pending') {
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-amber-500/10 text-amber-400 border border-amber-500/20">
        <Clock className="w-3 h-3" /> Pending
      </span>
    );
  }
  if (status === 'Rejected') {
    return (
      <div className="group relative inline-flex">
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-red-500/10 text-red-400 border border-red-500/20 cursor-help">
          <XCircle className="w-3 h-3" /> Rejected
        </span>
        {reason && (
          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-2 bg-slate-900 border border-slate-700 rounded-lg shadow-xl text-xs text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
            <span className="font-semibold text-red-400 block mb-1">Reason:</span>
            {reason}
          </div>
        )}
      </div>
    );
  }
  return null;
};

const SalesTab = () => (
  <div className="space-y-6">
    <h2 className="text-2xl font-bold text-white">Sales History</h2>
    <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-slate-950/50 border-b border-slate-800 text-xs uppercase text-slate-400 font-semibold tracking-wider">
            <th className="px-6 py-4">Date</th>
            <th className="px-6 py-4">Artwork</th>
            <th className="px-6 py-4 text-right">Net Amount</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-800">
          {salesHistory.map((sale) => (
            <tr key={sale.id} className="hover:bg-slate-800/50 transition-colors">
              <td className="px-6 py-4 text-slate-400 font-mono text-sm">{sale.date}</td>
              <td className="px-6 py-4 font-medium text-white">{sale.artwork}</td>
              <td className="px-6 py-4 text-right text-emerald-400 font-mono">+€{sale.amount.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

const PayoutsTab = () => (
  <div className="space-y-8 max-w-2xl">
    <h2 className="text-2xl font-bold text-white">Payouts</h2>
    
    <div className="bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700 rounded-2xl p-8 text-center relative overflow-hidden">
      <div className="absolute top-0 right-0 p-32 bg-cyan-500/5 rounded-full blur-3xl -mr-16 -mt-16"></div>
      
      <p className="text-slate-400 font-medium mb-2">Available Balance</p>
      <h3 className="text-5xl font-bold text-white mb-8">€{stats.withdrawable.toFixed(2)}</h3>
      
      <button className="px-8 py-3 bg-cyan-500 hover:bg-cyan-600 text-white rounded-xl font-bold text-lg shadow-lg shadow-cyan-500/20 transition-all hover:scale-105 active:scale-95">
        Request Payout
      </button>
      
      <p className="text-xs text-slate-500 mt-6 flex items-center justify-center gap-2">
        <InfoIcon className="w-4 h-4" />
        Withdrawals are processed within 3-5 business days.
      </p>
    </div>

    <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6">
      <h4 className="text-sm font-semibold text-slate-300 uppercase tracking-wider mb-4">Payout Method</h4>
      <div className="flex items-center justify-between p-4 bg-slate-950 border border-slate-800 rounded-lg">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-600/20 text-blue-500 rounded-full flex items-center justify-center">
            <span className="font-bold text-xs">PP</span>
          </div>
          <div>
            <p className="text-sm font-medium text-white">PayPal</p>
            <p className="text-xs text-slate-500">user@example.com</p>
          </div>
        </div>
        <button className="text-xs text-cyan-400 hover:text-cyan-300 font-medium">Change</button>
      </div>
    </div>
  </div>
);

const InfoIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10" />
    <path d="M12 16v-4" />
    <path d="M12 8h.01" />
  </svg>
);
