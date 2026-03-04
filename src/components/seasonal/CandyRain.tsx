import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const CandyCorn = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12 2L4 22H20L12 2Z" fill="#FACC15" /> {/* Yellow Base */}
    <path d="M12 2L6 17H18L12 2Z" fill="#FB923C" /> {/* Orange Middle */}
    <path d="M12 2L8 12H16L12 2Z" fill="#FFFFFF" /> {/* White Tip */}
  </svg>
);

const WrappedCandy = ({ className, color }: { className?: string, color: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <circle cx="12" cy="12" r="6" fill={color} />
    <path d="M6 12L2 8M6 12L2 16M18 12L22 8M18 12L22 16" stroke={color} strokeWidth="2" strokeLinecap="round" />
  </svg>
);

interface CandyRainProps {
  trigger?: boolean; // Optional prop to trigger the animation
}

export default function CandyRain({ trigger = false }: CandyRainProps) {
  const [candies, setCandies] = useState<{ id: number; type: 'corn' | 'wrapped'; x: number; delay: number; duration: number; rotation: number }[]>([]);

  useEffect(() => {
    if (trigger) {
      const newCandies = Array.from({ length: 20 }).map((_, i) => ({
        id: Date.now() + i,
        type: Math.random() > 0.5 ? 'corn' : 'wrapped',
        x: Math.random() * 100, // 0% to 100% vw
        delay: Math.random() * 0.5,
        duration: Math.random() * 1 + 1.5, // 1.5s to 2.5s fall
        rotation: Math.random() * 360,
      }));
      setCandies(newCandies);

      // Clear candies after animation
      const timer = setTimeout(() => setCandies([]), 3000);
      return () => clearTimeout(timer);
    }
  }, [trigger]);

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      <AnimatePresence>
        {candies.map((candy) => (
          <motion.div
            key={candy.id}
            initial={{ y: '-10vh', x: `${candy.x}vw`, opacity: 1, rotate: 0 }}
            animate={{ y: '110vh', rotate: candy.rotation + 360 }}
            exit={{ opacity: 0 }}
            transition={{ duration: candy.duration, delay: candy.delay, ease: "linear" }}
            className="absolute w-8 h-8"
          >
            {candy.type === 'corn' ? (
              <CandyCorn className="w-full h-full drop-shadow-md" />
            ) : (
              <WrappedCandy className="w-full h-full drop-shadow-md" color={['#EF4444', '#3B82F6', '#10B981', '#A855F7'][Math.floor(Math.random() * 4)]} />
            )}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
