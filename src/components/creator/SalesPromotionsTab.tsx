import React, { useState, useEffect } from 'react';
import { 
  Tag, 
  Calendar, 
  Clock, 
  Percent, 
  CheckCircle, 
  AlertCircle,
  Image as ImageIcon,
  Zap,
  Leaf,
  Search
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

// Mock artworks for the specific sale grid
const mockArtworks = [
  { id: 1, title: "Neon City Lights", price: 15.00, image: "https://picsum.photos/seed/art1/400/400" },
  { id: 2, title: "Cyberpunk Character Pack", price: 25.00, image: "https://picsum.photos/seed/art2/400/400" },
  { id: 3, title: "Abstract Glitch Textures", price: 8.50, image: "https://picsum.photos/seed/art3/400/400" },
  { id: 4, title: "Retro Wave Backgrounds", price: 12.00, image: "https://picsum.photos/seed/art4/400/400" },
  { id: 5, title: "Synthwave Sunset", price: 18.00, image: "https://picsum.photos/seed/art5/400/400" },
  { id: 6, title: "Holographic UI Elements", price: 22.00, image: "https://picsum.photos/seed/art6/400/400" },
  { id: 7, title: "Vaporwave Statue", price: 10.00, image: "https://picsum.photos/seed/art7/400/400" },
  { id: 8, title: "Pixel Art Cityscape", price: 14.00, image: "https://picsum.photos/seed/art8/400/400" },
];

export default function SalesPromotionsTab() {
  const { activeTheme } = useTheme();
  
  // Sale Mode State
  const [saleMode, setSaleMode] = useState<'none' | 'storewide' | 'specific'>('none');
  
  // Store-wide State
  const [discountAmount, setDiscountAmount] = useState<number>(20);
  const [targetCategory, setTargetCategory] = useState('All Artworks');
  
  // Specific Artworks State
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedArtworks, setSelectedArtworks] = useState<number[]>([]);
  const itemsPerPage = 4;
  
  // Scheduling & Visuals State
  const [isScheduled, setIsScheduled] = useState(false);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [showBadge, setShowBadge] = useState(true);
  
  // Launch State
  const [isLaunching, setIsLaunching] = useState(false);
  const [launched, setLaunched] = useState(false);

  // Pagination Logic
  const filteredArtworks = mockArtworks.filter(art => art.title.toLowerCase().includes(searchQuery.toLowerCase()));
  const totalPages = Math.ceil(filteredArtworks.length / itemsPerPage);
  const paginatedArtworks = filteredArtworks.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const toggleArtworkSelection = (id: number) => {
    setSelectedArtworks(prev => prev.includes(id) ? prev.filter(aId => aId !== id) : [...prev, id]);
  };

  // Pricing Preview Logic
  const avgPrice = saleMode === 'specific' && selectedArtworks.length > 0
    ? selectedArtworks.reduce((sum, id) => sum + (mockArtworks.find(a => a.id === id)?.price || 0), 0) / selectedArtworks.length
    : 10.00;

  const originalPrice = avgPrice;
  const discountedPrice = originalPrice * (1 - (discountAmount / 100));

  const handleLaunch = () => {
    setIsLaunching(true);
    setTimeout(() => {
      setIsLaunching(false);
      setLaunched(true);
      setTimeout(() => setLaunched(false), 3000);
    }, 1500);
  };

  const getThemeColor = () => {
    switch(activeTheme) {
      case 'spring': return 'text-[#81C784]';
      case 'halloween': return 'text-[#E65100]';
      case 'summer': return 'text-cyan-400';
      case 'valentine': return 'text-pink-400';
      default: return 'text-cyan-400';
    }
  };

  const getThemeBg = () => {
    switch(activeTheme) {
      case 'spring': return 'bg-[#81C784] hover:bg-[#66BB6A]';
      case 'halloween': return 'bg-[#E65100] hover:bg-[#F57C00]';
      case 'summer': return 'bg-cyan-500 hover:bg-cyan-600';
      case 'valentine': return 'bg-pink-500 hover:bg-pink-600';
      default: return 'bg-cyan-500 hover:bg-cyan-600';
    }
  };

  const getThemeCurrency = () => {
    switch(activeTheme) {
      case 'spring': return 'Honey';
      case 'halloween': return 'Candy';
      case 'christmas': return 'Snowballs';
      case 'valentine': return 'Hearts';
      case 'lunar': return 'Coins';
      default: return 'Credits';
    }
  };

  return (
    <div className="space-y-8 max-w-4xl animate-in fade-in duration-500">
      
      {/* 1. Header & Context */}
      <div>
        <h2 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
          <Tag className={`w-8 h-8 ${getThemeColor()}`} />
          Sales & Promotions
        </h2>
        <p className="text-slate-400 text-lg">
          Boost your visibility and sales during seasonal events. Artworks on sale are <span className="text-white font-bold">3x more likely</span> to be featured in the Trending section.
        </p>
      </div>

      {/* 2. Sale Mode Selection */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Store-wide Toggle Card */}
        <div 
          onClick={() => setSaleMode(saleMode === 'storewide' ? 'none' : 'storewide')}
          className={`bg-slate-900/60 backdrop-blur-xl border rounded-2xl p-6 shadow-lg cursor-pointer transition-all ${
            saleMode === 'storewide' ? 'border-cyan-500 shadow-[0_0_15px_rgba(6,182,212,0.2)]' : 'border-slate-800 hover:border-slate-700'
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-xl font-bold text-white">Store-wide Sale</h3>
            <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
              saleMode === 'storewide' ? 'border-cyan-500 bg-cyan-500' : 'border-slate-600'
            }`}>
              {saleMode === 'storewide' && <CheckCircle className="w-4 h-4 text-slate-900" />}
            </div>
          </div>
          <p className="text-sm text-slate-400">Apply a bulk discount to all your artworks or specific categories.</p>
        </div>

        {/* Specific Artworks Toggle Card */}
        <div 
          onClick={() => setSaleMode(saleMode === 'specific' ? 'none' : 'specific')}
          className={`bg-slate-900/60 backdrop-blur-xl border rounded-2xl p-6 shadow-lg cursor-pointer transition-all ${
            saleMode === 'specific' ? 'border-cyan-500 shadow-[0_0_15px_rgba(6,182,212,0.2)]' : 'border-slate-800 hover:border-slate-700'
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-xl font-bold text-white">Specific Artworks</h3>
            <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
              saleMode === 'specific' ? 'border-cyan-500 bg-cyan-500' : 'border-slate-600'
            }`}>
              {saleMode === 'specific' && <CheckCircle className="w-4 h-4 text-slate-900" />}
            </div>
          </div>
          <p className="text-sm text-slate-400">Select individual pieces from your catalog to include in the promotion.</p>
        </div>
      </div>

      {/* Store-wide Configuration */}
      {saleMode === 'storewide' && (
        <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-2xl p-6 shadow-lg animate-in slide-in-from-top-4 duration-300">
          <h3 className="text-xl font-bold text-white mb-6">Store-wide Settings</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-bold text-slate-300 mb-2 flex items-center gap-2">
                <Percent className="w-4 h-4 text-cyan-400" /> Discount Amount (%)
              </label>
              <div className="relative">
                <input 
                  type="number" 
                  min="1" max="99"
                  value={discountAmount}
                  onChange={(e) => setDiscountAmount(Number(e.target.value) || 0)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-white text-lg font-mono focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 focus:outline-none transition-all"
                />
                <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                  <span className="text-slate-500 font-bold">%</span>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-300 mb-2">Target Category</label>
              <select 
                value={targetCategory}
                onChange={(e) => setTargetCategory(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-white focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 focus:outline-none transition-all appearance-none"
              >
                <option>All Artworks</option>
                <option>Only Animated</option>
                <option>Only Static</option>
              </select>
            </div>
          </div>

          <div className="p-4 bg-cyan-500/10 border border-cyan-500/20 rounded-xl flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-cyan-100">
              All your <span className="font-bold text-white">{targetCategory.toLowerCase()}</span> will be discounted by <span className="font-bold text-white">{discountAmount}%</span>.
            </p>
          </div>
        </div>
      )}

      {/* Specific Artworks Configuration */}
      {saleMode === 'specific' && (
        <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-2xl p-6 shadow-lg animate-in slide-in-from-top-4 duration-300">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <h3 className="text-xl font-bold text-white">Select Artworks</h3>
            <div className="relative w-full md:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input 
                type="text" 
                placeholder="Search My Art..." 
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-10 pr-4 py-2 text-white text-sm focus:border-cyan-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            {paginatedArtworks.map(art => {
              const isSelected = selectedArtworks.includes(art.id);
              return (
                <div 
                  key={art.id} 
                  onClick={() => toggleArtworkSelection(art.id)}
                  className={`relative bg-slate-950 rounded-xl overflow-hidden cursor-pointer transition-all ${
                    isSelected ? 'border-2 border-cyan-500 shadow-[0_0_15px_rgba(6,182,212,0.3)]' : 'border border-slate-800 hover:border-slate-600'
                  }`}
                >
                  <div className="absolute top-2 left-2 z-10">
                    <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${
                      isSelected ? 'bg-cyan-500 border-cyan-500' : 'bg-slate-900/80 border-slate-500'
                    }`}>
                      {isSelected && <CheckCircle className="w-3 h-3 text-slate-900" />}
                    </div>
                  </div>
                  <img src={art.image} alt={art.title} className="w-full aspect-square object-cover opacity-80" />
                  <div className="p-3">
                    <h4 className="text-white text-sm font-bold truncate">{art.title}</h4>
                    <p className="text-cyan-400 text-xs font-mono mt-1">${art.price.toFixed(2)}</p>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center gap-2 mb-6">
              {Array.from({ length: totalPages }).map((_, i) => (
                <button 
                  key={i} 
                  onClick={() => setCurrentPage(i + 1)}
                  className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold transition-colors ${
                    currentPage === i + 1 ? 'bg-cyan-500 text-slate-900' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          )}

          {/* Bulk Edit Selected Bar */}
          {selectedArtworks.length > 0 && (
            <div className="p-4 bg-cyan-900/20 border border-cyan-500/30 rounded-xl flex flex-col md:flex-row items-center justify-between gap-4 animate-in slide-in-from-bottom-2">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-cyan-400" />
                <span className="text-cyan-100 text-sm">
                  <span className="font-bold text-white">{selectedArtworks.length}</span> Artworks Selected for a <span className="font-bold text-white">{discountAmount}%</span> discount.
                </span>
              </div>
              <div className="flex items-center gap-3">
                <label className="text-sm font-bold text-slate-300">Set Discount:</label>
                <div className="relative w-24">
                  <input 
                    type="number" 
                    min="1" max="99"
                    value={discountAmount}
                    onChange={(e) => setDiscountAmount(Number(e.target.value) || 0)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg pr-6 pl-3 py-2 text-white text-sm font-mono focus:border-cyan-500 focus:outline-none"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 text-sm">%</span>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Progressive Disclosure: Only show if a Sale Mode is Active */}
      {saleMode !== 'none' && (
        <>
          {/* 3. Section 2: Automated Scheduling */}
          <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-2xl p-6 shadow-lg animate-in slide-in-from-top-4 duration-300 delay-100">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-purple-400" /> Schedule Sale
                </h3>
                <p className="text-sm text-slate-400">Automatically start and end your promotion.</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={isScheduled} 
                  onChange={(e) => setIsScheduled(e.target.checked)} 
                  className="sr-only peer" 
                />
                <div className="w-11 h-6 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-500 shadow-inner"></div>
              </label>
            </div>

            {isScheduled && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in slide-in-from-top-2 duration-200">
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Start Date & Time</label>
                  <input 
                    type="datetime-local" 
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-white text-sm focus:border-purple-500 focus:outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">End Date & Time</label>
                  <input 
                    type="datetime-local" 
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-white text-sm focus:border-purple-500 focus:outline-none transition-colors"
                  />
                </div>
                <div className="md:col-span-2 text-xs text-slate-500 flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  Prices will automatically revert to their original values once the End Date passes.
                </div>
              </div>
            )}
          </div>

          {/* 4. Section 3: Marketplace Visuals (The Preview) */}
          <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-2xl p-6 shadow-lg animate-in slide-in-from-top-4 duration-300 delay-200">
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <ImageIcon className="w-5 h-5 text-emerald-400" /> Marketplace Preview
            </h3>
            
            <div className="flex flex-col md:flex-row gap-8 items-start">
              <div className="flex-1 space-y-6">
                <label className="flex items-center gap-3 cursor-pointer group">
                  <div className="relative flex items-center justify-center">
                    <input 
                      type="checkbox" 
                      checked={showBadge}
                      onChange={(e) => setShowBadge(e.target.checked)}
                      className="peer sr-only"
                    />
                    <div className="w-6 h-6 border-2 border-slate-600 rounded bg-slate-950 peer-checked:bg-emerald-500 peer-checked:border-emerald-500 transition-colors"></div>
                    <CheckCircle className="w-4 h-4 text-white absolute opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none" />
                  </div>
                  <span className="text-slate-300 font-medium group-hover:text-white transition-colors">
                    Show '{activeTheme === 'default' ? 'Special' : activeTheme.charAt(0).toUpperCase() + activeTheme.slice(1)} Sale' Badge
                  </span>
                </label>
                
                <div className="p-4 bg-slate-950 rounded-xl border border-slate-800">
                  <p className="text-sm text-slate-400 mb-2">Pricing Display Preview:</p>
                  <div className="flex items-center gap-3 text-2xl">
                    <span className="text-slate-500 line-through decoration-red-500/50 decoration-2 font-mono">
                      ${originalPrice.toFixed(2)}
                    </span>
                    <span className="text-slate-600">→</span>
                    <span className={`font-bold font-mono ${getThemeColor()}`}>
                      ${discountedPrice.toFixed(2)}
                    </span>
                  </div>
                  {saleMode === 'specific' && selectedArtworks.length > 0 && (
                    <p className="text-xs text-slate-500 mt-2">Based on the average price of selected artworks.</p>
                  )}
                </div>
              </div>

              {/* Artwork Card Preview */}
              <div className="w-64 flex-shrink-0 bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl relative group">
                {showBadge && (
                  <div className="absolute top-3 left-3 z-10">
                    <div className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold shadow-lg backdrop-blur-md border ${
                      activeTheme === 'spring' ? 'bg-[#81C784]/20 text-[#81C784] border-[#81C784]/30' :
                      activeTheme === 'summer' ? 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30' :
                      'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
                    }`}>
                      {activeTheme === 'spring' ? <Leaf className="w-3 h-3" /> : <Tag className="w-3 h-3" />}
                      Sale
                    </div>
                  </div>
                )}
                <div className="aspect-square bg-slate-800 relative overflow-hidden">
                  <img src="https://picsum.photos/seed/preview/400/400" alt="Preview" className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent"></div>
                </div>
                <div className="p-4">
                  <h4 className="text-white font-bold truncate">Neon Dreams</h4>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-xs text-slate-500 line-through">${originalPrice.toFixed(2)}</span>
                    <span className={`text-lg font-bold ${getThemeColor()}`}>${discountedPrice.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 5. Section 4: Summary & Launch */}
          <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-2xl p-6 shadow-lg animate-in slide-in-from-top-4 duration-300 delay-300">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="space-y-3 flex-1">
                <div className="flex items-center gap-3 text-emerald-400 bg-emerald-500/10 px-4 py-2 rounded-lg border border-emerald-500/20 w-fit">
                  <Zap className="w-5 h-5" />
                  <span className="font-bold text-sm">Estimated 5,000+ impressions during the event.</span>
                </div>
                <div className="flex items-center gap-3 text-purple-400 bg-purple-500/10 px-4 py-2 rounded-lg border border-purple-500/20 w-fit">
                  <CheckCircle className="w-5 h-5" />
                  <span className="font-bold text-sm">Buyers will earn 2x {getThemeCurrency()} on all your items during this sale.</span>
                </div>
              </div>
              
              <div className="w-full md:w-auto">
                <button 
                  onClick={handleLaunch}
                  disabled={isLaunching || launched || (saleMode === 'specific' && selectedArtworks.length === 0)}
                  className={`w-full md:w-64 ${getThemeBg()} text-white px-8 py-4 rounded-xl font-bold text-lg transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(0,0,0,0.3)] disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 active:scale-95`}
                >
                  {isLaunching ? (
                    <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : launched ? (
                    <>
                      <CheckCircle className="w-6 h-6" /> Launched!
                    </>
                  ) : (
                    <>
                      <Zap className="w-6 h-6" /> LAUNCH SALE
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
