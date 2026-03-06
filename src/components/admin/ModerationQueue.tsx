import React, { useState } from 'react';
import { CheckCircle, XCircle, AlertTriangle, Search, FileText, Tag, Monitor, Palette, Download, Info, User, Gamepad2, Layers, X } from 'lucide-react';

// Mock Data
const pendingArtworks = [
  {
    id: 101,
    title: "Neon Samurai 2077",
    creator: "CyberArtist_X",
    preview: "https://picsum.photos/seed/admin1/800/600",
    submitted: "2 hours ago",
    tags: ["Sci-Fi", "Animated"],
    price: "€15.00",
    description: "A high-quality animated steam profile artwork featuring a neon samurai in a cyberpunk city. Includes both main artwork and sidebar animation.",
    productType: "Profile Artwork",
    characterName: "Kenshi",
    gameTag: "Cyberpunk 2077",
    colorTags: ["Cyan", "Magenta", "Black"],
    styleTags: ["Cyberpunk", "Neon", "Futuristic"],
    softwareUsed: "Adobe After Effects, Photoshop",
    sourceFile: "neon_samurai_project.zip (150MB)"
  },
  {
    id: 102,
    title: "Abstract Fluid Motion",
    creator: "FlowMaster",
    preview: "https://picsum.photos/seed/admin2/800/600",
    submitted: "5 hours ago",
    tags: ["Abstract", "Loop"],
    price: "€8.50",
    description: "Mesmerizing fluid simulation loop. Perfect for minimalists who want a clean look.",
    productType: "Profile Artwork",
    characterName: "N/A",
    gameTag: "General",
    colorTags: ["Blue", "Orange"],
    styleTags: ["Abstract", "Minimal", "Fluid"],
    softwareUsed: "Blender",
    sourceFile: "fluid_motion_source.rar (85MB)"
  },
  {
    id: 103,
    title: "Retro Glitch Pack",
    creator: "8BitWonder",
    preview: "https://picsum.photos/seed/admin3/800/600",
    submitted: "1 day ago",
    tags: ["Retro", "Glitch"],
    price: "€12.00",
    description: "A nostalgic trip back to the 80s with this glitch art pack. Contains 3 variations.",
    productType: "Theme Bundle",
    characterName: "Glitch Boy",
    gameTag: "Hotline Miami",
    colorTags: ["Purple", "Yellow"],
    styleTags: ["Retro", "Glitch", "VHS"],
    softwareUsed: "Photoshop",
    sourceFile: "retro_glitch_pack.zip (200MB)"
  },
  {
    id: 104,
    title: "Cyberpunk City",
    creator: "NeonDreams",
    preview: "https://picsum.photos/seed/admin4/800/600",
    submitted: "1 day ago",
    tags: ["Cyberpunk", "City"],
    price: "€20.00",
    description: "Detailed cityscape with flying cars and neon lights. Seamless loop.",
    productType: "Profile Artwork",
    characterName: "N/A",
    gameTag: "Cyberpunk 2077",
    colorTags: ["Neon Blue", "Pink"],
    styleTags: ["Cityscape", "Sci-Fi"],
    softwareUsed: "Cinema 4D, After Effects",
    sourceFile: "cyber_city_project.zip (350MB)"
  },
  {
    id: 105,
    title: "Space Odyssey",
    creator: "StarGazer",
    preview: "https://picsum.photos/seed/admin5/800/600",
    submitted: "2 days ago",
    tags: ["Space", "Stars"],
    price: "€10.00",
    description: "Deep space nebula background with twinkling stars.",
    productType: "Background",
    characterName: "N/A",
    gameTag: "Starfield",
    colorTags: ["Deep Blue", "Purple"],
    styleTags: ["Space", "Realistic"],
    softwareUsed: "Photoshop",
    sourceFile: "space_odyssey.psd (50MB)"
  }
];

