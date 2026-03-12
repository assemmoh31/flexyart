import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Settings, MapPin, Calendar, Link as LinkIcon, Twitter, Instagram, Github, X, Image as ImageIcon, Check, Palette } from 'lucide-react';
import { FallingLeaves } from '../components/FallingLeaves';
import { AuroraWaves } from '../components/AuroraWaves';
import { GlowLines } from '../components/GlowLines';
import { CosmicParticles } from '../components/CosmicParticles';
import { PixelSparkle } from '../components/PixelSparkle';
import { HandDrawnBorder } from '../components/HandDrawnBorder';

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
  ],
  shopItems: [
    { id: 1, title: 'Cyberpunk Neon City', price: '$15.00', image: 'https://picsum.photos/seed/cyber1/600/400', type: 'Animated', category: 'Sci-Fi' },
    { id: 10, title: 'Neon Alleyway', price: '$12.00', image: 'https://picsum.photos/seed/alley1/600/400', type: 'Animated', category: 'Sci-Fi' },
    { id: 11, title: 'Holographic UI', price: '$8.00', image: 'https://picsum.photos/seed/holo1/600/400', type: 'Static', category: 'Tech' },
    { id: 12, title: 'Cyber Samurai', price: '$20.00', image: 'https://picsum.photos/seed/samurai1/600/400', type: 'Theme Bundle', category: 'Sci-Fi' },
    { id: 13, title: 'Neon Grid', price: '$5.00', image: 'https://picsum.photos/seed/grid1/600/400', type: 'Static', category: 'Retro' },
    { id: 14, title: 'Glitch Art Profile', price: '$18.00', image: 'https://picsum.photos/seed/glitch1/600/400', type: 'Theme Bundle', category: 'Glitch' },
  ]
};

