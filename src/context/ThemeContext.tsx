import React, { createContext, useContext, useState, useEffect } from 'react';

export type SeasonalTheme = 'default' | 'halloween' | 'christmas' | 'valentine';

interface ThemeContextType {
  theme: SeasonalTheme;
  setTheme: (theme: SeasonalTheme) => void;
  activeTheme: SeasonalTheme;
  startDate: string;
  setStartDate: (date: string) => void;
  endDate: string;
  setEndDate: (date: string) => void;
  saveThemeSettings: () => Promise<void>;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<SeasonalTheme>('default');
  const [activeTheme, setActiveTheme] = useState<SeasonalTheme>('default');
  const [startDate, setStartDate] = useState<string>('2026-10-01');
  const [endDate, setEndDate] = useState<string>('2026-11-01');

  // Load settings from mock D1 database on mount
  useEffect(() => {
    const fetchThemeSettings = async () => {
      // In a real app, this would be a fetch call to your Cloudflare Pages Function
      // const response = await fetch('/api/settings/theme');
      // const settings = await response.json();
      
      // Mock data representing the 'site_settings' table in D1
      const mockSettings = {
        active_theme: 'halloween' as SeasonalTheme,
        start_date: '2026-10-01',
        end_date: '2026-11-01'
      };

      setTheme(mockSettings.active_theme);
      setStartDate(mockSettings.start_date);
      setEndDate(mockSettings.end_date);
      
      checkAndApplyTheme(mockSettings.active_theme, mockSettings.start_date, mockSettings.end_date);
    };

    fetchThemeSettings();
  }, []);

  // Check if current date falls within the scheduled window
  const checkAndApplyTheme = (selectedTheme: SeasonalTheme, start: string, end: string) => {
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

  // Apply the theme to the document body
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', activeTheme);
  }, [activeTheme]);

  // Save settings (Mocking D1 update)
  const saveThemeSettings = async () => {
    // In a real app, this would be a POST request to update D1
    /*
    await fetch('/api/settings/theme', {
      method: 'POST',
      body: JSON.stringify({ active_theme: theme, start_date: startDate, end_date: endDate })
    });
    */
    
    // Re-evaluate immediately upon saving
    checkAndApplyTheme(theme, startDate, endDate);
    
    return Promise.resolve();
  };

  return (
    <ThemeContext.Provider value={{ 
      theme, setTheme, 
      activeTheme, 
      startDate, setStartDate, 
      endDate, setEndDate,
      saveThemeSettings 
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
