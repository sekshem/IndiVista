"use client"

import { useTheme } from "./theme-provider"

export function Footer() {
  const { themeColor } = useTheme()

  return (
    <footer
      className="h-12 flex items-center justify-center text-white text-sm transition-colors duration-300"
      style={{ backgroundColor: themeColor }}
      role="contentinfo"
    >
      <p className="text-center">Created by- Saksham, Nancy, Milan and Chirag for SNOWFLAKE_HERO Hackathon</p>
    </footer>
  )
}
