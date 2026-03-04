import React from 'react';
import { motion } from 'motion/react';

const BatIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M22 2C22 2 18 5 18 9C18 13 21 16 21 16C21 16 17 15 14 17C11 19 12 22 12 22C12 22 13 19 10 17C7 15 3 16 3 16C3 16 6 13 6 9C6 5 2 2 2 2C2 2 7 4 12 4C17 4 22 2 22 2Z" />
  </svg>
);

export default function ShadowBats() {
  // Generate random bats with different sizes, speeds, and positions
  const bats = Array.from({ length: 15 }).map((_, i) => ({
    id: i,
    size: Math.random() * 40 + 20, // 20px to 60px
    xStart: Math.random() * 100, // 0% to 100%
    yStart: Math.random() * 100, // 0% to 100%
    duration: Math.random() * 20 + 10, // 10s to 30s
    delay: Math.random() * 10,
    blur: Math.random() * 2 + 1, // 1px to 3px blur
    opacity: Math.random() * 0.3 + 0.1, // 0.1 to 0.4 opacity
  }));

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {bats.map((bat) => (
        <motion.div
          key={bat.id}
          initial={{ x: `${bat.xStart}vw`, y: '110vh', opacity: 0 }}
          animate={{
            x: [`${bat.xStart}vw`, `${bat.xStart + (Math.random() * 20 - 10)}vw`], // Slight horizontal drift
            y: '-10vh',
            opacity: [0, bat.opacity, bat.opacity, 0],
          }}
          transition={{
            duration: bat.duration,
            repeat: Infinity,
            delay: bat.delay,
            ease: "linear",
          }}
          style={{
            position: 'absolute',
            width: bat.size,
            height: bat.size,
            filter: `blur(${bat.blur}px)`,
            color: '#000', // Silhouette color
          }}
        >
          <BatIcon className="w-full h-full" />
        </motion.div>
      ))}
    </div>
  );
}
