import { Link } from 'react-router-dom';
import { ArrowRight, Star, TrendingUp, Users, Zap } from 'lucide-react';

const trendingArtworks = [
  { id: 1, title: 'Cyberpunk Neon City', creator: '@NeonDreams', price: '$15.00', image: 'https://picsum.photos/seed/cyber1/600/400', likes: 342, type: 'Animated' },
  { id: 2, title: 'Ethereal Forest', creator: '@NatureVibes', price: '$12.50', image: 'https://picsum.photos/seed/forest1/600/400', likes: 289, type: 'Static' },
  { id: 3, title: 'Retro Synthwave', creator: '@SynthLord', price: '$20.00', image: 'https://picsum.photos/seed/synth1/600/400', likes: 512, type: 'Animated' },
  { id: 4, title: 'Dark Fantasy Knight', creator: '@GrimArt', price: '$18.00', image: 'https://picsum.photos/seed/knight1/600/400', likes: 421, type: 'Theme Bundle' },
  { id: 5, title: 'Minimalist Setup', creator: '@CleanDesk', price: '$10.00', image: 'https://picsum.photos/seed/minimal1/600/400', likes: 156, type: 'Static' },
  { id: 6, title: 'Galactic Horizon', creator: '@SpaceCadet', price: '$25.00', image: 'https://picsum.photos/seed/space1/600/400', likes: 678, type: 'Animated' },
];

