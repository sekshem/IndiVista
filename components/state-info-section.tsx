"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { stateData, stateMetrics } from "@/lib/mock-data"
import { useTheme } from "./theme-provider"
import { MapPin, Users, TrendingUp, Landmark, Mountain } from "lucide-react"

interface StateInfoSectionProps {
  selectedState: string
}

export function StateInfoSection({ selectedState }: StateInfoSectionProps) {
  const { themeColor } = useTheme()
  const data = stateData[selectedState]
  const metrics = stateMetrics[selectedState]

  if (!data) {
    return (
      <div className="p-6 text-center text-gray-500 h-full flex items-center justify-center">
        <div>
          <Mountain className="w-12 h-12 mx-auto text-gray-300 mb-3" />
          <p className="text-sm">Select a state to view detailed information</p>
        </div>
      </div>
    )
  }

  return (
    <div className="h-full overflow-y-auto bg-gray-50">
      {/* State Basic Info */}
      <div className="p-4 bg-white border-b border-gray-200">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-3 h-6 rounded" style={{ backgroundColor: themeColor }} />
          <div>
            <h3 className="font-bold text-lg text-gray-900">{data.name}</h3>
            <div className="flex items-center text-sm text-gray-600">
              <MapPin className="w-3 h-3 mr-1" />
              <span>{data.capital}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center text-sm text-gray-600">
          <Users className="w-4 h-4 mr-2" />
          <span>{data.population}</span>
        </div>
      </div>

      {/* Key Metrics - Compact for right panel */}
      <div className="p-3 space-y-3">
        <div>
          <h4 className="font-semibold text-gray-900 mb-2 flex items-center text-sm">
            <TrendingUp className="w-4 h-4 mr-2" style={{ color: themeColor }} />
            Key Metrics
          </h4>

          {metrics ? (
            <div className="grid grid-cols-2 gap-2">
              <Card className="border-l-4" style={{ borderLeftColor: themeColor }}>
                <CardContent className="p-2">
                  <div className="text-lg font-bold" style={{ color: themeColor }}>
                    {metrics.gdpRank}
                  </div>
                  <div className="text-xs text-gray-600">GDP Rank</div>
                </CardContent>
              </Card>

              <Card className="border-l-4" style={{ borderLeftColor: themeColor }}>
                <CardContent className="p-2">
                  <div className="text-lg font-bold" style={{ color: themeColor }}>
                    {metrics.literacyRate}
                  </div>
                  <div className="text-xs text-gray-600">Literacy</div>
                </CardContent>
              </Card>

              <Card className="border-l-4" style={{ borderLeftColor: themeColor }}>
                <CardContent className="p-2">
                  <div className="text-lg font-bold" style={{ color: themeColor }}>
                    {metrics.area}
                  </div>
                  <div className="text-xs text-gray-600">Area km²</div>
                </CardContent>
              </Card>

              <Card className="border-l-4" style={{ borderLeftColor: themeColor }}>
                <CardContent className="p-2">
                  <div className="text-lg font-bold" style={{ color: themeColor }}>
                    {metrics.districts}
                  </div>
                  <div className="text-xs text-gray-600">Districts</div>
                </CardContent>
              </Card>
            </div>
          ) : (
            <div className="text-xs text-gray-500 italic">Metrics pending Snowflake integration</div>
          )}
        </div>

        {/* Administrative Info - Compact */}
        <div>
          <h4 className="font-semibold text-gray-900 mb-2 flex items-center text-sm">
            <Landmark className="w-4 h-4 mr-2" style={{ color: themeColor }} />
            Administrative
          </h4>

          <div className="space-y-1 text-xs">
            <div className="flex justify-between">
              <span className="text-gray-600">Est:</span>
              <span className="font-medium">{metrics?.established || "TBD"}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Language:</span>
              <span className="font-medium">{metrics?.officialLanguage || "TBD"}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">CM:</span>
              <span className="font-medium">{metrics?.chiefMinister || "TBD"}</span>
            </div>
          </div>
        </div>

        {/* Development Tags - Compact */}
        <div>
          <h4 className="font-semibold text-gray-900 mb-2 text-sm">Status</h4>
          <div className="flex flex-wrap gap-1">
            {metrics?.developmentTags ? (
              metrics.developmentTags.slice(0, 3).map((tag, index) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className="text-white text-xs px-2 py-1"
                  style={{ backgroundColor: themeColor }}
                >
                  {tag}
                </Badge>
              ))
            ) : (
              <Badge variant="outline" className="text-xs">
                Pending Integration
              </Badge>
            )}
          </div>
        </div>

        {/* Integration Note - Compact */}
        <div className="bg-blue-50 border border-blue-200 rounded p-2 mt-3">
          <div className="text-xs text-blue-800 font-medium mb-1">🔄 Snowflake Ready</div>
          <div className="text-xs text-blue-700">Real-time data integration ready for deployment.</div>
        </div>
      </div>
    </div>
  )
}
