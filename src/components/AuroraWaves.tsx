import React from 'react';

export const AuroraWaves: React.FC = () => {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-[#05070A]">
      <div className="absolute inset-0 opacity-50">
        <div className="aurora-blob bg-[#43E97B] w-[60vw] h-[60vh] rounded-full absolute top-[-10%] left-[-10%] mix-blend-screen filter blur-[80px] animate-aurora-1"></div>
        <div className="aurora-blob bg-[#7028E4] w-[50vw] h-[70vh] rounded-full absolute top-[20%] right-[-10%] mix-blend-screen filter blur-[80px] animate-aurora-2"></div>
        <div className="aurora-blob bg-[#38F9D7] w-[70vw] h-[50vh] rounded-full absolute bottom-[-20%] left-[10%] mix-blend-screen filter blur-[80px] animate-aurora-3"></div>
      </div>
      <style>{`
        @keyframes aurora-1 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(10vw, 10vh) scale(1.1); }
          66% { transform: translate(-5vw, 15vh) scale(0.9); }
        }
        @keyframes aurora-2 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(-15vw, 5vh) scale(0.9); }
          66% { transform: translate(5vw, -10vh) scale(1.1); }
        }
        @keyframes aurora-3 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(5vw, -15vh) scale(1.1); }
          66% { transform: translate(-10vw, -5vh) scale(0.9); }
        }
        .animate-aurora-1 { animation: aurora-1 20s ease-in-out infinite; }
        .animate-aurora-2 { animation: aurora-2 25s ease-in-out infinite; }
        .animate-aurora-3 { animation: aurora-3 22s ease-in-out infinite; }
      `}</style>
    </div>
  );
};
