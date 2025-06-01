"use client"

import { useState } from "react"
import { IndiaMap } from "./india-map"
import { StateDataDisplay } from "./state-data-display"
import { StateInfoSection } from "./state-info-section"
import { SearchBar } from "./search-bar"
import { LoadingSpinner } from "./loading-spinner"

interface MainContentProps {
  selectedState: string
  selectedCategory: "art" | "culture" | "tourism"
  onStateChange: (state: string) => void
}

export function MainContent({ selectedState, selectedCategory, onStateChange }: MainContentProps) {
  const [isLoading, setIsLoading] = useState(false)

  const handleStateSelect = async (state: string) => {
    setIsLoading(true)
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 500))
    onStateChange(state)
    setIsLoading(false)
  }

  return (
    <main className="flex-1 flex relative" role="main">
      {/* Map Section - Takes up main area */}
      <div className="flex-1 relative min-h-screen">
        <div className="absolute top-4 left-4 right-4 z-10">
          <SearchBar onStateSelect={handleStateSelect} />
        </div>

        {isLoading && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-20">
            <LoadingSpinner />
          </div>
        )}

        <IndiaMap selectedState={selectedState} onStateClick={handleStateSelect} />
      </div>

      {/* Right Information Panel - Unified Scrolling */}
      <div className="w-96 bg-white shadow-xl border-l border-gray-200 flex flex-col max-h-screen">
        <div className="flex-1 overflow-y-auto custom-scrollbar">
          {/* State Data Display */}
          <div className="border-b border-gray-200">
            <StateDataDisplay selectedState={selectedState} selectedCategory={selectedCategory} />
          </div>

          {/* State Info Section */}
          <div>
            <StateInfoSection selectedState={selectedState} />
          </div>
        </div>
      </div>
    </main>
  )
}
