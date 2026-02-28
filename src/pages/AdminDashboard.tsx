import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  ShieldAlert, 
  Users, 
  TrendingUp, 
  Eye, 
  CheckCircle, 
  XCircle, 
  Search, 
  Ban, 
  Award, 
  Zap,
  ChevronRight,
  MoreVertical,
  AlertTriangle,
  Palette
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar
} from 'recharts';
import CreatorBadge from '../components/CreatorBadge';
import ThemeManager from '../components/admin/ThemeManager';

// Mock Data for Analytics
const salesDataRanges = {
  '24h': [
    { name: '00:00', sales: 50 },
    { name: '04:00', sales: 30 },
    { name: '08:00', sales: 120 },
    { name: '12:00', sales: 250 },
    { name: '16:00', sales: 380 },
    { name: '20:00', sales: 420 },
    { name: '23:59', sales: 180 },
  ],
  '7d': [
    { name: 'Mon', sales: 800 },
    { name: 'Tue', sales: 1200 },
    { name: 'Wed', sales: 950 },
    { name: 'Thu', sales: 1400 },
    { name: 'Fri', sales: 1800 },
    { name: 'Sat', sales: 2400 },
    { name: 'Sun', sales: 2100 },
  ],
  '15d': [
    { name: '1st', sales: 900 },
    { name: '3rd', sales: 1100 },
    { name: '5th', sales: 850 },
    { name: '7th', sales: 1300 },
    { name: '9th', sales: 1600 },
    { name: '11th', sales: 1400 },
    { name: '13th', sales: 1900 },
    { name: '15th', sales: 2200 },
  ],
  '30d': [
    { name: 'Day 1', sales: 400 },
    { name: 'Day 5', sales: 300 },
    { name: 'Day 10', sales: 600 },
    { name: 'Day 15', sales: 800 },
    { name: 'Day 20', sales: 500 },
    { name: 'Day 25', sales: 900 },
    { name: 'Day 30', sales: 1200 },
  ]
};

const trafficData = {
  onlineNow: 42,
  visitors24h: 1250,
  visitorsWeek: 8400,
  visitorsMonth: 32000
};

const revenueData = {
  last24h: 350.50,
  last7d: 2100.00,
  last30d: 8500.00,
  allTime: 142000.00
};

// Mock Data for Moderation
const pendingArtworks = [
  {
    id: 101,
    title: "Neon Samurai 2077",
    creator: "CyberArtist_X",
    preview: "https://picsum.photos/seed/admin1/300/200", // Using image for preview mock
    submitted: "2 hours ago"
  },
  {
    id: 102,
    title: "Abstract Fluid Motion",
    creator: "FlowMaster",
    preview: "https://picsum.photos/seed/admin2/300/200",
    submitted: "5 hours ago"
  },
  {
    id: 103,
    title: "Retro Glitch Pack",
    creator: "8BitWonder",
    preview: "https://picsum.photos/seed/admin3/300/200",
    submitted: "1 day ago"
  }
];

