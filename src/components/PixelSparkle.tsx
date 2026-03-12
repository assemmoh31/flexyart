import React, { useMemo } from 'react';

export const PixelSparkle: React.FC = () => {
  const particles = useMemo(() => {
    return [...Array(40)].map((_, i) => {
      const size = Math.random() > 0.5 ? '4px' : '8px';
      const colors = ['#FF0044', '#FFCC00', '#00FFFF', '#FFFFFF'];
      const color = colors[Math.floor(Math.random() * colors.length)];
      return (
        <div
          key={`sparkle-${i}`}
          className="absolute animate-pixel-float"
          style={{
            width: size,
            height: size,
            backgroundColor: color,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            animationDuration: `${Math.random() * 10 + 10}s`,
            animationDelay: `-${Math.random() * 10}s`,
            boxShadow: `0 0 5px ${color}`,
            imageRendering: 'pixelated'
          }}
        />
      );
    });
  }, []);

  const icons = useMemo(() => {
    const iconTypes = ['❤️', '⭐', '🪙', '👾'];
    return [...Array(12)].map((_, i) => {
      const icon = iconTypes[Math.floor(Math.random() * iconTypes.length)];
      return (
        <div
          key={`icon-${i}`}
          className="absolute text-2xl animate-pixel-drift opacity-40 select-none"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            animationDuration: `${Math.random() * 30 + 30}s`,
            animationDelay: `-${Math.random() * 30}s`,
            filter: 'drop-shadow(2px 2px 0px rgba(0,0,0,0.5))'
          }}
        >
          {icon}
        </div>
      );
    });
  }, []);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-[#0B0B1A]">
      {/* Pixelated grid background overlay */}
      <div className="absolute inset-0 opacity-20 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSIjMEIwQjFBIj48L3JlY3Q+CjxyZWN0IHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9IiMxYTFhMzMiPjwvcmVjdD4KPC9zdmc+')]"></div>
      
      {particles}
      {icons}

      <style>{`
        @keyframes pixel-float {
          0% { transform: translateY(0) scale(1); opacity: 0; }
          20% { opacity: 1; }
          80% { opacity: 1; }
          100% { transform: translateY(-150px) scale(0); opacity: 0; }
        }
        @keyframes pixel-drift {
          0% { transform: translate(0, 0) rotate(0deg); }
          50% { transform: translate(50px, -50px) rotate(10deg); }
          100% { transform: translate(100px, 0px) rotate(-10deg); }
        }
        .animate-pixel-float {
          animation: pixel-float linear infinite;
        }
        .animate-pixel-drift {
          animation: pixel-drift linear infinite alternate;
        }
      `}</style>
    </div>
  );
};
