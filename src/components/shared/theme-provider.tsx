'use client';

import { createContext, useContext, useEffect, useState, useCallback } from 'react';

type Theme = 'dark' | 'light' | 'system';

interface ThemeContextValue {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  resolved: 'dark' | 'light';
}

const ThemeContext = createContext<ThemeContextValue>({
  theme: 'system',
  setTheme: () => {},
  resolved: 'dark',
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>('system');
  const [resolved, setResolved] = useState<'dark' | 'light'>('dark');
  const [mounted, setMounted] = useState(false);

  const applyTheme = useCallback((t: Theme) => {
    const root = document.documentElement;
    root.classList.remove('light', 'dark');
    let resolved: 'dark' | 'light';
    if (t === 'system') {
      resolved = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    } else {
      resolved = t;
    }
    root.classList.add(resolved);
    setResolved(resolved);
  }, []);

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem('komputeks-theme') as Theme | null;
    const initial = stored || 'dark';
    setThemeState(initial);
    applyTheme(initial);
  }, [applyTheme]);

  const setTheme = useCallback((t: Theme) => {
    setThemeState(t);
    localStorage.setItem('komputeks-theme', t);
    applyTheme(t);
  }, [applyTheme]);

  if (!mounted) {
    return <div className="dark">{children}</div>;
  }

  return (
    <ThemeContext.Provider value={{ theme, setTheme, resolved }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);