"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

type ThemeColor = "#7AC74C" | "#6390F0" | "#EE8130"

interface ThemeContextType {
  themeColor: ThemeColor
  setThemeColor: (color: ThemeColor) => void
  getThemeForCategory: (category: "art" | "culture" | "tourism") => ThemeColor
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [themeColor, setThemeColor] = useState<ThemeColor>("#7AC74C")

  const getThemeForCategory = (category: "art" | "culture" | "tourism"): ThemeColor => {
    switch (category) {
      case "art":
        return "#7AC74C"
      case "culture":
        return "#6390F0"
      case "tourism":
        return "#EE8130"
      default:
        return "#7AC74C"
    }
  }

  return (
    <ThemeContext.Provider value={{ themeColor, setThemeColor, getThemeForCategory }}>{children}</ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider")
  }
  return context
}
