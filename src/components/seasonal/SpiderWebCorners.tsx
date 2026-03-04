import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const SpiderWeb = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="0.5" className={className}>
    <path d="M0 0 L100 100 M0 20 L80 100 M0 40 L60 100 M0 60 L40 100 M0 80 L20 100 M20 0 L100 80 M40 0 L100 60 M60 0 L100 40 M80 0 L100 20" opacity="0.4" />
    <circle cx="0" cy="0" r="20" opacity="0.3" />
    <circle cx="0" cy="0" r="40" opacity="0.3" />
    <circle cx="0" cy="0" r="60" opacity="0.3" />
    <circle cx="0" cy="0" r="80" opacity="0.3" />
  </svg>
);

export default function SpiderWebCorners() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed top-0 left-0 w-32 h-32 pointer-events-none z-50 text-slate-300/20"
          >
            <SpiderWeb className="w-full h-full transform -scale-x-100" />
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed top-0 right-0 w-32 h-32 pointer-events-none z-50 text-slate-300/20"
          >
            <SpiderWeb className="w-full h-full" />
          </motion.div>
          {/* Bottom corners too? Maybe just top based on "header" comment */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed bottom-0 left-0 w-32 h-32 pointer-events-none z-50 text-slate-300/20"
          >
            <SpiderWeb className="w-full h-full transform -scale-x-100 -scale-y-100" />
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed bottom-0 right-0 w-32 h-32 pointer-events-none z-50 text-slate-300/20"
          >
            <SpiderWeb className="w-full h-full transform -scale-y-100" />
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
