import React from 'react';
import { useTheme } from '../context/ThemeContext';

const PumpkinSVG = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2C11.4477 2 11 2.44772 11 3V4.06189C7.05369 4.5539 4 7.9203 4 12C4 16.4183 7.58172 20 12 20C16.4183 20 20 16.4183 20 12C20 7.9203 16.9463 4.5539 13 4.06189V3C13 2.44772 12.5523 2 12 2ZM9.5 10C9.5 9.17157 10.1716 8.5 11 8.5C11.8284 8.5 12.5 9.17157 12.5 10C12.5 10.8284 11.8284 11.5 11 11.5C10.1716 11.5 9.5 10.8284 9.5 10ZM14.5 10C14.5 9.17157 15.1716 8.5 16 8.5C16.8284 8.5 17.5 9.17157 17.5 10C17.5 10.8284 16.8284 11.5 16 11.5C15.1716 11.5 14.5 10.8284 14.5 10ZM8.5 14C8.5 13.4477 8.94772 13 9.5 13H14.5C15.0523 13 15.5 13.4477 15.5 14C15.5 15.6569 14.1569 17 12.5 17H11.5C9.84315 17 8.5 15.6569 8.5 14Z" />
  </svg>
);

export default function HalloweenEffects() {
  const { activeTheme } = useTheme();

  if (activeTheme !== 'halloween') return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {/* Bat Animation Overlay */}
      <video 
        autoPlay 
        loop 
        muted 
        playsInline 
        className="absolute inset-0 w-full h-full object-cover opacity-20 mix-blend-screen"
      >
        <source src="https://assets.mixkit.co/videos/preview/mixkit-bats-flying-in-the-dark-night-sky-32660-large.mp4" type="video/mp4" />
      </video>

      {/* Fog Effect */}
      <div className="absolute bottom-0 left-0 w-[200%] h-[40vh] bg-gradient-to-t from-[#32CD32]/10 to-transparent animate-[drift_20s_linear_infinite_alternate] blur-[20px]"></div>
      
      {/* Spooky Pumpkins */}
      <div className="absolute bottom-6 left-6 opacity-90 animate-pulse" style={{ filter: 'drop-shadow(0 0 15px #32CD32)' }}>
        <PumpkinSVG className="w-16 h-16 text-[#FF7518]" />
      </div>
      <div className="absolute bottom-6 right-6 opacity-90 animate-pulse" style={{ filter: 'drop-shadow(0 0 15px #32CD32)' }}>
        <PumpkinSVG className="w-16 h-16 text-[#FF7518]" />
      </div>
    </div>
  );
}
