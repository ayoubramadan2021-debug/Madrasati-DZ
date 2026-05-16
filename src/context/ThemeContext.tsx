import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

import { themes } from "../theme";
import type { AppTheme } from "../types/theme.types";

type ThemeContextValue = {
  themeName: string;
  setThemeName: (themeName: string) => void;
  theme: AppTheme;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

type ThemeProviderProps = {
  children: ReactNode;
};

export function ThemeProvider({ children }: ThemeProviderProps) {
  const savedTheme = (localStorage.getItem("madrasati-theme") || "dark") as keyof typeof themes;
  const [themeName, setThemeName] = useState<keyof typeof themes>(savedTheme);

  useEffect(() => {
    localStorage.setItem("madrasati-theme", themeName);
  }, [themeName]);

  const theme = themes[themeName] || themes.light;

  return (
    <ThemeContext.Provider value={{ themeName, setThemeName, theme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useAppTheme() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useAppTheme must be used inside ThemeProvider");
  }

  return context;
}
