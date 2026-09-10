"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

type ColorScheme = "cyan" | "red";

interface ThemeContextType {
  colorScheme: ColorScheme;
  toggleColorScheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [colorScheme, setColorScheme] = useState<ColorScheme>("cyan");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("color-scheme") as ColorScheme | null;
    if (saved === "red") {
      setColorScheme("red");
      document.documentElement.classList.add("color-red");
    }
    setMounted(true);
  }, []);

  const toggleColorScheme = () => {
    const next = colorScheme === "cyan" ? "red" : "cyan";
    setColorScheme(next);
    localStorage.setItem("color-scheme", next);
    if (next === "red") {
      document.documentElement.classList.add("color-red");
    } else {
      document.documentElement.classList.remove("color-red");
    }
  };

  return (
    <ThemeContext.Provider
      value={{ colorScheme: mounted ? colorScheme : "cyan", toggleColorScheme }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useColorScheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useColorScheme must be used within a ThemeProvider");
  }
  return context;
}
