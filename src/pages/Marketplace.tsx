import { useState } from 'react';
import { Filter, Search, ChevronDown, SlidersHorizontal } from 'lucide-react';
import { Link } from 'react-router-dom';
import CreatorBadge from '../components/CreatorBadge';

const artworks = [
  { id: 1, title: 'Cyberpunk Neon City', creator: '@NeonDreams', creatorRevenue: 3000, price: '$15.00', image: 'https://picsum.photos/seed/cyber1/600/400', type: 'Animated', category: 'Sci-Fi' },
  { id: 2, title: 'Ethereal Forest', creator: '@NatureVibes', creatorRevenue: 1800, price: '$12.50', image: 'https://picsum.photos/seed/forest1/600/400', type: 'Static', category: 'Fantasy' },
  { id: 3, title: 'Retro Synthwave', creator: '@SynthLord', creatorRevenue: 1200, price: '$20.00', image: 'https://picsum.photos/seed/synth1/600/400', type: 'Animated', category: 'Retro' },
  { id: 4, title: 'Dark Fantasy Knight', creator: '@GrimArt', creatorRevenue: 400, price: '$18.00', image: 'https://picsum.photos/seed/knight1/600/400', type: 'Theme Bundle', category: 'Fantasy' },
  { id: 5, title: 'Minimalist Setup', creator: '@CleanDesk', creatorRevenue: 80, price: '$10.00', image: 'https://picsum.photos/seed/minimal1/600/400', type: 'Static', category: 'Minimal' },
  { id: 6, title: 'Galactic Horizon', creator: '@SpaceCadet', creatorRevenue: 20, price: '$25.00', image: 'https://picsum.photos/seed/space1/600/400', type: 'Animated', category: 'Sci-Fi' },
  { id: 7, title: 'Anime Aesthetic', creator: '@WeebArt', creatorRevenue: 2600, price: '$14.00', image: 'https://picsum.photos/seed/anime1/600/400', type: 'Animated', category: 'Anime' },
  { id: 8, title: 'Gothic Castle', creator: '@DarkVibes', creatorRevenue: 1600, price: '$16.00', image: 'https://picsum.photos/seed/gothic1/600/400', type: 'Static', category: 'Fantasy' },
  { id: 9, title: 'Pixel Art City', creator: '@RetroPixel', creatorRevenue: 1100, price: '$8.00', image: 'https://picsum.photos/seed/pixel1/600/400', type: 'Animated', category: 'Retro' },
];

