import React, { createContext, useContext, useEffect, useState } from "react";

type Theme = "light" | "dark";

interface ThemeContextType {
  theme: Theme;
  toggleTheme?: () => void;
  switchable: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: Theme;
  switchable?: boolean;
}

export function ThemeProvider({ children, defaultTheme = "light", switchable = false }: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(() => {
    if (!switchable) return defaultTheme;
    try {
      const stored = localStorage.getItem("theme");
      if (stored === "dark" || stored === "light") return stored;
      return window.matchMedia?.("(prefers-color-scheme: dark)").matches ? "dark" : defaultTheme;
    } catch {
      return defaultTheme;
    }
  });

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    if (switchable) {
      try { localStorage.setItem("theme", theme); } catch { /* Theme remains switchable for this session. */ }
    }
  }, [theme, switchable]);

  const toggleTheme = switchable ? () => setTheme((previous) => previous === "light" ? "dark" : "light") : undefined;
  return <ThemeContext.Provider value={{ theme, toggleTheme, switchable }}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used within ThemeProvider");
  return context;
}
