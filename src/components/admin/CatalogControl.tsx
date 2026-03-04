import React, { useState } from 'react';
import { Search, Filter, Eye, EyeOff, Edit, Tag, MoreVertical, Image as ImageIcon } from 'lucide-react';

// Mock Data
const mockInventory = Array.from({ length: 10 }).map((_, i) => ({
  id: `art_${100 + i}`,
  title: ['Neon City', 'Abstract Flow', 'Cyber Samurai', 'Retro Wave', 'Space Dust'][i % 5] + ` #${i + 1}`,
  creator: ['NeonDreams', 'FlowMaster', 'CyberArtist_X'][i % 3],
  category: ['Sci-Fi', 'Abstract', 'Retro', 'Space'][i % 4],
  price: (Math.random() * 50 + 5).toFixed(2),
  status: i % 5 === 0 ? 'Hidden' : 'Active',
  image: `https://picsum.photos/seed/art_${100 + i}/100/100`
}));

export default function CatalogControl() {
  const [inventory, setInventory] = useState(mockInventory);
  const [searchQuery, setSearchQuery] = useState('');

  const toggleStatus = (id: string) => {
    setInventory(inventory.map(item => 
      item.id === id ? { ...item, status: item.status === 'Active' ? 'Hidden' : 'Active' } : item
    ));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <Tag className="w-6 h-6 text-cyan-400" /> Catalog & Inventory
          </h2>
          <p className="text-slate-400 text-sm">Manage global artwork visibility and categorization.</p>
        </div>
        <div className="flex gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input 
              type="text" 
              placeholder="Search catalog..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-slate-900 border border-slate-800 rounded-lg pl-10 pr-4 py-2 text-white focus:border-cyan-500 focus:outline-none w-64"
            />
          </div>
          <button className="bg-slate-800 hover:bg-slate-700 text-white px-4 py-2 rounded-lg border border-slate-700 flex items-center gap-2">
            <Filter className="w-4 h-4" /> Filter
          </button>
        </div>
      </div>

      <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-xl overflow-hidden shadow-xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-6">
          {inventory.filter(i => i.title.toLowerCase().includes(searchQuery.toLowerCase())).map((item) => (
            <div key={item.id} className="bg-slate-950 border border-slate-800 rounded-xl overflow-hidden group hover:border-cyan-500/30 transition-all">
              <div className="relative h-40 bg-slate-900">
                <img src={item.image} alt={item.title} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                <div className="absolute top-2 right-2">
                  <span className={`px-2 py-1 rounded text-xs font-bold ${item.status === 'Active' ? 'bg-emerald-500/90 text-white' : 'bg-slate-700/90 text-slate-300'}`}>
                    {item.status}
                  </span>
                </div>
              </div>
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-white font-bold truncate pr-2">{item.title}</h3>
                  <button className="text-slate-500 hover:text-white">
                    <MoreVertical className="w-4 h-4" />
                  </button>
                </div>
                <p className="text-slate-400 text-xs mb-3">by <span className="text-cyan-400">@{item.creator}</span></p>
                
                <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-800">
                  <span className="text-white font-mono font-bold">€{item.price}</span>
                  <div className="flex gap-2">
                    <button className="p-2 bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-cyan-400 rounded-lg border border-slate-800 transition-colors" title="Edit Category">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => toggleStatus(item.id)}
                      className={`p-2 rounded-lg border transition-colors ${item.status === 'Active' ? 'bg-slate-900 hover:bg-red-500/10 text-slate-400 hover:text-red-400 border-slate-800' : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'}`}
                      title={item.status === 'Active' ? "Hide from Store" : "Show in Store"}
                    >
                      {item.status === 'Active' ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