export default function ModerationQueue() {
  const [items, setItems] = useState(pendingArtworks);
  const [rejectModalOpen, setRejectModalOpen] = useState(false);
  const [detailsModalOpen, setDetailsModalOpen] = useState(false);
  const [fullPreviewOpen, setFullPreviewOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [rejectReason, setRejectReason] = useState('');

  const handleApprove = (id: number, e?: React.MouseEvent) => {
    e?.stopPropagation();
    setItems(items.filter(item => item.id !== id));
    if (detailsModalOpen && selectedItem?.id === id) {
      setDetailsModalOpen(false);
      setSelectedItem(null);
    }
  };

  const openRejectModal = (item: any, e?: React.MouseEvent) => {
    e?.stopPropagation();
    setSelectedItem(item);
    setRejectModalOpen(true);
  };

  const openDetailsModal = (item: any) => {
    setSelectedItem(item);
    setDetailsModalOpen(true);
  };

  const handleReject = () => {
    if (selectedItem) {
      setItems(items.filter(item => item.id !== selectedItem.id));
      setRejectModalOpen(false);
      setDetailsModalOpen(false);
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
            <div 
              key={item.id} 
              onClick={() => openDetailsModal(item)}
              className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden flex flex-col group hover:border-cyan-500/50 transition-all cursor-pointer hover:shadow-lg hover:shadow-cyan-500/10"
            >
              <div className="h-48 bg-slate-950 relative overflow-hidden">
                <img src={item.preview} alt={item.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute top-2 right-2 bg-slate-900/80 backdrop-blur-sm text-white text-xs font-bold px-2 py-1 rounded border border-slate-700">
                  {item.price}
                </div>
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-white font-bold border border-white/30 px-4 py-2 rounded-full backdrop-blur-md flex items-center gap-2">
                    <Info className="w-4 h-4" /> View Details
                  </span>
                </div>
              </div>
              
              <div className="p-5 flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-bold text-white leading-tight mb-1 group-hover:text-cyan-400 transition-colors">{item.title}</h3>
                    <p className="text-slate-400 text-sm">by <span className="text-cyan-400 hover:underline cursor-pointer" onClick={(e) => e.stopPropagation()}>@{item.creator}</span></p>
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
                    onClick={(e) => handleApprove(item.id, e)}
                    className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white py-2.5 rounded-lg font-bold transition-all flex items-center justify-center gap-2 shadow-[0_0_10px_rgba(16,185,129,0.2)] hover:shadow-[0_0_15px_rgba(16,185,129,0.4)]"
                  >
                    <CheckCircle className="w-4 h-4" /> Approve
                  </button>
                  <button 
                    onClick={(e) => openRejectModal(item, e)}
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

      {/* Details Modal */}
      {detailsModalOpen && selectedItem && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-md flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-5xl w-full h-[90vh] flex flex-col shadow-2xl overflow-hidden">
            {/* Modal Header */}
            <div className="p-6 border-b border-slate-800 flex items-center justify-between bg-slate-900 z-10">
              <div>
                <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                  {selectedItem.title}
                  <span className="text-xs font-bold bg-cyan-500/10 text-cyan-400 px-2 py-1 rounded-full border border-cyan-500/20">
                    {selectedItem.productType}
                  </span>
                </h2>
                <p className="text-slate-400 text-sm mt-1">Submission ID: #{selectedItem.id} • Submitted {selectedItem.submitted}</p>
              </div>
              <button 
                onClick={() => setDetailsModalOpen(false)}
                className="p-2 hover:bg-slate-800 rounded-full text-slate-400 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="flex-1 overflow-y-auto p-6 grid grid-cols-1 lg:grid-cols-2 gap-8 custom-scrollbar">
              {/* Left Column: Preview */}
              <div className="space-y-6">
                <div className="rounded-xl overflow-hidden border border-slate-800 bg-slate-950 relative group">
                  <img src={selectedItem.preview} alt={selectedItem.title} className="w-full h-auto object-cover" />
                  <div className="absolute bottom-4 right-4">
                    <button 
                      onClick={() => setFullPreviewOpen(true)}
                      className="bg-black/70 backdrop-blur-md text-white px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 hover:bg-black/90 transition-colors"
                    >
                      <Monitor className="w-4 h-4" /> Full Preview
                    </button>
                  </div>
                </div>

                <div className="bg-slate-950/50 rounded-xl p-5 border border-slate-800">
                  <h3 className="text-sm font-bold text-slate-300 uppercase tracking-wider mb-4 flex items-center gap-2">
                    <FileText className="w-4 h-4 text-cyan-400" /> Description
                  </h3>
                  <p className="text-slate-300 leading-relaxed">
                    {selectedItem.description}
                  </p>
                </div>

                <div className="bg-slate-950/50 rounded-xl p-5 border border-slate-800">
                  <h3 className="text-sm font-bold text-slate-300 uppercase tracking-wider mb-4 flex items-center gap-2">
                    <Download className="w-4 h-4 text-cyan-400" /> Source Files
                  </h3>
                  <div className="flex items-center justify-between p-3 bg-slate-900 rounded-lg border border-slate-800 hover:border-slate-700 transition-colors cursor-pointer group">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-500/20 text-blue-400 rounded-lg flex items-center justify-center">
                        <FileText className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-white font-medium text-sm group-hover:text-cyan-400 transition-colors">{selectedItem.sourceFile}</p>
                        <p className="text-xs text-slate-500">Scanned • No Viruses Found</p>
                      </div>
                    </div>
                    <Download className="w-5 h-5 text-slate-500 group-hover:text-white transition-colors" />
                  </div>
                </div>
              </div>

              {/* Right Column: Metadata */}
              <div className="space-y-6">
                {/* Creator Info */}
                <div className="bg-slate-950/50 rounded-xl p-5 border border-slate-800 flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                    {selectedItem.creator.charAt(1)}
                  </div>
                  <div>
                    <h3 className="text-white font-bold">{selectedItem.creator}</h3>
                    <p className="text-slate-400 text-xs">Verified Creator • Level 5</p>
                  </div>
                  <button className="ml-auto text-xs bg-slate-900 text-slate-300 px-3 py-1.5 rounded-lg border border-slate-800 hover:text-white hover:border-slate-600 transition-colors">
                    View Profile
                  </button>
                </div>

                {/* Technical Details Grid */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-slate-950/50 rounded-xl p-4 border border-slate-800">
                    <div className="text-slate-500 text-xs uppercase tracking-wider mb-1 flex items-center gap-1.5">
                      <User className="w-3 h-3" /> Character Name
                    </div>
                    <div className="text-white font-medium">{selectedItem.characterName}</div>
                  </div>
                  <div className="bg-slate-950/50 rounded-xl p-4 border border-slate-800">
                    <div className="text-slate-500 text-xs uppercase tracking-wider mb-1 flex items-center gap-1.5">
                      <Gamepad2 className="w-3 h-3" /> Game Tag
                    </div>
                    <div className="text-white font-medium">{selectedItem.gameTag}</div>
                  </div>
                  <div className="bg-slate-950/50 rounded-xl p-4 border border-slate-800">
                    <div className="text-slate-500 text-xs uppercase tracking-wider mb-1 flex items-center gap-1.5">
                      <Layers className="w-3 h-3" /> Software Used
                    </div>
                    <div className="text-white font-medium">{selectedItem.softwareUsed}</div>
                  </div>
                  <div className="bg-slate-950/50 rounded-xl p-4 border border-slate-800">
                    <div className="text-slate-500 text-xs uppercase tracking-wider mb-1 flex items-center gap-1.5">
                      <Tag className="w-3 h-3" /> Price
                    </div>
                    <div className="text-white font-medium">{selectedItem.price}</div>
                  </div>
                </div>

                {/* Tags Section */}
                <div className="bg-slate-950/50 rounded-xl p-5 border border-slate-800 space-y-4">
                  <div>
                    <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-2">
                      <Palette className="w-3 h-3" /> Color Tags
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedItem.colorTags.map((color: string, i: number) => (
                        <span key={i} className="px-2.5 py-1 bg-slate-900 text-slate-300 text-xs rounded-md border border-slate-800 flex items-center gap-1.5">
                          <div className="w-2 h-2 rounded-full bg-current opacity-75"></div>
                          {color}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-2">
                      <Tag className="w-3 h-3" /> Style Tags
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedItem.styleTags.map((tag: string, i: number) => (
                        <span key={i} className="px-2.5 py-1 bg-slate-900 text-slate-300 text-xs rounded-md border border-slate-800">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="pt-4 mt-auto">
                  <div className="flex gap-4">
                    <button 
                      onClick={() => handleApprove(selectedItem.id)}
                      className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white py-3 rounded-xl font-bold transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20"
                    >
                      <CheckCircle className="w-5 h-5" /> Approve Submission
                    </button>
                    <button 
                      onClick={() => openRejectModal(selectedItem)}
                      className="flex-1 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 hover:border-red-500/40 py-3 rounded-xl font-bold transition-all flex items-center justify-center gap-2"
                    >
                      <XCircle className="w-5 h-5" /> Reject
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Full Preview Modal */}
      {fullPreviewOpen && selectedItem && (
        <div className="fixed inset-0 bg-black/95 backdrop-blur-xl flex items-center justify-center z-[60] p-4 animate-in fade-in duration-200" onClick={() => setFullPreviewOpen(false)}>
          <div className="relative max-w-[90vw] max-h-[90vh] flex flex-col items-center">
            <button 
              onClick={() => setFullPreviewOpen(false)}
              className="absolute -top-12 right-0 p-2 bg-slate-800 hover:bg-slate-700 rounded-full text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
            <img 
              src={selectedItem.preview} 
              alt={selectedItem.title} 
              className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl border border-slate-800"
              onClick={(e) => e.stopPropagation()} 
            />
            <div className="mt-4 flex gap-4">
              <span className="text-slate-400 text-sm">Click anywhere outside to close</span>
            </div>
          </div>
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
