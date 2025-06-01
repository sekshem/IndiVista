"use client"

import { Button } from "@/components/ui/button"
import { useTheme } from "./theme-provider"
import { Palette, Building, MapPin } from "lucide-react"

interface SidebarProps {
  selectedCategory: "art" | "culture" | "tourism"
  onCategoryChange: (category: "art" | "culture" | "tourism") => void
}

export function Sidebar({ selectedCategory, onCategoryChange }: SidebarProps) {
  const { themeColor, setThemeColor, getThemeForCategory } = useTheme()

  const handleCategoryClick = (category: "art" | "culture" | "tourism") => {
    const newColor = getThemeForCategory(category)
    setThemeColor(newColor)
    onCategoryChange(category)
  }

  const navItems = [
    { id: "art" as const, label: "Art", icon: Palette, description: "Paintings, Sculptures & Crafts" },
    { id: "culture" as const, label: "Culture", icon: Building, description: "Festivals, Traditions & Heritage" },
    { id: "tourism" as const, label: "Tourism", icon: MapPin, description: "Places, Attractions & Travel" },
  ]

  return (
    <aside
      className="w-72 bg-white shadow-xl flex flex-col border-r border-gray-200"
      role="navigation"
      aria-label="Main navigation"
    >
      {/* Navigation Header */}
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-800 mb-2">Categories</h2>
        <p className="text-sm text-gray-600">Explore India's rich heritage</p>
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 p-6 space-y-4">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = selectedCategory === item.id
          const categoryColor = getThemeForCategory(item.id)

          return (
            <Button
              key={item.id}
              onClick={() => handleCategoryClick(item.id)}
              variant={isActive ? "default" : "ghost"}
              className={`w-full justify-start h-auto p-4 transition-all duration-200 ${
                isActive ? "text-white shadow-lg" : "text-gray-700 hover:text-white"
              }`}
              style={isActive ? { backgroundColor: categoryColor } : {}}
              onMouseEnter={(e) => {
                if (!isActive) {
                  e.currentTarget.style.backgroundColor = categoryColor
                  e.currentTarget.style.color = "white"
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  e.currentTarget.style.backgroundColor = ""
                  e.currentTarget.style.color = ""
                }
              }}
              aria-pressed={isActive}
              aria-label={`Switch to ${item.label} category`}
            >
              <div className="flex items-center w-full">
                <Icon className="w-6 h-6 mr-4 flex-shrink-0" />
                <div className="flex flex-col items-start text-left">
                  <span className="font-semibold text-base">{item.label}</span>
                  <span className="text-xs opacity-80 mt-1">{item.description}</span>
                </div>
              </div>
            </Button>
          )
        })}
      </nav>

      {/* Footer section */}
      <div className="p-6 border-t border-gray-200">
        <div className="text-center">
          <div className="w-full h-2 bg-gray-200 rounded-full mb-3">
            <div
              className="h-full rounded-full transition-all duration-300"
              style={{
                backgroundColor: themeColor,
                width: selectedCategory === "art" ? "33%" : selectedCategory === "culture" ? "66%" : "100%",
              }}
            />
          </div>
          <div className="text-xs text-gray-500">
            <p className="mb-1">Powered by</p>
            <p className="font-semibold">Snowflake & Streamlit</p>
          </div>
        </div>
      </div>
    </aside>
  )
}
