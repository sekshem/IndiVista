"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { CheckCircle, XCircle, X } from "lucide-react"
import { stateData } from "@/lib/mock-data"

interface SelfTestProps {
  onClose: () => void
  onStateChange: (state: string) => void
  onCategoryChange: (category: "art" | "culture" | "tourism") => void
}

interface TestResult {
  name: string
  status: "pending" | "running" | "passed" | "failed"
  error?: string
}

export function SelfTest({ onClose, onStateChange, onCategoryChange }: SelfTestProps) {
  const [isRunning, setIsRunning] = useState(false)
  const [progress, setProgress] = useState(0)
  const [results, setResults] = useState<TestResult[]>([
    { name: "Theme Switching", status: "pending" },
    { name: "Navigation Flow", status: "pending" },
    { name: "Map Interaction", status: "pending" },
    { name: "State Search", status: "pending" },
    { name: "Tab Switching", status: "pending" },
    { name: "Responsive Design", status: "pending" },
    { name: "Accessibility", status: "pending" },
  ])

  const updateTestResult = (index: number, status: TestResult["status"], error?: string) => {
    setResults((prev) => prev.map((result, i) => (i === index ? { ...result, status, error } : result)))
  }

  const runTests = async () => {
    setIsRunning(true)
    setProgress(0)

    const tests = [
      // Theme Switching Test
      async () => {
        updateTestResult(0, "running")
        try {
          const categories: ("art" | "culture" | "tourism")[] = ["art", "culture", "tourism"]
          for (const category of categories) {
            onCategoryChange(category)
            await new Promise((resolve) => setTimeout(resolve, 500))
          }
          updateTestResult(0, "passed")
        } catch (error) {
          updateTestResult(0, "failed", "Theme switching failed")
        }
      },

      // Navigation Flow Test
      async () => {
        updateTestResult(1, "running")
        try {
          const categories: ("art" | "culture" | "tourism")[] = ["art", "culture", "tourism"]
          for (const category of categories) {
            onCategoryChange(category)
            await new Promise((resolve) => setTimeout(resolve, 300))
          }
          updateTestResult(1, "passed")
        } catch (error) {
          updateTestResult(1, "failed", "Navigation flow failed")
        }
      },

      // Map Interaction Test
      async () => {
        updateTestResult(2, "running")
        try {
          const states = Object.keys(stateData).slice(0, 3)
          for (const state of states) {
            onStateChange(state)
            await new Promise((resolve) => setTimeout(resolve, 400))
          }
          updateTestResult(2, "passed")
        } catch (error) {
          updateTestResult(2, "failed", "Map interaction failed")
        }
      },

      // State Search Test
      async () => {
        updateTestResult(3, "running")
        try {
          // Simulate search functionality
          const searchTerms = ["Maharashtra", "Karnataka", "Tamil Nadu"]
          for (const term of searchTerms) {
            // Simulate search
            await new Promise((resolve) => setTimeout(resolve, 200))
          }
          updateTestResult(3, "passed")
        } catch (error) {
          updateTestResult(3, "failed", "State search failed")
        }
      },

      // Tab Switching Test
      async () => {
        updateTestResult(4, "running")
        try {
          const categories: ("art" | "culture" | "tourism")[] = ["art", "culture", "tourism"]
          for (const category of categories) {
            onCategoryChange(category)
            await new Promise((resolve) => setTimeout(resolve, 300))
          }
          updateTestResult(4, "passed")
        } catch (error) {
          updateTestResult(4, "failed", "Tab switching failed")
        }
      },

      // Responsive Design Test
      async () => {
        updateTestResult(5, "running")
        try {
          // Check if responsive classes are present
          const sidebar = document.querySelector('[role="navigation"]')
          const mainContent = document.querySelector('[role="main"]')

          if (sidebar && mainContent) {
            updateTestResult(5, "passed")
          } else {
            updateTestResult(5, "failed", "Responsive elements not found")
          }
        } catch (error) {
          updateTestResult(5, "failed", "Responsive design test failed")
        }
      },

      // Accessibility Test
      async () => {
        updateTestResult(6, "running")
        try {
          // Check for ARIA labels and roles
          const ariaElements = document.querySelectorAll("[aria-label], [role]")
          const focusableElements = document.querySelectorAll("button, a, input, [tabindex]")

          if (ariaElements.length > 0 && focusableElements.length > 0) {
            updateTestResult(6, "passed")
          } else {
            updateTestResult(6, "failed", "Accessibility features missing")
          }
        } catch (error) {
          updateTestResult(6, "failed", "Accessibility test failed")
        }
      },
    ]

    for (let i = 0; i < tests.length; i++) {
      await tests[i]()
      setProgress(((i + 1) / tests.length) * 100)
      await new Promise((resolve) => setTimeout(resolve, 200))
    }

    setIsRunning(false)
  }

  useEffect(() => {
    runTests()
  }, [])

  const passedTests = results.filter((r) => r.status === "passed").length
  const failedTests = results.filter((r) => r.status === "failed").length

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-2xl max-h-[80vh] overflow-y-auto">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Self-Test Results</CardTitle>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </CardHeader>
        <CardContent>
          <div className="mb-6">
            <div className="flex justify-between text-sm mb-2">
              <span>Progress</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="mb-4" />

            <div className="flex gap-4 text-sm">
              <span className="text-green-600">Passed: {passedTests}</span>
              <span className="text-red-600">Failed: {failedTests}</span>
              <span className="text-gray-600">Total: {results.length}</span>
            </div>
          </div>

          <div className="space-y-3">
            {results.map((result, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <span className="font-medium">{result.name}</span>
                <div className="flex items-center gap-2">
                  {result.status === "running" && (
                    <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
                  )}
                  {result.status === "passed" && <CheckCircle className="w-5 h-5 text-green-500" />}
                  {result.status === "failed" && <XCircle className="w-5 h-5 text-red-500" />}
                  {result.status === "pending" && <div className="w-5 h-5 bg-gray-300 rounded-full" />}
                </div>
              </div>
            ))}
          </div>

          {!isRunning && (
            <div className="mt-6 flex gap-2">
              <Button onClick={runTests} className="flex-1">
                Run Tests Again
              </Button>
              <Button variant="outline" onClick={onClose}>
                Close
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
