import React, { createContext, useContext, useState, useEffect } from 'react';

export type ThemeCategory = 'Backgrounds' | 'Avatars' | 'Frames' | 'Profiles' | 'Emoticons' | 'Stickers';

interface ThemeCategoryContextType {
  categories: Record<ThemeCategory, boolean>;
  toggleCategory: (category: ThemeCategory) => void;
}

const defaultCategories: Record<ThemeCategory, boolean> = {
  Backgrounds: true,
  Avatars: true,
  Frames: true,
  Profiles: true,
  Emoticons: true,
  Stickers: true,
};

const ThemeCategoryContext = createContext<ThemeCategoryContextType | undefined>(undefined);

export const ThemeCategoryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [categories, setCategories] = useState<Record<ThemeCategory, boolean>>(() => {
    const saved = localStorage.getItem('theme_categories_visibility');
    return saved ? JSON.parse(saved) : defaultCategories;
  });

  useEffect(() => {
    localStorage.setItem('theme_categories_visibility', JSON.stringify(categories));
  }, [categories]);

  const toggleCategory = (category: ThemeCategory) => {
    setCategories((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  return (
    <ThemeCategoryContext.Provider value={{ categories, toggleCategory }}>
      {children}
    </ThemeCategoryContext.Provider>
  );
};

export const useThemeCategories = () => {
  const context = useContext(ThemeCategoryContext);
  if (context === undefined) {
    throw new Error('useThemeCategories must be used within a ThemeCategoryProvider');
  }
  return context;
};
