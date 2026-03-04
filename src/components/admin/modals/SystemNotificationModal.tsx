import React, { useState } from 'react';
import { X, Bell, AlertTriangle, Info, CheckCircle, Send } from 'lucide-react';

interface SystemNotificationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SystemNotificationModal({ isOpen, onClose }: SystemNotificationModalProps) {
  if (!isOpen) return null;

  const [type, setType] = useState<'info' | 'warning' | 'success'>('info');
  const [message, setMessage] = useState('');
  const [duration, setDuration] = useState('30');

  const handleSend = () => {
    // In a real app, this would send the notification to all connected clients via WebSocket
    console.log('Sending notification:', { type, message, duration });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden flex flex-col">
        <div className="p-6 border-b border-slate-800 flex items-center justify-between bg-slate-950">
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            <Bell className="w-5 h-5 text-cyan-400" />
            Broadcast System Alert
          </h3>
          <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6 bg-slate-900">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Alert Type</label>
            <div className="flex gap-3">
              <button 
                onClick={() => setType('info')}
                className={`flex-1 py-3 rounded-lg border flex items-center justify-center gap-2 transition-all ${type === 'info' ? 'bg-cyan-500/10 border-cyan-500 text-cyan-400' : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'}`}
              >
                <Info className="w-4 h-4" /> Info
              </button>
              <button 
                onClick={() => setType('warning')}
                className={`flex-1 py-3 rounded-lg border flex items-center justify-center gap-2 transition-all ${type === 'warning' ? 'bg-yellow-500/10 border-yellow-500 text-yellow-400' : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'}`}
              >
                <AlertTriangle className="w-4 h-4" /> Warning
              </button>
              <button 
                onClick={() => setType('success')}
                className={`flex-1 py-3 rounded-lg border flex items-center justify-center gap-2 transition-all ${type === 'success' ? 'bg-emerald-500/10 border-emerald-500 text-emerald-400' : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'}`}
              >
                <CheckCircle className="w-4 h-4" /> Success
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Message Content</label>
            <textarea 
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="e.g., Scheduled maintenance in 15 minutes..."
              className="w-full h-32 bg-slate-950 border border-slate-700 rounded-lg p-3 text-white focus:border-cyan-500 focus:outline-none resize-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Display Duration (Seconds)</label>
            <select 
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-3 text-white focus:border-cyan-500 focus:outline-none"
            >
              <option value="10">10 Seconds</option>
              <option value="30">30 Seconds</option>
              <option value="60">1 Minute</option>
              <option value="0">Permanent (Until Dismissed)</option>
            </select>
          </div>
        </div>

        <div className="p-4 border-t border-slate-800 bg-slate-950 flex justify-end gap-3">
          <button onClick={onClose} className="px-4 py-2 text-slate-400 hover:text-white transition-colors text-sm font-medium">
            Cancel
          </button>
          <button 
            onClick={handleSend}
            disabled={!message}
            className="px-6 py-2 bg-cyan-500 hover:bg-cyan-600 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg font-bold text-sm shadow-[0_0_10px_rgba(34,211,238,0.3)] transition-all flex items-center gap-2"
          >
            <Send className="w-4 h-4" /> Broadcast Now
          </button>
        </div>
      </div>
    </div>
  );
}
