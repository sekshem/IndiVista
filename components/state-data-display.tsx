"use client"
import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useTheme } from "./theme-provider"
import { MapPin, Star, Users, TrendingUp, Landmark } from "lucide-react"
import { ArtCultureFinancialData, TourismData } from "@/lib/types"

interface StateDataDisplayProps {
  selectedState: string
  selectedCategory: "art" | "culture" | "tourism"
}

interface StateData {
  financial: ArtCultureFinancialData[]
  tourism: TourismData[]
}

export function StateDataDisplay({ selectedState, selectedCategory }: StateDataDisplayProps) {
  const { themeColor } = useTheme()
  const [data, setData] = useState<StateData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      if (!selectedState) return
      
      setIsLoading(true)
      setError(null)
      
      try {
        const response = await fetch(`/api/state-data/${selectedState}`)
        if (!response.ok) {
          throw new Error('Failed to fetch state data')
        }
        const stateData = await response.json()
        setData(stateData)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [selectedState])

  if (isLoading) {
    return (
      <div className="p-6 text-center text-gray-500">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-3/4 mx-auto mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="p-6 text-center text-red-500">
        <p>Error loading data: {error}</p>
      </div>
    )
  }

  if (!data) {
    return (
      <div className="p-6 text-center text-gray-500">
        <p>Select a state to view information</p>
      </div>
    )
  }

  // Calculate statistics based on the selected category
  const getCategoryStats = () => {
    const stats = {
      art: {
        totalFunding: 0,
        organizations: 0,
        domesticTourists: 0,
        foreignTourists: 0,
        hasData: false
      },
      culture: {
        totalFunding: 0,
        organizations: 0,
        domesticTourists: 0,
        foreignTourists: 0,
        hasData: false
      },
      tourism: {
        totalFunding: 0,
        organizations: 0,
        domesticTourists: 0,
        foreignTourists: 0,
        hasData: false
      }
    }

    // Process financial data
    data.financial.forEach(record => {
      if (selectedCategory === 'art' || selectedCategory === 'culture') {
        stats[selectedCategory].totalFunding += record.AMOUNT_RS_IN_LAKHS
        stats[selectedCategory].organizations += record.NO_OF_ORGS
        stats[selectedCategory].hasData = true
      }
    })

    // Process tourism data
    data.tourism.forEach(record => {
      if (selectedCategory === 'tourism') {
        stats.tourism.domesticTourists = record.DOMESTIC_TOURIST_VISITS_MILLION
        stats.tourism.foreignTourists = record.FOREIGN_TOURIST_VISITS_MILLION
        stats.tourism.hasData = true
      }
    })

    return stats[selectedCategory]
  }

  const stats = getCategoryStats()

  // If no data is available for the selected category, show a message
  if (!stats.hasData) {
    return (
      <div className="h-full overflow-y-auto">
        {/* State Header */}
        <div className="p-6 text-white" style={{ backgroundColor: themeColor }}>
          <h2 className="text-2xl font-bold mb-2 capitalize">{selectedState}</h2>
          <p className="text-sm opacity-90 capitalize">{selectedCategory} Information</p>
        </div>

        {/* No Data Message */}
        <div className="p-6 text-center">
          <div className="text-gray-500">
            <p className="text-lg mb-2">No {selectedCategory} data available</p>
            <p className="text-sm">There is currently no {selectedCategory} data available for {selectedState}.</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="h-full overflow-y-auto">
      {/* State Header */}
      <div className="p-6 text-white" style={{ backgroundColor: themeColor }}>
        <h2 className="text-2xl font-bold mb-2 capitalize">{selectedState}</h2>
        <p className="text-sm opacity-90 capitalize">{selectedCategory} Information</p>
      </div>

      {/* Category Content */}
      <div className="p-6">
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-3 capitalize">
            {selectedCategory} Statistics
          </h3>
        </div>

        {/* Key Metrics */}
        <div className="mb-6">
          <h4 className="font-semibold mb-3">Key Metrics</h4>
          <div className="grid grid-cols-2 gap-3">
            {selectedCategory !== 'tourism' && (
              <>
                <Card className="border-l-4" style={{ borderLeftColor: themeColor }}>
                  <CardContent className="p-4">
                    <div className="text-lg font-bold" style={{ color: themeColor }}>
                      ₹{stats.totalFunding.toLocaleString()} L
                    </div>
                    <div className="text-sm text-gray-600">Total Funding</div>
                  </CardContent>
                </Card>

                <Card className="border-l-4" style={{ borderLeftColor: themeColor }}>
                  <CardContent className="p-4">
                    <div className="text-lg font-bold" style={{ color: themeColor }}>
                      {stats.organizations.toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-600">Organizations</div>
                  </CardContent>
                </Card>
              </>
            )}

            {selectedCategory === 'tourism' && (
              <>
                <Card className="border-l-4" style={{ borderLeftColor: themeColor }}>
                  <CardContent className="p-4">
                    <div className="text-lg font-bold" style={{ color: themeColor }}>
                      {stats.domesticTourists.toLocaleString()}M
                    </div>
                    <div className="text-sm text-gray-600">Domestic Tourists</div>
                  </CardContent>
                </Card>

                <Card className="border-l-4" style={{ borderLeftColor: themeColor }}>
                  <CardContent className="p-4">
                    <div className="text-lg font-bold" style={{ color: themeColor }}>
                      {stats.foreignTourists.toLocaleString()}M
                    </div>
                    <div className="text-sm text-gray-600">Foreign Tourists</div>
                  </CardContent>
                </Card>
              </>
            )}
          </div>
        </div>

        {/* Financial Data - Only show for art and culture */}
        {selectedCategory !== 'tourism' && data.financial.length > 0 && (
          <div className="mb-6">
            <h4 className="font-semibold mb-3">Financial Data</h4>
            <div className="space-y-3">
              {data.financial.map((record, index) => (
                <Card key={index} className="border-l-4" style={{ borderLeftColor: themeColor }}>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="font-medium mb-1">Financial Year: {record.FINANCIAL_YEAR}</div>
                        <div className="text-sm text-gray-600">
                          Organizations: {record.NO_OF_ORGS}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold" style={{ color: themeColor }}>
                          ₹{record.AMOUNT_RS_IN_LAKHS.toLocaleString()} L
                        </div>
                        <div className="text-xs text-gray-500">Amount</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Tourism Data - Only show for tourism category */}
        {selectedCategory === 'tourism' && data.tourism.length > 0 && (
          <div>
            <h4 className="font-semibold mb-3">Tourism Data</h4>
            <div className="space-y-3">
              {data.tourism.map((record, index) => (
                <Card key={index} className="border-l-4" style={{ borderLeftColor: themeColor }}>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="font-medium mb-1">Tourist Statistics</div>
                        <div className="text-sm text-gray-600">
                          Domestic: {record.DOMESTIC_TOURIST_VISITS_MILLION}M
                        </div>
                        <div className="text-sm text-gray-600">
                          Foreign: {record.FOREIGN_TOURIST_VISITS_MILLION}M
                        </div>
                      </div>
                      <div className="flex flex-col gap-2">
                        {record.HAS_TOURISM && (
                          <Badge variant="secondary" className="text-white" style={{ backgroundColor: themeColor }}>
                            Tourism
                          </Badge>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
