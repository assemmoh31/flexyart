import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Settings, MapPin, Calendar, Link as LinkIcon, Twitter, Instagram, Github, X, Image as ImageIcon, Check, Monitor, Smartphone, Upload, Video, Layout, Type, Palette, Layers, Star, MessageSquare, Edit3, ChevronDown } from 'lucide-react';
import { Reorder } from 'motion/react';
import StudioBuilderSidebar from '../components/studio/StudioBuilderSidebar';
import DraggableProfileSection from '../components/studio/DraggableProfileSection';
import { HeroSection, FeaturedSection, ShopSection, ProcessSection, BioSection } from '../components/studio/ProfileSections';
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
  shopArtworks: [
    { id: 1, title: 'Cyberpunk Neon City', creator: '@NeonDreams', creatorRevenue: 3000, price: '$15.00', image: 'https://picsum.photos/seed/cyber1/600/400', type: 'Animated', category: 'Sci-Fi' },
    { id: 2, title: 'Ethereal Forest', creator: '@NatureVibes', creatorRevenue: 1800, price: '$12.50', image: 'https://picsum.photos/seed/forest1/600/400', type: 'Static', category: 'Fantasy' },
    { id: 3, title: 'Retro Synthwave', creator: '@SynthLord', creatorRevenue: 1200, price: '$20.00', image: 'https://picsum.photos/seed/synth1/600/400', type: 'Animated', category: 'Retro' },
    { id: 4, title: 'Dark Fantasy Knight', creator: '@GrimArt', creatorRevenue: 400, price: '$18.00', image: 'https://picsum.photos/seed/knight1/600/400', type: 'Theme Bundle', category: 'Fantasy' },
    { id: 5, title: 'Minimalist Setup', creator: '@CleanDesk', creatorRevenue: 80, price: '$10.00', image: 'https://picsum.photos/seed/minimal1/600/400', type: 'Static', category: 'Minimal' },
    { id: 6, title: 'Galactic Horizon', creator: '@SpaceCadet', creatorRevenue: 20, price: '$25.00', image: 'https://picsum.photos/seed/space1/600/400', type: 'Animated', category: 'Sci-Fi' },
    { id: 7, title: 'Anime Aesthetic', creator: '@WeebArt', creatorRevenue: 2600, price: '$14.00', image: 'https://picsum.photos/seed/anime1/600/400', type: 'Animated', category: 'Anime' },
    { id: 8, title: 'Gothic Castle', creator: '@DarkVibes', creatorRevenue: 1600, price: '$16.00', image: 'https://picsum.photos/seed/gothic1/600/400', type: 'Static', category: 'Fantasy' },
    { id: 9, title: 'Pixel Art City', creator: '@RetroPixel', creatorRevenue: 1100, price: '$8.00', image: 'https://picsum.photos/seed/pixel1/600/400', type: 'Animated', category: 'Retro' },
  ]
};

const initialSections = [
  { id: 'hero', title: 'Hero Banner & Promo', isVisible: true },
  { id: 'featured', title: 'Featured Magnum Opus', isVisible: true },
  { id: 'shop', title: 'Product Collections', isVisible: true },
  { id: 'process', title: 'Design Process (Before/After)', isVisible: true },
  { id: 'bio', title: 'Creator Bio', isVisible: true },
];