// Mock Data for Users
const mockUserResult = {
  id: "u_123",
  username: "NeonDreams",
  steamId: "76561198000000000",
  email: "neon@example.com",
  role: "Creator",
  level: 3, // Elite
  totalRevenue: 1240.50,
  status: "Active",
  subscription: "Free"
};

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('analytics');

  const renderContent = () => {
    switch (activeTab) {
      case 'analytics':
        return <AnalyticsTab />;
      case 'moderation':
        return <ModerationTab />;
      case 'users':
        return <UserManagementTab />;
      case 'themes':
        return <ThemeManager />;
      default:
        return <AnalyticsTab />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 flex flex-col md:flex-row">
      {/* Sidebar Navigation */}
      <aside className="w-full md:w-64 bg-slate-900/50 border-r border-slate-800 flex-shrink-0">
        <div className="p-6">
          <h1 className="text-xl font-bold text-white flex items-center gap-2">
            <ShieldAlert className="w-6 h-6 text-red-500" />
            Admin Panel
          </h1>
        </div>
        <nav className="px-4 space-y-2">
          <SidebarItem 
            icon={<TrendingUp className="w-5 h-5" />} 
            label="Analytics" 
            active={activeTab === 'analytics'} 
            onClick={() => setActiveTab('analytics')} 
          />
          <SidebarItem 
            icon={<ShieldAlert className="w-5 h-5" />} 
            label="Moderation" 
            active={activeTab === 'moderation'} 
            onClick={() => setActiveTab('moderation')} 
            badge={pendingArtworks.length}
          />
          <SidebarItem 
            icon={<Users className="w-5 h-5" />} 
            label="User Management" 
            active={activeTab === 'users'} 
            onClick={() => setActiveTab('users')} 
          />
          <SidebarItem 
            icon={<Palette className="w-5 h-5" />} 
            label="Theme Manager" 
            active={activeTab === 'themes'} 
            onClick={() => setActiveTab('themes')} 
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

const SidebarItem = ({ icon, label, active, onClick, badge }: { icon: React.ReactNode, label: string, active: boolean, onClick: () => void, badge?: number }) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
      active 
        ? 'bg-red-500/10 text-red-400 border border-red-500/20' 
        : 'text-slate-400 hover:bg-slate-800 hover:text-white'
    }`}
  >
    {icon}
    <span className="font-medium flex-1 text-left">{label}</span>
    {badge && (
      <span className="bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
        {badge}
      </span>
    )}
    {active && <ChevronRight className="w-4 h-4" />}
  </button>
);

const AnalyticsTab = () => {
  const [timeRange, setTimeRange] = useState<'24h' | '7d' | '15d' | '30d'>('30d');

  const getRangeLabel = () => {
    switch(timeRange) {
      case '24h': return 'Last 24 Hours';
      case '7d': return 'Last 7 Days';
      case '15d': return 'Last 15 Days';
      case '30d': return 'Last 30 Days';
    }
  };

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold text-white">Dashboard Overview</h2>
      
      {/* Revenue Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Revenue (24h)" 
          value={`€${revenueData.last24h.toFixed(2)}`} 
          icon={<TrendingUp className="w-6 h-6 text-emerald-400" />} 
          bg="bg-emerald-500/10" 
          border="border-emerald-500/20"
        />
        <StatCard 
          title="Revenue (7d)" 
          value={`€${revenueData.last7d.toFixed(2)}`} 
          icon={<TrendingUp className="w-6 h-6 text-emerald-400" />} 
          bg="bg-emerald-500/10" 
          border="border-emerald-500/20"
        />
        <StatCard 
          title="Revenue (30d)" 
          value={`€${revenueData.last30d.toFixed(2)}`} 
          icon={<TrendingUp className="w-6 h-6 text-emerald-400" />} 
          bg="bg-emerald-500/10" 
          border="border-emerald-500/20"
        />
        <StatCard 
          title="All-Time Revenue" 
          value={`€${revenueData.allTime.toLocaleString()}`} 
          icon={<TrendingUp className="w-6 h-6 text-purple-400" />} 
          bg="bg-purple-500/10" 
          border="border-purple-500/20"
        />
      </div>

      {/* Traffic Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Online Now" 
          value={trafficData.onlineNow} 
          icon={<Eye className="w-6 h-6 text-cyan-400" />} 
          bg="bg-cyan-500/10" 
          border="border-cyan-500/20"
          pulse
        />
        <StatCard 
          title="Visitors (24h)" 
          value={trafficData.visitors24h.toLocaleString()} 
          icon={<Users className="w-6 h-6 text-slate-400" />} 
          bg="bg-slate-800/50" 
          border="border-slate-700"
        />
        <StatCard 
          title="Visitors (Week)" 
          value={trafficData.visitorsWeek.toLocaleString()} 
          icon={<Users className="w-6 h-6 text-slate-400" />} 
          bg="bg-slate-800/50" 
          border="border-slate-700"
        />
        <StatCard 
          title="Visitors (Month)" 
          value={trafficData.visitorsMonth.toLocaleString()} 
          icon={<Users className="w-6 h-6 text-slate-400" />} 
          bg="bg-slate-800/50" 
          border="border-slate-700"
        />
      </div>

      {/* Sales Chart */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 h-[400px]">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-white">Sales Trend ({getRangeLabel()})</h3>
          <div className="flex bg-slate-950 rounded-lg p-1 border border-slate-800">
            <button 
              onClick={() => setTimeRange('24h')}
              className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${timeRange === '24h' ? 'bg-cyan-500 text-white' : 'text-slate-400 hover:text-white'}`}
            >
              24h
            </button>
            <button 
              onClick={() => setTimeRange('7d')}
              className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${timeRange === '7d' ? 'bg-cyan-500 text-white' : 'text-slate-400 hover:text-white'}`}
            >
              7d
            </button>
            <button 
              onClick={() => setTimeRange('15d')}
              className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${timeRange === '15d' ? 'bg-cyan-500 text-white' : 'text-slate-400 hover:text-white'}`}
            >
              15d
            </button>
            <button 
              onClick={() => setTimeRange('30d')}
              className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${timeRange === '30d' ? 'bg-cyan-500 text-white' : 'text-slate-400 hover:text-white'}`}
            >
              30d
            </button>
          </div>
        </div>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={salesDataRanges[timeRange]}>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
            <XAxis dataKey="name" stroke="#94a3b8" />
            <YAxis stroke="#94a3b8" />
            <Tooltip 
              contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', color: '#f8fafc' }}
              itemStyle={{ color: '#22d3ee' }}
            />
            <Line type="monotone" dataKey="sales" stroke="#22d3ee" strokeWidth={3} activeDot={{ r: 8 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

const StatCard = ({ title, value, icon, bg, border, pulse }: any) => (
  <div className={`p-6 rounded-xl border ${border} ${bg} backdrop-blur-sm relative overflow-hidden`}>
    {pulse && (
      <div className="absolute top-2 right-2 h-2 w-2 rounded-full bg-cyan-500 animate-ping"></div>
    )}
    <div className="flex items-center justify-between mb-4">
      <span className="text-slate-400 font-medium">{title}</span>
      {icon}
    </div>
    <div className="text-3xl font-bold text-white">{value}</div>
  </div>
);

const ModerationTab = () => {
  const [items, setItems] = useState(pendingArtworks);
  const [rejectModalOpen, setRejectModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [rejectReason, setRejectReason] = useState('');

  const handleApprove = (id: number) => {
    setItems(items.filter(item => item.id !== id));
    // In a real app, this would call an API
  };

  const openRejectModal = (item: any) => {
    setSelectedItem(item);
    setRejectModalOpen(true);
  };

  const handleReject = () => {
    if (selectedItem) {
      setItems(items.filter(item => item.id !== selectedItem.id));
      setRejectModalOpen(false);
      setSelectedItem(null);
      setRejectReason('');
      // In a real app, this would call an API with the reason
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white">Moderation Queue</h2>
      
      {items.length === 0 ? (
        <div className="text-center py-12 bg-slate-900/50 rounded-xl border border-slate-800">
          <CheckCircle className="w-12 h-12 text-emerald-500 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-white">All Caught Up!</h3>
          <p className="text-slate-400">No pending artworks to review.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {items.map((item) => (
            <div key={item.id} className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex flex-col md:flex-row gap-6">
              <div className="w-full md:w-64 h-40 bg-slate-950 rounded-lg overflow-hidden border border-slate-700 relative group">
                <img src={item.preview} alt={item.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-white font-bold">Preview .WEBM</span>
                </div>
              </div>
              
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-bold text-white">{item.title}</h3>
                      <p className="text-slate-400 text-sm">by <span className="text-cyan-400">@{item.creator}</span></p>
                    </div>
                    <span className="text-xs text-slate-500 bg-slate-800 px-2 py-1 rounded">{item.submitted}</span>
                  </div>
                  
                  <div className="mt-4 flex gap-2">
                    <span className="px-2 py-1 bg-slate-800 text-slate-300 text-xs rounded border border-slate-700">Sci-Fi</span>
                    <span className="px-2 py-1 bg-slate-800 text-slate-300 text-xs rounded border border-slate-700">Animated</span>
                    <span className="px-2 py-1 bg-slate-800 text-slate-300 text-xs rounded border border-slate-700">€15.00</span>
                  </div>
                </div>

                <div className="flex gap-4 mt-6">
                  <button 
                    onClick={() => handleApprove(item.id)}
                    className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white py-2 rounded-lg font-bold transition-colors flex items-center justify-center gap-2"
                  >
                    <CheckCircle className="w-4 h-4" /> Approve
                  </button>
                  <button 
                    onClick={() => openRejectModal(item)}
                    className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg font-bold transition-colors flex items-center justify-center gap-2"
                  >
                    <XCircle className="w-4 h-4" /> Reject
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Rejection Modal */}
      {rejectModalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-xl max-w-md w-full p-6 shadow-2xl">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-red-500" />
              Reject Artwork
            </h3>
            <p className="text-slate-400 mb-4 text-sm">
              Please provide a reason for rejecting <span className="text-white font-medium">"{selectedItem?.title}"</span>. This will be sent to the creator.
            </p>
            <textarea
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              placeholder="e.g., Low resolution preview, Copyright violation..."
              className="w-full h-32 bg-slate-950 border border-slate-700 rounded-lg p-3 text-white focus:border-red-500 focus:outline-none mb-6 text-sm"
            ></textarea>
            <div className="flex gap-3 justify-end">
              <button 
                onClick={() => setRejectModalOpen(false)}
                className="px-4 py-2 text-slate-400 hover:text-white transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={handleReject}
                className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-bold transition-colors"
              >
                Confirm Rejection
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const UserManagementTab = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [user, setUser] = useState<any>(null);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.toLowerCase() === 'neondreams' || searchQuery === '76561198000000000') {
      setUser(mockUserResult);
    } else {
      setUser(null);
    }
  };

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold text-white">User Management</h2>
      
      <form onSubmit={handleSearch} className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-500" />
          <input 
            type="text" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by Username or SteamID..." 
            className="w-full rounded-lg border border-slate-700 bg-slate-900 py-3 pl-10 pr-4 text-white focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500 transition-colors"
          />
        </div>
        <button type="submit" className="bg-cyan-500 hover:bg-cyan-600 text-white px-6 py-3 rounded-lg font-bold transition-colors">
          Search
        </button>
      </form>

      {user ? (
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
          <div className="flex items-start justify-between mb-8">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-slate-800 rounded-full overflow-hidden border-2 border-slate-700">
                <img src={`https://picsum.photos/seed/${user.username}/200/200`} alt={user.username} className="w-full h-full object-cover" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  {user.username}
                  <span className="text-xs bg-slate-800 text-slate-400 px-2 py-0.5 rounded border border-slate-700">{user.role}</span>
                </h3>
                <p className="text-slate-400 text-sm font-mono">{user.steamId}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className={`px-3 py-1 rounded-full text-xs font-bold ${user.status === 'Active' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'}`}>
                {user.status}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-slate-950 p-4 rounded-lg border border-slate-800">
              <p className="text-slate-400 text-xs uppercase tracking-wider mb-1">Total Revenue</p>
              <p className="text-xl font-bold text-white">€{user.totalRevenue.toFixed(2)}</p>
            </div>
            <div className="bg-slate-950 p-4 rounded-lg border border-slate-800">
              <p className="text-slate-400 text-xs uppercase tracking-wider mb-1">Creator Level</p>
              <div className="flex items-center gap-2">
                <CreatorBadge totalRevenue={user.totalRevenue} size="sm" />
                <span className="text-xl font-bold text-white">Level {user.level}</span>
              </div>
            </div>
            <div className="bg-slate-950 p-4 rounded-lg border border-slate-800">
              <p className="text-slate-400 text-xs uppercase tracking-wider mb-1">Subscription</p>
              <p className="text-xl font-bold text-white">{user.subscription}</p>
            </div>
          </div>

          <div className="border-t border-slate-800 pt-6">
            <h4 className="text-sm font-semibold text-slate-300 uppercase tracking-wider mb-4">Admin Actions</h4>
            <div className="flex flex-wrap gap-4">
              <button className="px-4 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 rounded-lg font-medium transition-colors flex items-center gap-2">
                <Ban className="w-4 h-4" /> Ban User
              </button>
              <button className="px-4 py-2 bg-purple-500/10 hover:bg-purple-500/20 text-purple-400 border border-purple-500/20 rounded-lg font-medium transition-colors flex items-center gap-2">
                <Zap className="w-4 h-4" /> Grant Pro Sub
              </button>
              <button className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 rounded-lg font-medium transition-colors flex items-center gap-2">
                <Award className="w-4 h-4" /> Adjust Level
              </button>
            </div>
          </div>
        </div>
      ) : searchQuery && (
        <div className="text-center py-12 bg-slate-900/50 rounded-xl border border-slate-800">
          <Search className="w-12 h-12 text-slate-600 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-white">No User Found</h3>
          <p className="text-slate-400">Try searching for "NeonDreams" to see a result.</p>
        </div>
      )}
    </div>
  );
};
