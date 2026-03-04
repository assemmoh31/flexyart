import React, { useState } from 'react';
import { Search, Ban, Zap, Award, User, Mail, Calendar, CheckCircle, XCircle, MoreVertical } from 'lucide-react';
import CreatorBadge from '../CreatorBadge';
import UserDetailModal from './modals/UserDetailModal';

// Mock Data
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

export default function UserManagement() {
  const [searchQuery, setSearchQuery] = useState('');
  const [user, setUser] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
      <div>
        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
          <User className="w-6 h-6 text-cyan-400" /> User & Creator Manager
        </h2>
        <p className="text-slate-400 text-sm">Search, edit, and manage user accounts and permissions.</p>
      </div>
      
      <form onSubmit={handleSearch} className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-500" />
          <input 
            type="text" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by Username, Email, or SteamID..." 
            className="w-full rounded-lg border border-slate-700 bg-slate-900 py-3 pl-10 pr-4 text-white focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500 transition-colors shadow-lg"
          />
        </div>
        <button type="submit" className="bg-cyan-500 hover:bg-cyan-600 text-white px-6 py-3 rounded-lg font-bold transition-all shadow-[0_0_15px_rgba(34,211,238,0.3)]">
          Search Database
        </button>
      </form>

      {user ? (
        <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-xl p-6 animate-in fade-in slide-in-from-bottom-4 duration-300 shadow-2xl">
          <div className="flex items-start justify-between mb-8">
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 bg-slate-800 rounded-full overflow-hidden border-2 border-slate-700 shadow-lg">
                <img src={`https://picsum.photos/seed/${user.username}/200/200`} alt={user.username} className="w-full h-full object-cover" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white flex items-center gap-3">
                  {user.username}
                  <span className="text-xs bg-cyan-500/10 text-cyan-400 px-2 py-0.5 rounded border border-cyan-500/20 uppercase tracking-wider font-bold shadow-[0_0_10px_rgba(34,211,238,0.1)]">
                    {user.role}
                  </span>
                </h3>
                <p className="text-slate-400 text-sm font-mono mt-1 flex items-center gap-2">
                  <span className="opacity-50">ID:</span> {user.steamId}
                </p>
                <p className="text-slate-400 text-sm mt-0.5 flex items-center gap-2">
                  <span className="opacity-50">Email:</span> {user.email}
                </p>
              </div>
            </div>
            <div className="flex flex-col items-end gap-2">
              <span className={`px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5 ${user.status === 'Active' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'}`}>
                {user.status === 'Active' ? <CheckCircle className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
                {user.status}
              </span>
              <button 
                onClick={() => setIsModalOpen(true)}
                className="text-sm text-cyan-400 hover:text-cyan-300 font-medium underline decoration-cyan-400/30 underline-offset-4 transition-colors"
              >
                View Full Profile
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-slate-950/50 p-5 rounded-xl border border-slate-800 hover:border-slate-700 transition-colors">
              <p className="text-slate-400 text-xs uppercase tracking-wider mb-2 font-bold">Total Revenue</p>
              <p className="text-2xl font-bold text-white">€{user.totalRevenue.toFixed(2)}</p>
            </div>
            <div className="bg-slate-950/50 p-5 rounded-xl border border-slate-800 hover:border-slate-700 transition-colors">
              <p className="text-slate-400 text-xs uppercase tracking-wider mb-2 font-bold">Creator Level</p>
              <div className="flex items-center gap-3">
                <CreatorBadge totalRevenue={user.totalRevenue} size="sm" />
                <span className="text-2xl font-bold text-white">Level {user.level}</span>
              </div>
            </div>
            <div className="bg-slate-950/50 p-5 rounded-xl border border-slate-800 hover:border-slate-700 transition-colors">
              <p className="text-slate-400 text-xs uppercase tracking-wider mb-2 font-bold">Subscription</p>
              <p className="text-2xl font-bold text-white">{user.subscription}</p>
            </div>
          </div>

          <div className="border-t border-slate-800 pt-6">
            <h4 className="text-sm font-bold text-slate-300 uppercase tracking-wider mb-4">Quick Actions</h4>
            <div className="flex flex-wrap gap-4">
              <button className="px-4 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 rounded-lg font-bold text-sm transition-colors flex items-center gap-2">
                <Ban className="w-4 h-4" /> Ban User
              </button>
              <button className="px-4 py-2 bg-purple-500/10 hover:bg-purple-500/20 text-purple-400 border border-purple-500/20 rounded-lg font-bold text-sm transition-colors flex items-center gap-2">
                <Zap className="w-4 h-4" /> Grant Pro Sub
              </button>
              <button className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 rounded-lg font-bold text-sm transition-colors flex items-center gap-2">
                <Award className="w-4 h-4" /> Adjust Level
              </button>
            </div>
          </div>
        </div>
      ) : searchQuery && (
        <div className="text-center py-16 bg-slate-900/30 rounded-xl border border-slate-800 border-dashed">
          <Search className="w-12 h-12 text-slate-600 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-white mb-2">No User Found</h3>
          <p className="text-slate-400 max-w-md mx-auto">
            We couldn't find any user matching "{searchQuery}". Try searching for "NeonDreams" to see a result.
          </p>
        </div>
      )}

      <UserDetailModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        user={user} 
      />
    </div>
  );
}
