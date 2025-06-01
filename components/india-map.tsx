"use client"

import type React from "react"
import { useState, useRef } from "react"
import { stateData } from "@/lib/mock-data"
import { useTheme } from "./theme-provider"

interface IndiaMapProps {
  selectedState: string
  onStateClick: (state: string) => void
}

export function IndiaMap({ selectedState, onStateClick }: IndiaMapProps) {
  const [scale, setScale] = useState(1)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
  const [hoveredState, setHoveredState] = useState<string | null>(null)
  const [imageLoaded, setImageLoaded] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const { themeColor } = useTheme()

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault()
    const delta = e.deltaY > 0 ? 0.9 : 1.1
    const newScale = Math.max(0.5, Math.min(3, scale * delta))
    setScale(newScale)
  }

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true)
    setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y })
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      setPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y,
      })
    }
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  // State click areas using the updated coordinates provided
  const stateClickAreas = [
    // Updated Northern States
    { id: "jammu and kashmir", name: "Jammu & Kashmir", x: 520, y: 60, width: 90, height: 80 },
    { id: "punjab", name: "Punjab", x: 490, y: 170, width: 50, height: 40 },
    { id: "haryana", name: "Haryana", x: 540, y: 210, width: 50, height: 40 },
    { id: "sikkim", name: "Sikkim", x: 890, y: 220, width: 30, height: 30 },

    // Updated Western States
    { id: "rajasthan", name: "Rajasthan", x: 420, y: 210, width: 120, height: 130 },
    { id: "gujarat", name: "Gujarat", x: 370, y: 320, width: 100, height: 100 },

    // Updated Central States
    { id: "madhya pradesh", name: "Madhya Pradesh", x: 540, y: 300, width: 90, height: 100 },
    { id: "chhattisgarh", name: "Chhattisgarh", x: 650, y: 340, width: 50, height: 60 },

    // Updated Eastern States
    { id: "odisha", name: "Odisha", x: 720, y: 370, width: 50, height: 60 },

    // Updated Southern States
    { id: "andhra pradesh", name: "Andhra Pradesh", x: 700, y: 440, width: 70, height: 90 },
    { id: "tamil nadu", name: "Tamil Nadu", x: 710, y: 560, width: 80, height: 90 },

    // Updated Northeastern States
    { id: "arunachal pradesh", name: "Arunachal Pradesh", x: 950, y: 180, width: 90, height: 80 },

    // Remaining states with original coordinates
    { id: "himachal pradesh", name: "Himachal Pradesh", x: 520, y: 180, width: 60, height: 50 },
    { id: "uttarakhand", name: "Uttarakhand", x: 580, y: 230, width: 60, height: 50 },
    { id: "delhi", name: "Delhi", x: 600, y: 280, width: 30, height: 30 },
    { id: "maharashtra", name: "Maharashtra", x: 480, y: 480, width: 80, height: 80 },
    { id: "goa", name: "Goa", x: 480, y: 520, width: 40, height: 40 },
    { id: "uttar pradesh", name: "Uttar Pradesh", x: 600, y: 280, width: 100, height: 80 },
    { id: "bihar", name: "Bihar", x: 700, y: 320, width: 60, height: 60 },
    { id: "west bengal", name: "West Bengal", x: 700, y: 360, width: 60, height: 60 },
    { id: "jharkhand", name: "Jharkhand", x: 640, y: 360, width: 60, height: 60 },
    { id: "telangana", name: "Telangana", x: 600, y: 480, width: 60, height: 40 },
    { id: "karnataka", name: "Karnataka", x: 560, y: 560, width: 60, height: 60 },
    { id: "kerala", name: "Kerala", x: 560, y: 620, width: 40, height: 40 },
    { id: "nagaland", name: "Nagaland", x: 860, y: 320, width: 40, height: 40 },
    { id: "manipur", name: "Manipur", x: 860, y: 360, width: 40, height: 40 },
    { id: "mizoram", name: "Mizoram", x: 860, y: 400, width: 40, height: 40 },
    { id: "tripura", name: "Tripura", x: 820, y: 360, width: 40, height: 40 },
    { id: "assam", name: "Assam", x: 820, y: 320, width: 80, height: 80 },
    { id: "lakshadweep", name: "Lakshadweep", x: 300, y: 700, width: 40, height: 40 },
    { id: "andaman and nicobar islands", name: "Andaman and Nicobar Islands", x: 1100, y: 700, width: 50, height: 50 },
  ]

  return (
    <div
      ref={containerRef}
      className="w-full h-full bg-gradient-to-br from-slate-50 via-gray-50 to-blue-50 overflow-hidden relative"
    >
      {/* Background Image for Selected State */}
      {selectedState && stateData[selectedState] && (
        <div
          className="absolute inset-0 bg-cover bg-center opacity-10 transition-opacity duration-500"
          style={{ backgroundImage: `url(${stateData[selectedState].backgroundImage})` }}
        />
      )}

      {/* Main Map Container */}
      <div
        className="w-full h-full flex items-center justify-center cursor-grab active:cursor-grabbing"
        onWheel={handleWheel}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        style={{
          transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
          transition: isDragging ? "none" : "transform 0.1s ease-out",
        }}
      >
        {/* India 3D Map Image */}
        <div className="relative">
          <img
            src="/images/india-map-3d.webp"
            alt="3D Map of India"
            className="max-w-none w-auto h-auto drop-shadow-lg"
            style={{
              width: "700px",
              height: "auto",
              filter: "contrast(1.1) brightness(0.98)",
            }}
            onLoad={() => setImageLoaded(true)}
            draggable={false}
          />

          {/* Interactive State Areas - Scaled to match the displayed image size */}
          {imageLoaded && (
            <div
              className="absolute inset-0"
              style={{
                // Scale coordinates from 1470x980 to 700px width (700/1470 = 0.476)
                transform: "scale(0.476)",
                transformOrigin: "top left",
              }}
            >
              {stateClickAreas.map((state) => (
                <div
                  key={state.id}
                  className={`absolute cursor-pointer transition-all duration-300 rounded-lg ${
                    selectedState === state.id
                      ? "bg-blue-500 bg-opacity-40 border-2 border-blue-600 shadow-lg"
                      : hoveredState === state.id
                        ? "bg-blue-300 bg-opacity-30 border border-blue-400"
                        : "hover:bg-blue-200 hover:bg-opacity-25"
                  }`}
                  style={{
                    left: `${state.x}px`,
                    top: `${state.y}px`,
                    width: `${state.width}px`,
                    height: `${state.height}px`,
                    backgroundColor: selectedState === state.id ? `${themeColor}60` : undefined,
                    borderColor: selectedState === state.id ? themeColor : undefined,
                  }}
                  onClick={() => onStateClick(state.id)}
                  onMouseEnter={() => setHoveredState(state.id)}
                  onMouseLeave={() => setHoveredState(null)}
                  title={state.name}
                  role="button"
                  aria-label={`Select ${state.name}`}
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      onStateClick(state.id)
                    }
                  }}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Map Controls */}
      <div className="absolute bottom-6 right-6 flex flex-col gap-3">
        <button
          onClick={() => setScale(Math.min(3, scale * 1.2))}
          className="w-14 h-14 bg-white rounded-full shadow-xl flex items-center justify-center hover:bg-gray-50 transition-all duration-200 font-bold text-xl hover:scale-105 border border-gray-200"
          aria-label="Zoom in"
        >
          +
        </button>
        <button
          onClick={() => setScale(Math.max(0.5, scale * 0.8))}
          className="w-14 h-14 bg-white rounded-full shadow-xl flex items-center justify-center hover:bg-gray-50 transition-all duration-200 font-bold text-xl hover:scale-105 border border-gray-200"
          aria-label="Zoom out"
        >
          −
        </button>
        <button
          onClick={() => {
            setScale(1)
            setPosition({ x: 0, y: 0 })
          }}
          className="w-14 h-14 bg-white rounded-full shadow-xl flex items-center justify-center hover:bg-gray-50 transition-all duration-200 text-lg font-bold hover:scale-105 border border-gray-200"
          aria-label="Reset zoom"
        >
          ⌂
        </button>
      </div>

      {/* State Info Tooltip */}
      {hoveredState && (
        <div className="absolute top-6 left-6 bg-white rounded-xl shadow-2xl p-4 pointer-events-none z-10 border border-gray-200 backdrop-blur-sm">
          <div className="font-semibold text-gray-900 text-lg">
            {stateClickAreas.find((s) => s.id === hoveredState)?.name}
          </div>
          {stateData[hoveredState] && (
            <div className="text-sm text-gray-600 mt-1">Capital: {stateData[hoveredState].capital}</div>
          )}
        </div>
      )}
    </div>
  )
}
