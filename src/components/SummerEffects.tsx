import React, { useEffect, useState } from 'react';
import { useTheme } from '../context/ThemeContext';

export default function SummerEffects() {
  const { activeTheme } = useTheme();
  const [bubbles, setBubbles] = useState<{ id: number; left: string; delay: string; duration: string; size: string; opacity: string }[]>([]);

  useEffect(() => {
    if (activeTheme === 'summer') {
      // Generate random floating bubbles
      const newBubbles = Array.from({ length: 25 }).map((_, i) => ({
        id: i,
        left: `${Math.random() * 100}vw`,
        delay: `${Math.random() * 5}s`,
        duration: `${10 + Math.random() * 15}s`,
        size: `${5 + Math.random() * 20}px`,
        opacity: `${0.2 + Math.random() * 0.4}`
      }));
      setBubbles(newBubbles);
    } else {
      setBubbles([]);
    }
  }, [activeTheme]);

  if (activeTheme !== 'summer') return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Floating Bubbles */}
      {bubbles.map((bubble) => (
        <div
          key={bubble.id}
          className="absolute rounded-full bg-white"
          style={{
            left: bubble.left,
            bottom: '-50px',
            width: bubble.size,
            height: bubble.size,
            opacity: bubble.opacity,
            animationName: 'float-bubble',
            animationTimingFunction: 'ease-in-out',
            animationIterationCount: 'infinite',
            animationDelay: bubble.delay,
            animationDuration: bubble.duration,
            boxShadow: 'inset 0 0 10px rgba(255,255,255,0.5)'
          }}
        />
      ))}

      {/* Sun Lens Flare */}
      <div className="fixed top-[-100px] right-[-100px] w-[400px] h-[400px] rounded-full bg-[#FFD700] blur-[100px] opacity-30 animate-[spin_20s_linear_infinite] pointer-events-none z-0"></div>
      <div className="fixed top-10 right-10 w-32 h-32 rounded-full bg-gradient-to-br from-[#FFD700] to-[#FF8C00] blur-md opacity-80 animate-[pulse_4s_ease-in-out_infinite] pointer-events-none z-0 flex items-center justify-center">
        <div className="w-full h-full absolute animate-[spin_10s_linear_infinite]">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="absolute top-1/2 left-1/2 w-40 h-2 bg-[#FFD700] opacity-40 -translate-y-1/2 origin-left" style={{ transform: `translateY(-50%) rotate(${i * 45}deg)` }}></div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes float-bubble {
          0% { transform: translateY(0) translateX(0); opacity: 0; }
          10% { opacity: var(--target-opacity, 0.6); }
          50% { transform: translateY(-55vh) translateX(20px); }
          90% { opacity: var(--target-opacity, 0.6); }
          100% { transform: translateY(-110vh) translateX(-20px); opacity: 0; }
        }
      `}</style>
    </div>
  );
}
