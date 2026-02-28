import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Maximize2, ShoppingCart, Heart, Share2, MessageSquare, Star, CheckCircle2, ArrowRight } from 'lucide-react';

// Mock data for the artwork
const artworkData = {
  id: 1,
  title: 'Cyberpunk Neon City',
  creator: {
    name: 'NeonDreams',
    handle: '@NeonDreams',
    avatar: 'https://picsum.photos/seed/user1/100/100',
    followers: '12.4k',
    isFollowing: false,
  },
  price: '€15.00',
  image: 'https://picsum.photos/seed/cyber1/1200/800',
  type: 'Animated Showcase',
  category: 'Sci-Fi',
  likes: 342,
  description: 'A highly detailed, animated cyberpunk cityscape designed perfectly for the Steam Artwork Showcase. Features glowing neon signs, flying vehicles, and a seamless loop. The package includes the main center piece and the right side panel.',
  tags: ['#Cyberpunk', '#Neon', '#Cityscape', '#SciFi', '#Animated'],
  details: {
    resolution: '1920x1080 (Center: 506x820, Right: 100x820)',
    fileType: 'MP4, GIF, PNG',
    fileSize: '24.5 MB',
    includes: ['Center Artwork', 'Right Panel', 'Static Background', 'Setup Instructions'],
  },
  comments: [
    { id: 1, user: 'PixelHunter', avatar: 'https://picsum.photos/seed/c1/50/50', text: 'Absolutely stunning work! The loop is perfectly seamless.', time: '2 days ago', likes: 14 },
    { id: 2, user: 'SteamWeeb', avatar: 'https://picsum.photos/seed/c2/50/50', text: 'Does this include the code to make it long on the profile?', time: '1 week ago', likes: 3, replies: [
      { id: 3, user: 'NeonDreams', avatar: 'https://picsum.photos/seed/user1/50/50', text: 'Yes! The setup instructions include the exact console code you need.', time: '6 days ago', likes: 8, isCreator: true }
    ]},
  ]
};

const similarArtworks = [
  { id: 3, title: 'Retro Synthwave', creator: '@SynthLord', price: '€20.00', image: 'https://picsum.photos/seed/synth1/600/400', type: 'Animated' },
  { id: 6, title: 'Galactic Horizon', creator: '@SpaceCadet', price: '€25.00', image: 'https://picsum.photos/seed/space1/600/400', type: 'Animated' },
  { id: 9, title: 'Pixel Art City', creator: '@RetroPixel', price: '€8.00', image: 'https://picsum.photos/seed/pixel1/600/400', type: 'Animated' },
];

