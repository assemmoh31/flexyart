import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Settings, MapPin, Calendar, Link as LinkIcon, Twitter, Instagram, Github, X, Image as ImageIcon, Check, Monitor, Smartphone, Upload, Video, Layout, Type, Palette, Layers, Star, MessageSquare, Edit3 } from 'lucide-react';

// Mock data
const creatorData = {
  handle: 'NeonDreams',
  name: 'Neon Dreams Studio',
  avatar: 'https://picsum.photos/seed/user1/150/150',
  coverImage: 'https://picsum.photos/seed/cover1/1920/400',
  followers: '12.4k',
  following: '142',
  artworks: '84',
  bio: 'Digital artist specializing in cyberpunk and neon aesthetics. Creating premium Steam showcases since 2020.',
  location: 'Tokyo, Japan',
  memberSince: 'August 2020',
  socials: {
    twitter: 'https://twitter.com/neondreams',
    instagram: 'https://instagram.com/neondreams',
    website: 'https://neondreams.art'
  },
  featuredArtwork: {
    id: 1,
    title: 'Cyberpunk Neon City',
    image: 'https://picsum.photos/seed/cyber1/1200/600',
    type: 'Animated Showcase',
    description: 'My magnum opus. A fully animated cyberpunk cityscape perfectly looped for Steam.'
  },
  recentUploads: [
    { id: 1, title: 'Cyberpunk Neon City', price: '$15.00', image: 'https://picsum.photos/seed/cyber1/600/400', type: 'Animated', category: 'Sci-Fi' },
    { id: 10, title: 'Neon Alleyway', price: '$12.00', image: 'https://picsum.photos/seed/alley1/600/400', type: 'Animated', category: 'Sci-Fi' },
    { id: 11, title: 'Holographic UI', price: '$8.00', image: 'https://picsum.photos/seed/holo1/600/400', type: 'Static', category: 'Tech' },
  ]
};

