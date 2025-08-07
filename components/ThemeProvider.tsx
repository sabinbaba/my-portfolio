'use client';

import { createContext, useContext } from 'react';

interface ThemeContextType {
  theme: 'iot' | 'security' | 'ml';
}

const ThemeContext = createContext<ThemeContextType>({ theme: 'iot' });

export const useTheme = () => useContext(ThemeContext);

export function ThemeProvider({ 
  children, 
  theme 
}: { 
  children: React.ReactNode;
  theme: 'iot' | 'security' | 'ml';
}) {
  return (
    <ThemeContext.Provider value={{ theme }}>
      {children}
    </ThemeContext.Provider>
  );
}