const topCreators = [
  { id: 1, name: 'NeonDreams', handle: '@NeonDreams', avatar: 'https://picsum.photos/seed/user1/100/100', sales: 1240, rating: 4.9 },
  { id: 2, name: 'SynthLord', handle: '@SynthLord', avatar: 'https://picsum.photos/seed/user2/100/100', sales: 985, rating: 4.8 },
  { id: 3, name: 'GrimArt', handle: '@GrimArt', avatar: 'https://picsum.photos/seed/user3/100/100', sales: 850, rating: 4.7 },
  { id: 4, name: 'SpaceCadet', handle: '@SpaceCadet', avatar: 'https://picsum.photos/seed/user4/100/100', sales: 720, rating: 4.9 },
];

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-24 pb-32 lg:pt-36 lg:pb-48">
        {/* Background Effects */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 left-1/4 h-96 w-96 rounded-full bg-cyan-500/20 blur-[128px]"></div>
          <div className="absolute bottom-0 right-1/4 h-96 w-96 rounded-full bg-purple-500/20 blur-[128px]"></div>
          <div className="absolute inset-0 bg-[url('https://picsum.photos/seed/hero-bg/1920/1080?blur=10')] opacity-10 mix-blend-overlay"></div>
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-slate-800 bg-slate-900/50 px-4 py-2 text-sm text-cyan-400 backdrop-blur-sm mb-8">
            <Zap className="h-4 w-4" />
            <span>The #1 Marketplace for Steam Customization</span>
          </div>
          <h1 className="mx-auto max-w-4xl text-5xl font-extrabold tracking-tight text-white sm:text-6xl lg:text-7xl">
            Elevate Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">Digital Identity</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-400 leading-relaxed">
            Discover, buy, and sell premium custom Steam artworks, Workshop showcases, and profile themes. Join thousands of creators and collectors.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/marketplace"
              className="flex w-full sm:w-auto items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-cyan-500 to-purple-500 px-8 py-4 text-base font-semibold text-white shadow-lg shadow-cyan-500/25 transition-all hover:scale-105 hover:shadow-cyan-500/40"
            >
              Explore Market
              <ArrowRight className="h-5 w-5" />
            </Link>
            <Link
              to="/pricing"
              className="flex w-full sm:w-auto items-center justify-center gap-2 rounded-lg border border-slate-700 bg-slate-900/50 px-8 py-4 text-base font-semibold text-white backdrop-blur-sm transition-all hover:bg-slate-800 hover:border-slate-600"
            >
              Start Selling
            </Link>
          </div>
          
          {/* Stats */}
          <div className="mt-20 grid grid-cols-2 gap-8 md:grid-cols-4 border-t border-slate-800/50 pt-10">
            <div className="flex flex-col items-center">
              <span className="text-3xl font-bold text-white">50K+</span>
              <span className="text-sm text-slate-400 mt-1">Active Users</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-3xl font-bold text-white">12K+</span>
              <span className="text-sm text-slate-400 mt-1">Premium Artworks</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-3xl font-bold text-white">$2M+</span>
              <span className="text-sm text-slate-400 mt-1">Creator Earnings</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-3xl font-bold text-white">4.9/5</span>
              <span className="text-sm text-slate-400 mt-1">Average Rating</span>
            </div>
          </div>
        </div>
      </section>

      {/* Trending Artworks Section */}
      <section className="py-20 bg-slate-950 border-t border-slate-900">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl font-bold text-white flex items-center gap-3">
                <TrendingUp className="h-8 w-8 text-cyan-400" />
                Trending Artworks
              </h2>
              <p className="text-slate-400 mt-2">The most popular showcases this week.</p>
            </div>
            <Link to="/marketplace" className="hidden sm:flex items-center gap-2 text-cyan-400 hover:text-cyan-300 font-medium transition-colors">
              View All <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {trendingArtworks.map((artwork) => (
              <div key={artwork.id} className="group relative rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-cyan-500/10 hover:border-slate-700">
                <div className="aspect-video w-full overflow-hidden relative">
                  <img 
                    src={artwork.image} 
                    alt={artwork.title} 
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-3 right-3 rounded-full bg-slate-950/80 backdrop-blur-md px-3 py-1 text-xs font-medium text-white border border-slate-700">
                    {artwork.type}
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6">
                    <button className="rounded-lg bg-cyan-500 px-6 py-2 text-sm font-semibold text-white shadow-lg hover:bg-cyan-400 transition-colors transform translate-y-4 group-hover:translate-y-0 duration-300">
                      Quick View
                    </button>
                  </div>
                </div>
                <div className="p-5">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-lg font-bold text-white group-hover:text-cyan-400 transition-colors">{artwork.title}</h3>
                      <p className="text-sm text-slate-400 mt-1">{artwork.creator}</p>
                    </div>
                    <div className="text-right">
                      <span className="block text-lg font-bold text-white">{artwork.price}</span>
                      <span className="flex items-center justify-end gap-1 text-xs text-slate-500 mt-1">
                        <Star className="h-3 w-3 fill-slate-500" /> {artwork.likes}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-10 text-center sm:hidden">
            <Link to="/marketplace" className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 font-medium transition-colors">
              View All <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Top Creators Section */}
      <section className="py-20 bg-slate-900/50 border-t border-slate-900">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl font-bold text-white flex items-center gap-3">
                <Users className="h-8 w-8 text-purple-400" />
                Top Creators
              </h2>
              <p className="text-slate-400 mt-2">Meet the artists behind the best profiles.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {topCreators.map((creator) => (
              <div key={creator.id} className="rounded-2xl bg-slate-950 border border-slate-800 p-6 text-center transition-all duration-300 hover:border-purple-500/50 hover:shadow-lg hover:shadow-purple-500/10">
                <div className="relative mx-auto h-24 w-24 mb-4">
                  <img 
                    src={creator.avatar} 
                    alt={creator.name} 
                    className="h-full w-full rounded-full object-cover border-2 border-slate-800"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute -bottom-2 -right-2 flex h-8 w-8 items-center justify-center rounded-full bg-slate-900 border border-slate-700 text-xs font-bold text-white">
                    #{creator.id}
                  </div>
                </div>
                <h3 className="text-lg font-bold text-white">{creator.name}</h3>
                <p className="text-sm text-cyan-400">{creator.handle}</p>
                
                <div className="mt-6 grid grid-cols-2 gap-4 border-t border-slate-800 pt-4">
                  <div>
                    <span className="block text-xs text-slate-500 uppercase tracking-wider">Sales</span>
                    <span className="block text-sm font-semibold text-white">{creator.sales}</span>
                  </div>
                  <div>
                    <span className="block text-xs text-slate-500 uppercase tracking-wider">Rating</span>
                    <span className="flex items-center justify-center gap-1 text-sm font-semibold text-white">
                      <Star className="h-3 w-3 fill-yellow-500 text-yellow-500" /> {creator.rating}
                    </span>
                  </div>
                </div>
                
                <button className="mt-6 w-full rounded-lg bg-slate-800 py-2 text-sm font-medium text-white hover:bg-slate-700 transition-colors">
                  View Profile
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/20 to-purple-900/20"></div>
        <div className="relative z-10 mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white mb-6">Ready to upgrade your Steam profile?</h2>
          <p className="text-lg text-slate-300 mb-10">Join the community today. Buy unique artworks or start selling your own creations to thousands of users.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="rounded-lg bg-white px-8 py-4 text-base font-bold text-slate-950 hover:bg-slate-200 transition-colors shadow-xl">
              Create an Account
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
