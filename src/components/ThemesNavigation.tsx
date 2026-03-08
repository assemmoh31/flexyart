import React from 'react';
import { ThemeCategory } from '../context/ThemeCategoryContext';

interface ThemesNavigationProps {
  categories: ThemeCategory[];
  activeCategory: ThemeCategory;
  onSelectCategory: (category: ThemeCategory) => void;
}

export default function ThemesNavigation({ 
  categories, 
  activeCategory, 
  onSelectCategory 
}: ThemesNavigationProps) {
  return (
    <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-4 scrollbar-hide">
      {categories.map(category => (
        <button
          key={category}
          onClick={() => onSelectCategory(category)}
          className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all whitespace-nowrap ${
            activeCategory === category
              ? 'bg-white text-black shadow-[0_0_20px_rgba(255,255,255,0.3)] scale-105'
              : 'bg-slate-900/50 text-slate-400 border border-slate-800 hover:text-white hover:bg-slate-800 hover:border-slate-600'
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
}
