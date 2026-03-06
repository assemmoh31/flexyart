import React, { createContext, useContext, useState, useEffect } from 'react';

export type SeasonalTheme = 'default' | 'halloween' | 'christmas' | 'valentine' | 'lunar' | 'summer' | 'spring';

interface ThemeContextType {
  theme: SeasonalTheme;
  setTheme: (theme: SeasonalTheme) => void;
  activeTheme: SeasonalTheme;
  startDate: string;
  setStartDate: (date: string) => void;
  endDate: string;
  setEndDate: (date: string) => void;
  saveThemeSettings: () => Promise<void>;
  isPreviewMode: boolean;
  setIsPreviewMode: (preview: boolean) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<SeasonalTheme>('default');
  const [activeTheme, setActiveTheme] = useState<SeasonalTheme>('default');
  const [startDate, setStartDate] = useState<string>('2026-03-01');
  const [endDate, setEndDate] = useState<string>('2026-03-31');
  const [isPreviewMode, setIsPreviewMode] = useState<boolean>(false);

  // Load settings from mock D1 database on mount
  useEffect(() => {
    const fetchThemeSettings = async () => {
      // Mock data representing the 'site_settings' table in D1
      const mockSettings = {
        active_theme: 'default' as SeasonalTheme,
        start_date: '2026-01-01',
        end_date: '2026-12-31'
      };

      setTheme(mockSettings.active_theme);
      setStartDate(mockSettings.start_date);
      setEndDate(mockSettings.end_date);
      
      checkAndApplyTheme(mockSettings.active_theme, mockSettings.start_date, mockSettings.end_date, isPreviewMode);
    };

    fetchThemeSettings();
  }, []);

  // Check if current date falls within the scheduled window
  const checkAndApplyTheme = (selectedTheme: SeasonalTheme, start: string, end: string, preview: boolean) => {
    if (preview) {
      setActiveTheme(selectedTheme);
      return;
    }

    const now = new Date();
    const startDateObj = new Date(start);
    const endDateObj = new Date(end);
    
    // Set end date to the end of the day
    endDateObj.setHours(23, 59, 59, 999);

    if (now >= startDateObj && now <= endDateObj) {
      setActiveTheme(selectedTheme);
    } else {
      // Automatic Reversion
      setActiveTheme('default');
    }
  };

  useEffect(() => {
    checkAndApplyTheme(theme, startDate, endDate, isPreviewMode);
  }, [isPreviewMode, theme, startDate, endDate]);

  // Apply the theme to the document body
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', activeTheme);
  }, [activeTheme]);

  // Save settings (Mocking D1 update)
  const saveThemeSettings = async () => {
    checkAndApplyTheme(theme, startDate, endDate, isPreviewMode);
    return Promise.resolve();
  };

  return (
    <ThemeContext.Provider value={{ 
      theme, setTheme, 
      activeTheme, 
      startDate, setStartDate, 
      endDate, setEndDate,
      saveThemeSettings,
      isPreviewMode, setIsPreviewMode
    }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
