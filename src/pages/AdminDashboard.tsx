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
  Palette,
  Calendar,
  DollarSign,
  ChevronDown,
  Briefcase,
  FileText,
  MessageSquare,
  Lock,
  Globe,
  Settings,
  Bell,
  Star,
  Tag,
  Activity,
  Shield
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer
} from 'recharts';

// Components
import RevenueDashboard from '../components/admin/RevenueDashboard';
import EventCommandCenter from '../components/admin/EventCommandCenter';
import ThemeManager from '../components/admin/ThemeManager';
import PayoutDashboard from '../components/admin/PayoutDashboard';
import FeaturedSlotManager from '../components/admin/FeaturedSlotManager';
import SiteSettings from '../components/admin/SiteSettings';
import ModerationQueue from '../components/admin/ModerationQueue';
import UserManagement from '../components/admin/UserManagement';
import SystemNotificationModal from '../components/admin/modals/SystemNotificationModal';
import CatalogControl from '../components/admin/CatalogControl';
import TransactionLogs from '../components/admin/TransactionLogs';
import DisputeCenter from '../components/admin/DisputeCenter';
import SellerVerification from '../components/admin/SellerVerification';
import SupportTickets from '../components/admin/SupportTickets';
import PromoCodeManager from '../components/admin/PromoCodeManager';
import AuditLogs from '../components/admin/AuditLogs';
import StaffPermissions from '../components/admin/StaffPermissions';

