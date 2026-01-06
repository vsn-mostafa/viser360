import { useState, useEffect } from 'react';

export type Theme = 'light' | 'dark';

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(() => {
    // 1. Check localStorage first
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      return savedTheme as Theme;
    }
    
    // 2. Check system preference (Auto-detect)
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    
    // 3. Default fallback
    return 'dark';
  });

  useEffect(() => {
    const root = document.documentElement;

    // Remove any existing classes to prevent conflicts
    root.classList.remove('light', 'dark');
    
    // Add the current theme class
    root.classList.add(theme);

    // Save to localStorage
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  return { theme, toggleTheme };
}
