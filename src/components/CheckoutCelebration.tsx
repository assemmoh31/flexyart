import React, { useEffect, useState } from 'react';
import { useTheme } from '../context/ThemeContext';

export default function CheckoutCelebration() {
  const { activeTheme } = useTheme();
  const [isCelebrating, setIsCelebrating] = useState(false);

  useEffect(() => {
    const handleCheckout = () => {
      if (activeTheme === 'lunar') {
        setIsCelebrating(true);
        setTimeout(() => {
          setIsCelebrating(false);
        }, 2000);
      }
    };

    window.addEventListener('checkout-success', handleCheckout);
    return () => {
      window.removeEventListener('checkout-success', handleCheckout);
    };
  }, [activeTheme]);

  if (!isCelebrating) return null;

  return (
    <div className="fixed inset-0 z-[100] pointer-events-none flex items-center justify-center overflow-hidden">
      {/* Golden Confetti */}
      {Array.from({ length: 50 }).map((_, i) => (
        <div
          key={i}
          className="absolute bg-[#FFC107] rounded-sm"
          style={{
            width: `${Math.random() * 10 + 5}px`,
            height: `${Math.random() * 10 + 5}px`,
            left: '50%',
            top: '50%',
            animation: `confetti-explosion 2s ease-out forwards`,
            transformOrigin: 'center',
            transform: `rotate(${Math.random() * 360}deg)`,
            '--tx': `${(Math.random() - 0.5) * 100}vw`,
            '--ty': `${(Math.random() - 0.5) * 100}vh`,
            '--r': `${Math.random() * 720}deg`
          } as React.CSSProperties}
        />
      ))}

      {/* "Fu" Character Overlay */}
      <div className="relative animate-[fu-pop_2s_ease-out_forwards]">
        <div className="absolute inset-0 bg-[#FFC107] blur-3xl opacity-50 rounded-full"></div>
        <svg viewBox="0 0 100 100" className="w-64 h-64 text-[#D32F2F] drop-shadow-[0_0_20px_rgba(255,193,7,0.8)] relative z-10">
          <circle cx="50" cy="50" r="48" fill="#FFC107" stroke="#D32F2F" strokeWidth="4"/>
          <path d="M30 30 L40 30 L40 70 L30 70 Z" fill="#D32F2F"/>
          <path d="M50 30 L80 30 L80 40 L50 40 Z" fill="#D32F2F"/>
          <path d="M50 45 L80 45 L80 55 L50 55 Z" fill="#D32F2F"/>
          <path d="M50 60 L80 60 L80 70 L50 70 Z" fill="#D32F2F"/>
          <path d="M60 20 L70 20 L70 80 L60 80 Z" fill="#D32F2F"/>
        </svg>
      </div>

      <style>{`
        @keyframes confetti-explosion {
          0% { transform: translate(0, 0) rotate(0deg) scale(1); opacity: 1; }
          100% { transform: translate(var(--tx), var(--ty)) rotate(var(--r)) scale(0); opacity: 0; }
        }
        @keyframes fu-pop {
          0% { transform: scale(0) rotate(-180deg); opacity: 0; }
          20% { transform: scale(1.2) rotate(10deg); opacity: 1; }
          40% { transform: scale(1) rotate(0deg); opacity: 1; }
          80% { transform: scale(1) rotate(0deg); opacity: 1; }
          100% { transform: scale(1.5) rotate(0deg); opacity: 0; }
        }
      `}</style>
    </div>
  );
}
