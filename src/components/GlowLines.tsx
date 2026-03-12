import React from 'react';

export const GlowLines: React.FC = () => {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-[#050505]">
      {/* Diagonal Glow Lines */}
      <div className="absolute inset-0 opacity-30">
        <div className="glow-line bg-gradient-to-r from-transparent via-[#00BCD4] to-transparent h-[2px] w-[200vw] absolute top-[20%] left-[-50%] rotate-[-15deg] animate-glow-slide-1"></div>
        <div className="glow-line bg-gradient-to-r from-transparent via-[#7028E4] to-transparent h-[1px] w-[200vw] absolute top-[50%] left-[-50%] rotate-[10deg] animate-glow-slide-2"></div>
        <div className="glow-line bg-gradient-to-r from-transparent via-[#00BCD4] to-transparent h-[3px] w-[200vw] absolute top-[80%] left-[-50%] rotate-[-5deg] animate-glow-slide-3"></div>
      </div>
      <style>{`
        @keyframes glow-slide-1 {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(50%); }
        }
        @keyframes glow-slide-2 {
          0% { transform: translateX(50%); }
          100% { transform: translateX(-50%); }
        }
        @keyframes glow-slide-3 {
          0% { transform: translateX(-30%); }
          100% { transform: translateX(70%); }
        }
        .animate-glow-slide-1 { animation: glow-slide-1 15s linear infinite; }
        .animate-glow-slide-2 { animation: glow-slide-2 20s linear infinite; }
        .animate-glow-slide-3 { animation: glow-slide-3 18s linear infinite; }
      `}</style>
    </div>
  );
};
