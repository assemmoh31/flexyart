import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Download, Star, ShieldCheck, Gamepad2, Maximize2, ExternalLink } from 'lucide-react';
import { SteamPointsIcon } from './Themes';

// Mock data for the details page
const themeDetails = {
  1: { id: 1, title: 'Neon Genesis', creator: '@CyberPunk', price: 2000, image: 'https://picsum.photos/seed/theme1/1920/1080', rating: 4.9, downloads: '1.2k', tags: ['Cyberpunk', 'Animated', 'Full Profile'], type: 'animated', game: 'Cyberpunk 2077', dimensions: '1920x1080', rarity: 'Legendary', description: 'Immerse your profile in the neon glow of the future. This complete profile overhaul includes an animated central artwork, matching side panels, and a coordinated background.' },
  2: { id: 2, title: 'Tranquil Zen', creator: '@NatureVibes', price: 500, image: 'https://picsum.photos/seed/theme2/1920/1080', rating: 4.8, downloads: '850', tags: ['Nature', 'Minimal', 'Static'], type: 'static', game: 'Sekiro: Shadows Die Twice', dimensions: '1920x1080', rarity: 'Rare', description: 'Find peace in the digital realm. A minimalist, static background featuring a serene landscape.' },
  3: { id: 3, title: 'Abyssal Depths', creator: '@DeepSea', price: 2500, image: 'https://picsum.photos/seed/theme3/1920/1080', rating: 5.0, downloads: '2.1k', tags: ['Dark', 'Animated', 'Premium'], type: 'animated', game: 'Subnautica', dimensions: '1920x1080', rarity: 'Mythical', description: 'Dive into the unknown. A premium animated background featuring the mysterious depths of the ocean.' },
  4: { id: 4, title: 'Vaporwave Dreams', creator: '@Aesthetic', price: 1500, image: 'https://picsum.photos/seed/theme4/1920/1080', rating: 4.7, downloads: '3.4k', tags: ['Retro', 'Animated', 'Colorful'], type: 'animated', game: 'Hotline Miami', dimensions: '1920x1080', rarity: 'Epic', description: 'A nostalgic trip through neon grids and retro aesthetics. Fully animated for maximum vibe.' },
  5: { id: 5, title: 'Crimson Samurai', creator: '@RoninArt', price: 800, image: 'https://picsum.photos/seed/theme5/1920/1080', rating: 4.6, downloads: '1.5k', tags: ['Anime', 'Red', 'Static'], type: 'static', game: 'Ghost of Tsushima', dimensions: '1920x1080', rarity: 'Rare', description: 'Honor and blade. A striking static background featuring a lone samurai against a crimson moon.' },
  6: { id: 6, title: 'Galactic Core', creator: '@SpaceExplorer', price: 3000, image: 'https://picsum.photos/seed/theme6/1920/1080', rating: 4.9, downloads: '4.2k', tags: ['Space', 'Animated', 'Sci-Fi'], type: 'animated', game: 'No Man\'s Sky', dimensions: '1920x1080', rarity: 'Legendary', description: 'Journey to the center of the universe. A mesmerizing animated background of a swirling galaxy.' },
};

export default function BackgroundDetail() {
  const { id } = useParams();
  const theme = themeDetails[Number(id) as keyof typeof themeDetails] || themeDetails[1];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200">
      {/* Navigation Bar */}
      <div className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <Link to="/themes" className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Back to Themes</span>
          </Link>
          <div className="flex items-center gap-4">
            <button className="p-2 text-slate-400 hover:text-white transition-colors rounded-lg hover:bg-slate-800">
              <Download className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          
          {/* Left Column: Big Preview */}
          <div className="lg:col-span-2 space-y-6">
            <div className="rounded-2xl overflow-hidden border border-slate-800 bg-slate-900 relative group">
              <div className="aspect-video w-full relative">
                <img 
                  src={theme.image} 
                  alt={theme.title} 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                {/* Simulated Play Button for Animated Backgrounds */}
                {theme.type === 'animated' && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="bg-black/50 backdrop-blur-sm p-4 rounded-full">
                      <Maximize2 className="w-8 h-8 text-white" />
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 lg:p-8">
              <h2 className="text-xl font-bold text-white mb-4">About this Background</h2>
              <p className="text-slate-400 leading-relaxed">
                {theme.description}
              </p>
            </div>
          </div>

          {/* Right Column: Info Sidebar */}
          <div className="space-y-6">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 lg:p-8 sticky top-24">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h1 className="text-3xl font-bold text-white mb-2">{theme.title}</h1>
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-slate-400">Created by</span>
                    <span className="text-cyan-400 font-medium hover:underline cursor-pointer">{theme.creator}</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-8">
                {theme.tags.map(tag => (
                  <span key={tag} className="px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-xs font-medium text-slate-300">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 mb-8">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-slate-400 font-medium">Price</span>
                  <div className="flex items-center gap-1 text-yellow-500 text-sm font-medium">
                    <Star className="w-4 h-4 fill-current" /> {theme.rating}
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <SteamPointsIcon className="w-8 h-8" />
                  <span className="text-4xl font-extrabold text-white">{theme.price.toLocaleString()}</span>
                  <span className="text-slate-400 font-medium mt-2">Points</span>
                </div>
              </div>

              <button className="w-full py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white font-bold text-lg shadow-[0_0_20px_rgba(6,182,212,0.3)] transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 mb-4">
                <Download className="w-5 h-5" />
                Purchase Background
              </button>

              <button className="w-full py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-medium transition-colors flex items-center justify-center gap-2">
                <ExternalLink className="w-4 h-4 text-slate-400" />
                View on Steam Market
              </button>

              <div className="mt-8 space-y-4 pt-8 border-t border-slate-800">
                <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wider">Technical Details</h3>
                
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2 text-slate-400">
                    <Gamepad2 className="w-4 h-4" /> Game Source
                  </div>
                  <span className="font-medium text-white">{theme.game}</span>
                </div>
                
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2 text-slate-400">
                    <Maximize2 className="w-4 h-4" /> Dimensions
                  </div>
                  <span className="font-medium text-white">{theme.dimensions}</span>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2 text-slate-400">
                    <ShieldCheck className="w-4 h-4" /> Rarity
                  </div>
                  <span className={`font-medium ${
                    theme.rarity === 'Legendary' ? 'text-purple-400' :
                    theme.rarity === 'Mythical' ? 'text-pink-400' :
                    theme.rarity === 'Epic' ? 'text-cyan-400' : 'text-blue-400'
                  }`}>{theme.rarity}</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
