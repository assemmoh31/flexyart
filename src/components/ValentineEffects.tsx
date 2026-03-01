import React, { useEffect, useState, useRef } from 'react';
import { useTheme } from '../context/ThemeContext';

export default function ValentineEffects() {
  const { activeTheme } = useTheme();
  const [hearts, setHearts] = useState<{ id: number; left: string; delay: string; duration: string; size: string; opacity: string }[]>([]);
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (activeTheme === 'valentine') {
      // Generate random floating hearts
      const newHearts = Array.from({ length: 20 }).map((_, i) => ({
        id: i,
        left: `${Math.random() * 100}vw`,
        delay: `${Math.random() * 10}s`,
        duration: `${15 + Math.random() * 15}s`,
        size: `${10 + Math.random() * 20}px`,
        opacity: `${0.2 + Math.random() * 0.5}`
      }));
      setHearts(newHearts);

      // Glitter Cursor Effect
      const handleMouseMove = (e: MouseEvent) => {
        if (Math.random() > 0.8) { // Don't create a sparkle on every single pixel movement
          createSparkle(e.clientX, e.clientY);
        }
      };

      const createSparkle = (x: number, y: number) => {
        const sparkle = document.createElement('div');
        sparkle.className = 'absolute pointer-events-none z-50 rounded-full bg-white';
        const size = Math.random() * 4 + 2;
        sparkle.style.width = `${size}px`;
        sparkle.style.height = `${size}px`;
        sparkle.style.left = `${x}px`;
        sparkle.style.top = `${y}px`;
        sparkle.style.boxShadow = '0 0 4px #F48FB1, 0 0 8px #F48FB1';
        sparkle.style.animation = 'sparkle-fade 1s forwards';
        
        document.body.appendChild(sparkle);
        
        setTimeout(() => {
          sparkle.remove();
        }, 1000);
      };

      window.addEventListener('mousemove', handleMouseMove);
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
      };
    } else {
      setHearts([]);
    }
  }, [activeTheme]);

  if (activeTheme !== 'valentine') return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Floating Hearts */}
      {hearts.map((heart) => (
        <svg
          key={heart.id}
          className="absolute text-pink-400 fill-current"
          viewBox="0 0 24 24"
          style={{
            left: heart.left,
            bottom: '-50px',
            width: heart.size,
            height: heart.size,
            opacity: heart.opacity,
            animationName: 'float-up',
            animationTimingFunction: 'linear',
            animationIterationCount: 'infinite',
            animationDelay: heart.delay,
            animationDuration: heart.duration,
            filter: 'drop-shadow(0 0 5px rgba(244, 143, 177, 0.5))'
          }}
        >
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        </svg>
      ))}
      <style>{`
        @keyframes float-up {
          0% { transform: translateY(0) scale(1) rotate(0deg); opacity: 0; }
          10% { opacity: var(--target-opacity, 0.5); }
          50% { transform: translateY(-50vh) scale(1.2) rotate(15deg); }
          90% { opacity: var(--target-opacity, 0.5); }
          100% { transform: translateY(-110vh) scale(1) rotate(-15deg); opacity: 0; }
        }
        @keyframes sparkle-fade {
          0% { transform: scale(0) rotate(0deg); opacity: 1; }
          50% { transform: scale(1) rotate(180deg); opacity: 0.8; }
          100% { transform: scale(0) rotate(360deg); opacity: 0; }
        }
      `}</style>
    </div>
  );
}
