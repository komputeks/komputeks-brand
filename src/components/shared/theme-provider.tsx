'use client';

import { createContext, useContext, useState, useCallback, useEffect } from 'react';

// Dark-only theme — no toggle needed, kept as a simple provider for future extensibility
interface ThemeContextValue {
  resolved: 'dark';
}

const ThemeContext = createContext<ThemeContextValue>({ resolved: 'dark' });

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <ThemeContext.Provider value={{ resolved: 'dark' }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);