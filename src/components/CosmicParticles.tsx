import React, { useMemo } from 'react';

export const CosmicParticles: React.FC = () => {
  // Generate random stars only once to prevent re-renders
  const stars = useMemo(() => {
    const generateStars = (count: number, size: string, duration: string) => {
      return [...Array(count)].map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full bg-white"
          style={{
            width: size,
            height: size,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            opacity: Math.random() * 0.8 + 0.2,
            animation: `twinkle ${Math.random() * 5 + 3}s infinite alternate, moveUp ${duration} linear infinite`,
            animationDelay: `-${Math.random() * 20}s`
          }}
        />
      ));
    };

    return (
      <>
        <div className="absolute inset-0">{generateStars(80, '1px', '120s')}</div>
        <div className="absolute inset-0">{generateStars(40, '2px', '80s')}</div>
        <div className="absolute inset-0">{generateStars(15, '3px', '50s')}</div>
      </>
    );
  }, []);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-[#000005]">
      {/* Deep space gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#0A0A12] via-[#000005] to-[#000005]"></div>
      
      {/* Star layers */}
      {stars}

      {/* Constellation SVG Overlay */}
      <svg className="absolute inset-0 w-full h-full opacity-30 animate-pulse-slow" xmlns="http://www.w3.org/2000/svg">
        <g stroke="#007FFF" strokeWidth="0.5" fill="#673AB7">
          <circle cx="15%" cy="20%" r="2" />
          <circle cx="25%" cy="15%" r="3" />
          <circle cx="30%" cy="30%" r="2" />
          <line x1="15%" y1="20%" x2="25%" y2="15%" />
          <line x1="25%" y1="15%" x2="30%" y2="30%" />
          
          <circle cx="75%" cy="60%" r="2" />
          <circle cx="85%" cy="70%" r="3" />
          <circle cx="80%" cy="85%" r="2" />
          <line x1="75%" y1="60%" x2="85%" y2="70%" />
          <line x1="85%" y1="70%" x2="80%" y2="85%" />
          
          <circle cx="10%" cy="80%" r="2" />
          <circle cx="20%" cy="75%" r="2" />
          <line x1="10%" y1="80%" x2="20%" y2="75%" />
        </g>
      </svg>

      <style>{`
        @keyframes moveUp {
          from { transform: translateY(100vh); }
          to { transform: translateY(-100vh); }
        }
        @keyframes twinkle {
          0% { opacity: 0.2; transform: scale(0.8); }
          100% { opacity: 1; transform: scale(1.2); box-shadow: 0 0 10px #007FFF, 0 0 20px #673AB7; }
        }
        .animate-pulse-slow {
          animation: pulse-slow 8s ease-in-out infinite alternate;
        }
        @keyframes pulse-slow {
          0% { opacity: 0.1; }
          100% { opacity: 0.5; }
        }
      `}</style>
    </div>
  );
};
