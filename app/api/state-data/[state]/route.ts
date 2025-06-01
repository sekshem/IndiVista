import { NextRequest, NextResponse } from 'next/server'
import { executeQuery } from '@/lib/snowflake-node'
import { StateData, ArtCultureFinancialData, TourismData } from '@/lib/types'

// Cache control headers
const CACHE_CONTROL = 'public, s-maxage=300, stale-while-revalidate=59'

// Validate state name
function isValidState(state: string): boolean {
  const validStates = [
    'andaman and nicobar islands', 'andhra pradesh', 'arunachal pradesh', 'assam', 'bihar', 'chhattisgarh', 'goa', 'gujarat', 'haryana',
    'himachal pradesh', 'jharkhand', 'karnataka', 'kerala', 'madhya pradesh', 'maharashtra', 'manipur',
    'meghalaya', 'mizoram', 'nagaland', 'odisha', 'punjab', 'rajasthan', 'sikkim', 'tamil nadu',
    'telangana', 'tripura', 'uttar pradesh', 'uttarakhand', 'west bengal', 'delhi', 'chandigarh',
    'ladakh', 'lakshadweep', 'puducherry', 'jammu and kashmir', 'dadra and nagar haveli and daman and diu'
  ]
  return validStates.includes(state.toLowerCase())
}

export async function GET(req: NextRequest, { params }: { params: { state: string } }) {
  const state = params.state
  console.log('Fetching data for state:', state)

  if (!state) {
    console.error('State parameter is missing')
    return NextResponse.json({ error: 'State parameter is required' }, { status: 400 })
  }

  if (!isValidState(state)) {
    console.error('Invalid state name:', state)
    return NextResponse.json(
      { error: 'Invalid state name. Please provide a valid state name.' },
      { status: 400 }
    )
  }

  try {
    // First, verify the tables exist
    console.log('Verifying tables exist...')
    const tableCheck = await executeQuery(
      `SELECT 
        (SELECT COUNT(*) FROM ART_CULTURE_FINANCIAL_DATA) as financial_count,
        (SELECT COUNT(*) FROM TOURISM_DATA) as tourism_count`
    )
    console.log('Table check result:', tableCheck[0])

    console.log('Executing financial data query for state:', state)
    // Query ART_CULTURE_FINANCIAL_DATA with caching enabled
    const financialQuery = 'SELECT * FROM ART_CULTURE_FINANCIAL_DATA WHERE LOWER(STATE_UT) = LOWER(?) ORDER BY FINANCIAL_YEAR DESC'
    console.log('Financial query:', financialQuery, 'with state:', state)
    
    const financialRows = await executeQuery<ArtCultureFinancialData>(
      financialQuery,
      [state],
      true // Enable caching
    )
    console.log('Financial data rows:', financialRows.length)
    if (financialRows.length > 0) {
      console.log('Sample financial data:', financialRows[0])
    }

    console.log('Executing tourism data query for state:', state)
    // Query TOURISM_DATA with caching enabled
    const tourismQuery = 'SELECT * FROM TOURISM_DATA WHERE LOWER(STATE) = LOWER(?)'
    console.log('Tourism query:', tourismQuery, 'with state:', state)
    
    const tourismRows = await executeQuery<TourismData>(
      tourismQuery,
      [state],
      true // Enable caching
    )
    console.log('Tourism data rows:', tourismRows.length)
    if (tourismRows.length > 0) {
      console.log('Sample tourism data:', tourismRows[0])
    }

    // Create response with cache headers
    const response = NextResponse.json<StateData>({
      financial: financialRows,
      tourism: tourismRows
    })

    // Add cache control headers
    response.headers.set('Cache-Control', CACHE_CONTROL)

    return response
  } catch (error: any) {
    console.error('Error fetching state data:', error)
    // Log the full error details
    console.error('Error details:', {
      message: error.message,
      stack: error.stack,
      code: error.code,
      state: state,
      sqlState: error.sqlState,
      sqlMessage: error.sqlMessage
    })
    return NextResponse.json(
      { 
        error: 'Failed to fetch state data',
        details: error.message || String(error),
        sqlState: error.sqlState,
        sqlMessage: error.sqlMessage
      }, 
      { status: 500 }
    )
  }
} 