// Mock Data for Analytics (kept for the Analytics tab)
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

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('analytics');
  const [expandedCategories, setExpandedCategories] = useState<string[]>(['management', 'content', 'growth', 'system']);
  const [isNotificationModalOpen, setIsNotificationModalOpen] = useState(false);

  const toggleCategory = (category: string) => {
    setExpandedCategories(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category) 
        : [...prev, category]
    );
  };

  const renderContent = () => {
    switch (activeTab) {
      // Management & Operations
      case 'analytics': return <AnalyticsTab />;
      case 'users': return <UserManagement />;
      case 'catalog': return <CatalogControl />;
      case 'transactions': return <TransactionLogs />;
      case 'payouts': return <PayoutDashboard />;
      
      // Content & Safety
      case 'moderation': return <ModerationQueue />;
      case 'disputes': return <DisputeCenter />;
      case 'kyc': return <SellerVerification />;
      case 'tickets': return <SupportTickets />;
      
      // Growth & Marketing
      case 'seasonal': return <EventCommandCenter />;
      case 'featured': return <FeaturedSlotManager />;
      case 'themes': return <ThemeManager />;
      case 'notifications': return (
        <div className="flex flex-col items-center justify-center h-96 text-center space-y-4">
          <div className="p-4 bg-slate-900 rounded-full">
            <Bell className="w-8 h-8 text-cyan-400" />
          </div>
          <h3 className="text-xl font-bold text-white">Notification Center</h3>
          <p className="text-slate-400 max-w-md">
            Use the "Broadcast Alert" button in the top right to send system-wide notifications.
            <br />
            <span className="text-xs text-slate-500 mt-2 block">(Full history view coming soon)</span>
          </p>
          <button 
            onClick={() => setIsNotificationModalOpen(true)}
            className="mt-4 px-6 py-2 bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg font-bold transition-colors"
          >
            Send New Alert
          </button>
        </div>
      );
      case 'promos': return <PromoCodeManager />;
      
      // System Control
      case 'audit': return <AuditLogs />;
      case 'permissions': return <StaffPermissions />;
      case 'settings': return <SiteSettings />;
      
      default: return <PlaceholderPage title={activeTab} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 flex flex-col md:flex-row font-sans">
      {/* Sidebar Navigation */}
      <aside className="w-full md:w-72 bg-slate-900/50 border-r border-slate-800 flex-shrink-0 flex flex-col h-screen sticky top-0 overflow-y-auto custom-scrollbar">
        <div className="p-6 border-b border-slate-800/50">
          <h1 className="text-xl font-bold text-white flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center shadow-lg shadow-cyan-500/20">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <span className="tracking-tight">Admin<span className="text-cyan-400">Panel</span></span>
          </h1>
          <div className="mt-2 flex items-center gap-2 text-xs text-slate-500 font-mono bg-slate-950/50 py-1 px-2 rounded border border-slate-800">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
            System Operational
          </div>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-6">
          {/* Dashboard Home */}
          <SidebarItem 
            icon={<LayoutDashboard className="w-5 h-5" />} 
            label="Overview" 
            active={activeTab === 'analytics'} 
            onClick={() => setActiveTab('analytics')} 
          />

          {/* Management & Operations */}
          <div className="space-y-1">
            <CategoryHeader 
              label="Management & Ops" 
              expanded={expandedCategories.includes('management')} 
              onClick={() => toggleCategory('management')} 
            />
            {expandedCategories.includes('management') && (
              <div className="space-y-1 pl-2 animate-in slide-in-from-top-2 duration-200">
                <SidebarItem icon={<Users className="w-4 h-4" />} label="User Manager" active={activeTab === 'users'} onClick={() => setActiveTab('users')} />
                <SidebarItem icon={<Briefcase className="w-4 h-4" />} label="Catalog Control" active={activeTab === 'catalog'} onClick={() => setActiveTab('catalog')} />
                <SidebarItem icon={<FileText className="w-4 h-4" />} label="Transaction Logs" active={activeTab === 'transactions'} onClick={() => setActiveTab('transactions')} />
                <SidebarItem icon={<DollarSign className="w-4 h-4" />} label="Payout Dashboard" active={activeTab === 'payouts'} onClick={() => setActiveTab('payouts')} />
              </div>
            )}
          </div>

          {/* Content & Safety */}
          <div className="space-y-1">
            <CategoryHeader 
              label="Content & Safety" 
              expanded={expandedCategories.includes('content')} 
              onClick={() => toggleCategory('content')} 
            />
            {expandedCategories.includes('content') && (
              <div className="space-y-1 pl-2 animate-in slide-in-from-top-2 duration-200">
                <SidebarItem icon={<ShieldAlert className="w-4 h-4" />} label="Moderation Queue" active={activeTab === 'moderation'} onClick={() => setActiveTab('moderation')} badge={5} />
                <SidebarItem icon={<AlertTriangle className="w-4 h-4" />} label="Dispute Center" active={activeTab === 'disputes'} onClick={() => setActiveTab('disputes')} />
                <SidebarItem icon={<CheckCircle className="w-4 h-4" />} label="Seller Verification" active={activeTab === 'kyc'} onClick={() => setActiveTab('kyc')} />
                <SidebarItem icon={<MessageSquare className="w-4 h-4" />} label="Support Tickets" active={activeTab === 'tickets'} onClick={() => setActiveTab('tickets')} />
              </div>
            )}
          </div>

          {/* Growth & Marketing */}
          <div className="space-y-1">
            <CategoryHeader 
              label="Growth & Marketing" 
              expanded={expandedCategories.includes('growth')} 
              onClick={() => toggleCategory('growth')} 
            />
            {expandedCategories.includes('growth') && (
              <div className="space-y-1 pl-2 animate-in slide-in-from-top-2 duration-200">
                <SidebarItem icon={<Calendar className="w-4 h-4" />} label="Event Command Center" active={activeTab === 'seasonal'} onClick={() => setActiveTab('seasonal')} />
                <SidebarItem icon={<Star className="w-4 h-4" />} label="Featured Slots" active={activeTab === 'featured'} onClick={() => setActiveTab('featured')} />
                <SidebarItem icon={<Bell className="w-4 h-4" />} label="Notification Center" active={activeTab === 'notifications'} onClick={() => setIsNotificationModalOpen(true)} />
                <SidebarItem icon={<Tag className="w-4 h-4" />} label="Promo Codes" active={activeTab === 'promos'} onClick={() => setActiveTab('promos')} />
                <SidebarItem icon={<Palette className="w-4 h-4" />} label="Theme Manager" active={activeTab === 'themes'} onClick={() => setActiveTab('themes')} />
              </div>
            )}
          </div>

          {/* System Control */}
          <div className="space-y-1">
            <CategoryHeader 
              label="System Control" 
              expanded={expandedCategories.includes('system')} 
              onClick={() => toggleCategory('system')} 
            />
            {expandedCategories.includes('system') && (
              <div className="space-y-1 pl-2 animate-in slide-in-from-top-2 duration-200">
                <SidebarItem icon={<Activity className="w-4 h-4" />} label="Audit Logs" active={activeTab === 'audit'} onClick={() => setActiveTab('audit')} />
                <SidebarItem icon={<Lock className="w-4 h-4" />} label="Staff Permissions" active={activeTab === 'permissions'} onClick={() => setActiveTab('permissions')} />
                <SidebarItem icon={<Settings className="w-4 h-4" />} label="Site Settings" active={activeTab === 'settings'} onClick={() => setActiveTab('settings')} />
              </div>
            )}
          </div>
        </nav>

        <div className="p-4 border-t border-slate-800/50">
          <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-slate-900 border border-slate-800">
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-xs font-bold text-white">
              AD
            </div>
            <div className="flex-1 overflow-hidden">
              <p className="text-sm font-bold text-white truncate">Admin User</p>
              <p className="text-xs text-slate-500 truncate">Super Admin</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-8 overflow-y-auto">
        {renderContent()}
      </main>

      <SystemNotificationModal 
        isOpen={isNotificationModalOpen} 
        onClose={() => setIsNotificationModalOpen(false)} 
      />
    </div>
  );
}

