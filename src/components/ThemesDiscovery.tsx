import React, { useState, useEffect, useMemo } from 'react';
import { Search, Filter, X, Check, SlidersHorizontal, LayoutTemplate, PlayCircle, Image as ImageIcon, Eye, Loader2, Star, Gamepad2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'motion/react';
import { SteamPointsIcon } from './SteamPointsIcon';

// --- Types ---
interface Theme {
  id: number;
  title: string;
  creator: string;
  price: number;
  image: string;
  rating: number;
  downloads: string;
  tags: string[];
  type: 'animated' | 'static';
  game: string;
  colors: string[];
}

// --- Mock Data ---
const themesData: Theme[] = [
  { id: 1, title: 'Neon Genesis', creator: '@CyberPunk', price: 2000, image: 'https://picsum.photos/seed/theme1/800/600', rating: 4.9, downloads: '1.2k', tags: ['Cyberpunk', 'Animated', 'Full Profile'], type: 'animated', game: 'Cyberpunk 2077', colors: ['#22d3ee', '#a855f7'] },
  { id: 2, title: 'Tranquil Zen', creator: '@NatureVibes', price: 500, image: 'https://picsum.photos/seed/theme2/800/600', rating: 4.8, downloads: '850', tags: ['Nature', 'Minimal', 'Static'], type: 'static', game: 'Stardew Valley', colors: ['#22c55e', '#facc15'] },
  { id: 3, title: 'Abyssal Depths', creator: '@DeepSea', price: 2000, image: 'https://picsum.photos/seed/theme3/800/600', rating: 5.0, downloads: '2.1k', tags: ['Dark', 'Animated', 'Premium'], type: 'animated', game: 'Subnautica', colors: ['#1e3a8a', '#000000'] },
  { id: 4, title: 'Vaporwave Dreams', creator: '@Aesthetic', price: 1000, image: 'https://picsum.photos/seed/theme4/800/600', rating: 4.7, downloads: '3.4k', tags: ['Retro', 'Animated', 'Colorful'], type: 'animated', game: 'Hotline Miami', colors: ['#ec4899', '#22d3ee'] },
  { id: 5, title: 'Crimson Samurai', creator: '@RoninArt', price: 500, image: 'https://picsum.photos/seed/theme5/800/600', rating: 4.6, downloads: '1.5k', tags: ['Anime', 'Red', 'Static'], type: 'static', game: 'Sekiro', colors: ['#ef4444', '#000000'] },
  { id: 6, title: 'Galactic Core', creator: '@SpaceExplorer', price: 2000, image: 'https://picsum.photos/seed/theme6/800/600', rating: 4.9, downloads: '4.2k', tags: ['Space', 'Animated', 'Sci-Fi'], type: 'animated', game: 'Starfield', colors: ['#3b82f6', '#6366f1'] },
  { id: 7, title: 'Elden Ring Gold', creator: '@Tarnished', price: 2000, image: 'https://picsum.photos/seed/theme7/800/600', rating: 4.9, downloads: '5.5k', tags: ['Fantasy', 'Gold', 'Animated'], type: 'animated', game: 'Elden Ring', colors: ['#eab308', '#000000'] },
  { id: 8, title: 'Pixel City', creator: '@BitMaster', price: 1000, image: 'https://picsum.photos/seed/theme8/800/600', rating: 4.5, downloads: '900', tags: ['Pixel Art', 'City', 'Static'], type: 'static', game: 'Terraria', colors: ['#6366f1', '#a855f7'] },
];

const availableColors = [
  { name: 'Red', hex: '#ef4444' },
  { name: 'Blue', hex: '#3b82f6' },
  { name: 'Green', hex: '#22c55e' },
  { name: 'Purple', hex: '#a855f7' },
  { name: 'Cyan', hex: '#22d3ee' },
  { name: 'Pink', hex: '#ec4899' },
  { name: 'Yellow', hex: '#eab308' },
  { name: 'Black', hex: '#000000' },
];

const availableTags = ['Cyberpunk', 'Nature', 'Minimal', 'Dark', 'Retro', 'Anime', 'Space', 'Fantasy', 'Pixel Art'];
const pricePoints = [500, 1000, 2000];

// --- Components ---

export default function ThemesDiscovery() {
  // --- State ---
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGame, setSelectedGame] = useState('');
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedPrices, setSelectedPrices] = useState<number[]>([]);
  const [activeTab, setActiveTab] = useState<'animated' | 'static'>('animated');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Default closed
  const [isLoading, setIsLoading] = useState(false);
  const [debouncedSearch, setDebouncedSearch] = useState('');

  // Debounce Search
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchQuery);
      setIsLoading(true);
      // Simulate network delay
      setTimeout(() => setIsLoading(false), 500);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Filter Logic
  const filteredThemes = useMemo(() => {
    return themesData.filter(theme => {
      // Search Query (Name, Game, Tags)
      const query = debouncedSearch.toLowerCase();
      const matchesSearch = 
        theme.title.toLowerCase().includes(query) || 
        theme.game.toLowerCase().includes(query) ||
        theme.tags.some(tag => tag.toLowerCase().includes(query));

      // Game Filter
      const matchesGame = selectedGame ? theme.game.toLowerCase().includes(selectedGame.toLowerCase()) : true;

      // Color Filter (OR logic - if theme has ANY of the selected colors)
      // In a real app, you might check for color proximity. Here we check exact hex match or if the theme has "Red" tag if Red hex is selected, etc.
      // For simplicity in this mock, we'll check if the theme's color array overlaps with selected colors.
      // We map the selected hexes to the theme's colors.
      const matchesColor = selectedColors.length === 0 || theme.colors.some(c => selectedColors.includes(c)) || 
                           // Fallback: check if tags contain color names (e.g. 'Red')
                           selectedColors.some(hex => {
                             const colorName = availableColors.find(c => c.hex === hex)?.name;
                             return colorName && theme.tags.includes(colorName);
                           });

      // Tag Filter (AND logic - theme must have ALL selected tags? Or OR? Usually OR for discovery, AND for specificity. Let's use OR for now, or AND if user wants specific combo.)
      // Let's use AND for tags to narrow down.
      const matchesTags = selectedTags.length === 0 || selectedTags.every(tag => theme.tags.includes(tag));

      // Price Filter (OR logic)
      const matchesPrice = selectedPrices.length === 0 || selectedPrices.includes(theme.price);

      // Type Filter (Animated vs Static)
      const matchesType = theme.type === activeTab;

      return matchesSearch && matchesGame && matchesColor && matchesTags && matchesPrice && matchesType;
    });
  }, [debouncedSearch, selectedGame, selectedColors, selectedTags, selectedPrices, activeTab]);

  // Handlers
  const toggleColor = (hex: string) => {
    setSelectedColors(prev => prev.includes(hex) ? prev.filter(c => c !== hex) : [...prev, hex]);
  };

  const toggleTag = (tag: string) => {
    setSelectedTags(prev => prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]);
  };

  const togglePrice = (price: number) => {
    setSelectedPrices(prev => prev.includes(price) ? prev.filter(p => p !== price) : [...prev, price]);
  };

  const clearAllFilters = () => {
    setSearchQuery('');
    setSelectedGame('');
    setSelectedColors([]);
    setSelectedTags([]);
    setSelectedPrices([]);
  };

  const activeFiltersCount = (selectedGame ? 1 : 0) + selectedColors.length + selectedTags.length + selectedPrices.length;

  return (
    <div className="flex flex-col gap-6">
      
      {/* Category Tabs */}
      <div className="flex items-center gap-2 mb-2 border-b border-slate-800 pb-4">
        <button
          onClick={() => setActiveTab('animated')}
          className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all ${
            activeTab === 'animated'
              ? 'bg-purple-500/20 text-purple-400 border border-purple-500/50 shadow-[0_0_15px_rgba(168,85,247,0.2)]'
              : 'bg-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
          }`}
        >
          Animated Themes
        </button>
        <button
          onClick={() => setActiveTab('static')}
          className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all ${
            activeTab === 'static'
              ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/50 shadow-[0_0_15px_rgba(34,211,238,0.2)]'
              : 'bg-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
          }`}
        >
          Static Themes
        </button>
      </div>

      {/* Top Search Bar & Filter Toggle */}
      <div className="relative w-full z-30 flex flex-col sm:flex-row gap-4">
        <div className="relative group flex-1">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-slate-400 group-focus-within:text-cyan-400 transition-colors" />
          </div>
          <input
            type="text"
            className="block w-full rounded-xl border border-slate-800 bg-slate-900/80 backdrop-blur-md py-4 pl-12 pr-4 text-white placeholder-slate-400 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 focus:outline-none transition-all shadow-lg"
            placeholder="Search themes or tags..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery('')}
              className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-500 hover:text-white"
            >
              <X className="h-5 w-5" />
            </button>
          )}
        </div>

        <div className="relative group w-full sm:w-64">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Gamepad2 className="h-5 w-5 text-slate-400 group-focus-within:text-cyan-400 transition-colors" />
          </div>
          <input
            type="text"
            className="block w-full rounded-xl border border-slate-800 bg-slate-900/80 backdrop-blur-md py-4 pl-12 pr-4 text-white placeholder-slate-400 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 focus:outline-none transition-all shadow-lg"
            placeholder="Filter by game..."
            value={selectedGame}
            onChange={(e) => setSelectedGame(e.target.value)}
          />
          {selectedGame && (
            <button 
              onClick={() => setSelectedGame('')}
              className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-500 hover:text-white"
            >
              <X className="h-5 w-5" />
            </button>
          )}
        </div>
        
        <button 
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className={`flex items-center gap-2 px-6 rounded-xl border transition-all shadow-lg font-medium ${
            isSidebarOpen 
              ? 'bg-cyan-500 text-black border-cyan-500 shadow-cyan-500/20' 
              : 'bg-slate-900/80 text-slate-300 border-slate-800 hover:text-white hover:border-cyan-500/50'
          }`}
        >
          <SlidersHorizontal className="w-5 h-5" />
          <span className="hidden sm:inline">Filters</span>
          {activeFiltersCount > 0 && (
            <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${isSidebarOpen ? 'bg-black/20 text-black' : 'bg-cyan-500 text-black'}`}>
              {activeFiltersCount}
            </span>
          )}
        </button>
      </div>

      {/* Collapsible Filter Panel (Top) */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0, marginBottom: 0 }}
            animate={{ opacity: 1, height: 'auto', marginBottom: 24 }}
            exit={{ opacity: 0, height: 0, marginBottom: 0 }}
            className="overflow-hidden"
          >
            <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-2xl p-6 shadow-2xl">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  Advanced Filters
                </h3>
                {activeFiltersCount > 0 && (
                  <button onClick={clearAllFilters} className="text-sm text-red-400 hover:text-red-300 hover:underline">
                    Reset All Filters
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {/* Color Palette */}
                <div className="space-y-3">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Color Palette</label>
                  <div className="flex flex-wrap gap-2">
                    {availableColors.map((color) => (
                      <button
                        key={color.name}
                        onClick={() => toggleColor(color.hex)}
                        className={`w-8 h-8 rounded-full flex items-center justify-center transition-transform hover:scale-110 border-2 ${
                          selectedColors.includes(color.hex) ? 'border-white ring-2 ring-cyan-500/50' : 'border-transparent ring-1 ring-slate-700'
                        }`}
                        style={{ backgroundColor: color.hex }}
                        title={color.name}
                      >
                        {selectedColors.includes(color.hex) && <Check className={`w-4 h-4 ${color.name === 'White' || color.name === 'Yellow' || color.name === 'Cyan' || color.name === 'Green' ? 'text-black' : 'text-white'}`} />}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Price */}
                <div className="space-y-3">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Steam Points</label>
                  <div className="flex flex-wrap gap-2">
                    {pricePoints.map((price) => (
                      <button
                        key={price}
                        onClick={() => togglePrice(price)}
                        className={`px-3 py-1.5 rounded-lg text-sm font-medium border transition-all ${
                          selectedPrices.includes(price)
                            ? 'bg-cyan-500/10 border-cyan-500 text-cyan-400'
                            : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-600 hover:text-white'
                        }`}
                      >
                        {price.toLocaleString()}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Style Tags */}
                <div className="space-y-3">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Style Tags</label>
                  <div className="flex flex-wrap gap-2">
                    {availableTags.map((tag) => (
                      <button
                        key={tag}
                        onClick={() => toggleTag(tag)}
                        className={`px-3 py-1.5 rounded-md text-xs font-medium border transition-all ${
                          selectedTags.includes(tag) 
                            ? 'bg-cyan-500/10 border-cyan-500 text-cyan-400' 
                            : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-600 hover:text-white'
                        }`}
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex flex-col gap-8 relative">
        
        {/* Main Grid Area */}
        <div className="flex-1 min-w-0">
          
          {/* Active Filter Chips */}
          {activeFiltersCount > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              {selectedGame && (
                <div className="flex items-center gap-1 pl-3 pr-2 py-1 rounded-full bg-slate-800 border border-slate-700 text-xs text-white">
                  Game: {selectedGame}
                  <button onClick={() => setSelectedGame('')} className="p-1 hover:text-red-400"><X className="w-3 h-3" /></button>
                </div>
              )}
              {selectedColors.map(hex => {
                const colorName = availableColors.find(c => c.hex === hex)?.name || hex;
                return (
                  <div key={hex} className="flex items-center gap-1 pl-3 pr-2 py-1 rounded-full bg-slate-800 border border-slate-700 text-xs text-white">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: hex }}></div>
                    {colorName}
                    <button onClick={() => toggleColor(hex)} className="p-1 hover:text-red-400"><X className="w-3 h-3" /></button>
                  </div>
                );
              })}
              {selectedPrices.map(price => (
                <div key={price} className="flex items-center gap-1 pl-3 pr-2 py-1 rounded-full bg-slate-800 border border-slate-700 text-xs text-white">
                  {price} Points
                  <button onClick={() => togglePrice(price)} className="p-1 hover:text-red-400"><X className="w-3 h-3" /></button>
                </div>
              ))}
              {selectedTags.map(tag => (
                <div key={tag} className="flex items-center gap-1 pl-3 pr-2 py-1 rounded-full bg-slate-800 border border-slate-700 text-xs text-white">
                  {tag}
                  <button onClick={() => toggleTag(tag)} className="p-1 hover:text-red-400"><X className="w-3 h-3" /></button>
                </div>
              ))}
              <button onClick={clearAllFilters} className="text-xs text-red-400 hover:underline px-2">Clear All</button>
            </div>
          )}

          {/* Results Grid */}
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="rounded-3xl bg-slate-900 border border-slate-800 overflow-hidden aspect-[16/10] animate-pulse">
                  <div className="h-full w-full bg-slate-800"></div>
                </div>
              ))}
            </div>
          ) : filteredThemes.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {filteredThemes.map((theme) => (
                <Link 
                  to={`/themes/${theme.id}`} 
                  key={theme.id} 
                  className="group flex flex-col rounded-3xl bg-slate-900/40 backdrop-blur-sm border border-slate-800 overflow-hidden transition-all duration-300 hover:border-cyan-500/50 hover:shadow-2xl hover:shadow-cyan-500/10 hover:-translate-y-1"
                >
                  <div className="aspect-[16/10] w-full overflow-hidden relative">
                    <img 
                      src={theme.image} 
                      alt={theme.title} 
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent opacity-60"></div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-center bg-slate-900/30 rounded-3xl border border-slate-800 border-dashed">
              <div className="w-20 h-20 bg-slate-800/50 rounded-full flex items-center justify-center mb-6">
                <Search className="w-10 h-10 text-slate-600" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">No themes found</h3>
              <p className="text-slate-400 max-w-md mx-auto mb-8">
                We couldn't find any themes matching your filters. Try adjusting your search or clearing some filters.
              </p>
              <button 
                onClick={clearAllFilters}
                className="px-6 py-3 rounded-xl bg-cyan-500 text-black font-bold hover:bg-cyan-400 transition-colors shadow-lg shadow-cyan-500/20"
              >
                Clear All Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
