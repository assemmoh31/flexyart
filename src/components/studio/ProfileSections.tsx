import React, { useState, useRef } from 'react';
import { PlayCircle, ShoppingCart, Star, ArrowRightLeft } from 'lucide-react';

export function HeroSection({ previewMode }: { previewMode: string }) {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="w-32 h-32 rounded-full border-4 border-cyan-500 overflow-hidden mb-4 shadow-[0_0_30px_rgba(34,211,238,0.3)]">
        <img src="https://picsum.photos/seed/creator/200/200" alt="Creator" className="w-full h-full object-cover" />
      </div>
      <h1 className="text-4xl font-bold text-white mb-2">Neon Dreams Studio</h1>
      <p className="text-slate-400 max-w-lg mb-6">Crafting premium cyberpunk and synthwave aesthetics for your digital identity.</p>
      <div className="flex gap-4">
        <button className="px-6 py-2 bg-white text-black font-bold rounded-full hover:bg-slate-200 transition-colors">Follow</button>
        <button className="px-6 py-2 bg-slate-800 text-white font-bold rounded-full border border-slate-700 hover:border-slate-500 transition-colors">Contact</button>
      </div>
    </div>
  );
}

export function FeaturedSection({ primaryColor }: { primaryColor: string }) {
  return (
    <div>
      <div className="flex items-center gap-2 mb-6">
        <Star className="w-5 h-5" style={{ color: primaryColor }} />
        <h2 className="text-xl font-bold text-white">Magnum Opus</h2>
      </div>
      <div className="relative rounded-xl overflow-hidden aspect-video group border border-slate-800">
        <img src="https://picsum.photos/seed/magnum/1200/600" alt="Featured" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col justify-end p-8">
          <h3 className="text-3xl font-bold text-white mb-2">Cyberpunk Megacity Profile Overhaul</h3>
          <p className="text-slate-300 mb-4 max-w-2xl">A complete transformation including animated avatar, frame, background, and custom mini-profile.</p>
          <div className="flex items-center gap-4">
            <button className="px-6 py-3 bg-cyan-500 text-black font-bold rounded-lg flex items-center gap-2 hover:bg-cyan-400 transition-colors">
              <ShoppingCart className="w-5 h-5" /> Get Bundle - 10,000 pts
            </button>
            <span className="text-sm text-slate-400 line-through">15,000 pts</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export function ShopSection({ layout, primaryColor }: { layout: string, primaryColor: string }) {
  const products = [
    { id: 1, title: 'Neon Skull', type: 'Avatar', price: 2000, animated: true, img: 'https://picsum.photos/seed/p1/400/400', vid: 'https://cdn.pixabay.com/video/2023/10/22/186175-877653483_large.mp4' },
    { id: 2, title: 'Synthwave Sun', type: 'Background', price: 500, animated: false, img: 'https://picsum.photos/seed/p2/400/400' },
    { id: 3, title: 'Glitch Frame', type: 'Frame', price: 1500, animated: true, img: 'https://picsum.photos/seed/p3/400/400', vid: 'https://cdn.pixabay.com/video/2023/09/24/181956-867864887_large.mp4' },
    { id: 4, title: 'Hacker Terminal', type: 'Mini-Profile', price: 3000, animated: true, img: 'https://picsum.photos/seed/p4/400/400', vid: 'https://cdn.pixabay.com/video/2023/10/26/186639-878456839_large.mp4' },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-white">Latest Drops</h2>
        <div className="flex gap-2">
          <span className="px-3 py-1 bg-slate-800 rounded-full text-xs font-medium text-slate-300 border border-slate-700">All</span>
          <span className="px-3 py-1 bg-slate-900 rounded-full text-xs font-medium text-slate-500 border border-slate-800">Avatars</span>
          <span className="px-3 py-1 bg-slate-900 rounded-full text-xs font-medium text-slate-500 border border-slate-800">Backgrounds</span>
        </div>
      </div>

      <div className={`grid gap-6 ${layout === 'grid' ? 'grid-cols-2 md:grid-cols-4' : layout === 'masonry' ? 'columns-2 md:columns-4 space-y-6' : 'flex overflow-x-auto pb-4 snap-x'}`}>
        {products.map(p => (
          <HoverPlayCard key={p.id} product={p} layout={layout} primaryColor={primaryColor} />
        ))}
      </div>
    </div>
  );
}

export const HoverPlayCard: React.FC<{ product: any, layout: string, primaryColor: string }> = ({ product, layout, primaryColor }) => {
  const [isHovered, setIsHovered] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (videoRef.current) videoRef.current.play().catch(() => {});
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  return (
    <div 
      className={`bg-slate-900/50 border border-slate-800 rounded-xl overflow-hidden group transition-all hover:border-slate-600 ${layout === 'carousel' ? 'min-w-[250px] snap-start' : 'break-inside-avoid'}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="relative aspect-square bg-slate-950 overflow-hidden">
        {product.animated && isHovered && product.vid ? (
          <video ref={videoRef} src={product.vid} muted loop className="w-full h-full object-cover" />
        ) : (
          <img src={product.img} alt={product.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
        )}
        
        {product.animated && (
          <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-md p-1.5 rounded-lg border border-white/10">
            <PlayCircle className="w-4 h-4" style={{ color: primaryColor }} />
          </div>
        )}
      </div>
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h4 className="text-white font-bold text-sm truncate">{product.title}</h4>
            <p className="text-xs text-slate-500">{product.type}</p>
          </div>
        </div>
        
        {/* Variant Selector Mock */}
        {product.animated && (
          <div className="flex gap-1 mb-3 bg-slate-950 p-1 rounded-md border border-slate-800">
            <button className="flex-1 text-[10px] py-1 bg-slate-800 text-white rounded font-medium">Animated</button>
            <button className="flex-1 text-[10px] py-1 text-slate-500 hover:text-white rounded font-medium">Static</button>
          </div>
        )}

        <div className="flex items-center justify-between mt-2">
          <span className="text-sm font-bold" style={{ color: primaryColor }}>{product.price} pts</span>
          <button className="p-1.5 bg-white/5 hover:bg-white/10 rounded-md transition-colors text-white">
            <ShoppingCart className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

export function ProcessSection({ type = 'static', beforeMedia = 'https://picsum.photos/seed/before/1000/500?grayscale', afterMedia = 'https://picsum.photos/seed/after/1000/500' }: { type?: string, beforeMedia?: string, afterMedia?: string }) {
  const [sliderPos, setSliderPos] = useState(50);

  return (
    <div>
      <div className="flex items-center gap-2 mb-6">
        <ArrowRightLeft className="w-5 h-5 text-purple-400" />
        <h2 className="text-xl font-bold text-white">Design Process</h2>
      </div>
      <p className="text-sm text-slate-400 mb-4">Drag the slider to see the before and after of my latest artwork.</p>
      
      <div className="relative w-full aspect-video rounded-xl overflow-hidden border border-slate-800 cursor-ew-resize select-none"
           onMouseMove={(e) => {
             const rect = e.currentTarget.getBoundingClientRect();
             const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
             setSliderPos((x / rect.width) * 100);
           }}
           onTouchMove={(e) => {
             const rect = e.currentTarget.getBoundingClientRect();
             const x = Math.max(0, Math.min(e.touches[0].clientX - rect.left, rect.width));
             setSliderPos((x / rect.width) * 100);
           }}
      >
        {/* After Media (Bottom) */}
        {type === 'animated' ? (
          <video src={afterMedia} autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover" />
        ) : (
          <img src={afterMedia} alt="After" className="absolute inset-0 w-full h-full object-cover" />
        )}
        
        {/* Before Media (Top, Clipped) */}
        <div 
          className="absolute inset-0 overflow-hidden"
          style={{ clipPath: `polygon(0 0, ${sliderPos}% 0, ${sliderPos}% 100%, 0 100%)` }}
        >
          {type === 'animated' ? (
            <video src={beforeMedia} autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover" />
          ) : (
            <img src={beforeMedia} alt="Before" className="absolute inset-0 w-full h-full object-cover" />
          )}
        </div>

        {/* Slider Line */}
        <div 
          className="absolute top-0 bottom-0 w-1 bg-white shadow-[0_0_10px_rgba(255,255,255,0.5)] z-10"
          style={{ left: `calc(${sliderPos}% - 2px)` }}
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg">
            <ArrowRightLeft className="w-4 h-4 text-black" />
          </div>
        </div>
        
        <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-white">Sketch</div>
        <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-white">Final Render</div>
      </div>
    </div>
  );
}

export function BioSection() {
  return (
    <div className="flex flex-col md:flex-row gap-8 items-center">
      <div className="w-48 h-48 shrink-0 rounded-2xl overflow-hidden border border-slate-800">
        <img src="https://picsum.photos/seed/bio/300/300" alt="Bio" className="w-full h-full object-cover" />
      </div>
      <div>
        <h2 className="text-2xl font-bold text-white mb-4">About the Artist</h2>
        <p className="text-slate-300 leading-relaxed mb-4">
          I'm a digital artist specializing in cyberpunk and sci-fi aesthetics. With over 5 years of experience creating assets for the Steam community, my goal is to help you build a profile that truly stands out.
        </p>
        <div className="flex gap-4">
          <div className="bg-slate-900/50 border border-slate-800 rounded-lg p-3 text-center flex-1">
            <div className="text-2xl font-bold text-cyan-400">1.2k+</div>
            <div className="text-xs text-slate-500 uppercase tracking-wider">Items Sold</div>
          </div>
          <div className="bg-slate-900/50 border border-slate-800 rounded-lg p-3 text-center flex-1">
            <div className="text-2xl font-bold text-purple-400">4.9</div>
            <div className="text-xs text-slate-500 uppercase tracking-wider">Average Rating</div>
          </div>
        </div>
      </div>
    </div>
  );
}
