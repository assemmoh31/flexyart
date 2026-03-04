import React, { useState } from 'react';
import { CheckCircle, XCircle, FileText, User, ShieldCheck } from 'lucide-react';

// Mock Data
const mockVerifications = [
  { id: 1, user: "Artist_A", type: "Elite Seller", status: "Pending", documents: ["ID Front", "ID Back", "Tax Form"] },
  { id: 2, user: "Creator_B", type: "Pro Seller", status: "Approved", documents: ["ID Front", "Tax Form"] }
];

export default function SellerVerification() {
  const [verifications, setVerifications] = useState(mockVerifications);
  const [selectedUser, setSelectedUser] = useState(mockVerifications[0]);

  const handleAction = (action: 'approve' | 'reject') => {
    // API call
    console.log(`Action ${action} for user ${selectedUser.user}`);
  };

  return (
    <div className="flex h-[calc(100vh-120px)] gap-6">
      {/* List */}
      <div className="w-1/3 bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-xl overflow-hidden flex flex-col">
        <div className="p-4 border-b border-slate-800 bg-slate-950/50">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-500" /> Verification Requests
          </h2>
        </div>
        <div className="flex-1 overflow-y-auto p-2 space-y-2">
          {verifications.map(v => (
            <div 
              key={v.id}
              onClick={() => setSelectedUser(v)}
              className={`p-4 rounded-lg cursor-pointer transition-colors border ${selectedUser.id === v.id ? 'bg-slate-800 border-cyan-500/50' : 'bg-slate-900 border-slate-800 hover:bg-slate-800'}`}
            >
              <div className="flex justify-between items-start mb-1">
                <span className="font-bold text-white truncate w-2/3">{v.user}</span>
                <span className={`text-xs font-bold px-2 py-0.5 rounded ${v.status === 'Approved' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-yellow-500/10 text-yellow-400'}`}>{v.status}</span>
              </div>
              <p className="text-xs text-slate-400">{v.type}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Detail View */}
      <div className="flex-1 bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-xl overflow-hidden flex flex-col p-6">
        <div className="flex justify-between items-start mb-6 border-b border-slate-800 pb-4">
          <div>
            <h3 className="text-2xl font-bold text-white flex items-center gap-2">
              <User className="w-6 h-6 text-cyan-400" /> {selectedUser.user}
            </h3>
            <p className="text-sm text-slate-400 mt-1">Requesting: <span className="text-emerald-400 font-bold">{selectedUser.type}</span></p>
          </div>
          <div className="flex gap-3">
            <button 
              onClick={() => handleAction('approve')}
              className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-2 rounded-lg font-bold transition-colors flex items-center gap-2 shadow-[0_0_10px_rgba(16,185,129,0.3)]"
            >
              <CheckCircle className="w-4 h-4" /> Approve
            </button>
            <button 
              onClick={() => handleAction('reject')}
              className="bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 px-6 py-2 rounded-lg font-bold transition-colors flex items-center gap-2"
            >
              <XCircle className="w-4 h-4" /> Reject
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {selectedUser.documents.map((doc, idx) => (
            <div key={idx} className="bg-slate-950 border border-slate-800 rounded-xl p-4 flex flex-col items-center justify-center group hover:border-cyan-500/30 transition-colors cursor-pointer">
              <div className="w-16 h-16 bg-slate-900 rounded-full flex items-center justify-center mb-4 group-hover:bg-cyan-500/10 transition-colors">
                <FileText className="w-8 h-8 text-slate-500 group-hover:text-cyan-400 transition-colors" />
              </div>
              <span className="text-white font-medium mb-1">{doc}</span>
              <span className="text-xs text-slate-500">Click to view</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
