import React, { useEffect, useState } from 'react';
import { useTheme } from '../context/ThemeContext';

export default function ChristmasEffects() {
  const { activeTheme } = useTheme();
  const [snowflakes, setSnowflakes] = useState<{ id: number; left: string; delay: string; duration: string; size: string; opacity: string }[]>([]);

  useEffect(() => {
    if (activeTheme === 'christmas') {
      // Generate random snowflakes
      const newSnowflakes = Array.from({ length: 50 }).map((_, i) => ({
        id: i,
        left: `${Math.random() * 100}vw`,
        delay: `${Math.random() * 5}s`,
        duration: `${10 + Math.random() * 20}s`,
        size: `${2 + Math.random() * 4}px`,
        opacity: `${0.3 + Math.random() * 0.7}`
      }));
      setSnowflakes(newSnowflakes);
    } else {
      setSnowflakes([]);
    }
  }, [activeTheme]);

  if (activeTheme !== 'christmas') return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Snow Particles */}
      {snowflakes.map((flake) => (
        <div 
          key={flake.id} 
          className="absolute rounded-full bg-white"
          style={{
            left: flake.left,
            top: '-10px',
            width: flake.size,
            height: flake.size,
            opacity: flake.opacity,
            animationName: 'snowfall',
            animationTimingFunction: 'linear',
            animationIterationCount: 'infinite',
            animationDelay: flake.delay,
            animationDuration: flake.duration,
            boxShadow: '0 0 5px rgba(255, 255, 255, 0.8)'
          }}
        ></div>
      ))}
      <style>{`
        @keyframes snowfall {
          0% { transform: translateY(-10px) translateX(0); }
          50% { transform: translateY(50vh) translateX(20px); }
          100% { transform: translateY(110vh) translateX(-20px); }
        }
      `}</style>
    </div>
  );
}
