import React, { useState } from 'react';
import { X, User, Shield, Zap, Lock, Key, Award, Mail, Calendar } from 'lucide-react';

interface UserDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: any; // In a real app, use a proper User type
}

export default function UserDetailModal({ isOpen, onClose, user }: UserDetailModalProps) {
  if (!isOpen || !user) return null;

  const [activeTab, setActiveTab] = useState<'overview' | 'security' | 'billing'>('overview');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-6 border-b border-slate-800 flex items-center justify-between bg-slate-950">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-slate-800 overflow-hidden border border-slate-700">
              <img src={`https://picsum.photos/seed/${user.username}/200/200`} alt={user.username} className="w-full h-full object-cover" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                {user.username}
                <span className="text-xs bg-cyan-500/10 text-cyan-400 px-2 py-0.5 rounded border border-cyan-500/20 uppercase tracking-wider font-bold">
                  {user.role}
                </span>
              </h3>
              <p className="text-slate-400 text-sm font-mono">{user.id}</p>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-slate-800 bg-slate-900/50">
          <button 
            onClick={() => setActiveTab('overview')}
            className={`flex-1 py-3 text-sm font-medium border-b-2 transition-colors ${activeTab === 'overview' ? 'border-cyan-500 text-cyan-400' : 'border-transparent text-slate-400 hover:text-white'}`}
          >
            Overview
          </button>
          <button 
            onClick={() => setActiveTab('security')}
            className={`flex-1 py-3 text-sm font-medium border-b-2 transition-colors ${activeTab === 'security' ? 'border-cyan-500 text-cyan-400' : 'border-transparent text-slate-400 hover:text-white'}`}
          >
            Security & Access
          </button>
          <button 
            onClick={() => setActiveTab('billing')}
            className={`flex-1 py-3 text-sm font-medium border-b-2 transition-colors ${activeTab === 'billing' ? 'border-cyan-500 text-cyan-400' : 'border-transparent text-slate-400 hover:text-white'}`}
          >
            Billing & Subs
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto flex-1 bg-slate-900">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                  <div className="flex items-center gap-2 text-slate-400 mb-1 text-sm">
                    <Mail className="w-4 h-4" /> Email Address
                  </div>
                  <div className="text-white font-medium">{user.email}</div>
                </div>
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                  <div className="flex items-center gap-2 text-slate-400 mb-1 text-sm">
                    <Calendar className="w-4 h-4" /> Joined Date
                  </div>
                  <div className="text-white font-medium">Oct 24, 2024</div>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-3">Account Status</h4>
                <div className="bg-slate-950 rounded-xl border border-slate-800 p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${user.status === 'Active' ? 'bg-emerald-500' : 'bg-red-500'}`}></div>
                    <span className="text-white font-medium">{user.status}</span>
                  </div>
                  <button className="text-sm text-red-400 hover:text-red-300 font-medium underline decoration-red-400/30 underline-offset-4">
                    Suspend User
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="space-y-6">
              <div className="bg-slate-950 border border-slate-800 rounded-xl p-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-slate-900 rounded-lg border border-slate-800">
                    <Key className="w-6 h-6 text-yellow-400" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-white font-bold text-lg mb-1">Password Reset</h4>
                    <p className="text-slate-400 text-sm mb-4">Send a password reset email to the user.</p>
                    <button className="bg-slate-800 hover:bg-slate-700 text-white px-4 py-2 rounded-lg text-sm font-bold border border-slate-700 transition-colors">
                      Send Reset Link
                    </button>
                  </div>
                </div>
              </div>

              <div className="bg-slate-950 border border-slate-800 rounded-xl p-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-slate-900 rounded-lg border border-slate-800">
                    <Shield className="w-6 h-6 text-red-400" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-white font-bold text-lg mb-1">Force 2FA</h4>
                    <p className="text-slate-400 text-sm mb-4">Require Two-Factor Authentication on next login.</p>
                    <button className="bg-red-500/10 hover:bg-red-500/20 text-red-400 px-4 py-2 rounded-lg text-sm font-bold border border-red-500/20 transition-colors">
                      Enable Enforcement
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'billing' && (
            <div className="space-y-6">
              <div className="bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 rounded-xl p-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10">
                  <Award className="w-32 h-32 text-yellow-400" />
                </div>
                <h4 className="text-slate-400 text-sm uppercase tracking-wider mb-2">Current Plan</h4>
                <div className="text-3xl font-bold text-white mb-1">{user.subscription}</div>
                <div className="text-emerald-400 text-sm font-medium mb-6">Active • Renews on Nov 24, 2026</div>

                <div className="flex gap-3">
                  <button className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-black py-2 rounded-lg font-bold text-sm transition-colors shadow-[0_0_15px_rgba(234,179,8,0.2)]">
                    Upgrade to Elite ($19.99)
                  </button>
                  <button className="flex-1 bg-slate-800 hover:bg-slate-700 text-white py-2 rounded-lg font-bold text-sm border border-slate-700 transition-colors">
                    Cancel Subscription
                  </button>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-3">Payment Methods</h4>
                <div className="bg-slate-950 rounded-xl border border-slate-800 p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-6 bg-slate-800 rounded border border-slate-700 flex items-center justify-center">
                      <span className="text-[10px] font-bold text-slate-400">VISA</span>
                    </div>
                    <span className="text-white font-mono text-sm">•••• 4242</span>
                  </div>
                  <span className="text-xs text-slate-500">Expires 12/28</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-950 flex justify-end gap-3">
          <button onClick={onClose} className="px-4 py-2 text-slate-400 hover:text-white transition-colors text-sm font-medium">
            Close
          </button>
          <button className="px-6 py-2 bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg font-bold text-sm shadow-[0_0_10px_rgba(34,211,238,0.3)] transition-colors">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
