import React, { useState, useRef } from 'react';
import { Upload, Maximize2, Minimize2, ZoomIn, ZoomOut, Image as ImageIcon, Layout, Grid, Settings } from 'lucide-react';
import '../styles/SteamStyles.css';

type Theme = 'default' | 'summer' | 'midnight' | 'cosmic';
type ShowcaseType = 'artwork' | 'workshop';

const themesList: { id: Theme; name: string; color: string }[] = [
  { id: 'default', name: 'Default', color: 'bg-slate-700' },
  { id: 'summer', name: 'Summer', color: 'bg-yellow-500' },
  { id: 'midnight', name: 'Midnight', color: 'bg-blue-900' },
  { id: 'cosmic', name: 'Cosmic', color: 'bg-purple-600' },
];

const isVideo = (url: string) => url.endsWith('.webm') || url.endsWith('.mp4');

export default function AdvancedDressingRoom() {
  const [theme, setTheme] = useState<Theme>('default');
  const [showcaseType, setShowcaseType] = useState<ShowcaseType>('artwork');
  const [steamLevel, setSteamLevel] = useState(10);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [zoom, setZoom] = useState(100);
  const [bgAttachment, setBgAttachment] = useState<'fixed' | 'scroll'>('fixed');
  
  const [avatar, setAvatar] = useState('https://picsum.photos/seed/user/150/150');
  const [background, setBackground] = useState('https://picsum.photos/seed/steam_bg/1920/1080');
  const [artworkMain, setArtworkMain] = useState<string | null>(null);
  const [artworkSide, setArtworkSide] = useState<string | null>(null);
  const [workshopItems, setWorkshopItems] = useState<(string | null)[]>([null, null, null, null, null]);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadTarget, setUploadTarget] = useState<'avatar' | 'background' | 'artworkMain' | 'artworkSide' | number | null>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && uploadTarget !== null) {
      const url = URL.createObjectURL(file);
      if (uploadTarget === 'avatar') setAvatar(url);
      else if (uploadTarget === 'background') setBackground(url);
      else if (uploadTarget === 'artworkMain') setArtworkMain(url);
      else if (uploadTarget === 'artworkSide') setArtworkSide(url);
      else if (typeof uploadTarget === 'number') {
        const newItems = [...workshopItems];
        newItems[uploadTarget] = url;
        setWorkshopItems(newItems);
      }
    }
  };

  const triggerUpload = (target: 'avatar' | 'background' | 'artworkMain' | 'artworkSide' | number) => {
    setUploadTarget(target);
    fileInputRef.current?.click();
  };

  const getLevelColor = (level: number) => {
    if (level >= 100) return 'border-[#9b59b6] text-[#9b59b6] shadow-[0_0_10px_#9b59b6]';
    if (level >= 50) return 'border-[#8e44ad] text-[#8e44ad]';
    if (level >= 30) return 'border-[#f1c40f] text-[#f1c40f]';
    if (level >= 20) return 'border-[#2ecc71] text-[#2ecc71]';
    if (level >= 10) return 'border-[#e74c3c] text-[#e74c3c]';
    return 'border-[#95a5a6] text-[#95a5a6]';
  };

  return (
    <div className={`flex h-full w-full bg-slate-950 overflow-hidden ${isFullscreen ? 'fixed inset-0 z-[100]' : 'relative rounded-2xl border border-slate-800'}`}>
      <input 
        type="file" 
        ref={fileInputRef} 
        className="hidden" 
        accept="image/*,video/webm,video/mp4"
        onChange={handleFileUpload}
      />

      {/* Main Canvas Area */}
      <div className="flex-1 flex flex-col relative overflow-hidden bg-[#000]">
        
        {/* Top Toolbar */}
        <div className="h-14 bg-slate-900 border-b border-slate-800 flex items-center justify-between px-4 z-20 shrink-0">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-slate-950 rounded-lg p-1 border border-slate-800">
              <button onClick={() => setZoom(Math.max(50, zoom - 10))} className="p-1.5 text-slate-400 hover:text-white"><ZoomOut className="w-4 h-4" /></button>
              <span className="text-xs font-mono text-slate-300 w-12 text-center">{zoom}%</span>
              <button onClick={() => setZoom(Math.min(150, zoom + 10))} className="p-1.5 text-slate-400 hover:text-white"><ZoomIn className="w-4 h-4" /></button>
            </div>
            <button onClick={() => setBgAttachment(bgAttachment === 'fixed' ? 'scroll' : 'fixed')} className="text-xs font-medium text-slate-400 hover:text-white px-3 py-1.5 bg-slate-800 rounded-lg">
              BG: {bgAttachment === 'fixed' ? 'Fixed' : 'Scrolling'}
            </button>
          </div>
          <button onClick={() => setIsFullscreen(!isFullscreen)} className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors">
            {isFullscreen ? <Minimize2 className="w-5 h-5" /> : <Maximize2 className="w-5 h-5" />}
          </button>
        </div>

        {/* Profile Simulation */}
        <div className="flex-1 overflow-y-auto relative flex justify-center no-scrollbar steam-profile-wrapper" style={{ perspective: '1000px' }}>
          
          {/* Background */}
          <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
            {isVideo(background) ? (
              <video autoPlay loop muted playsInline className={`w-full h-full object-cover object-top ${bgAttachment === 'fixed' ? 'fixed' : 'absolute'}`}>
                <source src={background} type="video/webm" />
              </video>
            ) : (
              <div 
                className={`w-full h-full ${bgAttachment === 'fixed' ? 'fixed' : 'absolute'}`}
                style={{ 
                  backgroundImage: `url(${background})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center top'
                }}
              />
            )}
          </div>

          {/* Zoom Container */}
          <div 
            className={`relative z-10 w-[940px] transition-transform duration-200 origin-top pt-24 pb-32 steam-theme-${theme}`}
            style={{ transform: `scale(${zoom / 100})` }}
          >
            {/* Profile Header */}
            <div className="steam-header-panel p-6 flex gap-6 mb-6 rounded-[3px] shadow-2xl">
              {/* Avatar */}
              <div 
                className="w-[164px] h-[164px] p-1 bg-[var(--steam-glass-bg)] border border-[var(--steam-border)] cursor-pointer group relative shrink-0"
                onClick={() => triggerUpload('avatar')}
              >
                <img src={avatar} alt="Avatar" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Upload className="w-8 h-8 text-white" />
                </div>
              </div>

              {/* Info */}
              <div className="flex-1 pt-2">
                <h1 className="text-3xl font-light text-[var(--steam-text-main)] mb-2">FlexyArt User</h1>
                <div className="text-sm text-[var(--steam-text-muted)] mb-4">
                  United States
                </div>
                <div className="text-sm text-[var(--steam-text-main)] max-w-lg leading-relaxed">
                  Welcome to my profile! I create custom artwork for the Steam community. Check out my workshop for more designs.
                </div>
              </div>

              {/* Level */}
              <div className="w-64 shrink-0">
                <div className="flex items-center gap-4 mb-2">
                  <span className="text-xl font-light text-[var(--steam-text-main)]">Level</span>
                  <div className={`w-12 h-12 rounded-full border-2 flex items-center justify-center font-bold text-xl ${getLevelColor(steamLevel)}`}>
                    {steamLevel}
                  </div>
                </div>
                <button className="w-full py-1.5 steam-glass-panel text-sm text-[var(--steam-text-main)] hover:bg-[var(--steam-border)] transition-colors">
                  Edit Profile
                </button>
              </div>
            </div>

            {/* Main Content Layout */}
            <div className="flex gap-4">
              {/* Left Column (636px) */}
              <div className="w-[636px] space-y-4 shrink-0">
                
                {/* Showcase */}
                <div className="steam-glass-panel p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h2 className="text-lg font-light text-[var(--steam-text-main)] uppercase tracking-wide">
                      {showcaseType === 'artwork' ? 'Artwork Showcase' : 'Your Workshop Showcase'}
                    </h2>
                  </div>

                  {showcaseType === 'artwork' ? (
                    <div className="flex gap-[10px]">
                      {/* Main Artwork (506px) */}
                      <div 
                        className="w-[506px] min-h-[506px] steam-glass-panel cursor-pointer group relative overflow-hidden flex items-center justify-center"
                        onClick={() => triggerUpload('artworkMain')}
                      >
                        {artworkMain ? (
                          isVideo(artworkMain) ? (
                            <video autoPlay loop muted playsInline className="w-full h-full object-cover">
                              <source src={artworkMain} type="video/webm" />
                            </video>
                          ) : (
                            <img src={artworkMain} alt="Main" className="w-full h-full object-cover" />
                          )
                        ) : (
                          <div className="text-center text-[var(--steam-text-muted)] group-hover:text-[var(--steam-text-main)] transition-colors">
                            <ImageIcon className="w-12 h-12 mx-auto mb-2 opacity-50" />
                            <span className="text-sm font-medium">Upload Main (506px)</span>
                          </div>
                        )}
                      </div>

                      {/* Side Artwork (100px) */}
                      <div 
                        className="w-[100px] min-h-[506px] steam-glass-panel cursor-pointer group relative overflow-hidden flex items-center justify-center"
                        onClick={() => triggerUpload('artworkSide')}
                      >
                        {artworkSide ? (
                          isVideo(artworkSide) ? (
                            <video autoPlay loop muted playsInline className="w-full h-full object-cover">
                              <source src={artworkSide} type="video/webm" />
                            </video>
                          ) : (
                            <img src={artworkSide} alt="Side" className="w-full h-full object-cover" />
                          )
                        ) : (
                          <div className="text-center text-[var(--steam-text-muted)] group-hover:text-[var(--steam-text-main)] transition-colors">
                            <span className="text-xs font-medium">Side<br/>(100px)</span>
                          </div>
                        )}
                      </div>
                    </div>
                  ) : (
                    <div className="flex gap-[4px]">
                      {workshopItems.map((item, i) => (
                        <div 
                          key={i} 
                          className="w-[119px] h-[119px] steam-glass-panel cursor-pointer group relative overflow-hidden flex items-center justify-center"
                          onClick={() => triggerUpload(i)}
                        >
                          {item ? (
                            isVideo(item) ? (
                              <video autoPlay loop muted playsInline className="w-full h-full object-cover">
                                <source src={item} type="video/webm" />
                              </video>
                            ) : (
                              <img src={item} alt={`Workshop ${i}`} className="w-full h-full object-cover" />
                            )
                          ) : (
                            <ImageIcon className="w-6 h-6 text-[var(--steam-text-muted)] opacity-50 group-hover:opacity-100 transition-opacity" />
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Recent Activity */}
                <div className="steam-glass-panel p-4">
                  <h2 className="text-lg font-light text-[var(--steam-text-main)] mb-4">Recent Activity</h2>
                  <div className="flex gap-4 border-b border-[var(--steam-border)] pb-4">
                    <div className="w-[184px] h-[69px] bg-[var(--steam-glass-bg)] border border-[var(--steam-border)] shrink-0"></div>
                    <div>
                      <div className="text-[var(--steam-text-main)] font-medium">Cyberpunk 2077</div>
                      <div className="text-xs text-[var(--steam-text-muted)]">12.5 hrs past 2 weeks</div>
                    </div>
                  </div>
                </div>

              </div>

              {/* Right Column (268px) */}
              <div className="w-[268px] space-y-4 shrink-0">
                <div className="steam-glass-panel p-4">
                  <h2 className="text-sm font-medium text-[var(--steam-text-main)] mb-2">Currently Online</h2>
                  <div className="text-xs text-[var(--steam-text-muted)] mb-4">Playing Cyberpunk 2077</div>
                  
                  <div className="mb-4">
                    <div className="text-sm text-[var(--steam-text-main)] hover:text-[var(--steam-accent)] cursor-pointer mb-2">Badges 15</div>
                    <div className="flex gap-1 flex-wrap">
                      {[1, 2, 3, 4].map(i => (
                        <div key={i} className="w-10 h-10 rounded-full bg-[var(--steam-glass-bg)] border border-[var(--steam-border)]"></div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="steam-glass-panel p-4">
                  <div className="text-sm text-[var(--steam-text-main)] hover:text-[var(--steam-accent)] cursor-pointer mb-2">Groups 3</div>
                  <div className="text-sm text-[var(--steam-text-main)] hover:text-[var(--steam-accent)] cursor-pointer">Friends 42</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Control Panel (Design Studio) */}
      <div className="w-80 bg-slate-900 border-l border-slate-800 flex flex-col z-30 shadow-2xl shrink-0">
        <div className="p-5 border-b border-slate-800 bg-slate-950">
          <h2 className="font-bold text-white flex items-center gap-2 text-lg">
            <Settings className="w-5 h-5 text-cyan-400" /> Design Studio
          </h2>
          <p className="text-xs text-slate-400 mt-1">Pixel-perfect profile simulator</p>
        </div>

        <div className="flex-1 overflow-y-auto p-5 space-y-8">
          
          {/* Theme Grid */}
          <div>
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Profile Theme</h3>
            <div className="grid grid-cols-4 gap-2">
              {themesList.map(t => (
                <button 
                  key={t.id}
                  onClick={() => setTheme(t.id)}
                  title={t.name}
                  className={`aspect-square rounded-full border-2 transition-all ${theme === t.id ? 'border-cyan-400 scale-110 shadow-[0_0_10px_rgba(34,211,238,0.5)]' : 'border-transparent hover:border-slate-600'} ${t.color}`}
                />
              ))}
            </div>
          </div>

          {/* Layout Toggle */}
          <div>
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Showcase Layout</h3>
            <div className="flex bg-slate-950 p-1 rounded-xl border border-slate-800">
              <button 
                onClick={() => setShowcaseType('artwork')}
                className={`flex-1 py-2.5 text-sm font-medium rounded-lg transition-colors flex items-center justify-center gap-2 ${showcaseType === 'artwork' ? 'bg-slate-800 text-cyan-400 shadow-sm' : 'text-slate-400 hover:text-white'}`}
              >
                <Layout className="w-4 h-4" /> Artwork
              </button>
              <button 
                onClick={() => setShowcaseType('workshop')}
                className={`flex-1 py-2.5 text-sm font-medium rounded-lg transition-colors flex items-center justify-center gap-2 ${showcaseType === 'workshop' ? 'bg-slate-800 text-cyan-400 shadow-sm' : 'text-slate-400 hover:text-white'}`}
              >
                <Grid className="w-4 h-4" /> Workshop
              </button>
            </div>
          </div>

          {/* Steam Level */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Steam Level</h3>
              <input 
                type="number" 
                value={steamLevel}
                onChange={(e) => setSteamLevel(Number(e.target.value))}
                className="w-16 bg-slate-950 border border-slate-800 rounded px-2 py-1 text-sm text-white text-right focus:outline-none focus:border-cyan-500"
              />
            </div>
            <input 
              type="range" 
              min="1" 
              max="200" 
              value={steamLevel} 
              onChange={(e) => setSteamLevel(Number(e.target.value))}
              className="w-full accent-cyan-500"
            />
          </div>

          {/* Background Upload */}
          <div>
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Background Image</h3>
            <button 
              onClick={() => triggerUpload('background')}
              className="w-full py-3 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-colors flex items-center justify-center gap-2 text-sm font-medium text-white"
            >
              <Upload className="w-4 h-4 text-cyan-400" /> Upload Background
            </button>
            <p className="text-xs text-slate-500 mt-2 text-center">Supports JPG, PNG, WEBM, MP4</p>
          </div>

        </div>
      </div>
    </div>
  );
}
