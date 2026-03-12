import React from 'react';

export const FallingLeaves: React.FC = () => {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      {[...Array(20)].map((_, i) => {
        const left = `${Math.random() * 100}%`;
        const animationDuration = `${10 + Math.random() * 15}s`;
        const animationDelay = `-${Math.random() * 20}s`;
        const size = `${15 + Math.random() * 20}px`;
        const isBrown = Math.random() > 0.7;
        
        return (
          <div
            key={i}
            className={`absolute top-[-10%] opacity-60 ${isBrown ? 'bg-[#BFA071]' : 'bg-[#8BC34A]'}`}
            style={{
              left,
              width: size,
              height: size,
              animation: `fall ${animationDuration} linear ${animationDelay} infinite, sway ${3 + Math.random() * 4}s ease-in-out ${animationDelay} infinite alternate`,
              borderRadius: '50% 0 50% 50%',
            }}
          />
        );
      })}
      <style>{`
        @keyframes fall {
          0% { top: -10%; }
          100% { top: 110%; }
        }
        @keyframes sway {
          0% { transform: translateX(-30px) rotate(-60deg); }
          100% { transform: translateX(30px) rotate(-20deg); }
        }
      `}</style>
    </div>
  );
};