const CategoryHeader = ({ label, expanded, onClick }: { label: string, expanded: boolean, onClick: () => void }) => (
  <button 
    onClick={onClick}
    className="w-full flex items-center justify-between px-4 py-2 text-xs font-bold text-slate-500 uppercase tracking-wider hover:text-slate-300 transition-colors"
  >
    {label}
    <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${expanded ? 'rotate-180' : ''}`} />
  </button>
);

const SidebarItem = ({ icon, label, active, onClick, badge }: { icon: React.ReactNode, label: string, active: boolean, onClick: () => void, badge?: number }) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all duration-200 group relative ${
      active 
        ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 shadow-[0_0_10px_rgba(34,211,238,0.1)]' 
        : 'text-slate-400 hover:bg-slate-800/50 hover:text-white border border-transparent'
    }`}
  >
    <div className={`transition-colors ${active ? 'text-cyan-400' : 'text-slate-500 group-hover:text-white'}`}>
      {icon}
    </div>
    <span className="font-medium flex-1 text-left text-sm">{label}</span>
    {badge && (
      <span className="bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full shadow-sm">
        {badge}
      </span>
    )}
    {active && <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-cyan-500 rounded-r-full shadow-[0_0_8px_rgba(34,211,238,0.5)]"></div>}
  </button>
);

