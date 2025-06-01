"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Search, X } from "lucide-react"
import { stateData, allIndianStates } from "@/lib/mock-data"

interface SearchBarProps {
  onStateSelect: (state: string) => void
}

export function SearchBar({ onStateSelect }: SearchBarProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [suggestions, setSuggestions] = useState<{ key: string; name: string }[]>([])
  const [showSuggestions, setShowSuggestions] = useState(false)

  const handleSearch = (value: string) => {
    setSearchTerm(value)
    if (value.length > 0) {
      const filtered = allIndianStates
        .filter((state) => state.name.toLowerCase().includes(value.toLowerCase()))
        .slice(0, 8)
      setSuggestions(filtered)
      setShowSuggestions(true)
    } else {
      setSuggestions([])
      setShowSuggestions(false)
    }
  }

  const handleStateClick = (stateKey: string, stateName: string) => {
    onStateSelect(stateKey)
    setSearchTerm(stateName)
    setSuggestions([])
    setShowSuggestions(false)
  }

  const clearSearch = () => {
    setSearchTerm("")
    setSuggestions([])
    setShowSuggestions(false)
  }

  return (
    <div className="relative">
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Input
            type="text"
            placeholder="Search for a state (e.g., Maharashtra, Kerala, Punjab...)"
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
            onFocus={() => {
              if (suggestions.length > 0) setShowSuggestions(true)
            }}
            className="pr-20 bg-white shadow-lg border-2 border-gray-200 focus:border-blue-400 transition-colors"
            aria-label="Search for Indian states"
          />
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center gap-2">
            {searchTerm && (
              <button
                onClick={clearSearch}
                className="text-gray-400 hover:text-gray-600 transition-colors"
                aria-label="Clear search"
              >
                <X className="w-4 h-4" />
              </button>
            )}
            <Search className="text-gray-400 w-4 h-4" />
          </div>
        </div>
      </div>

      {showSuggestions && suggestions.length > 0 && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setShowSuggestions(false)} />
          <div className="absolute top-full left-0 right-0 mt-2 bg-white border-2 border-gray-200 rounded-lg shadow-xl z-50 max-h-80 overflow-y-auto">
            {suggestions.map((state) => (
              <button
                key={state.key}
                onClick={() => handleStateClick(state.key, state.name)}
                className="w-full text-left px-4 py-3 hover:bg-blue-50 transition-colors border-b border-gray-100 last:border-b-0 focus:bg-blue-50 focus:outline-none"
                aria-label={`Select ${state.name}`}
              >
                <div className="font-medium text-gray-900">{state.name}</div>
                {stateData[state.key] && (
                  <div className="text-sm text-gray-500">Capital: {stateData[state.key].capital}</div>
                )}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
