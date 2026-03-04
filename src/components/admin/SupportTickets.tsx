import React, { useState } from 'react';
import { Mail, CheckCircle, XCircle, Clock, Send, Archive, Trash2, User } from 'lucide-react';

// Mock Data
const mockTickets = [
  { id: 101, subject: "Login Issue", user: "User_X", status: "Open", priority: "High", date: "2024-03-01", messages: [
    { sender: "User_X", text: "I can't log in to my account.", time: "09:00 AM" }
  ]},
  { id: 102, subject: "Payment Failed", user: "User_Y", status: "Pending", priority: "Medium", date: "2024-03-02", messages: [
    { sender: "User_Y", text: "My payment was declined but I was charged.", time: "10:30 AM" },
    { sender: "Support", text: "We are investigating this.", time: "11:00 AM" }
  ]},
  { id: 103, subject: "Feature Request", user: "User_Z", status: "Resolved", priority: "Low", date: "2024-02-28", messages: [] }
];

export default function SupportTickets() {
  const [tickets, setTickets] = useState(mockTickets);
  const [selectedTicket, setSelectedTicket] = useState(mockTickets[0]);
  const [reply, setReply] = useState('');

  const handleStatusChange = (status: 'Open' | 'Pending' | 'Resolved') => {
    // API call
    console.log(`Status changed to ${status} for ticket ${selectedTicket.id}`);
  };

  return (
    <div className="flex h-[calc(100vh-120px)] gap-6">
      {/* Ticket List */}
      <div className="w-1/3 bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-xl overflow-hidden flex flex-col">
        <div className="p-4 border-b border-slate-800 bg-slate-950/50 flex justify-between items-center">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Mail className="w-5 h-5 text-cyan-400" /> Support Inbox
          </h2>
          <div className="flex gap-2">
            <button className="text-xs text-slate-400 hover:text-white px-2 py-1 rounded bg-slate-800">Open</button>
            <button className="text-xs text-slate-400 hover:text-white px-2 py-1 rounded bg-slate-800">Pending</button>
            <button className="text-xs text-slate-400 hover:text-white px-2 py-1 rounded bg-slate-800">Resolved</button>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto p-2 space-y-2">
          {tickets.map(ticket => (
            <div 
              key={ticket.id}
              onClick={() => setSelectedTicket(ticket)}
              className={`p-4 rounded-lg cursor-pointer transition-colors border group ${selectedTicket.id === ticket.id ? 'bg-slate-800 border-cyan-500/50' : 'bg-slate-900 border-slate-800 hover:bg-slate-800'}`}
            >
              <div className="flex justify-between items-start mb-1">
                <span className={`font-bold truncate w-2/3 ${ticket.status === 'Open' ? 'text-white' : 'text-slate-400'}`}>{ticket.subject}</span>
                <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                  ticket.priority === 'High' ? 'bg-red-500/10 text-red-400' : 
                  ticket.priority === 'Medium' ? 'bg-yellow-500/10 text-yellow-400' : 'bg-emerald-500/10 text-emerald-400'
                }`}>{ticket.priority}</span>
              </div>
              <div className="flex justify-between text-xs text-slate-500 mt-2">
                <span>{ticket.user}</span>
                <span>{ticket.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Ticket Detail */}
      <div className="flex-1 bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-slate-800 bg-slate-950/50 flex justify-between items-start">
          <div>
            <h3 className="text-2xl font-bold text-white mb-1">{selectedTicket.subject}</h3>
            <div className="flex items-center gap-3 text-sm text-slate-400">
              <span className="flex items-center gap-1"><User className="w-3 h-3" /> {selectedTicket.user}</span>
              <span>•</span>
              <span>Ticket #{selectedTicket.id}</span>
              <span>•</span>
              <span className={`px-2 py-0.5 rounded text-xs font-bold ${
                selectedTicket.status === 'Open' ? 'bg-emerald-500/10 text-emerald-400' : 
                selectedTicket.status === 'Pending' ? 'bg-yellow-500/10 text-yellow-400' : 'bg-slate-700 text-slate-300'
              }`}>{selectedTicket.status}</span>
            </div>
          </div>
          <div className="flex gap-2">
            <button 
              onClick={() => handleStatusChange('Resolved')}
              className="bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/20 px-3 py-2 rounded-lg font-bold text-sm flex items-center gap-2 transition-colors"
              title="Mark as Resolved"
            >
              <CheckCircle className="w-4 h-4" /> Resolve
            </button>
            <button 
              className="bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white border border-slate-700 px-3 py-2 rounded-lg transition-colors"
              title="Archive"
            >
              <Archive className="w-4 h-4" />
            </button>
             <button 
              className="bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 px-3 py-2 rounded-lg transition-colors"
              title="Delete"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 p-6 overflow-y-auto space-y-6 bg-slate-950/30">
          {selectedTicket.messages.map((msg, idx) => (
            <div key={idx} className={`flex flex-col ${msg.sender === selectedTicket.user ? 'items-start' : 'items-end'}`}>
              <div className={`max-w-[80%] p-4 rounded-xl shadow-sm ${msg.sender === selectedTicket.user ? 'bg-slate-800 text-slate-200 rounded-tl-none' : 'bg-cyan-900/20 text-cyan-100 border border-cyan-500/20 rounded-tr-none'}`}>
                <p className="text-sm leading-relaxed">{msg.text}</p>
              </div>
              <span className="text-[10px] text-slate-500 mt-1 px-1">{msg.sender} • {msg.time}</span>
            </div>
          ))}
        </div>

        {/* Reply Box */}
        <div className="p-4 border-t border-slate-800 bg-slate-900 flex gap-3 items-end">
          <textarea 
            value={reply}
            onChange={(e) => setReply(e.target.value)}
            placeholder="Type your reply..."
            className="flex-1 bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-white focus:border-cyan-500 focus:outline-none min-h-[80px] resize-none"
          />
          <button className="bg-cyan-500 hover:bg-cyan-600 text-white p-3 rounded-lg transition-colors mb-1 shadow-[0_0_15px_rgba(6,182,212,0.4)]">
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
