import React, { useState, useRef } from 'react';
import { Upload, Maximize2, Minimize2, Monitor, Tablet, Smartphone, Settings, X, Image as ImageIcon } from 'lucide-react';
import '../styles/SteamThemes.css';

type Theme = 'default' | 'summer' | 'midnight' | 'steel' | 'cosmic' | 'dark';
type Viewport = 'desktop' | 'tablet' | 'mobile';
type ShowcaseType = 'artwork' | 'workshop';

const themesList: { id: Theme; name: string; color: string }[] = [
  { id: 'default', name: 'Default', color: 'bg-slate-700' },
  { id: 'summer', name: 'Summer', color: 'bg-yellow-500' },
  { id: 'midnight', name: 'Midnight', color: 'bg-blue-900' },
  { id: 'steel', name: 'Steel', color: 'bg-slate-400' },
  { id: 'cosmic', name: 'Cosmic', color: 'bg-purple-600' },
  { id: 'dark', name: 'Dark Mode', color: 'bg-black' },
];

const isVideo = (url: string) => url.endsWith('.webm') || url.endsWith('.mp4');

const BackgroundElement = ({ src }: { src: string }) => {
  if (isVideo(src)) {
    return (
      <video 
        autoPlay 
        loop 
        muted 
        playsInline 
        className="absolute inset-0 w-full h-full object-cover object-top z-0 pointer-events-none"
      >
        <source src={src} type="video/webm" />
      </video>
    );
  }
  return (
    <div 
      className="absolute inset-0 z-0 pointer-events-none" 
      style={{ 
        backgroundImage: `url(${src})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center top'
      }}
    />
  );
};

export default function DressingRoom() {
  const [theme, setTheme] = useState<Theme>('default');
  const [viewport, setViewport] = useState<Viewport>('desktop');
  const [showcaseType, setShowcaseType] = useState<ShowcaseType>('artwork');
  const [steamLevel, setSteamLevel] = useState(10);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  
  const [avatar, setAvatar] = useState('https://picsum.photos/seed/user/150/150');
  const [background, setBackground] = useState('https://picsum.photos/seed/steam_bg/1920/1080');
  const [artworkMain, setArtworkMain] = useState<string | null>(null);
  const [artworkSide, setArtworkSide] = useState<string | null>(null);
  
  const [showMiniProfile, setShowMiniProfile] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadTarget, setUploadTarget] = useState<'avatar' | 'artworkMain' | 'artworkSide' | null>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && uploadTarget) {
      const url = URL.createObjectURL(file);
      if (uploadTarget === 'avatar') setAvatar(url);
      if (uploadTarget === 'artworkMain') setArtworkMain(url);
      if (uploadTarget === 'artworkSide') setArtworkSide(url);
    }
  };

  const triggerUpload = (target: 'avatar' | 'artworkMain' | 'artworkSide') => {
    setUploadTarget(target);
    fileInputRef.current?.click();
  };

  const getLevelColor = (level: number) => {
    if (level >= 100) return 'border-red-500 text-red-500';
    if (level >= 50) return 'border-purple-500 text-purple-500';
    if (level >= 30) return 'border-yellow-500 text-yellow-500';
    if (level >= 20) return 'border-green-500 text-green-500';
    if (level >= 10) return 'border-red-500 text-red-500';
    return 'border-slate-500 text-slate-500';
  };

  const viewportWidth = {
    desktop: 'w-full max-w-[1000px]',
    tablet: 'w-[768px]',
    mobile: 'w-[375px]'
  };

  return (
    <div className={`flex h-full w-full bg-slate-950 overflow-hidden ${isFullscreen ? 'fixed inset-0 z-[100]' : 'relative rounded-2xl border border-slate-800'}`}>
      
      {/* Hidden File Input */}
      <input 
        type="file" 
        ref={fileInputRef} 
        className="hidden" 
        accept="image/*,video/webm"
        onChange={handleFileUpload}
      />

      {/* Main Canvas Area */}
      <div className="flex-1 flex flex-col relative overflow-hidden">
        {/* Top Bar (Viewport controls & Fullscreen) */}
        <div className="h-14 bg-slate-900 border-b border-slate-800 flex items-center justify-between px-4 z-20">
          <div className="flex items-center gap-2 bg-slate-950 rounded-lg p-1 border border-slate-800">
            <button onClick={() => setViewport('desktop')} className={`p-1.5 rounded-md ${viewport === 'desktop' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-white'}`}><Monitor className="w-4 h-4" /></button>
            <button onClick={() => setViewport('tablet')} className={`p-1.5 rounded-md ${viewport === 'tablet' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-white'}`}><Tablet className="w-4 h-4" /></button>
            <button onClick={() => setViewport('mobile')} className={`p-1.5 rounded-md ${viewport === 'mobile' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-white'}`}><Smartphone className="w-4 h-4" /></button>
          </div>
          <div className="flex items-center gap-2">
            {!isSidebarOpen && (
              <button onClick={() => setIsSidebarOpen(true)} className="flex items-center gap-2 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-sm font-medium transition-colors">
                <Settings className="w-4 h-4" /> Controls
              </button>
            )}
            <button onClick={() => setIsFullscreen(!isFullscreen)} className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors">
              {isFullscreen ? <Minimize2 className="w-5 h-5" /> : <Maximize2 className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Steam Profile Simulation */}
        <div className="flex-1 overflow-y-auto bg-[#1b2838] relative flex justify-center">
          <BackgroundElement src={background} />
          
          <div className={`relative z-10 ${viewportWidth[viewport]} transition-all duration-300 py-8 px-4`}>
            <div className={`steam-profile-container theme-${theme} min-h-[800px] shadow-2xl`}>
              
              {/* Profile Header */}
              <div className="steam-header p-6 flex flex-col md:flex-row gap-6 relative">
                {/* Avatar */}
                <div 
                  className="relative group cursor-pointer"
                  onMouseEnter={() => setShowMiniProfile(true)}
                  onMouseLeave={() => setShowMiniProfile(false)}
                >
                  <div className="w-40 h-40 border-2 border-[var(--steam-border-color)] p-1 bg-[var(--steam-bg-color)]">
                    <img src={avatar} alt="Avatar" className="w-full h-full object-cover" />
                  </div>
                  
                  {/* Mini Profile Hover */}
                  {showMiniProfile && (
                    <div className="absolute top-0 left-full ml-4 w-64 steam-content-box p-4 z-50 shadow-2xl animate-in fade-in slide-in-from-left-2">
                      <div className="flex items-center gap-3 mb-3">
                        <img src={avatar} alt="Avatar" className="w-10 h-10 object-cover border border-[var(--steam-border-color)]" />
                        <div>
                          <div className="font-bold text-[var(--steam-text-primary)]">FlexyArt User</div>
                          <div className="text-xs steam-text-muted">Online</div>
                        </div>
                      </div>
                      <div className="text-sm steam-text-muted mb-2">Steam Level <span className="text-[var(--steam-text-primary)]">{steamLevel}</span></div>
                      <div className="text-xs steam-text-muted">Playing: <span className="text-[var(--steam-accent)]">Cyberpunk 2077</span></div>
                    </div>
                  )}
                </div>

                {/* Profile Info */}
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-4">
                    <h1 className="text-2xl font-light text-[var(--steam-text-primary)]">FlexyArt User</h1>
                    <div className="flex items-center gap-2">
                      <div className="text-sm steam-text-muted">Level</div>
                      <div className={`w-10 h-10 rounded-full border-2 flex items-center justify-center font-bold text-lg ${getLevelColor(steamLevel)}`}>
                        {steamLevel}
                      </div>
                    </div>
                  </div>
                  <div className="text-sm steam-text-muted mb-4">
                    "Designing the future of Steam profiles."
                  </div>
                  <div className="flex gap-2">
                    <button className="px-4 py-1.5 bg-[var(--steam-content-bg)] border border-[var(--steam-border-color)] text-[var(--steam-text-primary)] text-sm hover:bg-[var(--steam-border-color)] transition-colors">
                      Edit Profile
                    </button>
                  </div>
                </div>
              </div>

              {/* Profile Content */}
              <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Main Column */}
                <div className="md:col-span-2 space-y-6">
                  
                  {/* Showcase */}
                  <div className="steam-content-box p-4">
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-lg font-light text-[var(--steam-text-primary)]">
                        {showcaseType === 'artwork' ? 'Artwork Showcase' : 'Workshop Showcase'}
                      </h2>
                      <div className="text-xs steam-text-muted">1 item</div>
                    </div>

                    {showcaseType === 'artwork' ? (
                      <div className="flex gap-2">
                        {/* Main Artwork */}
                        <div className="w-[506px] flex-shrink-0 relative group">
                          {artworkMain ? (
                            isVideo(artworkMain) ? (
                              <video autoPlay loop muted playsInline className="w-full object-cover border border-[var(--steam-border-color)]">
                                <source src={artworkMain} type="video/webm" />
                              </video>
                            ) : (
                              <img src={artworkMain} alt="Main Artwork" className="w-full object-cover border border-[var(--steam-border-color)]" />
                            )
                          ) : (
                            <div className="w-full aspect-[506/800] border border-[var(--steam-border-color)] bg-[var(--steam-bg-color)] flex items-center justify-center flex-col gap-2 text-[var(--steam-text-secondary)]">
                              <ImageIcon className="w-8 h-8 opacity-50" />
                              <span className="text-sm">Main Artwork (506px)</span>
                            </div>
                          )}
                        </div>
                        {/* Side Artwork */}
                        <div className="w-[100px] flex-shrink-0 relative group">
                          {artworkSide ? (
                            isVideo(artworkSide) ? (
                              <video autoPlay loop muted playsInline className="w-full object-cover border border-[var(--steam-border-color)]">
                                <source src={artworkSide} type="video/webm" />
                              </video>
                            ) : (
                              <img src={artworkSide} alt="Side Artwork" className="w-full object-cover border border-[var(--steam-border-color)]" />
                            )
                          ) : (
                            <div className="w-full aspect-[100/800] border border-[var(--steam-border-color)] bg-[var(--steam-bg-color)] flex items-center justify-center flex-col gap-2 text-[var(--steam-text-secondary)]">
                              <span className="text-xs text-center px-1">Side (100px)</span>
                            </div>
                          )}
                        </div>
                      </div>
                    ) : (
                      <div className="grid grid-cols-5 gap-2">
                        {[1, 2, 3, 4, 5].map(i => (
                          <div key={i} className="aspect-square border border-[var(--steam-border-color)] bg-[var(--steam-bg-color)] flex items-center justify-center">
                            <ImageIcon className="w-6 h-6 opacity-20 text-[var(--steam-text-secondary)]" />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Recent Activity */}
                  <div className="steam-content-box p-4">
                    <h2 className="text-lg font-light text-[var(--steam-text-primary)] mb-4">Recent Activity</h2>
                    <div className="flex items-center gap-4 text-sm steam-text-muted border-b border-[var(--steam-border-color)] pb-4">
                      <div className="w-16 h-16 bg-[var(--steam-bg-color)] border border-[var(--steam-border-color)]"></div>
                      <div>
                        <div className="text-[var(--steam-text-primary)]">Cyberpunk 2077</div>
                        <div>12.5 hrs past 2 weeks</div>
                      </div>
                    </div>
                  </div>

                </div>

                {/* Right Column */}
                <div className="space-y-6">
                  <div className="steam-content-box p-4">
                    <h2 className="text-sm font-light text-[var(--steam-text-primary)] mb-2">Currently Online</h2>
                    <div className="text-xs steam-text-muted mb-4">Playing Cyberpunk 2077</div>
                    
                    <div className="space-y-2">
                      <div className="text-sm steam-link cursor-pointer">Badges 15</div>
                      <div className="flex gap-1">
                        {[1, 2, 3, 4].map(i => (
                          <div key={i} className="w-10 h-10 rounded-full bg-[var(--steam-bg-color)] border border-[var(--steam-border-color)]"></div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="steam-content-box p-4">
                    <div className="text-sm steam-link cursor-pointer mb-2">Groups 3</div>
                    <div className="text-sm steam-link cursor-pointer">Friends 42</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Control Panel Sidebar */}
      {isSidebarOpen && (
        <div className="w-80 bg-slate-900 border-l border-slate-800 flex flex-col z-30 shadow-2xl relative">
          <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-950">
            <h2 className="font-bold text-white flex items-center gap-2">
              <Settings className="w-4 h-4 text-cyan-400" /> Control Panel
            </h2>
            <button onClick={() => setIsSidebarOpen(false)} className="p-1 text-slate-400 hover:text-white rounded-md hover:bg-slate-800 transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-8">
            
            {/* Theme Selector */}
            <div>
              <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wider mb-4">Profile Theme</h3>
              <div className="grid grid-cols-3 gap-3">
                {themesList.map(t => (
                  <button 
                    key={t.id}
                    onClick={() => setTheme(t.id)}
                    className={`flex flex-col items-center gap-2 p-2 rounded-xl border transition-all ${theme === t.id ? 'border-cyan-500 bg-cyan-500/10' : 'border-slate-800 hover:border-slate-600'}`}
                  >
                    <div className={`w-8 h-8 rounded-full ${t.color} border-2 border-slate-900 shadow-inner`}></div>
                    <span className="text-xs text-slate-400 font-medium">{t.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Asset Testing */}
            <div>
              <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wider mb-4">Asset Testing</h3>
              <div className="space-y-3">
                <button 
                  onClick={() => triggerUpload('avatar')}
                  className="w-full flex items-center justify-between p-3 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full overflow-hidden border border-slate-600">
                      <img src={avatar} alt="Avatar" className="w-full h-full object-cover" />
                    </div>
                    <span className="text-sm font-medium text-white">Test My Avatar</span>
                  </div>
                  <Upload className="w-4 h-4 text-slate-400 group-hover:text-cyan-400" />
                </button>

                <button 
                  onClick={() => triggerUpload('artworkMain')}
                  className="w-full flex items-center justify-between p-3 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <ImageIcon className="w-5 h-5 text-purple-400" />
                    <span className="text-sm font-medium text-white">Test Main Artwork</span>
                  </div>
                  <Upload className="w-4 h-4 text-slate-400 group-hover:text-purple-400" />
                </button>

                <button 
                  onClick={() => triggerUpload('artworkSide')}
                  className="w-full flex items-center justify-between p-3 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <ImageIcon className="w-5 h-5 text-pink-400" />
                    <span className="text-sm font-medium text-white">Test Side Artwork</span>
                  </div>
                  <Upload className="w-4 h-4 text-slate-400 group-hover:text-pink-400" />
                </button>
              </div>
            </div>

            {/* Showcase Toggle */}
            <div>
              <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wider mb-4">Showcase Layout</h3>
              <div className="flex bg-slate-800 p-1 rounded-lg border border-slate-700">
                <button 
                  onClick={() => setShowcaseType('artwork')}
                  className={`flex-1 py-2 text-sm font-medium rounded-md transition-colors ${showcaseType === 'artwork' ? 'bg-slate-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'}`}
                >
                  Artwork
                </button>
                <button 
                  onClick={() => setShowcaseType('workshop')}
                  className={`flex-1 py-2 text-sm font-medium rounded-md transition-colors ${showcaseType === 'workshop' ? 'bg-slate-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'}`}
                >
                  Workshop
                </button>
              </div>
            </div>

            {/* Steam Level Simulator */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wider">Steam Level</h3>
                <span className={`font-bold ${getLevelColor(steamLevel).split(' ')[1]}`}>{steamLevel}</span>
              </div>
              <input 
                type="range" 
                min="1" 
                max="200" 
                value={steamLevel} 
                onChange={(e) => setSteamLevel(Number(e.target.value))}
                className="w-full accent-cyan-500"
              />
              <div className="flex justify-between text-xs text-slate-500 mt-2">
                <span>1</span>
                <span>50</span>
                <span>100</span>
                <span>200</span>
              </div>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}
