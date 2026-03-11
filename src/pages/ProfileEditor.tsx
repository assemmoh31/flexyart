import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Settings, MapPin, Calendar, Link as LinkIcon, Twitter, Instagram, Github, X, Image as ImageIcon, Check, Monitor, Smartphone, Upload, Video, Layout, Type, Palette, Layers, Star, MessageSquare, Edit3, ChevronDown } from 'lucide-react';
import { Reorder } from 'motion/react';
import StudioBuilderSidebar from '../components/studio/StudioBuilderSidebar';
import DraggableProfileSection from '../components/studio/DraggableProfileSection';
import { HeroSection, FeaturedSection, ShopSection, ProcessSection, BioSection } from '../components/studio/ProfileSections';

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

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col relative overflow-hidden font-sans" style={{ ...customStyles, fontFamily: themeSettings.fontFamily }}>
      
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
                          {shopSettings.showFeatured && (
                            <div className="mb-12">
                              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                                <span className="w-2 h-6 bg-cyan-500 rounded-full"></span>
                                Featured Artworks
                              </h3>
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                {creatorData.shopArtworks.slice(0, 2).map((artwork) => (
                                  <ArtworkCard key={artwork.id} artwork={artwork} themeColor={themeColor} textColor={textColor} textureOverlay={textureOverlay} />
                                ))}
                              </div>
                            </div>
                          )}

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