export default function Profile() {
  const { handle } = useParams();
  // In a real app, check if the logged-in user matches the profile handle
  const isOwner = true; 

  const [activeTab, setActiveTab] = useState('home');
  const [isCustomizing, setIsCustomizing] = useState(false);
  const [isThemeSidebarOpen, setIsThemeSidebarOpen] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const [activeTheme, setActiveTheme] = useState('default');
  
  // Customization State
  const [coverImage, setCoverImage] = useState(creatorData.coverImage);
  const [themeColor, setThemeColor] = useState('#22d3ee'); // Default cyan-400
  const [textColor, setTextColor] = useState('#f8fafc'); // Default slate-50

  const customStyles = {
    '--profile-theme': themeColor,
    '--profile-text': textColor,
  } as React.CSSProperties;

  const handleCoverImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setCoverImage(url);
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { currentTarget, clientX, clientY } = e;
    const { left, top } = currentTarget.getBoundingClientRect();
    const x = clientX - left;
    const y = clientY - top;
    currentTarget.style.setProperty('--mouse-x', `${x}px`);
    currentTarget.style.setProperty('--mouse-y', `${y}px`);
  };

  return (
    <div 
      className="min-h-screen bg-slate-950" 
      style={customStyles} 
      data-theme={activeTheme}
      onMouseMove={handleMouseMove}
    >
      {activeTheme === 'forest-whisper' && <FallingLeaves />}
      {activeTheme === 'aurora-sky' && <AuroraWaves />}
      {activeTheme === 'obsidian-glass' && <GlowLines />}
      {activeTheme === 'infinite-space' && <CosmicParticles />}
      {activeTheme === 'pixel-arcade' && <PixelSparkle />}
      {activeTheme === 'sketchbook' && <HandDrawnBorder />}
      {/* Cover Image Header */}
      <div className="relative h-64 md:h-80 lg:h-96 w-full bg-slate-900 overflow-hidden">
        <img 
          src={coverImage} 
          alt="Cover" 
          className="h-full w-full object-cover opacity-80"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent"></div>
      </div>

      {/* Profile Information */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 -mt-20 md:-mt-24 mb-8 relative z-10">
          <div className="flex flex-col md:flex-row items-center md:items-end gap-6">
            <div className="h-32 w-32 md:h-40 md:w-40 rounded-full border-4 border-slate-950 bg-slate-800 shrink-0 relative">
              <img src={creatorData.avatar} alt={creatorData.name} className="h-full w-full object-cover rounded-full relative z-10" referrerPolicy="no-referrer" />
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
            {isOwner && (
              <>
                <button 
                  onClick={() => setIsCustomizing(true)}
                  className="flex items-center gap-2 rounded-lg border border-slate-700 bg-slate-900/80 backdrop-blur-sm px-4 py-2.5 text-sm font-semibold text-white hover:bg-slate-800 transition-colors"
                >
                  <Settings className="h-4 w-4" /> Customize Profile
                </button>
                <button 
                  onClick={() => setIsThemeSidebarOpen(true)}
                  className="flex items-center gap-2 rounded-lg border border-cyan-500/50 bg-cyan-500/10 backdrop-blur-sm px-4 py-2.5 text-sm font-semibold text-cyan-400 hover:bg-cyan-500/20 transition-colors"
                >
                  <Palette className="h-4 w-4" /> Customize Theme
                </button>
              </>
            )}
            <button 
              onClick={() => setIsFollowing(!isFollowing)}
              className="theme-glow-target px-8 py-2.5 rounded-lg text-sm font-bold transition-all shadow-lg"
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
          {/* HOME TAB */}
          {activeTab === 'home' && (
            <div className="space-y-16">
              {/* Featured Artwork */}
              <section>
                <h2 className="text-xl font-bold mb-6" style={{ color: 'var(--profile-text)' }}>Featured Gallery</h2>
                <div className="rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden flex flex-col lg:flex-row">
                  <div className="lg:w-2/3 bg-slate-950 flex items-center justify-center p-4">
                    <img 
                      src={creatorData.featuredArtwork.image} 
                      alt={creatorData.featuredArtwork.title} 
                      className="max-h-[500px] w-auto object-contain rounded-lg shadow-2xl"
                      referrerPolicy="no-referrer"
                    />
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
                      className="theme-glow-target inline-flex items-center justify-center gap-2 rounded-lg px-6 py-3 text-sm font-bold text-black transition-transform hover:scale-105"
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
                    <ArtworkCard key={artwork.id} artwork={artwork} themeColor={themeColor} textColor={textColor} />
                  ))}
                </div>
              </section>
            </div>
          )}

          {/* SHOP TAB */}
          {activeTab === 'shop' && (
            <section>
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold" style={{ color: 'var(--profile-text)' }}>Shop</h2>
                <div className="flex gap-2">
                  <select className="bg-slate-900 border border-slate-800 text-slate-300 text-sm rounded-lg focus:ring-1 focus:outline-none px-3 py-2" style={{ focusRingColor: 'var(--profile-theme)' }}>
                    <option>Latest</option>
                    <option>Popular</option>
                    <option>Price: Low to High</option>
                    <option>Price: High to Low</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {creatorData.shopItems.map((artwork) => (
                  <ArtworkCard key={artwork.id} artwork={artwork} themeColor={themeColor} textColor={textColor} />
                ))}
              </div>
            </section>
          )}

          {/* ABOUT TAB */}
          {activeTab === 'about' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
              <div className="lg:col-span-2 space-y-8">
                <section className="bg-slate-900 border border-slate-800 rounded-2xl p-8">
                  <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--profile-text)' }}>About {creatorData.handle}</h2>
                  <p className="text-slate-300 leading-relaxed text-lg whitespace-pre-line">
                    {creatorData.bio}
                  </p>
                </section>
                
                <section className="bg-slate-900 border border-slate-800 rounded-2xl p-8">
                  <h2 className="text-xl font-bold mb-6" style={{ color: 'var(--profile-text)' }}>Profile Comments</h2>
                  <div className="text-center py-10 text-slate-500">
                    <p>No comments yet. Be the first to say hello!</p>
                  </div>
                </section>
              </div>

              <div className="space-y-6">
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
                  <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-6">Details</h3>
                  <ul className="space-y-4">
                    <li className="flex items-center gap-3 text-slate-300">
                      <MapPin className="h-5 w-5 text-slate-500" />
                      {creatorData.location}
                    </li>
                    <li className="flex items-center gap-3 text-slate-300">
                      <Calendar className="h-5 w-5 text-slate-500" />
                      Joined {creatorData.memberSince}
                    </li>
                  </ul>
                </div>

                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
                  <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-6">Links</h3>
                  <ul className="space-y-4">
                    <li>
                      <a href={creatorData.socials.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-slate-300 hover:text-white transition-colors">
                        <LinkIcon className="h-5 w-5 text-slate-500" />
                        Website
                      </a>
                    </li>
                    <li>
                      <a href={creatorData.socials.twitter} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-slate-300 hover:text-white transition-colors">
                        <Twitter className="h-5 w-5 text-slate-500" />
                        Twitter
                      </a>
                    </li>
                    <li>
                      <a href={creatorData.socials.instagram} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-slate-300 hover:text-white transition-colors">
                        <Instagram className="h-5 w-5 text-slate-500" />
                        Instagram
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Customization Modal / Sidebar */}
      {isCustomizing && (
        <div className="fixed inset-0 z-[100] flex justify-end bg-slate-950/50 backdrop-blur-sm">
          <div className="w-full max-w-md bg-slate-900 border-l border-slate-800 h-full overflow-y-auto shadow-2xl animate-in slide-in-from-right">
            <div className="sticky top-0 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 p-6 flex items-center justify-between z-10">
              <h2 className="text-xl font-bold text-white">Customize Profile</h2>
              <button onClick={() => setIsCustomizing(false)} className="text-slate-400 hover:text-white transition-colors p-2 rounded-lg hover:bg-slate-800">
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <div className="p-6 space-y-8">
              {/* Cover Image */}
              <section>
                <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wider mb-4">Cover Image</h3>
                <div className="relative h-32 w-full rounded-xl border-2 border-dashed border-slate-700 bg-slate-950 overflow-hidden group cursor-pointer hover:border-slate-500 transition-colors">
                  <img src={coverImage} alt="Cover Preview" className="h-full w-full object-cover opacity-50 group-hover:opacity-30 transition-opacity" />
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-400 group-hover:text-white transition-colors">
                    <ImageIcon className="h-6 w-6 mb-2" />
                    <span className="text-sm font-medium">Upload New Cover</span>
                  </div>
                  <input 
                    type="file" 
                    accept="image/*" 
                    className="absolute inset-0 opacity-0 cursor-pointer"
                    onChange={handleCoverImageChange}
                  />
                </div>
              </section>

              {/* Theme Color */}
              <section>
                <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wider mb-4">Theme Color</h3>
                <p className="text-xs text-slate-500 mb-4">Changes the color of buttons, active tabs, and accents.</p>
                <div className="flex flex-wrap gap-3">
                  {['#22d3ee', '#a855f7', '#ec4899', '#f43f5e', '#f59e0b', '#10b981', '#3b82f6'].map(color => (
                    <button
                      key={color}
                      onClick={() => setThemeColor(color)}
                      className="h-10 w-10 rounded-full flex items-center justify-center transition-transform hover:scale-110"
                      style={{ backgroundColor: color }}
                    >
                      {themeColor === color && <Check className="h-5 w-5 text-white drop-shadow-md" />}
                    </button>
                  ))}
                </div>
                <div className="mt-4 flex items-center gap-3">
                  <input 
                    type="color" 
                    value={themeColor} 
                    onChange={(e) => setThemeColor(e.target.value)}
                    className="h-10 w-10 rounded cursor-pointer bg-slate-950 border border-slate-700"
                  />
                  <span className="text-sm text-slate-400 font-mono">{themeColor}</span>
                </div>
              </section>

              {/* Text Color */}
              <section>
                <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wider mb-4">Primary Text Color</h3>
                <p className="text-xs text-slate-500 mb-4">Changes the color of headings and main text.</p>
                <div className="flex flex-wrap gap-3">
                  {['#f8fafc', '#e2e8f0', '#cbd5e1', '#94a3b8', '#22d3ee', '#a855f7'].map(color => (
                    <button
                      key={color}
                      onClick={() => setTextColor(color)}
                      className="h-10 w-10 rounded-full flex items-center justify-center border border-slate-700 transition-transform hover:scale-110"
                      style={{ backgroundColor: color }}
                    >
                      {textColor === color && <Check className="h-5 w-5 text-slate-900 drop-shadow-md" />}
                    </button>
                  ))}
                </div>
                <div className="mt-4 flex items-center gap-3">
                  <input 
                    type="color" 
                    value={textColor} 
                    onChange={(e) => setTextColor(e.target.value)}
                    className="h-10 w-10 rounded cursor-pointer bg-slate-950 border border-slate-700"
                  />
                  <span className="text-sm text-slate-400 font-mono">{textColor}</span>
                </div>
              </section>
            </div>

            <div className="p-6 border-t border-slate-800 bg-slate-900 sticky bottom-0 z-10">
              <button 
                onClick={() => setIsCustomizing(false)}
                className="w-full rounded-lg py-3 text-sm font-bold text-black transition-transform hover:scale-[1.02]"
                style={{ backgroundColor: 'var(--profile-theme)' }}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Theme Sidebar */}
      {isThemeSidebarOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setIsThemeSidebarOpen(false)}
          ></div>
          <div className="relative w-full max-w-md bg-slate-950 border-l border-slate-800 h-full flex flex-col shadow-2xl animate-in slide-in-from-right duration-300">
            <div className="flex items-center justify-between p-6 border-b border-slate-800">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <Palette className="w-5 h-5 text-cyan-400" />
                Theme Engine
              </h2>
              <button 
                onClick={() => setIsThemeSidebarOpen(false)}
                className="p-2 text-slate-400 hover:text-white rounded-full hover:bg-slate-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              <div className="space-y-4">
                <p className="text-sm text-slate-400">Apply a visual skin to your public profile. These themes override your custom colors.</p>
                
                {/* Default Theme */}
                <div className={`relative rounded-xl border-2 overflow-hidden transition-all ${activeTheme === 'default' ? 'border-cyan-500 shadow-[0_0_15px_rgba(0,188,212,0.3)]' : 'border-slate-800 hover:border-slate-600'}`}>
                  <div className="h-24 bg-slate-900 flex items-center justify-center relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-slate-800 to-slate-950"></div>
                    <div className="relative z-10 flex gap-2">
                      <div className="w-8 h-8 rounded-full bg-cyan-500"></div>
                      <div className="w-8 h-8 rounded-full bg-purple-500"></div>
                    </div>
                  </div>
                  <div className="p-4 bg-slate-950 flex items-center justify-between">
                    <div>
                      <h3 className="font-bold text-white">Default</h3>
                      <p className="text-xs text-slate-400">Standard Luxury Dark Mode</p>
                    </div>
                    <button 
                      onClick={() => setActiveTheme('default')}
                      className={`px-4 py-2 rounded-lg text-sm font-bold transition-colors ${activeTheme === 'default' ? 'bg-cyan-500 text-slate-950' : 'bg-slate-800 text-white hover:bg-slate-700'}`}
                    >
                      {activeTheme === 'default' ? 'Active' : 'Apply'}
                    </button>
                  </div>
                </div>

                {/* Neon Pulse Theme */}
                <div className={`relative rounded-xl border-2 overflow-hidden transition-all ${activeTheme === 'neon-pulse' ? 'border-[#00e5ff] shadow-[0_0_20px_rgba(0,229,255,0.4)]' : 'border-slate-800 hover:border-slate-600'}`}>
                  <div className="h-24 bg-[#050505] flex items-center justify-center relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a0a] to-[#050505]"></div>
                    <div className="relative z-10 flex gap-2">
                      <div className="w-8 h-8 rounded-full bg-[#00e5ff] shadow-[0_0_15px_#00e5ff]"></div>
                      <div className="w-8 h-8 rounded-full bg-[#ff4081] shadow-[0_0_15px_#ff4081]"></div>
                    </div>
                  </div>
                  <div className="p-4 bg-[#050505] flex items-center justify-between border-t border-slate-800">
                    <div>
                      <h3 className="font-bold text-white">Neon Pulse</h3>
                      <p className="text-xs text-slate-400">Breathing neon glows</p>
                    </div>
                    <button 
                      onClick={() => setActiveTheme('neon-pulse')}
                      className={`px-4 py-2 rounded-lg text-sm font-bold transition-colors ${activeTheme === 'neon-pulse' ? 'bg-transparent border border-[#00e5ff] text-[#00e5ff] shadow-[0_0_10px_rgba(0,229,255,0.5)]' : 'bg-slate-800 text-white hover:bg-slate-700'}`}
                    >
                      {activeTheme === 'neon-pulse' ? 'Active' : 'Apply'}
                    </button>
                  </div>
                </div>

                {/* Cyber Grid Theme */}
                <div className={`relative rounded-xl border-2 overflow-hidden transition-all ${activeTheme === 'cyber-grid' ? 'border-[#00BCD4] shadow-[0_0_20px_rgba(0,188,212,0.4)]' : 'border-slate-800 hover:border-slate-600'}`}>
                  <div className="h-24 bg-[#0F172A] flex items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0" style={{ backgroundImage: 'linear-gradient(rgba(0, 188, 212, 0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 188, 212, 0.2) 1px, transparent 1px)', backgroundSize: '10px 10px' }}></div>
                    <div className="relative z-10 flex gap-2">
                      <div className="w-8 h-8 rounded-sm bg-[#00BCD4] shadow-[0_0_10px_#00BCD4]"></div>
                      <div className="w-8 h-8 rounded-sm bg-[#81C784] shadow-[0_0_10px_#81C784]"></div>
                    </div>
                  </div>
                  <div className="p-4 bg-[#0F172A] flex items-center justify-between border-t border-slate-800">
                    <div>
                      <h3 className="font-bold text-white">Cyber Grid</h3>
                      <p className="text-xs text-slate-400">Holographic UI & scanlines</p>
                    </div>
                    <button 
                      onClick={() => setActiveTheme('cyber-grid')}
                      className={`px-4 py-2 rounded-lg text-sm font-bold transition-colors ${activeTheme === 'cyber-grid' ? 'bg-transparent border border-[#00BCD4] text-[#00BCD4] shadow-[inset_0_0_10px_rgba(0,188,212,0.5)]' : 'bg-slate-800 text-white hover:bg-slate-700'}`}
                    >
                      {activeTheme === 'cyber-grid' ? 'Active' : 'Apply'}
                    </button>
                  </div>
                </div>

                {/* Forest Whisper Theme */}
                <div className={`relative rounded-xl border-2 overflow-hidden transition-all ${activeTheme === 'forest-whisper' ? 'border-[#8BC34A] shadow-[0_0_20px_rgba(139,195,74,0.4)]' : 'border-slate-800 hover:border-slate-600'}`}>
                  <div className="h-24 bg-[#1B5E20] flex items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E\")" }}></div>
                    <div className="relative z-10 flex gap-2">
                      <div className="w-8 h-8 rounded-full bg-[#8BC34A] shadow-[0_0_10px_#8BC34A]"></div>
                      <div className="w-8 h-8 rounded-full bg-[#BFA071] shadow-[0_0_10px_#BFA071]"></div>
                    </div>
                  </div>
                  <div className="p-4 bg-[#1B5E20] flex items-center justify-between border-t border-[#2E7D32]">
                    <div>
                      <h3 className="font-bold text-[#E8F5E9]">Forest Whisper</h3>
                      <p className="text-xs text-[#C8E6C9]">Organic wood & leaves</p>
                    </div>
                    <button 
                      onClick={() => setActiveTheme('forest-whisper')}
                      className={`px-4 py-2 rounded-lg text-sm font-bold transition-colors ${activeTheme === 'forest-whisper' ? 'bg-[#8BC34A] text-[#1B5E20]' : 'bg-[#2E7D32] text-[#E8F5E9] hover:bg-[#388E3C]'}`}
                    >
                      {activeTheme === 'forest-whisper' ? 'Active' : 'Apply'}
                    </button>
                  </div>
                </div>

                {/* Aurora Sky Theme */}
                <div className={`relative rounded-xl border-2 overflow-hidden transition-all ${activeTheme === 'aurora-sky' ? 'border-[#43E97B] shadow-[0_0_20px_rgba(67,233,123,0.4)]' : 'border-slate-800 hover:border-slate-600'}`}>
                  <div className="h-24 bg-[#05070A] flex items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 opacity-50">
                      <div className="absolute top-[-20%] left-[-10%] w-16 h-16 bg-[#43E97B] rounded-full filter blur-xl mix-blend-screen"></div>
                      <div className="absolute top-[10%] right-[-10%] w-20 h-20 bg-[#7028E4] rounded-full filter blur-xl mix-blend-screen"></div>
                      <div className="absolute bottom-[-20%] left-[20%] w-16 h-16 bg-[#38F9D7] rounded-full filter blur-xl mix-blend-screen"></div>
                    </div>
                    <div className="relative z-10 flex gap-2">
                      <div className="w-8 h-8 rounded-full bg-[#43E97B] shadow-[0_0_10px_#43E97B]"></div>
                      <div className="w-8 h-8 rounded-full bg-[#7028E4] shadow-[0_0_10px_#7028E4]"></div>
                    </div>
                  </div>
                  <div className="p-4 bg-[#05070A] flex items-center justify-between border-t border-slate-800">
                    <div>
                      <h3 className="font-bold text-white">Aurora Sky</h3>
                      <p className="text-xs text-slate-400">Ethereal light waves</p>
                    </div>
                    <button 
                      onClick={() => setActiveTheme('aurora-sky')}
                      className={`px-4 py-2 rounded-lg text-sm font-bold transition-colors ${activeTheme === 'aurora-sky' ? 'bg-transparent border border-[#43E97B] text-[#43E97B] shadow-[inset_0_0_10px_rgba(67,233,123,0.5)]' : 'bg-slate-800 text-white hover:bg-slate-700'}`}
                    >
                      {activeTheme === 'aurora-sky' ? 'Active' : 'Apply'}
                    </button>
                  </div>
                </div>

                {/* Obsidian Glass Theme */}
                <div className={`relative rounded-xl border-2 overflow-hidden transition-all ${activeTheme === 'obsidian-glass' ? 'border-[#00BCD4] shadow-[0_0_20px_rgba(0,188,212,0.4)]' : 'border-slate-800 hover:border-slate-600'}`}>
                  <div className="h-24 bg-[#050505] flex items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 opacity-30">
                      <div className="bg-gradient-to-r from-transparent via-[#00BCD4] to-transparent h-[2px] w-[200%] absolute top-[30%] left-[-50%] rotate-[-15deg]"></div>
                      <div className="bg-gradient-to-r from-transparent via-[#7028E4] to-transparent h-[1px] w-[200%] absolute top-[70%] left-[-50%] rotate-[10deg]"></div>
                    </div>
                    <div className="relative z-10 flex gap-2">
                      <div className="w-8 h-8 rounded-full bg-[#050505] border border-white/20 shadow-[0_0_10px_rgba(0,188,212,0.5)] backdrop-blur-md"></div>
                      <div className="w-8 h-8 rounded-full bg-[#050505] border border-white/20 shadow-[0_0_10px_rgba(112,40,228,0.5)] backdrop-blur-md"></div>
                    </div>
                  </div>
                  <div className="p-4 bg-[#050505] flex items-center justify-between border-t border-white/10">
                    <div>
                      <h3 className="font-bold text-white">Obsidian Glass</h3>
                      <p className="text-xs text-slate-400">Glossy black & neon leaks</p>
                    </div>
                    <button 
                      onClick={() => setActiveTheme('obsidian-glass')}
                      className={`px-4 py-2 rounded-lg text-sm font-bold transition-colors ${activeTheme === 'obsidian-glass' ? 'bg-transparent border border-[#00BCD4] text-[#00BCD4] shadow-[inset_0_0_10px_rgba(0,188,212,0.5)]' : 'bg-white/10 text-white hover:bg-white/20 border border-white/20'}`}
                    >
                      {activeTheme === 'obsidian-glass' ? 'Active' : 'Apply'}
                    </button>
                  </div>
                </div>

                {/* Infinite Space Theme */}
                <div className={`relative rounded-xl border-2 overflow-hidden transition-all ${activeTheme === 'infinite-space' ? 'border-[#007FFF] shadow-[0_0_20px_rgba(0,127,255,0.4)]' : 'border-slate-800 hover:border-slate-600'}`}>
                  <div className="h-24 bg-[#000005] flex items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#0A0A12] via-[#000005] to-[#000005]"></div>
                    <div className="absolute inset-0 opacity-50">
                      <div className="w-1 h-1 bg-white rounded-full absolute top-[20%] left-[30%] shadow-[0_0_5px_#007FFF]"></div>
                      <div className="w-1.5 h-1.5 bg-white rounded-full absolute top-[60%] left-[70%] shadow-[0_0_8px_#673AB7]"></div>
                      <div className="w-0.5 h-0.5 bg-white rounded-full absolute top-[40%] left-[50%]"></div>
                      <svg className="absolute inset-0 w-full h-full opacity-40" xmlns="http://www.w3.org/2000/svg">
                        <line x1="30%" y1="20%" x2="70%" y2="60%" stroke="#007FFF" strokeWidth="0.5" />
                      </svg>
                    </div>
                    <div className="relative z-10 flex gap-2">
                      <div className="w-8 h-8 rounded-full bg-[#007FFF] shadow-[0_0_10px_#007FFF]" style={{ clipPath: 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)' }}></div>
                      <div className="w-8 h-8 rounded-full bg-[#673AB7] shadow-[0_0_10px_#673AB7]" style={{ clipPath: 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)' }}></div>
                    </div>
                  </div>
                  <div className="p-4 bg-[#000005] flex items-center justify-between border-t border-[#007FFF]/30">
                    <div>
                      <h3 className="font-bold text-white">Infinite Space</h3>
                      <p className="text-xs text-slate-400">Cosmic particles & tech</p>
                    </div>
                    <button 
                      onClick={() => setActiveTheme('infinite-space')}
                      className={`px-4 py-2 rounded-lg text-sm font-bold transition-colors ${activeTheme === 'infinite-space' ? 'bg-transparent border border-[#007FFF] text-[#007FFF] shadow-[inset_0_0_10px_rgba(0,127,255,0.5)]' : 'bg-[#0A0A12] text-white hover:bg-[#151525] border border-white/10'}`}
                    >
                      {activeTheme === 'infinite-space' ? 'Active' : 'Apply'}
                    </button>
                  </div>
                </div>

                {/* Pixel Arcade Theme */}
                <div className={`relative rounded-xl border-2 overflow-hidden transition-all ${activeTheme === 'pixel-arcade' ? 'border-[#FFCC00] shadow-[0_0_20px_rgba(255,204,0,0.4)]' : 'border-slate-800 hover:border-slate-600'}`}>
                  <div className="h-24 bg-[#0B0B1A] flex items-center justify-center relative overflow-hidden" style={{ imageRendering: 'pixelated' }}>
                    <div className="absolute inset-0 opacity-30 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSIjMEIwQjFBIj48L3JlY3Q+CjxyZWN0IHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9IiMxYTFhMzMiPjwvcmVjdD4KPC9zdmc+')]"></div>
                    <div className="relative z-10 flex gap-2">
                      <div className="w-8 h-8 bg-[#FF0044] border-2 border-white shadow-[2px_2px_0px_#000]"></div>
                      <div className="w-8 h-8 bg-[#00FFFF] border-2 border-white shadow-[2px_2px_0px_#000]"></div>
                    </div>
                  </div>
                  <div className="p-4 bg-[#0B0B1A] flex items-center justify-between border-t border-[#FF0044]">
                    <div>
                      <h3 className="font-bold text-white" style={{ fontFamily: '"Press Start 2P", monospace', fontSize: '10px' }}>Pixel Arcade</h3>
                      <p className="text-xs text-slate-400 mt-1">8-bit retro gaming</p>
                    </div>
                    <button 
                      onClick={() => setActiveTheme('pixel-arcade')}
                      className={`px-4 py-2 text-xs font-bold transition-colors border-2 ${activeTheme === 'pixel-arcade' ? 'bg-[#FFCC00] border-white text-black shadow-[2px_2px_0px_#000]' : 'bg-[#15152A] text-white hover:bg-[#2A2A4A] border-[#00FFFF] shadow-[2px_2px_0px_#000]'}`}
                      style={{ fontFamily: '"Press Start 2P", monospace', fontSize: '8px' }}
                    >
                      {activeTheme === 'pixel-arcade' ? 'ON' : 'SET'}
                    </button>
                  </div>
                </div>

                {/* Sketchbook Theme */}
                <div className={`relative rounded-xl border-2 overflow-hidden transition-all ${activeTheme === 'sketchbook' ? 'border-[#333333] shadow-[0_0_20px_rgba(51,51,51,0.2)]' : 'border-slate-800 hover:border-slate-600'}`}>
                  <div className="h-24 bg-[#F5F5F0] flex items-center justify-center relative overflow-hidden" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23noise)' opacity='0.08'/%3E%3C/svg%3E\")" }}>
                    <div className="relative z-10 flex gap-2">
                      <div className="w-8 h-8 bg-transparent border-2 border-[#333333]" style={{ borderRadius: '255px 15px 225px 15px/15px 225px 15px 255px' }}></div>
                      <div className="w-8 h-8 bg-transparent border-2 border-[#333333]" style={{ borderRadius: '15px 255px 15px 225px/225px 15px 255px 15px' }}></div>
                    </div>
                  </div>
                  <div className="p-4 bg-[#F5F5F0] flex items-center justify-between border-t border-[#333333]">
                    <div>
                      <h3 className="font-bold text-[#333333]" style={{ fontFamily: '"Architects Daughter", cursive' }}>Sketchbook</h3>
                      <p className="text-xs text-[#666666]">Hand-drawn aesthetic</p>
                    </div>
                    <button 
                      onClick={() => setActiveTheme('sketchbook')}
                      className={`px-4 py-2 text-sm font-bold transition-colors border-2 ${activeTheme === 'sketchbook' ? 'bg-[#333333] border-[#333333] text-[#F5F5F0]' : 'bg-transparent text-[#333333] hover:bg-[#333333] hover:text-[#F5F5F0] border-[#333333]'}`}
                      style={{ fontFamily: '"Architects Daughter", cursive', borderRadius: '255px 15px 225px 15px/15px 225px 15px 255px' }}
                    >
                      {activeTheme === 'sketchbook' ? 'Active' : 'Apply'}
                    </button>
                  </div>
                </div>

                {/* Other existing themes could go here */}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Reusable Artwork Card Component (similar to Marketplace)
const ArtworkCard: React.FC<{ artwork: { id: number; title: string; price: string; image: string; type: string; category: string; [key: string]: any }, themeColor: string, textColor: string }> = ({ artwork, themeColor, textColor }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link 
      to={`/artwork/${artwork.id}`} 
      className="group relative rounded-xl bg-slate-900 border border-slate-800 overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-slate-700 flex flex-col" 
      style={{ '--hover-shadow': `${themeColor}20` } as React.CSSProperties}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
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
        {/* Hover-to-Inject Logic for Animated Previews */}
        {isHovered && artwork.type.includes('Animated') && (
          <video 
            autoPlay 
            loop 
            muted 
            playsInline 
            className="absolute inset-0 w-full h-full object-cover z-10"
          >
            {/* Using a placeholder video since we don't have real webm URLs in mock data */}
            <source src="https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4" type="video/mp4" />
          </video>
        )}
        <div className="absolute top-3 right-3 rounded-md bg-slate-950/80 backdrop-blur-md px-2.5 py-1 text-xs font-semibold text-white border border-slate-700 z-20">
          {artwork.type}
        </div>
        <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px] z-20">
          <button 
            className="theme-glow-target rounded-lg px-6 py-2.5 text-sm font-bold text-black shadow-lg transition-transform transform translate-y-4 group-hover:translate-y-0 duration-300 hover:scale-105"
            style={{ backgroundColor: themeColor }}
          >
            View Details
          </button>
        </div>
      </div>
      <div className="p-4 flex-1 flex flex-col z-20 relative bg-inherit">
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
