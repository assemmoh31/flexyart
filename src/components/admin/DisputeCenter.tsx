import React, { useState } from 'react';
import { MessageSquare, CheckCircle, XCircle, AlertTriangle, Send } from 'lucide-react';

// Mock Data
const mockDisputes = [
  { id: 1, buyer: "User_A", seller: "Artist_B", item: "Neon City #42", reason: "Item not as described", status: "Open", messages: [
    { sender: "User_A", text: "The colors are completely different from the preview.", time: "10:00 AM" },
    { sender: "Artist_B", text: "It's a digital download, colors depend on your screen calibration.", time: "10:15 AM" }
  ]},
  { id: 2, buyer: "User_C", seller: "Artist_D", item: "Space Dust", reason: "Copyright Infringement", status: "Pending", messages: [] }
];

export default function DisputeCenter() {
  const [selectedDispute, setSelectedDispute] = useState(mockDisputes[0]);
  const [reply, setReply] = useState('');

  const handleDecision = (decision: 'refund' | 'release') => {
    // API call here
    console.log(`Decision for dispute ${selectedDispute.id}: ${decision}`);
  };

  return (
    <div className="flex h-[calc(100vh-120px)] gap-6">
      {/* Dispute List */}
      <div className="w-1/3 bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-xl overflow-hidden flex flex-col">
        <div className="p-4 border-b border-slate-800 bg-slate-950/50">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-orange-500" /> Open Disputes
          </h2>
        </div>
        <div className="flex-1 overflow-y-auto p-2 space-y-2">
          {mockDisputes.map(dispute => (
            <div 
              key={dispute.id}
              onClick={() => setSelectedDispute(dispute)}
              className={`p-4 rounded-lg cursor-pointer transition-colors border ${selectedDispute.id === dispute.id ? 'bg-slate-800 border-cyan-500/50' : 'bg-slate-900 border-slate-800 hover:bg-slate-800'}`}
            >
              <div className="flex justify-between items-start mb-1">
                <span className="font-bold text-white truncate w-2/3">{dispute.item}</span>
                <span className="text-xs text-slate-500">{dispute.status}</span>
              </div>
              <p className="text-xs text-slate-400 mb-2">Reason: {dispute.reason}</p>
              <div className="flex justify-between text-xs text-slate-500">
                <span>{dispute.buyer} vs {dispute.seller}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat & Decision Panel */}
      <div className="flex-1 bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-xl overflow-hidden flex flex-col">
        {/* Chat Header */}
        <div className="p-4 border-b border-slate-800 bg-slate-950/50 flex justify-between items-center">
          <div>
            <h3 className="text-xl font-bold text-white">{selectedDispute.item}</h3>
            <p className="text-sm text-slate-400">Dispute ID: #{selectedDispute.id}</p>
          </div>
          <div className="flex gap-2">
            <button 
              onClick={() => handleDecision('refund')}
              className="bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 px-4 py-2 rounded-lg font-bold text-sm flex items-center gap-2 transition-colors"
            >
              <XCircle className="w-4 h-4" /> Refund Buyer
            </button>
            <button 
              onClick={() => handleDecision('release')}
              className="bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/20 px-4 py-2 rounded-lg font-bold text-sm flex items-center gap-2 transition-colors"
            >
              <CheckCircle className="w-4 h-4" /> Release Funds
            </button>
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 p-6 overflow-y-auto space-y-4 bg-slate-950/30">
          {selectedDispute.messages.map((msg, idx) => (
            <div key={idx} className={`flex flex-col ${msg.sender === selectedDispute.buyer ? 'items-start' : 'items-end'}`}>
              <div className={`max-w-[70%] p-3 rounded-xl ${msg.sender === selectedDispute.buyer ? 'bg-slate-800 text-slate-200 rounded-tl-none' : 'bg-cyan-900/20 text-cyan-100 border border-cyan-500/20 rounded-tr-none'}`}>
                <p className="text-sm">{msg.text}</p>
              </div>
              <span className="text-[10px] text-slate-500 mt-1 px-1">{msg.sender} • {msg.time}</span>
            </div>
          ))}
        </div>

        {/* Admin Input */}
        <div className="p-4 border-t border-slate-800 bg-slate-900 flex gap-2">
          <input 
            type="text" 
            value={reply}
            onChange={(e) => setReply(e.target.value)}
            placeholder="Type an admin note or message to both parties..."
            className="flex-1 bg-slate-950 border border-slate-800 rounded-lg px-4 py-2 text-white focus:border-cyan-500 focus:outline-none"
          />
          <button className="bg-cyan-500 hover:bg-cyan-600 text-white p-2 rounded-lg transition-colors">
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
