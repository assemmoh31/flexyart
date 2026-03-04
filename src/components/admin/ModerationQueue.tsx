import React, { useState } from 'react';
import { CheckCircle, XCircle, AlertTriangle, Search } from 'lucide-react';

// Mock Data
const pendingArtworks = [
  {
    id: 101,
    title: "Neon Samurai 2077",
    creator: "CyberArtist_X",
    preview: "https://picsum.photos/seed/admin1/300/200",
    submitted: "2 hours ago",
    tags: ["Sci-Fi", "Animated"],
    price: "€15.00"
  },
  {
    id: 102,
    title: "Abstract Fluid Motion",
    creator: "FlowMaster",
    preview: "https://picsum.photos/seed/admin2/300/200",
    submitted: "5 hours ago",
    tags: ["Abstract", "Loop"],
    price: "€8.50"
  },
  {
    id: 103,
    title: "Retro Glitch Pack",
    creator: "8BitWonder",
    preview: "https://picsum.photos/seed/admin3/300/200",
    submitted: "1 day ago",
    tags: ["Retro", "Glitch"],
    price: "€12.00"
  },
  {
    id: 104,
    title: "Cyberpunk City",
    creator: "NeonDreams",
    preview: "https://picsum.photos/seed/admin4/300/200",
    submitted: "1 day ago",
    tags: ["Cyberpunk", "City"],
    price: "€20.00"
  },
  {
    id: 105,
    title: "Space Odyssey",
    creator: "StarGazer",
    preview: "https://picsum.photos/seed/admin5/300/200",
    submitted: "2 days ago",
    tags: ["Space", "Stars"],
    price: "€10.00"
  }
];

export default function ModerationQueue() {
  const [items, setItems] = useState(pendingArtworks);
  const [rejectModalOpen, setRejectModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [rejectReason, setRejectReason] = useState('');

  const handleApprove = (id: number) => {
    setItems(items.filter(item => item.id !== id));
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
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <AlertTriangle className="w-6 h-6 text-orange-500" /> Moderation Queue
          </h2>
          <p className="text-slate-400 text-sm">Review and approve pending artwork submissions.</p>
        </div>
        <div className="bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 flex items-center gap-2">
          <Search className="w-4 h-4 text-slate-500" />
          <input type="text" placeholder="Search queue..." className="bg-transparent border-none focus:outline-none text-sm text-white w-48" />
        </div>
      </div>
      
      {items.length === 0 ? (
        <div className="text-center py-12 bg-slate-900/50 rounded-xl border border-slate-800">
          <CheckCircle className="w-12 h-12 text-emerald-500 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-white">All Caught Up!</h3>
          <p className="text-slate-400">No pending artworks to review.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {items.map((item) => (
            <div key={item.id} className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden flex flex-col group hover:border-orange-500/30 transition-colors">
              <div className="h-48 bg-slate-950 relative overflow-hidden">
                <img src={item.preview} alt={item.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute top-2 right-2 bg-slate-900/80 backdrop-blur-sm text-white text-xs font-bold px-2 py-1 rounded border border-slate-700">
                  {item.price}
                </div>
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-white font-bold border border-white/30 px-4 py-2 rounded-full backdrop-blur-md">Preview</span>
                </div>
              </div>
              
              <div className="p-5 flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-bold text-white leading-tight mb-1">{item.title}</h3>
                    <p className="text-slate-400 text-sm">by <span className="text-cyan-400 hover:underline cursor-pointer">@{item.creator}</span></p>
                  </div>
                  <span className="text-[10px] text-slate-500 bg-slate-950 px-2 py-1 rounded border border-slate-800 whitespace-nowrap">{item.submitted}</span>
                </div>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {item.tags.map((tag, i) => (
                    <span key={i} className="px-2 py-1 bg-slate-950 text-slate-400 text-xs rounded border border-slate-800">{tag}</span>
                  ))}
                </div>

                <div className="mt-auto flex gap-3">
                  <button 
                    onClick={() => handleApprove(item.id)}
                    className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white py-2.5 rounded-lg font-bold transition-all flex items-center justify-center gap-2 shadow-[0_0_10px_rgba(16,185,129,0.2)]"
                  >
                    <CheckCircle className="w-4 h-4" /> Approve
                  </button>
                  <button 
                    onClick={() => openRejectModal(item)}
                    className="flex-1 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 hover:border-red-500/40 py-2.5 rounded-lg font-bold transition-all flex items-center justify-center gap-2"
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
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
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
              className="w-full h-32 bg-slate-950 border border-slate-700 rounded-lg p-3 text-white focus:border-red-500 focus:outline-none mb-6 text-sm resize-none"
            ></textarea>
            <div className="flex gap-3 justify-end">
              <button 
                onClick={() => setRejectModalOpen(false)}
                className="px-4 py-2 text-slate-400 hover:text-white transition-colors text-sm font-medium"
              >
                Cancel
              </button>
              <button 
                onClick={handleReject}
                className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-bold transition-colors text-sm shadow-[0_0_10px_rgba(239,68,68,0.3)]"
              >
                Confirm Rejection
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
