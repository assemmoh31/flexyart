import React, { useEffect, useState } from 'react';
import { useTheme } from '../context/ThemeContext';

export default function LunarEffects() {
  const { activeTheme } = useTheme();
  const [lanterns, setLanterns] = useState<{ id: number; left: string; delay: string; duration: string; size: string; opacity: string }[]>([]);

  useEffect(() => {
    if (activeTheme === 'lunar') {
      // Generate random floating lanterns
      const newLanterns = Array.from({ length: 15 }).map((_, i) => ({
        id: i,
        left: `${Math.random() * 100}vw`,
        delay: `${Math.random() * 10}s`,
        duration: `${20 + Math.random() * 20}s`,
        size: `${20 + Math.random() * 30}px`,
        opacity: `${0.4 + Math.random() * 0.4}`
      }));
      setLanterns(newLanterns);
    } else {
      setLanterns([]);
    }
  }, [activeTheme]);

  if (activeTheme !== 'lunar') return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Floating Lanterns */}
      {lanterns.map((lantern) => (
        <div
          key={lantern.id}
          className="absolute"
          style={{
            left: lantern.left,
            bottom: '-100px',
            width: lantern.size,
            height: lantern.size,
            opacity: lantern.opacity,
            animationName: 'float-lantern',
            animationTimingFunction: 'linear',
            animationIterationCount: 'infinite',
            animationDelay: lantern.delay,
            animationDuration: lantern.duration,
            filter: 'drop-shadow(0 0 10px rgba(255, 193, 7, 0.6))'
          }}
        >
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-[#D32F2F]">
            <path d="M12 2C8 2 5 4 5 4V18C5 18 8 20 12 20C16 20 19 18 19 18V4C19 4 16 2 12 2Z" fill="currentColor" stroke="#FFC107" strokeWidth="1"/>
            <path d="M12 2V20" stroke="#FFC107" strokeWidth="1" strokeDasharray="2 2"/>
            <path d="M8 3V19" stroke="#FFC107" strokeWidth="0.5" strokeDasharray="2 2"/>
            <path d="M16 3V19" stroke="#FFC107" strokeWidth="0.5" strokeDasharray="2 2"/>
            <path d="M10 20V23" stroke="#FFC107" strokeWidth="1"/>
            <path d="M14 20V23" stroke="#FFC107" strokeWidth="1"/>
            <path d="M12 20V24" stroke="#FFC107" strokeWidth="1.5"/>
            <path d="M12 0V2" stroke="#FFC107" strokeWidth="1.5"/>
          </svg>
        </div>
      ))}
      <style>{`
        @keyframes float-lantern {
          0% { transform: translateY(0) scale(1) rotate(-5deg); opacity: 0; }
          10% { opacity: var(--target-opacity, 0.8); }
          50% { transform: translateY(-55vh) scale(1.1) rotate(5deg); }
          90% { opacity: var(--target-opacity, 0.8); }
          100% { transform: translateY(-110vh) scale(1) rotate(-5deg); opacity: 0; }
        }
      `}</style>
    </div>
  );
}
