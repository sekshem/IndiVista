"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Sidebar } from "@/components/sidebar"
import { MainContent } from "@/components/main-content"
import { SelfTest } from "@/components/self-test"
import { useTheme } from "@/components/theme-provider"
import { Button } from "@/components/ui/button"
import { TestTube } from "lucide-react"
import { StreamlitEmbed } from "@/components/streamlit-embed"

export default function Home() {
  const [selectedState, setSelectedState] = useState<string>("delhi")
  const [selectedCategory, setSelectedCategory] = useState<"art" | "culture" | "tourism">("art")
  const [showSelfTest, setShowSelfTest] = useState(false)
  const { themeColor } = useTheme()

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      <div className="flex flex-1">
        <Sidebar selectedCategory={selectedCategory} onCategoryChange={setSelectedCategory} />

        <MainContent
          selectedState={selectedState}
          selectedCategory={selectedCategory}
          onStateChange={setSelectedState}
        />
      </div>

      {/* Streamlit Analytics Dashboard */}
      <div className="px-6 py-8 bg-white">
        <h2 className="text-2xl font-bold mb-4">Tourism Analytics Dashboard</h2>
        <StreamlitEmbed />
      </div>

      <Footer />

      {/* Self-Test Button */}
      <Button
        onClick={() => setShowSelfTest(true)}
        className="fixed bottom-4 right-4 z-50 shadow-lg hover:shadow-xl transition-shadow"
        style={{ backgroundColor: themeColor }}
        aria-label="Run self-test"
      >
        <TestTube className="w-4 h-4 mr-2" />
        Self Test
      </Button>

      {showSelfTest && (
        <SelfTest
          onClose={() => setShowSelfTest(false)}
          onStateChange={setSelectedState}
          onCategoryChange={setSelectedCategory}
        />
      )}
    </div>
  )
}
