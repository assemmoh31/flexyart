import React from 'react';
import { Award, Shield, Zap, Crown, Star } from 'lucide-react';

interface CreatorBadgeProps {
  totalRevenue: number;
  size?: 'sm' | 'md' | 'lg';
}

export const getCreatorLevel = (revenue: number) => {
  if (revenue >= 2500) return { level: 5, name: 'Legend', color: 'text-purple-400', bg: 'bg-purple-500/10', border: 'border-purple-500/20', icon: Zap };
  if (revenue >= 1500) return { level: 4, name: 'Master', color: 'text-cyan-400', bg: 'bg-cyan-500/10', border: 'border-cyan-500/20', icon: Crown };
  if (revenue >= 1000) return { level: 3, name: 'Elite', color: 'text-yellow-400', bg: 'bg-yellow-500/10', border: 'border-yellow-500/20', icon: Star };
  if (revenue >= 250) return { level: 2, name: 'Artisan', color: 'text-slate-300', bg: 'bg-slate-500/10', border: 'border-slate-500/20', icon: Shield };
  if (revenue >= 50) return { level: 1, name: 'Novice', color: 'text-orange-400', bg: 'bg-orange-500/10', border: 'border-orange-500/20', icon: Award };
  return null;
};

export const getNextLevel = (revenue: number) => {
  if (revenue >= 2500) return null;
  if (revenue >= 1500) return { level: 5, threshold: 2500, name: 'Legend' };
  if (revenue >= 1000) return { level: 4, threshold: 1500, name: 'Master' };
  if (revenue >= 250) return { level: 3, threshold: 1000, name: 'Elite' };
  if (revenue >= 50) return { level: 2, threshold: 250, name: 'Artisan' };
  return { level: 1, threshold: 50, name: 'Novice' };
};

export default function CreatorBadge({ totalRevenue, size = 'md' }: CreatorBadgeProps) {
  const levelData = getCreatorLevel(totalRevenue);

  if (!levelData) return null;

  const Icon = levelData.icon;
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6'
  };

  const containerClasses = {
    sm: 'p-1',
    md: 'p-1.5',
    lg: 'p-2'
  };

  const isLegend = levelData.level === 5;

  return (
    <div className="group relative inline-flex items-center">
      <div 
        className={`
          ${containerClasses[size]} rounded-full border ${levelData.border} ${levelData.bg} ${levelData.color}
          ${isLegend ? 'animate-pulse shadow-[0_0_15px_rgba(168,85,247,0.5)]' : ''}
          relative overflow-hidden
        `}
      >
        {isLegend && (
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full animate-[shimmer_2s_infinite]" />
        )}
        <Icon className={sizeClasses[size]} />
      </div>
    </div>
  );
}
