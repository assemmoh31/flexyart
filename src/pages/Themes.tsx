import { useState } from 'react';
import { LayoutTemplate, Download, Eye, Star, PlayCircle, Image as ImageIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

const themes = [
  { id: 1, title: 'Neon Genesis', creator: '@CyberPunk', price: 2000, image: 'https://picsum.photos/seed/theme1/800/600', rating: 4.9, downloads: '1.2k', tags: ['Cyberpunk', 'Animated', 'Full Profile'], type: 'animated' },
  { id: 2, title: 'Tranquil Zen', creator: '@NatureVibes', price: 500, image: 'https://picsum.photos/seed/theme2/800/600', rating: 4.8, downloads: '850', tags: ['Nature', 'Minimal', 'Static'], type: 'static' },
  { id: 3, title: 'Abyssal Depths', creator: '@DeepSea', price: 2500, image: 'https://picsum.photos/seed/theme3/800/600', rating: 5.0, downloads: '2.1k', tags: ['Dark', 'Animated', 'Premium'], type: 'animated' },
  { id: 4, title: 'Vaporwave Dreams', creator: '@Aesthetic', price: 1500, image: 'https://picsum.photos/seed/theme4/800/600', rating: 4.7, downloads: '3.4k', tags: ['Retro', 'Animated', 'Colorful'], type: 'animated' },
  { id: 5, title: 'Crimson Samurai', creator: '@RoninArt', price: 800, image: 'https://picsum.photos/seed/theme5/800/600', rating: 4.6, downloads: '1.5k', tags: ['Anime', 'Red', 'Static'], type: 'static' },
  { id: 6, title: 'Galactic Core', creator: '@SpaceExplorer', price: 3000, image: 'https://picsum.photos/seed/theme6/800/600', rating: 4.9, downloads: '4.2k', tags: ['Space', 'Animated', 'Sci-Fi'], type: 'animated' },
];

export default function Themes() {
  const [activeCategory, setActiveCategory] = useState<'all' | 'animated' | 'static'>('all');

  const filteredThemes = themes.filter(theme => 
    activeCategory === 'all' ? true : theme.type === activeCategory
  );

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-500/10 px-4 py-2 text-sm text-purple-400 mb-6">
            <LayoutTemplate className="h-4 w-4" />
            <span>Complete Profile Overhauls</span>
          </div>
          <h1 className="text-4xl font-extrabold text-white tracking-tight sm:text-5xl mb-4">Profile Themes</h1>
          <p className="text-xl text-slate-400">Transform your entire Steam presence with curated bundles including backgrounds, artwork showcases, and custom text boxes.</p>
        </div>
      </div>

      {/* Category Toggle */}
      <div className="flex items-center gap-2 mb-12 p-1 bg-slate-900/50 border border-slate-800 rounded-xl inline-flex">
        <button
          onClick={() => setActiveCategory('all')}
          className={`px-6 py-2.5 rounded-lg text-sm font-medium transition-all ${
            activeCategory === 'all' 
              ? 'bg-slate-800 text-white shadow-sm' 
              : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
          }`}
        >
          All Themes
        </button>
        <button
          onClick={() => setActiveCategory('animated')}
          className={`px-6 py-2.5 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
            activeCategory === 'animated' 
              ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30 shadow-sm' 
              : 'text-slate-400 hover:text-purple-400 hover:bg-slate-800/50'
          }`}
        >
          <PlayCircle className="w-4 h-4" /> Animated Backgrounds
        </button>
        <button
          onClick={() => setActiveCategory('static')}
          className={`px-6 py-2.5 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
            activeCategory === 'static' 
              ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 shadow-sm' 
              : 'text-slate-400 hover:text-cyan-400 hover:bg-slate-800/50'
          }`}
        >
          <ImageIcon className="w-4 h-4" /> Static Backgrounds
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {filteredThemes.map((theme) => (
          <Link 
            to={`/themes/${theme.id}`} 
            key={theme.id} 
            className="group flex flex-col rounded-3xl bg-slate-900 border border-slate-800 overflow-hidden transition-all duration-300 hover:border-purple-500/50 hover:shadow-2xl hover:shadow-purple-500/10"
          >
            <div className="aspect-[16/10] w-full overflow-hidden relative border-b border-slate-800">
              <img 
                src={theme.image} 
                alt={theme.title} 
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-60"></div>
              
              {/* Hover Overlay (View Details) */}
              <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-20">
                <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 bg-cyan-500 text-black px-6 py-3 rounded-xl font-bold flex items-center gap-2 shadow-[0_0_20px_rgba(34,211,238,0.4)]">
                  <Eye className="w-5 h-5" /> View Details
                </div>
              </div>
            </div>
            
            <div className="p-6 flex flex-col flex-1 relative z-10 bg-slate-900">
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-bold text-white group-hover:text-purple-400 transition-colors">{theme.title}</h3>
                <div className="flex items-center gap-2 bg-slate-800/50 px-3 py-1.5 rounded-lg border border-slate-700">
                  <SteamPointsIcon className="w-5 h-5" />
                  <span className="text-lg font-bold text-white">{theme.price.toLocaleString()} Points</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
      
      {filteredThemes.length === 0 && (
        <div className="text-center py-20">
          <p className="text-slate-400 text-lg">No themes found in this category.</p>
        </div>
      )}

      <div className="mt-20 text-center">
        <button className="rounded-full border border-slate-700 bg-slate-900 px-8 py-4 text-base font-medium text-slate-300 hover:bg-slate-800 hover:text-white transition-colors">
          Load More Themes
        </button>
      </div>
    </div>
  );
}

export const SteamPointsIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="10" fill="#1A9FFF" fillOpacity="0.2" stroke="#1A9FFF" strokeWidth="2"/>
    <path d="M12 6C12 6 15 9 15 12C15 15 12 18 12 18C12 18 9 15 9 12C9 9 12 6 12 6Z" fill="#1A9FFF"/>
    <circle cx="12" cy="12" r="2" fill="white"/>
  </svg>
);
