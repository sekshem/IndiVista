"use client"

import { useTheme } from "./theme-provider"
import { Mountain } from "lucide-react"

export function Header() {
  const { themeColor } = useTheme()

  return (
    <header
      className="h-24 flex items-center text-white transition-colors duration-300 shadow-lg relative overflow-hidden px-8"
      style={{ backgroundColor: themeColor }}
      role="banner"
    >
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent transform -skew-x-12"></div>
        <div className="absolute inset-0 bg-gradient-to-l from-transparent via-white to-transparent transform skew-x-12"></div>
      </div>

      {/* App Icon */}
      <div className="relative z-10 mr-6">
        <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center backdrop-blur-sm">
          <Mountain className="w-8 h-8 text-white" />
        </div>
      </div>

      {/* Header Text */}
      <div className="relative z-10 text-center flex-1">
        <h1 className="text-4xl font-black tracking-wider drop-shadow-lg mb-1">INDIVISTA</h1>
        <div className="flex items-center justify-center space-x-3 text-sm font-medium opacity-95 tracking-widest">
          <span>ART</span>
          <span className="text-xs">•</span>
          <span>CULTURE</span>
          <span className="text-xs">•</span>
          <span>TOURISM EXPLORER</span>
        </div>
      </div>
    </header>
  )
}
