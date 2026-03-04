import React, { useEffect, useState } from 'react';
import { useTheme } from '../context/ThemeContext';

export default function SpringEffects() {
  const { activeTheme } = useTheme();
  const [petals, setPetals] = useState<{ id: number; left: number; delay: number; duration: number }[]>([]);

  useEffect(() => {
    if (activeTheme === 'spring') {
      const newPetals = Array.from({ length: 20 }).map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 5,
        duration: Math.random() * 5 + 5,
      }));
      setPetals(newPetals);
    } else {
      setPetals([]);
    }
  }, [activeTheme]);

  if (activeTheme !== 'spring') return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {petals.map((petal) => (
        <div
          key={petal.id}
          className="spring-petal"
          style={{
            left: `${petal.left}%`,
            animationDelay: `${petal.delay}s`,
            animationDuration: `${petal.duration}s`,
          }}
        />
      ))}
    </div>
  );
}
