import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';

type Theme = 'dark' | 'light' | 'red' | 'green';

interface ThemeContextValue {
  theme: Theme;
  toggleTheme: () => void;
}

const STORAGE_KEY = 'fortisplay-theme';
const THEME_ORDER: Theme[] = ['dark', 'light', 'red', 'green'];
const ThemeContext = createContext<ThemeContextValue | null>(null);

function getInitialTheme(): Theme {
  if (typeof window === 'undefined') return 'dark';

  const savedTheme = window.localStorage.getItem(STORAGE_KEY);
  return savedTheme && THEME_ORDER.includes(savedTheme as Theme) ? (savedTheme as Theme) : 'dark';
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>(getInitialTheme);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    window.localStorage.setItem(STORAGE_KEY, theme);
  }, [theme]);

  const value = useMemo(
    () => ({
      theme,
      toggleTheme: () =>
        setTheme((current) => {
          const currentIndex = THEME_ORDER.indexOf(current);
          const nextIndex = (currentIndex + 1) % THEME_ORDER.length;
          return THEME_ORDER[nextIndex];
        }),
    }),
    [theme],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const value = useContext(ThemeContext);
  if (!value) throw new Error('useTheme must be used within ThemeProvider');
  return value;
}