export default function Marketplace() {
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10 border-b border-slate-800 pb-8">
        <div>
          <h1 className="text-4xl font-extrabold text-white tracking-tight">Marketplace</h1>
          <p className="text-slate-400 mt-2 text-lg">Discover the perfect artwork for your Steam profile.</p>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-500" />
            <input 
              type="text" 
              placeholder="Search artworks..." 
              className="w-full rounded-lg border border-slate-700 bg-slate-900 py-2.5 pl-10 pr-4 text-sm text-white focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500 transition-colors"
            />
          </div>
          <button 
            className="md:hidden flex items-center justify-center rounded-lg border border-slate-700 bg-slate-900 p-2.5 text-slate-300 hover:text-white transition-colors"
            onClick={() => setIsMobileFiltersOpen(!isMobileFiltersOpen)}
          >
            <SlidersHorizontal className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-10">
        {/* Sidebar Filters */}
        <aside className={`w-full lg:w-64 shrink-0 ${isMobileFiltersOpen ? 'block' : 'hidden lg:block'}`}>
          <div className="sticky top-24 space-y-8">
            <div className="flex items-center gap-2 text-lg font-bold text-white border-b border-slate-800 pb-4">
              <Filter className="h-5 w-5 text-cyan-400" />
              Filters
            </div>

            {/* Type Filter */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wider">Type</h3>
              <div className="space-y-3">
                {['All Types', 'Animated', 'Static', 'Theme Bundle'].map((type) => (
                  <label key={type} className="flex items-center gap-3 cursor-pointer group">
                    <div className="relative flex items-center justify-center">
                      <input type="checkbox" className="peer sr-only" defaultChecked={type === 'All Types'} />
                      <div className="h-5 w-5 rounded border border-slate-600 bg-slate-900 peer-checked:bg-cyan-500 peer-checked:border-cyan-500 transition-colors"></div>
                      <svg className="absolute h-3.5 w-3.5 text-white opacity-0 peer-checked:opacity-100 pointer-events-none" viewBox="0 0 14 14" fill="none">
                        <path d="M3 8L6 11L11 3.5" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" stroke="currentColor" />
                      </svg>
                    </div>
                    <span className="text-sm text-slate-400 group-hover:text-slate-200 transition-colors">{type}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Category Filter */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wider">Category</h3>
              <div className="space-y-3">
                {['Sci-Fi', 'Fantasy', 'Anime', 'Retro', 'Minimal', 'Nature'].map((category) => (
                  <label key={category} className="flex items-center gap-3 cursor-pointer group">
                    <div className="relative flex items-center justify-center">
                      <input type="checkbox" className="peer sr-only" />
                      <div className="h-5 w-5 rounded border border-slate-600 bg-slate-900 peer-checked:bg-purple-500 peer-checked:border-purple-500 transition-colors"></div>
                      <svg className="absolute h-3.5 w-3.5 text-white opacity-0 peer-checked:opacity-100 pointer-events-none" viewBox="0 0 14 14" fill="none">
                        <path d="M3 8L6 11L11 3.5" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" stroke="currentColor" />
                      </svg>
                    </div>
                    <span className="text-sm text-slate-400 group-hover:text-slate-200 transition-colors">{category}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Price Range */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wider">Price Range</h3>
              <div className="flex items-center gap-4">
                <input type="number" placeholder="Min" className="w-full rounded-md border border-slate-700 bg-slate-900 py-2 px-3 text-sm text-white focus:border-cyan-500 focus:outline-none" />
                <span className="text-slate-500">-</span>
                <input type="number" placeholder="Max" className="w-full rounded-md border border-slate-700 bg-slate-900 py-2 px-3 text-sm text-white focus:border-cyan-500 focus:outline-none" />
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex-1">
          {/* Sort & Results Bar */}
          <div className="flex items-center justify-between mb-8 bg-slate-900/50 p-4 rounded-xl border border-slate-800">
            <span className="text-sm text-slate-400">Showing <strong className="text-white">1-9</strong> of 124 results</span>
            <div className="flex items-center gap-2">
              <span className="text-sm text-slate-400">Sort by:</span>
              <button className="flex items-center gap-2 text-sm font-medium text-white hover:text-cyan-400 transition-colors">
                Trending <ChevronDown className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
            {artworks.map((artwork) => (
              <Link key={artwork.id} to={`/artwork/${artwork.id}`} className="group relative rounded-xl bg-slate-900 border border-slate-800 overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-cyan-500/10 hover:border-slate-700 flex flex-col">
                <div className="aspect-[16/10] w-full overflow-hidden relative">
                  <img 
                    src={artwork.image} 
                    alt={artwork.title} 
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-3 right-3 rounded-md bg-slate-950/80 backdrop-blur-md px-2.5 py-1 text-xs font-semibold text-white border border-slate-700">
                    {artwork.type}
                  </div>
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px]">
                    <button className="rounded-lg bg-cyan-500 px-6 py-2.5 text-sm font-bold text-white shadow-lg hover:bg-cyan-400 transition-colors transform translate-y-4 group-hover:translate-y-0 duration-300">
                      View Details
                    </button>
                  </div>
                </div>
                <div className="p-4 flex-1 flex flex-col">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-base font-bold text-white group-hover:text-cyan-400 transition-colors line-clamp-1">{artwork.title}</h3>
                    <span className="text-base font-bold text-white ml-2">{artwork.price}</span>
                  </div>
                  <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-800/50">
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-slate-400">{artwork.creator}</span>
                      <CreatorBadge totalRevenue={artwork.creatorRevenue} size="sm" />
                    </div>
                    <span className="text-xs font-medium text-slate-500 bg-slate-800 px-2 py-1 rounded-md">{artwork.category}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          
          {/* Pagination */}
          <div className="mt-12 flex justify-center">
            <nav className="flex items-center gap-2">
              <button className="rounded-md border border-slate-700 bg-slate-900 px-3 py-2 text-sm font-medium text-slate-400 hover:bg-slate-800 hover:text-white transition-colors disabled:opacity-50" disabled>Previous</button>
              <button className="rounded-md border border-cyan-500 bg-cyan-500/10 px-4 py-2 text-sm font-bold text-cyan-400">1</button>
              <button className="rounded-md border border-slate-700 bg-slate-900 px-4 py-2 text-sm font-medium text-slate-400 hover:bg-slate-800 hover:text-white transition-colors">2</button>
              <button className="rounded-md border border-slate-700 bg-slate-900 px-4 py-2 text-sm font-medium text-slate-400 hover:bg-slate-800 hover:text-white transition-colors">3</button>
              <span className="text-slate-500 px-2">...</span>
              <button className="rounded-md border border-slate-700 bg-slate-900 px-3 py-2 text-sm font-medium text-slate-400 hover:bg-slate-800 hover:text-white transition-colors">Next</button>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
}
