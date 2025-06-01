import { NextRequest, NextResponse } from 'next/server'
import { executeQuery } from '@/lib/snowflake-node'
import { categorizeAndGroupData, getStateStatistics, getCategoryStatistics } from '@/lib/data-categorizer'

// Cache control headers
const CACHE_CONTROL = 'public, s-maxage=300, stale-while-revalidate=59'

export async function GET(req: NextRequest) {
  try {
    // Query all financial data
    const financialRows = await executeQuery(
      'SELECT * FROM ART_CULTURE_FINANCIAL_DATA ORDER BY STATE_UT, FINANCIAL_YEAR DESC',
      [],
      true // Enable caching
    )

    // Query all tourism data
    const tourismRows = await executeQuery(
      'SELECT * FROM TOURISM_DATA ORDER BY STATE',
      [],
      true // Enable caching
    )

    // Categorize and group the data
    const categorizedData = categorizeAndGroupData(financialRows, tourismRows)
    
    // Get statistics
    const stateStats = getStateStatistics(categorizedData)
    const categoryStats = getCategoryStatistics(categorizedData)

    // Create response with cache headers
    const response = NextResponse.json({
      categorizedData,
      statistics: {
        states: stateStats,
        categories: categoryStats
      }
    })

    // Add cache control headers
    response.headers.set('Cache-Control', CACHE_CONTROL)

    return response
  } catch (error: any) {
    console.error('Error fetching categorized data:', error)
    return NextResponse.json(
      { 
        error: 'Failed to fetch categorized data',
        details: error.message || String(error)
      }, 
      { status: 500 }
    )
  }
} 