export default function ArtworkDetail() {
  const { id } = useParams();
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isFollowing, setIsFollowing] = useState(artworkData.creator.isFollowing);

  // In a real app, you would fetch the artwork data based on the ID
  const artwork = artworkData;

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
      {/* Breadcrumbs */}
      <nav className="flex text-sm text-slate-400 mb-8">
        <ol className="flex items-center space-x-2">
          <li><Link to="/" className="hover:text-cyan-400 transition-colors">Home</Link></li>
          <li><span className="mx-2">/</span></li>
          <li><Link to="/marketplace" className="hover:text-cyan-400 transition-colors">Marketplace</Link></li>
          <li><span className="mx-2">/</span></li>
          <li className="text-slate-200 truncate">{artwork.title}</li>
        </ol>
      </nav>

      <div className="flex flex-col lg:flex-row gap-10">
        {/* Left Column: Main Content */}
        <div className="flex-1 min-w-0">
          {/* Big Preview Section */}
          <div className="relative rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden group">
            <div className="aspect-[16/10] w-full relative bg-slate-950 flex items-center justify-center">
              <img 
                src={artwork.image} 
                alt={artwork.title} 
                className="max-h-full max-w-full object-contain"
                referrerPolicy="no-referrer"
              />
            </div>
            
            {/* Full Screen Button */}
            <button 
              onClick={() => setIsFullscreen(true)}
              className="absolute top-4 right-4 p-2 rounded-lg bg-slate-950/60 backdrop-blur-md text-white border border-slate-700 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-slate-800"
            >
              <Maximize2 className="h-5 w-5" />
            </button>

            {/* Steam Profile Mockup Overlay (Optional visual flair) */}
            <div className="absolute bottom-4 left-4 right-4 flex justify-center pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <div className="bg-slate-950/80 backdrop-blur-md px-4 py-2 rounded-full border border-slate-700 text-xs text-slate-300 flex items-center gap-2">
                <EyeIcon /> Previewing in Steam Showcase format
              </div>
            </div>
          </div>

          {/* Description & Metadata */}
          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2 space-y-8">
              <section>
                <h2 className="text-2xl font-bold text-white mb-4">About this Artwork</h2>
                <p className="text-slate-300 leading-relaxed text-lg">
                  {artwork.description}
                </p>
              </section>

              <section>
                <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-3">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {artwork.tags.map(tag => (
                    <Link key={tag} to={`/marketplace?tag=${tag.replace('#', '')}`} className="px-3 py-1.5 rounded-lg bg-slate-800 text-cyan-400 text-sm font-medium hover:bg-slate-700 transition-colors">
                      {tag}
                    </Link>
                  ))}
                </div>
              </section>
            </div>

            <div className="space-y-6 bg-slate-900/50 p-6 rounded-2xl border border-slate-800 h-fit">
              <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4">Technical Details</h3>
              <ul className="space-y-4 text-sm">
                <li>
                  <span className="block text-slate-500 mb-1">Resolution</span>
                  <span className="text-slate-200 font-medium">{artwork.details.resolution}</span>
                </li>
                <li>
                  <span className="block text-slate-500 mb-1">File Type</span>
                  <span className="text-slate-200 font-medium">{artwork.details.fileType}</span>
                </li>
                <li>
                  <span className="block text-slate-500 mb-1">File Size</span>
                  <span className="text-slate-200 font-medium">{artwork.details.fileSize}</span>
                </li>
                <li>
                  <span className="block text-slate-500 mb-2">Includes</span>
                  <ul className="space-y-2">
                    {artwork.details.includes.map(item => (
                      <li key={item} className="flex items-center gap-2 text-slate-300">
                        <CheckCircle2 className="h-4 w-4 text-emerald-400" /> {item}
                      </li>
                    ))}
                  </ul>
                </li>
              </ul>
            </div>
          </div>

          {/* Comments Section */}
          <div className="mt-16 pt-10 border-t border-slate-800">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                <MessageSquare className="h-6 w-6 text-purple-400" />
                Comments <span className="text-slate-500 text-lg font-normal">({artwork.comments.length + (artwork.comments[1]?.replies?.length || 0)})</span>
              </h2>
            </div>

            {/* Add Comment */}
            <div className="flex gap-4 mb-10">
              <div className="h-10 w-10 rounded-full bg-slate-800 flex-shrink-0 overflow-hidden">
                <img src="https://picsum.photos/seed/myuser/50/50" alt="You" className="h-full w-full object-cover" />
              </div>
              <div className="flex-1">
                <textarea 
                  placeholder="Ask a question or leave a review..." 
                  className="w-full rounded-xl border border-slate-700 bg-slate-900 p-4 text-white focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500 min-h-[100px] resize-y"
                ></textarea>
                <div className="mt-3 flex justify-end">
                  <button className="rounded-lg bg-cyan-500 px-6 py-2 text-sm font-bold text-white hover:bg-cyan-400 transition-colors">
                    Post Comment
                  </button>
                </div>
              </div>
            </div>

            {/* Comment Thread */}
            <div className="space-y-8">
              {artwork.comments.map(comment => (
                <div key={comment.id} className="flex gap-4">
                  <div className="h-10 w-10 rounded-full bg-slate-800 flex-shrink-0 overflow-hidden">
                    <img src={comment.avatar} alt={comment.user} className="h-full w-full object-cover" />
                  </div>
                  <div className="flex-1">
                    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-white">{comment.user}</span>
                          <span className="text-xs text-slate-500">{comment.time}</span>
                        </div>
                      </div>
                      <p className="text-slate-300 text-sm leading-relaxed">{comment.text}</p>
                    </div>
                    <div className="flex items-center gap-4 mt-2 ml-2 text-xs font-medium text-slate-500">
                      <button className="hover:text-cyan-400 transition-colors flex items-center gap-1">
                        <Heart className="h-3 w-3" /> {comment.likes}
                      </button>
                      <button className="hover:text-white transition-colors">Reply</button>
                    </div>

                    {/* Replies */}
                    {comment.replies && (
                      <div className="mt-4 space-y-4 pl-4 border-l-2 border-slate-800">
                        {comment.replies.map(reply => (
                          <div key={reply.id} className="flex gap-3">
                            <div className="h-8 w-8 rounded-full bg-slate-800 flex-shrink-0 overflow-hidden">
                              <img src={reply.avatar} alt={reply.user} className="h-full w-full object-cover" />
                            </div>
                            <div className="flex-1">
                              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-3">
                                <div className="flex items-center gap-2 mb-1">
                                  <span className="font-bold text-white text-sm">{reply.user}</span>
                                  {reply.isCreator && (
                                    <span className="bg-purple-500/20 text-purple-400 text-[10px] px-1.5 py-0.5 rounded uppercase tracking-wider font-bold">Creator</span>
                                  )}
                                  <span className="text-xs text-slate-500">{reply.time}</span>
                                </div>
                                <p className="text-slate-300 text-sm">{reply.text}</p>
                              </div>
                              <div className="flex items-center gap-4 mt-2 ml-2 text-xs font-medium text-slate-500">
                                <button className="hover:text-cyan-400 transition-colors flex items-center gap-1">
                                  <Heart className="h-3 w-3" /> {reply.likes}
                                </button>
                                <button className="hover:text-white transition-colors">Reply</button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Purchase Sidebar */}
        <div className="w-full lg:w-[380px] shrink-0">
          <div className="sticky top-24 space-y-6">
            {/* Main Purchase Card */}
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl">
              <div className="flex justify-between items-start mb-4">
                <h1 className="text-2xl font-extrabold text-white leading-tight">{artwork.title}</h1>
                <button className="text-slate-400 hover:text-pink-500 transition-colors p-2 rounded-full hover:bg-slate-800">
                  <Heart className="h-6 w-6" />
                </button>
              </div>
              
              <div className="flex items-center gap-2 mb-6">
                <span className="bg-slate-800 text-slate-300 text-xs px-2.5 py-1 rounded-md font-medium border border-slate-700">
                  {artwork.type}
                </span>
                <span className="flex items-center gap-1 text-sm text-slate-400">
                  <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" /> 4.9 (128 reviews)
                </span>
              </div>

              <div className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400 mb-8">
                {artwork.price}
              </div>

              <div className="space-y-3">
                <button className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-500 py-4 text-base font-bold text-white shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 transition-all hover:scale-[1.02]">
                  Buy Now
                </button>
                <button className="w-full flex items-center justify-center gap-2 rounded-xl border border-slate-700 bg-slate-800 py-4 text-base font-bold text-white hover:bg-slate-700 hover:border-slate-600 transition-all">
                  <ShoppingCart className="h-5 w-5" /> Add to Cart
                </button>
              </div>

              <div className="mt-6 pt-6 border-t border-slate-800 flex items-center justify-center gap-6 text-sm text-slate-400">
                <button className="flex items-center gap-2 hover:text-white transition-colors">
                  <Share2 className="h-4 w-4" /> Share
                </button>
                <span className="w-1 h-1 rounded-full bg-slate-700"></span>
                <span className="flex items-center gap-1">
                  <Heart className="h-4 w-4" /> {artwork.likes} Likes
                </span>
              </div>
            </div>

            {/* Creator Card */}
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6">
              <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4">Created By</h3>
              <div className="flex items-center gap-4">
                <Link to={`/creator/${artwork.creator.handle}`} className="h-16 w-16 rounded-full bg-slate-800 overflow-hidden border-2 border-slate-700 hover:border-cyan-500 transition-colors">
                  <img src={artwork.creator.avatar} alt={artwork.creator.name} className="h-full w-full object-cover" />
                </Link>
                <div className="flex-1">
                  <Link to={`/creator/${artwork.creator.handle}`} className="text-lg font-bold text-white hover:text-cyan-400 transition-colors block">
                    {artwork.creator.name}
                  </Link>
                  <p className="text-sm text-slate-400">{artwork.creator.followers} followers</p>
                </div>
              </div>
              <button 
                onClick={() => setIsFollowing(!isFollowing)}
                className={`mt-6 w-full py-2.5 rounded-xl text-sm font-bold transition-all ${
                  isFollowing 
                    ? 'bg-slate-800 text-white border border-slate-700 hover:bg-slate-700' 
                    : 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 hover:bg-cyan-500/20'
                }`}
              >
                {isFollowing ? 'Following' : 'Follow Creator'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Recommendations */}
      <div className="mt-24 border-t border-slate-800 pt-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-white">Similar Artworks</h2>
          <Link to={`/marketplace?category=${artwork.category}`} className="text-cyan-400 hover:text-cyan-300 font-medium text-sm flex items-center gap-1 transition-colors">
            View more <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {similarArtworks.map((item) => (
            <Link key={item.id} to={`/artwork/${item.id}`} className="group relative rounded-xl bg-slate-900 border border-slate-800 overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-cyan-500/10 hover:border-slate-700 flex flex-col">
              <div className="aspect-[16/10] w-full overflow-hidden relative">
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-3 right-3 rounded-md bg-slate-950/80 backdrop-blur-md px-2.5 py-1 text-xs font-semibold text-white border border-slate-700">
                  {item.type}
                </div>
              </div>
              <div className="p-4 flex-1 flex flex-col">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-base font-bold text-white group-hover:text-cyan-400 transition-colors line-clamp-1">{item.title}</h3>
                  <span className="text-base font-bold text-white ml-2">{item.price}</span>
                </div>
                <div className="mt-auto pt-2">
                  <span className="text-sm text-slate-400">{item.creator}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Fullscreen Modal */}
      {isFullscreen && (
        <div className="fixed inset-0 z-[100] bg-slate-950/95 backdrop-blur-xl flex items-center justify-center p-4 sm:p-8">
          <button 
            onClick={() => setIsFullscreen(false)}
            className="absolute top-6 right-6 p-3 rounded-full bg-slate-800/50 text-white hover:bg-slate-700 transition-colors"
          >
            <span className="sr-only">Close</span>
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <img 
            src={artwork.image} 
            alt={artwork.title} 
            className="max-h-full max-w-full object-contain rounded-lg shadow-2xl"
            referrerPolicy="no-referrer"
          />
        </div>
      )}
    </div>
  );
}

function EyeIcon() {
  return (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
    </svg>
  );
}