export default function ProfileEditor() {
  const { handle } = useParams();
  const isOwner = true; 

  const [activeTab, setActiveTab] = useState('home');
  const [isDesignMode, setIsDesignMode] = useState(false);
  const [viewMode, setViewMode] = useState<'desktop' | 'mobile'>('desktop');
  const [isFollowing, setIsFollowing] = useState(false);
  
  // Customization State
  const [coverImage, setCoverImage] = useState(creatorData.coverImage);
  const [themeColor, setThemeColor] = useState('#00BCD4'); 
  const [textColor, setTextColor] = useState('#f8fafc'); 
  
  // New Customization State
  const [backgroundMedia, setBackgroundMedia] = useState<string | null>(null);
  const [textureOverlay, setTextureOverlay] = useState<'none' | 'noise' | 'scanlines' | 'grain'>('none');
  const [commissionStatus, setCommissionStatus] = useState<'open' | 'closed'>('open');
  const [bioText, setBioText] = useState(creatorData.bio);
  const [featuredVideo, setFeaturedVideo] = useState<string | null>(null);

  const customStyles = {
    '--profile-theme': themeColor,
    '--profile-text': textColor,
  } as React.CSSProperties;

  const handleMediaUpload = (e: React.ChangeEvent<HTMLInputElement>, setter: (val: string) => void) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setter(url);
    }
  };

  const isVideo = (url: string | null) => {
    return url?.match(/\.(mp4|webm|ogg)$/i) || url?.startsWith('blob:');
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col relative overflow-hidden" style={customStyles}>
      
      {/* Immersive Background (Parallax) */}
      {backgroundMedia && (
        <div className="fixed inset-0 z-0 pointer-events-none">
          {isVideo(backgroundMedia) ? (
            <video autoPlay loop muted playsInline className="w-full h-full object-cover">
              <source src={backgroundMedia} type="video/mp4" />
            </video>
          ) : (
            <img src={backgroundMedia} alt="Background" className="w-full h-full object-cover" />
          )}
          <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm"></div>
        </div>
      )}

      {/* Top Bar for Design Mode */}
      {isOwner && (
        <div className="sticky top-0 z-50 bg-slate-900 border-b border-slate-800 px-4 py-3 flex items-center justify-between shadow-xl">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-white font-bold">
              <Palette className="w-5 h-5 text-cyan-400" />
              FlexyArt Studio
            </div>
            {isDesignMode && (
              <div className="flex items-center bg-slate-950 rounded-lg p-1 border border-slate-800 ml-4">
                <button 
                  onClick={() => setViewMode('desktop')}
                  className={`p-2 rounded-md transition-colors ${viewMode === 'desktop' ? 'bg-slate-800 text-cyan-400' : 'text-slate-400 hover:text-white'}`}
                >
                  <Monitor className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => setViewMode('mobile')}
                  className={`p-2 rounded-md transition-colors ${viewMode === 'mobile' ? 'bg-slate-800 text-cyan-400' : 'text-slate-400 hover:text-white'}`}
                >
                  <Smartphone className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
          
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setIsDesignMode(!isDesignMode)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all ${
                isDesignMode 
                  ? 'bg-cyan-500 text-slate-950 shadow-[0_0_15px_rgba(0,188,212,0.4)]' 
                  : 'bg-slate-800 text-white hover:bg-slate-700 border border-slate-700'
              }`}
            >
              {isDesignMode ? <Check className="w-4 h-4" /> : <Edit3 className="w-4 h-4" />}
              {isDesignMode ? 'Save & Exit' : 'Design Mode'}
            </button>
          </div>
        </div>
      )}

      <div className="flex flex-1 relative z-10 overflow-hidden">
        {/* Main Profile Content */}
        <div className={`flex-1 overflow-y-auto transition-all duration-300 ${isDesignMode && viewMode === 'desktop' ? 'mr-80' : ''}`}>
          <div className={`mx-auto transition-all duration-300 ${viewMode === 'mobile' ? 'max-w-md border-x border-slate-800 bg-slate-950 min-h-screen shadow-2xl' : 'w-full'}`}>
            
            {/* The "Spotlight" Hero Layout */}
            <div className="relative">
              {/* Custom Banner */}
              <div className="relative h-64 md:h-80 lg:h-96 w-full bg-slate-900 overflow-hidden group">
                <img 
                  src={coverImage} 
                  alt="Cover" 
                  className="h-full w-full object-cover opacity-80"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent"></div>
                
                {/* Social Links Overlay */}
                <div className="absolute top-6 right-6 flex gap-3">
                  <a href={creatorData.socials.twitter} className="w-10 h-10 rounded-full bg-slate-900/50 backdrop-blur-md border border-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors">
                    <Twitter className="w-5 h-5" />
                  </a>
                  <a href={creatorData.socials.instagram} className="w-10 h-10 rounded-full bg-slate-900/50 backdrop-blur-md border border-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors">
                    <Instagram className="w-5 h-5" />
                  </a>
                </div>
              </div>

              {/* Profile Information */}
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 -mt-20 md:-mt-24 mb-8 relative z-10">
                  <div className="flex flex-col md:flex-row items-center md:items-end gap-6">
                    <div className="h-32 w-32 md:h-40 md:w-40 rounded-full border-4 border-slate-950 overflow-hidden bg-slate-800 shrink-0 shadow-2xl">
                      <img src={creatorData.avatar} alt={creatorData.name} className="h-full w-full object-cover" referrerPolicy="no-referrer" />
                    </div>
                    <div className="text-center md:text-left pb-2">
                      <h1 className="text-3xl md:text-4xl font-extrabold" style={{ color: 'var(--profile-text)' }}>{creatorData.name}</h1>
                      <p className="text-lg text-slate-400">@{creatorData.handle}</p>
                      <div className="flex items-center justify-center md:justify-start gap-4 mt-3 text-sm font-medium text-slate-300">
                        <span><strong style={{ color: 'var(--profile-text)' }}>{creatorData.followers}</strong> Followers</span>
                        <span><strong style={{ color: 'var(--profile-text)' }}>{creatorData.following}</strong> Following</span>
                        <span><strong style={{ color: 'var(--profile-text)' }}>{creatorData.artworks}</strong> Artworks</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-center gap-3 pb-2">
                    {/* Commission Status Toggle */}
                    <div className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-bold border ${commissionStatus === 'open' ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' : 'bg-red-500/10 border-red-500/30 text-red-400'}`}>
                      <div className={`w-2 h-2 rounded-full ${commissionStatus === 'open' ? 'bg-emerald-400 animate-pulse' : 'bg-red-400'}`}></div>
                      Commissions {commissionStatus === 'open' ? 'Open' : 'Closed'}
                    </div>

                    <button 
                      onClick={() => setIsFollowing(!isFollowing)}
                      className="px-8 py-2.5 rounded-lg text-sm font-bold transition-all shadow-lg"
                      style={{ 
                        backgroundColor: isFollowing ? 'transparent' : 'var(--profile-theme)',
                        color: isFollowing ? 'var(--profile-text)' : '#000',
                        border: isFollowing ? '1px solid var(--profile-theme)' : 'none',
                        boxShadow: isFollowing ? 'none' : `0 4px 14px 0 ${themeColor}40`
                      }}
                    >
                      {isFollowing ? 'Following' : 'Follow'}
                    </button>
                  </div>
                </div>

                {/* Profile Navigation */}
                <div className="border-b border-slate-800 mb-8">
                  <nav className="flex space-x-8">
                    {['home', 'shop', 'about'].map((tab) => (
                      <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`pb-4 text-sm font-medium capitalize transition-colors relative ${
                          activeTab === tab ? 'text-white' : 'text-slate-400 hover:text-slate-300'
                        }`}
                        style={{ color: activeTab === tab ? 'var(--profile-theme)' : undefined }}
                      >
                        {tab}
                        {activeTab === tab && (
                          <span 
                            className="absolute bottom-0 left-0 w-full h-0.5 rounded-t-full"
                            style={{ backgroundColor: 'var(--profile-theme)' }}
                          ></span>
                        )}
                      </button>
                    ))}
                  </nav>
                </div>

                {/* Tab Content */}
                <div className="pb-24">
                  {activeTab === 'home' && (
                    <div className="space-y-16">
                      {/* Featured Showcase (Magnum Opus) */}
                      <section>
                        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2" style={{ color: 'var(--profile-text)' }}>
                          <Star className="w-6 h-6" style={{ color: 'var(--profile-theme)' }} /> Featured Showcase
                        </h2>
                        <div className={`rounded-2xl bg-slate-900/80 backdrop-blur-md border border-slate-800 overflow-hidden flex flex-col lg:flex-row shadow-2xl relative ${textureOverlay !== 'none' ? `texture-${textureOverlay}` : ''}`}>
                          <div className="lg:w-2/3 bg-slate-950 flex items-center justify-center p-0 relative aspect-video">
                            {featuredVideo || isVideo(creatorData.featuredArtwork.image) ? (
                              <video autoPlay loop muted playsInline className="w-full h-full object-cover">
                                <source src={featuredVideo || creatorData.featuredArtwork.image} type="video/mp4" />
                              </video>
                            ) : (
                              <img 
                                src={creatorData.featuredArtwork.image} 
                                alt={creatorData.featuredArtwork.title} 
                                className="w-full h-full object-cover"
                                referrerPolicy="no-referrer"
                              />
                            )}
                          </div>
                          <div className="lg:w-1/3 p-8 flex flex-col justify-center">
                            <span className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: 'var(--profile-theme)' }}>
                              {creatorData.featuredArtwork.type}
                            </span>
                            <h3 className="text-3xl font-bold mb-4" style={{ color: 'var(--profile-text)' }}>
                              {creatorData.featuredArtwork.title}
                            </h3>
                            <p className="text-slate-400 leading-relaxed mb-8">
                              {creatorData.featuredArtwork.description}
                            </p>
                            <Link 
                              to={`/artwork/${creatorData.featuredArtwork.id}`}
                              className="inline-flex items-center justify-center gap-2 rounded-lg px-6 py-3 text-sm font-bold text-black transition-transform hover:scale-105 shadow-[0_0_20px_rgba(0,188,212,0.3)]"
                              style={{ backgroundColor: 'var(--profile-theme)' }}
                            >
                              View Details
                            </Link>
                          </div>
                        </div>
                      </section>

                      {/* Recent Uploads */}
                      <section>
                        <div className="flex items-center justify-between mb-6">
                          <h2 className="text-xl font-bold" style={{ color: 'var(--profile-text)' }}>Recent Uploads</h2>
                          <button onClick={() => setActiveTab('shop')} className="text-sm font-medium hover:underline" style={{ color: 'var(--profile-theme)' }}>
                            View All
                          </button>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                          {creatorData.recentUploads.map((artwork) => (
                            <ArtworkCard key={artwork.id} artwork={artwork} themeColor={themeColor} textColor={textColor} textureOverlay={textureOverlay} />
                          ))}
                        </div>
                      </section>
                    </div>
                  )}
                  {/* Other tabs would go here */}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Design Studio Sidebar */}
        {isDesignMode && (
          <div className="w-80 bg-slate-900 border-l border-slate-800 flex flex-col z-40 shadow-2xl shrink-0 absolute right-0 top-0 bottom-0 h-full">
            <div className="p-5 border-b border-slate-800 bg-slate-950">
              <h2 className="font-bold text-white flex items-center gap-2 text-lg">
                <Palette className="w-5 h-5 text-cyan-400" /> Design Studio
              </h2>
              <p className="text-xs text-slate-400 mt-1">Customize your storefront personality</p>
            </div>

            <div className="flex-1 overflow-y-auto p-5 space-y-8 no-scrollbar">
              
              {/* Immersive Background */}
              <div>
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                  <Layout className="w-4 h-4" /> The Stage (Background)
                </h3>
                <div className="relative h-24 w-full rounded-xl border-2 border-dashed border-slate-700 bg-slate-950 overflow-hidden group cursor-pointer hover:border-cyan-500 transition-colors">
                  {backgroundMedia ? (
                    isVideo(backgroundMedia) ? (
                      <video autoPlay loop muted playsInline className="w-full h-full object-cover opacity-50"><source src={backgroundMedia} type="video/mp4" /></video>
                    ) : (
                      <img src={backgroundMedia} alt="Background" className="w-full h-full object-cover opacity-50" />
                    )
                  ) : (
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-500 group-hover:text-cyan-400 transition-colors">
                      <Upload className="h-5 w-5 mb-1" />
                      <span className="text-xs font-medium">Upload Full-Page Wrap</span>
                    </div>
                  )}
                  <input type="file" accept="image/*,video/*" className="absolute inset-0 opacity-0 cursor-pointer" onChange={(e) => handleMediaUpload(e, setBackgroundMedia)} />
                </div>
                {backgroundMedia && (
                  <button onClick={() => setBackgroundMedia(null)} className="text-xs text-red-400 mt-2 hover:underline">Remove Background</button>
                )}
              </div>

              {/* Brand Colors */}
              <div>
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                  <Palette className="w-4 h-4" /> Brand Colors
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="text-xs text-slate-500 block mb-2">Primary Accent</label>
                    <div className="flex flex-wrap gap-2">
                      {['#00BCD4', '#a855f7', '#ec4899', '#f43f5e', '#FFD700', '#10b981', '#3b82f6'].map(color => (
                        <button
                          key={color}
                          onClick={() => setThemeColor(color)}
                          className="h-8 w-8 rounded-full flex items-center justify-center transition-transform hover:scale-110 border border-slate-700"
                          style={{ backgroundColor: color }}
                        >
                          {themeColor === color && <Check className="h-4 w-4 text-slate-950 drop-shadow-md" />}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="text-xs text-slate-500 block mb-2">Text Color</label>
                    <div className="flex flex-wrap gap-2">
                      {['#f8fafc', '#e2e8f0', '#cbd5e1', '#94a3b8', '#00BCD4', '#a855f7'].map(color => (
                        <button
                          key={color}
                          onClick={() => setTextColor(color)}
                          className="h-8 w-8 rounded-full flex items-center justify-center border border-slate-700 transition-transform hover:scale-110"
                          style={{ backgroundColor: color }}
                        >
                          {textColor === color && <Check className="h-4 w-4 text-slate-900 drop-shadow-md" />}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Texture Overlays */}
              <div>
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                  <Layers className="w-4 h-4" /> Texture Overlays
                </h3>
                <div className="space-y-2">
                  {[
                    { id: 'none', label: 'Clean (None)' },
                    { id: 'noise', label: 'Digital Noise' },
                    { id: 'scanlines', label: 'CRT Scanlines' },
                    { id: 'grain', label: 'Film Grain' }
                  ].map(overlay => (
                    <label key={overlay.id} className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-colors ${textureOverlay === overlay.id ? 'bg-slate-800 border-cyan-500' : 'bg-slate-950 border-slate-800 hover:border-slate-700'}`}>
                      <input 
                        type="radio" 
                        name="texture" 
                        value={overlay.id} 
                        checked={textureOverlay === overlay.id}
                        onChange={() => setTextureOverlay(overlay.id as any)}
                        className="accent-cyan-500"
                      />
                      <span className="text-sm text-white">{overlay.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Modular Blocks */}
              <div>
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                  <Layout className="w-4 h-4" /> Modular Blocks
                </h3>
                <div className="space-y-4">
                  {/* Bio Edit */}
                  <div>
                    <label className="text-xs text-slate-500 block mb-2">About the Artist</label>
                    <textarea 
                      value={bioText}
                      onChange={(e) => setBioText(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-sm text-white focus:outline-none focus:border-cyan-500 h-24 resize-none"
                    />
                  </div>
                  
                  {/* Commission Status */}
                  <div>
                    <label className="text-xs text-slate-500 block mb-2">Commission Status</label>
                    <div className="flex bg-slate-950 p-1 rounded-xl border border-slate-800">
                      <button 
                        onClick={() => setCommissionStatus('open')}
                        className={`flex-1 py-2 text-sm font-medium rounded-lg transition-colors ${commissionStatus === 'open' ? 'bg-emerald-500/20 text-emerald-400 shadow-sm' : 'text-slate-400 hover:text-white'}`}
                      >
                        Open
                      </button>
                      <button 
                        onClick={() => setCommissionStatus('closed')}
                        className={`flex-1 py-2 text-sm font-medium rounded-lg transition-colors ${commissionStatus === 'closed' ? 'bg-red-500/20 text-red-400 shadow-sm' : 'text-slate-400 hover:text-white'}`}
                      >
                        Closed
                      </button>
                    </div>
                  </div>

                  {/* Featured Video */}
                  <div>
                    <label className="text-xs text-slate-500 block mb-2">Featured Showcase (Video/Image)</label>
                    <div className="relative h-20 w-full rounded-xl border-2 border-dashed border-slate-700 bg-slate-950 overflow-hidden group cursor-pointer hover:border-cyan-500 transition-colors">
                      {featuredVideo ? (
                        <video autoPlay loop muted playsInline className="w-full h-full object-cover opacity-50"><source src={featuredVideo} type="video/mp4" /></video>
                      ) : (
                        <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-500 group-hover:text-cyan-400 transition-colors">
                          <Video className="h-4 w-4 mb-1" />
                          <span className="text-xs font-medium">Upload Media</span>
                        </div>
                      )}
                      <input type="file" accept="video/*,image/*" className="absolute inset-0 opacity-0 cursor-pointer" onChange={(e) => handleMediaUpload(e, setFeaturedVideo)} />
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Reusable Artwork Card Component
const ArtworkCard: React.FC<{ artwork: any, themeColor: string, textColor: string, textureOverlay: string }> = ({ artwork, themeColor, textColor, textureOverlay }) => {
  return (
    <Link to={`/artwork/${artwork.id}`} className={`group relative rounded-xl bg-slate-900/80 backdrop-blur-md border border-slate-800 overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-slate-700 flex flex-col ${textureOverlay !== 'none' ? `texture-${textureOverlay}` : ''}`} style={{ '--hover-shadow': `${themeColor}40` } as React.CSSProperties}>
      <style>{`
        .group:hover { box-shadow: 0 10px 25px -5px var(--hover-shadow); }
      `}</style>
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
        <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px]">
          <button 
            className="rounded-lg px-6 py-2.5 text-sm font-bold text-slate-950 shadow-[0_0_15px_rgba(0,188,212,0.5)] transition-transform transform translate-y-4 group-hover:translate-y-0 duration-300 hover:scale-105"
            style={{ backgroundColor: themeColor }}
          >
            View Details
          </button>
        </div>
      </div>
      <div className="p-4 flex-1 flex flex-col relative z-10">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-base font-bold transition-colors line-clamp-1" style={{ color: textColor }}>{artwork.title}</h3>
          <span className="text-base font-bold" style={{ color: textColor }}>{artwork.price}</span>
        </div>
        <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-800/50">
          <span className="text-xs font-medium text-slate-500 bg-slate-800 px-2 py-1 rounded-md">{artwork.category}</span>
        </div>
      </div>
    </Link>
  );
}
