import React from 'react';
import { motion } from 'motion/react';

export default function EtherealFog() {
  return (
    <div className="fixed bottom-0 left-0 w-full h-64 pointer-events-none z-10 overflow-hidden">
      <motion.div
        animate={{ x: ['-20%', '0%', '-20%'] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-0 w-[140%] h-full bg-gradient-to-t from-slate-800/20 via-slate-700/10 to-transparent blur-3xl opacity-40"
      />
      <motion.div
        animate={{ x: ['0%', '-20%', '0%'] }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-0 w-[140%] h-3/4 bg-gradient-to-t from-slate-900/30 via-slate-800/10 to-transparent blur-2xl opacity-30"
      />
    </div>
  );
}