export default function ProfileEditor() {
  const { handle } = useParams();
  const isOwner = true; 

  const [activeTab, setActiveTab] = useState('home');
  const [isDesignMode, setIsDesignMode] = useState(false);
  const [viewMode, setViewMode] = useState<'desktop' | 'mobile'>('desktop');
  const [isFollowing, setIsFollowing] = useState(false);
  const [isThemeSidebarOpen, setIsThemeSidebarOpen] = useState(false);
  const [activeTheme, setActiveTheme] = useState('default');
  
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

  // Builder State
  const [sections, setSections] = useState(initialSections);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [themeSettings, setThemeSettings] = useState({
    primaryColor: '#00BCD4',
    fontFamily: 'Inter',
    shopLayout: 'grid',
    processType: 'static',
    processBeforeMedia: 'https://picsum.photos/seed/before/1000/500?grayscale',
    processAfterMedia: 'https://picsum.photos/seed/after/1000/500',
  });
  const [shopSettings, setShopSettings] = useState({
    layout: 'grid', // grid, masonry, showcase, carousel
    previewStyle: 'default', // art-train, spotlight-carousel, wave-gallery, etc.
    showFeatured: true,
    showLimited: true,
    isCustomized: false,
  });
  const [isCustomLayoutSaved, setIsCustomLayoutSaved] = useState(false);

  const handleToggleVisibility = (id: string) => {
    setSections(sections.map(s => s.id === id ? { ...s, isVisible: !s.isVisible } : s));
  };

  const handleSave = () => {
    setIsCustomLayoutSaved(true);
    setIsDesignMode(false);
    setActiveSection(null);
  };

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
      className="min-h-screen bg-slate-950 flex flex-col relative overflow-hidden font-sans" 
      style={{ ...customStyles, fontFamily: themeSettings.fontFamily }} 
      data-theme={activeTheme}
      onMouseMove={handleMouseMove}
    >
      {activeTheme === 'forest-whisper' && <FallingLeaves />}
      {activeTheme === 'aurora-sky' && <AuroraWaves />}
      {activeTheme === 'obsidian-glass' && <GlowLines />}
      {activeTheme === 'infinite-space' && <CosmicParticles />}
      {activeTheme === 'pixel-arcade' && <PixelSparkle />}
      {activeTheme === 'sketchbook' && <HandDrawnBorder />}
      
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
            {/* 
            <button 
              onClick={() => setIsThemeSidebarOpen(true)}
              className="flex items-center gap-2 rounded-lg border border-cyan-500/50 bg-cyan-500/10 backdrop-blur-sm px-4 py-2 text-sm font-semibold text-cyan-400 hover:bg-cyan-500/20 transition-colors"
            >
              <Palette className="h-4 w-4" /> Customize Theme
            </button>
            <button 
              onClick={() => setIsDesignMode(!isDesignMode)}
              className={`flex items-center gap-2 rounded-lg border px-4 py-2 text-sm font-semibold transition-colors ${isDesignMode ? 'bg-emerald-500/10 border-emerald-500/50 text-emerald-400 hover:bg-emerald-500/20' : 'bg-slate-800 border-slate-700 text-white hover:bg-slate-700'}`}
            >
              <Settings className="h-4 w-4" /> {isDesignMode ? 'Finish Editing' : 'Edit Layout'}
            </button>
            */}
          </div>
        </div>
      )}

      <div className="flex flex-1 relative z-10 overflow-hidden">
        {/* Main Profile Content */}
        <div className={`flex-1 overflow-y-auto transition-all duration-300 ${isDesignMode && viewMode === 'desktop' ? 'mr-80' : ''}`}>
          <div className={`mx-auto transition-all duration-300 ${viewMode === 'mobile' ? 'max-w-md border-x border-slate-800 bg-slate-950 min-h-screen shadow-2xl' : 'w-full'}`}>
            
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
                    <div className="h-32 w-32 md:h-40 md:w-40 rounded-full border-4 border-slate-950 bg-slate-800 shrink-0 shadow-2xl relative">
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
                    {/* Commission Status Toggle */}
                    <div className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-bold border ${commissionStatus === 'open' ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' : 'bg-red-500/10 border-red-500/30 text-red-400'}`}>
                      <div className={`w-2 h-2 rounded-full ${commissionStatus === 'open' ? 'bg-emerald-400 animate-pulse' : 'bg-red-400'}`}></div>
                      Commissions {commissionStatus === 'open' ? 'Open' : 'Closed'}
                    </div>

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
                  {(!isCustomLayoutSaved && (!isDesignMode || activeSection === null)) ? (
                    <>
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
                      
                      {activeTab === 'shop' && (
                        <div className="space-y-8">
                          {/* Sort & Results Bar */}
                          <div className="flex items-center justify-between bg-slate-900/50 p-4 rounded-xl border border-slate-800">
                            <span className="text-sm text-slate-400">Showing <strong className="text-white">1-{creatorData.shopArtworks.length}</strong> of {creatorData.shopArtworks.length} results</span>
                            <div className="flex items-center gap-2">
                              <span className="text-sm text-slate-400">Sort by:</span>
                              <button className="flex items-center gap-2 text-sm font-medium text-white hover:text-cyan-400 transition-colors">
                                Trending <ChevronDown className="h-4 w-4" />
                              </button>
                            </div>
                          </div>

                          {/* Grid / Layout */}
                          {shopSettings.showLimited && (
                            <div className="mb-12">
                              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                                <span className="w-2 h-6 bg-purple-500 rounded-full"></span>
                                Limited Edition
                              </h3>
                              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                                {creatorData.shopArtworks.slice(2, 5).map((artwork) => (
                                  <div key={artwork.id} className="relative">
                                    <div className="absolute top-2 right-2 z-10 bg-slate-900/80 backdrop-blur-md border border-slate-700 text-xs font-bold px-2 py-1 rounded-md text-purple-400">
                                      Only 5 left
                                    </div>
                                    <ArtworkCard artwork={artwork} themeColor={themeColor} textColor={textColor} textureOverlay={textureOverlay} />
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                            <span className="w-2 h-6 bg-slate-500 rounded-full"></span>
                            All Artworks
                          </h3>

                          {(!shopSettings.isCustomized || shopSettings.layout === 'grid') && shopSettings.previewStyle === 'default' && (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                              {creatorData.shopArtworks.map((artwork) => (
                                <ArtworkCard key={artwork.id} artwork={artwork} themeColor={themeColor} textColor={textColor} textureOverlay={textureOverlay} />
                              ))}
                            </div>
                          )}

                          {shopSettings.isCustomized && shopSettings.previewStyle === 'art-train' && (
                            <div className="art-train-container">
                              {creatorData.shopArtworks.map((artwork, idx) => (
                                <div key={artwork.id} className={`art-train-item ${idx === 1 ? 'active' : ''}`}>
                                  <ArtworkCard artwork={artwork} themeColor={themeColor} textColor={textColor} textureOverlay={textureOverlay} />
                                </div>
                              ))}
                            </div>
                          )}

                          {shopSettings.isCustomized && shopSettings.previewStyle === 'spotlight-carousel' && (
                            <div className="spotlight-carousel-container">
                              {creatorData.shopArtworks.slice(0, 3).map((artwork, idx) => (
                                <div key={artwork.id} className={`spotlight-item ${idx === 0 ? 'prev' : idx === 1 ? 'active' : 'next'}`}>
                                  <ArtworkCard artwork={artwork} themeColor={themeColor} textColor={textColor} textureOverlay={textureOverlay} />
                                </div>
                              ))}
                            </div>
                          )}

                          {shopSettings.isCustomized && shopSettings.previewStyle === 'infinite-gallery' && (
                            <div className="overflow-hidden py-8">
                              <div className="infinite-gallery-track">
                                {[...creatorData.shopArtworks, ...creatorData.shopArtworks].map((artwork, idx) => (
                                  <div key={`${artwork.id}-${idx}`} className="w-80 shrink-0">
                                    <ArtworkCard artwork={artwork} themeColor={themeColor} textColor={textColor} textureOverlay={textureOverlay} />
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {shopSettings.isCustomized && !['default', 'art-train', 'spotlight-carousel', 'infinite-gallery'].includes(shopSettings.previewStyle) && (
                            <div className="text-center py-12 border border-dashed border-slate-700 rounded-xl">
                              <p className="text-slate-400">Preview style "{shopSettings.previewStyle}" selected.</p>
                              <p className="text-sm text-slate-500 mt-2">This animation style will be rendered here.</p>
                            </div>
                          )}
                          
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
                      )}
                      {/* Other tabs would go here */}
                    </>
                  ) : (
                    // Custom Layout
                    <div className={`relative mx-auto transition-all duration-500 ease-in-out w-full`}>
                      {(isDesignMode && activeSection !== null) ? (
                        <Reorder.Group axis="y" values={sections} onReorder={setSections} className="space-y-6">
                          {sections.map(section => (
                            <DraggableProfileSection 
                              key={section.id} 
                              item={section}
                              isActive={activeSection === section.id}
                              onToggleVisibility={handleToggleVisibility}
                              onSettingsClick={setActiveSection}
                            >
                              {section.id === 'hero' && <HeroSection previewMode={viewMode} />}
                              {section.id === 'featured' && <FeaturedSection primaryColor={themeSettings.primaryColor} />}
                              {section.id === 'shop' && <ShopSection layout={themeSettings.shopLayout} primaryColor={themeSettings.primaryColor} />}
                              {section.id === 'process' && <ProcessSection type={themeSettings.processType} beforeMedia={themeSettings.processBeforeMedia} afterMedia={themeSettings.processAfterMedia} />}
                              {section.id === 'bio' && <BioSection />}
                            </DraggableProfileSection>
                          ))}
                        </Reorder.Group>
                      ) : (
                        <div className="space-y-6">
                          {sections.filter(s => s.isVisible).map(section => (
                            <div key={section.id} className="bg-slate-900/30 backdrop-blur-md border border-slate-800/50 rounded-2xl p-6">
                              {section.id === 'hero' && <HeroSection previewMode={viewMode} />}
                              {section.id === 'featured' && <FeaturedSection primaryColor={themeSettings.primaryColor} />}
                              {section.id === 'shop' && <ShopSection layout={themeSettings.shopLayout} primaryColor={themeSettings.primaryColor} />}
                              {section.id === 'process' && <ProcessSection type={themeSettings.processType} beforeMedia={themeSettings.processBeforeMedia} afterMedia={themeSettings.processAfterMedia} />}
                              {section.id === 'bio' && <BioSection />}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Design Studio Sidebar */}
        {isDesignMode && (
          <div className="fixed right-0 top-[61px] bottom-0 h-[calc(100vh-61px)] z-40">
            <StudioBuilderSidebar 
              sections={sections}
              onReorder={setSections}
              onToggleVisibility={handleToggleVisibility}
              activeSection={activeSection}
              setActiveSection={setActiveSection}
              previewMode={viewMode}
              setPreviewMode={setViewMode}
              themeSettings={themeSettings}
              setThemeSettings={setThemeSettings}
              onSave={handleSave}
              pageTab={activeTab}
              shopSettings={shopSettings}
              setShopSettings={setShopSettings}
            />
          </div>
        )}
      </div>

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

                {/* Holographic Shift (Dark) */}
                <div className={`relative rounded-xl border-2 overflow-hidden transition-all ${activeTheme === 'holo-shift-dark' ? 'border-[#ff00ff] shadow-[0_0_20px_rgba(255,0,255,0.4)]' : 'border-slate-800 hover:border-slate-600'}`}>
                  <div className="h-24 bg-[#0a0a0a] flex items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 opacity-30" style={{ background: 'linear-gradient(45deg, #00ffff, #ff00ff, #ffd700, #e6e6fa)', backgroundSize: '400% 400%', animation: 'holo-shimmer 15s ease infinite' }}></div>
                    <div className="relative z-10 flex gap-2">
                      <div className="w-8 h-8 rounded-full bg-[#00ffff] shadow-[0_0_10px_#00ffff]"></div>
                      <div className="w-8 h-8 rounded-full bg-[#ff00ff] shadow-[0_0_10px_#ff00ff]"></div>
                    </div>
                  </div>
                  <div className="p-4 bg-[#0a0a0a] flex items-center justify-between border-t border-slate-800">
                    <div>
                      <h3 className="font-bold text-white">Holo Shift (Dark)</h3>
                      <p className="text-xs text-slate-400">Obsidian iridescent</p>
                    </div>
                    <button 
                      onClick={() => setActiveTheme('holo-shift-dark')}
                      className={`px-4 py-2 rounded-lg text-sm font-bold transition-colors ${activeTheme === 'holo-shift-dark' ? 'bg-transparent border border-[#ff00ff] text-[#ff00ff] shadow-[inset_0_0_10px_rgba(255,0,255,0.5)]' : 'bg-slate-800 text-white hover:bg-slate-700'}`}
                    >
                      {activeTheme === 'holo-shift-dark' ? 'Active' : 'Apply'}
                    </button>
                  </div>
                </div>

                {/* Holographic Shift (Light) */}
                <div className={`relative rounded-xl border-2 overflow-hidden transition-all ${activeTheme === 'holo-shift-light' ? 'border-[#00ffff] shadow-[0_0_20px_rgba(0,255,255,0.4)]' : 'border-slate-800 hover:border-slate-600'}`}>
                  <div className="h-24 bg-[#f5f5f5] flex items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 opacity-30" style={{ background: 'linear-gradient(45deg, #00ffff, #ff00ff, #ffd700, #e6e6fa)', backgroundSize: '400% 400%', animation: 'holo-shimmer 15s ease infinite', mixBlendMode: 'multiply' }}></div>
                    <div className="relative z-10 flex gap-2">
                      <div className="w-8 h-8 rounded-full bg-[#ffd700] shadow-[0_0_10px_#ffd700]"></div>
                      <div className="w-8 h-8 rounded-full bg-[#e6e6fa] shadow-[0_0_10px_#e6e6fa]"></div>
                    </div>
                  </div>
                  <div className="p-4 bg-[#f5f5f5] flex items-center justify-between border-t border-slate-300">
                    <div>
                      <h3 className="font-bold text-slate-900">Holo Shift (Light)</h3>
                      <p className="text-xs text-slate-500">Pearl iridescent</p>
                    </div>
                    <button 
                      onClick={() => setActiveTheme('holo-shift-light')}
                      className={`px-4 py-2 rounded-lg text-sm font-bold transition-colors ${activeTheme === 'holo-shift-light' ? 'bg-transparent border border-[#00ffff] text-[#00ffff] shadow-[inset_0_0_10px_rgba(0,255,255,0.5)]' : 'bg-slate-200 text-slate-900 hover:bg-slate-300'}`}
                    >
                      {activeTheme === 'holo-shift-light' ? 'Active' : 'Apply'}
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

                {/* Other existing themes could go here */}
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
                      {activeTheme === 'pixel-arcade' ? 'Active' : 'Apply'}
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

              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Reusable Artwork Card Component
const ArtworkCard: React.FC<{ artwork: any, themeColor: string, textColor: string, textureOverlay: string }> = ({ artwork, themeColor, textColor, textureOverlay }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link 
      to={`/artwork/${artwork.id}`} 
      className={`group relative rounded-xl bg-slate-900/80 backdrop-blur-md border border-slate-800 overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-slate-700 flex flex-col ${textureOverlay !== 'none' ? `texture-${textureOverlay}` : ''}`} 
      style={{ '--hover-shadow': `${themeColor}40` } as React.CSSProperties}
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
            className="theme-glow-target rounded-lg px-6 py-2.5 text-sm font-bold text-slate-950 shadow-[0_0_15px_rgba(0,188,212,0.5)] transition-transform transform translate-y-4 group-hover:translate-y-0 duration-300 hover:scale-105"
            style={{ backgroundColor: themeColor }}
          >
            View Details
          </button>
        </div>
      </div>
      <div className="p-4 flex-1 flex flex-col relative z-20 bg-inherit">
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