const PlaceholderPage = ({ title }: { title: string }) => (
  <div className="flex flex-col items-center justify-center h-[60vh] text-center space-y-4">
    <div className="w-20 h-20 bg-slate-900 rounded-full flex items-center justify-center border border-slate-800 animate-pulse">
      <Settings className="w-10 h-10 text-slate-600" />
    </div>
    <h2 className="text-2xl font-bold text-white capitalize">{title.replace('-', ' ')}</h2>
    <p className="text-slate-400 max-w-md">
      This module is currently under development. Check back later for updates.
    </p>
  </div>
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
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Dashboard Overview</h2>
          <p className="text-slate-400 text-sm">Real-time platform metrics and performance.</p>
        </div>
        <div className="flex bg-slate-900 rounded-lg p-1 border border-slate-800">
          {(['24h', '7d', '15d', '30d'] as const).map((range) => (
            <button 
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-3 py-1 text-xs font-bold rounded-md transition-all ${timeRange === range ? 'bg-cyan-500 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}
            >
              {range}
            </button>
          ))}
        </div>
      </div>
      
      {/* Revenue Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Revenue (24h)" 
          value={`€${revenueData.last24h.toFixed(2)}`} 
          icon={<TrendingUp className="w-5 h-5 text-emerald-400" />} 
          bg="bg-emerald-500/5" 
          border="border-emerald-500/20"
        />
        <StatCard 
          title="Revenue (7d)" 
          value={`€${revenueData.last7d.toFixed(2)}`} 
          icon={<TrendingUp className="w-5 h-5 text-emerald-400" />} 
          bg="bg-emerald-500/5" 
          border="border-emerald-500/20"
        />
        <StatCard 
          title="Revenue (30d)" 
          value={`€${revenueData.last30d.toFixed(2)}`} 
          icon={<TrendingUp className="w-5 h-5 text-emerald-400" />} 
          bg="bg-emerald-500/5" 
          border="border-emerald-500/20"
        />
        <StatCard 
          title="All-Time Revenue" 
          value={`€${revenueData.allTime.toLocaleString()}`} 
          icon={<DollarSign className="w-5 h-5 text-purple-400" />} 
          bg="bg-purple-500/5" 
          border="border-purple-500/20"
        />
      </div>

      {/* Traffic Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Online Now" 
          value={trafficData.onlineNow} 
          icon={<Eye className="w-5 h-5 text-cyan-400" />} 
          bg="bg-cyan-500/5" 
          border="border-cyan-500/20"
          pulse
        />
        <StatCard 
          title="Visitors (24h)" 
          value={trafficData.visitors24h.toLocaleString()} 
          icon={<Users className="w-5 h-5 text-slate-400" />} 
          bg="bg-slate-800/30" 
          border="border-slate-700"
        />
        <StatCard 
          title="Visitors (Week)" 
          value={trafficData.visitorsWeek.toLocaleString()} 
          icon={<Users className="w-5 h-5 text-slate-400" />} 
          bg="bg-slate-800/30" 
          border="border-slate-700"
        />
        <StatCard 
          title="Visitors (Month)" 
          value={trafficData.visitorsMonth.toLocaleString()} 
          icon={<Users className="w-5 h-5 text-slate-400" />} 
          bg="bg-slate-800/30" 
          border="border-slate-700"
        />
      </div>

      {/* Sales Chart */}
      <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-xl p-6 h-[400px] shadow-xl">
        <h3 className="text-lg font-bold text-white mb-6">Sales Trend ({getRangeLabel()})</h3>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={salesDataRanges[timeRange]}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
            <XAxis dataKey="name" stroke="#64748b" tick={{fontSize: 12}} tickLine={false} axisLine={false} dy={10} />
            <YAxis stroke="#64748b" tick={{fontSize: 12}} tickLine={false} axisLine={false} dx={-10} />
            <Tooltip 
              contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', color: '#f8fafc', borderRadius: '8px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
              itemStyle={{ color: '#22d3ee' }}
              cursor={{ stroke: '#334155', strokeWidth: 1, strokeDasharray: '4 4' }}
            />
            <Line type="monotone" dataKey="sales" stroke="#22d3ee" strokeWidth={3} dot={{ r: 4, fill: '#0f172a', strokeWidth: 2 }} activeDot={{ r: 6, fill: '#22d3ee' }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

const StatCard = ({ title, value, icon, bg, border, pulse }: any) => (
  <div className={`p-6 rounded-xl border ${border} ${bg} backdrop-blur-sm relative overflow-hidden group hover:border-opacity-50 transition-all`}>
    {pulse && (
      <div className="absolute top-3 right-3 h-2 w-2 rounded-full bg-cyan-500 animate-ping"></div>
    )}
    <div className="flex items-center justify-between mb-4">
      <span className="text-slate-400 font-medium text-xs uppercase tracking-wider">{title}</span>
      <div className="p-2 rounded-lg bg-slate-950/50 border border-white/5 group-hover:scale-110 transition-transform">
        {icon}
      </div>
    </div>
    <div className="text-3xl font-bold text-white tracking-tight">{value}</div>
  </div>
);

