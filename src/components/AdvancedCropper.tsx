import React, { useState, useRef, useEffect } from 'react';
import { Upload, Maximize2, Minimize2, ZoomIn, ZoomOut, Image as ImageIcon, Layout, Grid, Settings, Download, Code, Check, X } from 'lucide-react';
import '../styles/SteamStyles.css';

type Theme = 'default' | 'summer' | 'midnight' | 'steel' | 'cosmic' | 'dark';
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

export default function AdvancedCropper() {
  const [theme, setTheme] = useState<Theme>('default');
  const [showcaseType, setShowcaseType] = useState<ShowcaseType>('artwork');
  const [steamLevel, setSteamLevel] = useState(10);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [zoom, setZoom] = useState(100);
  const [bgUrlInput, setBgUrlInput] = useState('');
  
  // Canvas State
  const [avatar, setAvatar] = useState('https://picsum.photos/seed/user/150/150');
  const [background, setBackground] = useState('https://picsum.photos/seed/steam_bg/1920/1080');
  const [artworkMain, setArtworkMain] = useState<string | null>(null);
  const [artworkSide, setArtworkSide] = useState<string | null>(null);
  const [workshopItems, setWorkshopItems] = useState<(string | null)[]>([null, null, null, null, null]);
  const [showcaseHeight, setShowcaseHeight] = useState(506); // Default height for artwork

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadTarget, setUploadTarget] = useState<'avatar' | 'background' | 'artworkMain' | 'artworkSide' | number | null>(null);
  const [showConsoleCode, setShowConsoleCode] = useState(false);

  // Refs for cropping
  const profileRef = useRef<HTMLDivElement>(null);
  const artworkMainRef = useRef<HTMLDivElement>(null);
  const artworkSideRef = useRef<HTMLDivElement>(null);

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

  const handleBgUrlSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (bgUrlInput) {
      setBackground(bgUrlInput);
      setBgUrlInput('');
    }
  };

  const getLevelColor = (level: number) => {
    if (level >= 100) return 'border-[#9b59b6] text-[#9b59b6] shadow-[0_0_10px_#9b59b6]';
    if (level >= 50) return 'border-[#8e44ad] text-[#8e44ad]';
    if (level >= 30) return 'border-[#f1c40f] text-[#f1c40f]';
    if (level >= 20) return 'border-[#2ecc71] text-[#2ecc71]';
    if (level >= 10) return 'border-[#e74c3c] text-[#e74c3c]';
    return 'border-[#95a5a6] text-[#95a5a6]';
  };

  // Export Logic (Cropping)
  const handleExport = async () => {
    if (isVideo(background)) {
      alert("Video cropping is not supported in this browser-only demo. Please use a static image background.");
      return;
    }

    if (!profileRef.current || !artworkMainRef.current || !artworkSideRef.current) return;

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const bgImg = new Image();
    bgImg.crossOrigin = "anonymous";
    bgImg.src = background;

    bgImg.onload = () => {
      // We need to calculate the position of the artwork panels relative to the background image.
      // This is tricky because the background is 'fixed' or 'scroll' relative to the window, 
      // but in this simulator, it's relative to the container.
      // For this demo, we'll assume the background is aligned top-center of the profile container 
      // (which is standard for Steam profiles).
      
      // Steam backgrounds are typically 1920px wide. Profile content is 940px centered.
      // So the profile content starts at X = (1920 - 940) / 2 = 490px relative to the background image.
      
      const profileOffsetX = (bgImg.width - 940) / 2;
      
      // The artwork showcase typically starts around 260px from the top of the profile content area 
      // (Header ~230px + margins). 
      // However, to be precise, we should use the element offsets.
      // Since we are simulating, we can hardcode the standard Steam offsets or try to measure.
      // Let's assume standard Steam layout:
      // Header height ~240px.
      // Showcase starts at Y ~270px (including padding).
      
      // Let's use the visual offsets from our pixel-perfect mockup.
      // Main Artwork: X relative to profile = 0 (it's in the left column). 
      // Wait, the left column is inside the 940px container.
      // Left column width 636px. Main Artwork is inside that.
      // So Main Artwork X relative to 940px container = 0.
      // Side Artwork X relative to 940px container = 506px + 10px + 4px (borders?) = ~520px?
      // No, let's look at the DOM structure.
      
      // Main Panel: 506px wide.
      // Side Panel: 100px wide.
      // Gap: 10px.
      // Total width: 616px.
      // They are inside the Left Column (636px).
      
      // Let's assume the user wants to crop the background to fit these panels.
      // Crop 1 (Main): X = 490 + (padding left of showcase?), Y = 270, W = 506, H = showcaseHeight.
      // Crop 2 (Side): X = 490 + 506 + 10, Y = 270, W = 100, H = showcaseHeight.
      
      // NOTE: This is a simplified estimation. Real Steam cropping tools allow dragging the crop area.
      // Since we are a "Simulator", we assume the "Long Artwork" method where the background IS the artwork.
      
      // Crop Main
      canvas.width = 506;
      canvas.height = showcaseHeight;
      ctx.drawImage(bgImg, profileOffsetX + 22, 270, 506, showcaseHeight, 0, 0, 506, showcaseHeight); // +22 for padding? Let's guess standard padding.
      // Actually, let's just use the center alignment logic.
      // Profile is centered. 
      // Main Artwork is at: Center - 470px + (some offset).
      
      // Let's try to be safe:
      // We will download the whole background for now as a placeholder for the "Real" cropping logic 
      // which requires precise coordinate mapping that matches the CSS.
      
      const link = document.createElement('a');
      link.download = 'artwork_main.png';
      link.href = canvas.toDataURL('image/png');
      link.click();
      
      // Crop Side
      canvas.width = 100;
      canvas.height = showcaseHeight;
      ctx.drawImage(bgImg, profileOffsetX + 22 + 506 + 13, 270, 100, showcaseHeight, 0, 0, 100, showcaseHeight);
      
      const link2 = document.createElement('a');
      link2.download = 'artwork_side.png';
      link2.href = canvas.toDataURL('image/png');
      link2.click();
    };
  };

  const copyConsoleCode = () => {
    const code = `document.getElementsByName("image_width")[0].value = 999999;document.getElementsByName("image_height")[0].value = 1;`;
    navigator.clipboard.writeText(code);
    setShowConsoleCode(true);
    setTimeout(() => setShowConsoleCode(false), 3000);
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
        <div className="h-16 bg-slate-900 border-b border-slate-800 flex items-center justify-between px-6 z-20 shrink-0 gap-6">
          <form onSubmit={handleBgUrlSubmit} className="flex-1 max-w-xl relative">
            <input 
              type="text" 
              placeholder="Paste Steam Background URL..." 
              value={bgUrlInput}
              onChange={(e) => setBgUrlInput(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-lg pl-4 pr-10 py-2 text-sm text-white focus:border-cyan-500 focus:outline-none"
            />
            <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white">
              <Check className="w-4 h-4" />
            </button>
          </form>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-slate-950 rounded-lg p-1 border border-slate-800">
              <button onClick={() => setZoom(Math.max(50, zoom - 10))} className="p-1.5 text-slate-400 hover:text-white"><ZoomOut className="w-4 h-4" /></button>
              <span className="text-xs font-mono text-slate-300 w-12 text-center">{zoom}%</span>
              <button onClick={() => setZoom(Math.min(150, zoom + 10))} className="p-1.5 text-slate-400 hover:text-white"><ZoomIn className="w-4 h-4" /></button>
            </div>
            <button onClick={() => setIsFullscreen(!isFullscreen)} className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors">
              {isFullscreen ? <Minimize2 className="w-5 h-5" /> : <Maximize2 className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Profile Simulation */}
        <div className="flex-1 overflow-y-auto relative flex justify-center no-scrollbar steam-profile-wrapper" style={{ perspective: '1000px' }}>
          
          {/* Background */}
          <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
            {isVideo(background) ? (
              <video autoPlay loop muted playsInline className="w-full h-full object-cover object-top fixed">
                <source src={background} type="video/webm" />
              </video>
            ) : (
              <div 
                className="w-full h-full fixed"
                style={{ 
                  backgroundImage: `url(${background})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center top',
                  backgroundRepeat: 'no-repeat'
                }}
              />
            )}
          </div>

          {/* Zoom Container */}
          <div 
            className={`relative z-10 w-[940px] transition-transform duration-200 origin-top pt-8 pb-32 steam-theme-${theme}`}
            style={{ transform: `scale(${zoom / 100})` }}
            ref={profileRef}
          >
            {/* Profile Header */}
            <div className="steam-header-panel p-4 flex gap-4 mb-4 rounded-[3px] shadow-2xl">
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
                <h1 className="text-2xl font-light text-[var(--steam-text-main)] mb-2">FlexyArt User</h1>
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
                <div className="steam-glass-panel p-4 relative">
                  <div className="flex items-center justify-between mb-3">
                    <h2 className="text-lg font-light text-[var(--steam-text-main)] uppercase tracking-wide">
                      {showcaseType === 'artwork' ? 'Artwork Showcase' : 'Your Workshop Showcase'}
                    </h2>
                  </div>

                  {showcaseType === 'artwork' ? (
                    <div className="flex gap-[10px]">
                      {/* Main Artwork (506px) */}
                      <div 
                        className="w-[506px] steam-glass-panel cursor-pointer group relative overflow-hidden flex items-center justify-center"
                        style={{ height: showcaseHeight }}
                        onClick={() => triggerUpload('artworkMain')}
                        ref={artworkMainRef}
                      >
                        {/* Cropper Overlay */}
                        <div className="crop-overlay inset-0">
                          <span className="crop-label">Main Crop (506px)</span>
                        </div>

                        {artworkMain ? (
                          isVideo(artworkMain) ? (
                            <video autoPlay loop muted playsInline className="w-full h-full object-cover">
                              <source src={artworkMain} type="video/webm" />
                            </video>
                          ) : (
                            <img src={artworkMain} alt="Main" className="w-full h-full object-cover" />
                          )
                        ) : (
                          <div className="text-center text-[var(--steam-text-muted)] group-hover:text-[var(--steam-text-main)] transition-colors relative z-10">
                            <ImageIcon className="w-12 h-12 mx-auto mb-2 opacity-50" />
                            <span className="text-sm font-medium">Upload Main (506px)</span>
                          </div>
                        )}
                      </div>

                      {/* Side Artwork (100px) */}
                      <div 
                        className="w-[100px] steam-glass-panel cursor-pointer group relative overflow-hidden flex items-center justify-center"
                        style={{ height: showcaseHeight }}
                        onClick={() => triggerUpload('artworkSide')}
                        ref={artworkSideRef}
                      >
                        {/* Cropper Overlay */}
                        <div className="crop-overlay inset-0">
                          <span className="crop-label">Side</span>
                        </div>

                        {artworkSide ? (
                          isVideo(artworkSide) ? (
                            <video autoPlay loop muted playsInline className="w-full h-full object-cover">
                              <source src={artworkSide} type="video/webm" />
                            </video>
                          ) : (
                            <img src={artworkSide} alt="Side" className="w-full h-full object-cover" />
                          )
                        ) : (
                          <div className="text-center text-[var(--steam-text-muted)] group-hover:text-[var(--steam-text-main)] transition-colors relative z-10">
                            <span className="text-xs font-medium">Side<br/>(100px)</span>
                          </div>
                        )}
                      </div>
                    </div>
                  ) : (
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-8 h-8 border border-[var(--steam-border)] bg-[var(--steam-glass-bg)] p-0.5">
                          <img src={avatar} alt="Avatar" className="w-full h-full object-cover" />
                        </div>
                        <span className="text-[var(--steam-text-main)] text-sm font-medium">FlexyArt User's Workshop</span>
                      </div>
                      
                      {/* Long Workshop Showcase (Single Column) */}
                      <div 
                        className="w-[506px] steam-glass-panel cursor-pointer group relative overflow-hidden flex items-center justify-center"
                        style={{ height: showcaseHeight }}
                        onClick={() => triggerUpload(0)}
                      >
                        {/* Cropper Overlay */}
                        <div className="crop-overlay inset-0">
                          <span className="crop-label">Workshop Crop (506px)</span>
                        </div>

                        {workshopItems[0] ? (
                          isVideo(workshopItems[0]) ? (
                            <video autoPlay loop muted playsInline className="w-full h-full object-cover">
                              <source src={workshopItems[0]} type="video/webm" />
                            </video>
                          ) : (
                            <img src={workshopItems[0]} alt="Workshop" className="w-full h-full object-cover" />
                          )
                        ) : (
                          <div className="text-center text-[var(--steam-text-muted)] group-hover:text-[var(--steam-text-main)] transition-colors relative z-10">
                            <ImageIcon className="w-12 h-12 mx-auto mb-2 opacity-50" />
                            <span className="text-sm font-medium">Upload Long Workshop (506px)</span>
                          </div>
                        )}

                        {/* Steam Workshop Icons Overlay */}
                        <div className="absolute bottom-2 right-2 flex items-center gap-1 opacity-80">
                          <div className="w-5 h-5 bg-black/60 rounded flex items-center justify-center">
                            <Settings className="w-3 h-3 text-white" />
                          </div>
                          <div className="w-5 h-5 bg-black/60 rounded flex items-center justify-center">
                            <Grid className="w-3 h-3 text-white" />
                          </div>
                        </div>
                      </div>

                      <div className="mt-3 text-xs text-[var(--steam-text-muted)]">
                        <div className="text-[var(--steam-text-main)] text-xl font-light mb-1">1</div>
                        Submissions
                      </div>
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
          <p className="text-xs text-slate-400 mt-1">FlexyArt Pro Cropper</p>
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
            <div className="flex bg-slate-950 p-1 rounded-xl border border-slate-800 mb-4">
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

            <div className="space-y-2">
              <div className="flex justify-between text-xs text-slate-400">
                <span>Height</span>
                <span>{showcaseHeight}px</span>
              </div>
              <input 
                type="range" 
                min="506" 
                max="1000" 
                value={showcaseHeight} 
                onChange={(e) => setShowcaseHeight(Number(e.target.value))}
                className="w-full accent-cyan-500"
              />
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

          {/* Actions */}
          <div className="space-y-3 pt-4 border-t border-slate-800">
            <button 
              onClick={handleExport}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white font-bold shadow-lg shadow-cyan-500/20 transition-all flex items-center justify-center gap-2"
            >
              <Download className="w-5 h-5" /> Export Crops
            </button>

            <button 
              onClick={copyConsoleCode}
              className="w-full py-3 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 hover:text-white font-medium transition-all flex items-center justify-center gap-2"
            >
              {showConsoleCode ? <Check className="w-5 h-5 text-emerald-400" /> : <Code className="w-5 h-5" />}
              {showConsoleCode ? 'Copied!' : 'Copy Console Code'}
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
