import { NextResponse } from 'next/server'
import { executeQuery } from '@/lib/snowflake-node'

export async function GET() {
  try {
    // Check ART_CULTURE_FINANCIAL_DATA table
    const financialCount = await executeQuery(
      'SELECT COUNT(*) as count FROM ART_CULTURE_FINANCIAL_DATA',
      [],
      false
    )

    // Check TOURISM_DATA table
    const tourismCount = await executeQuery(
      'SELECT COUNT(*) as count FROM TOURISM_DATA',
      [],
      false
    )

    // Get sample data from both tables
    const financialSample = await executeQuery(
      'SELECT * FROM ART_CULTURE_FINANCIAL_DATA LIMIT 1',
      [],
      false
    )

    const tourismSample = await executeQuery(
      'SELECT * FROM TOURISM_DATA LIMIT 1',
      [],
      false
    )

    return NextResponse.json({
      status: 'success',
      tables: {
        ART_CULTURE_FINANCIAL_DATA: {
          count: financialCount[0].COUNT,
          sample: financialSample[0]
        },
        TOURISM_DATA: {
          count: tourismCount[0].COUNT,
          sample: tourismSample[0]
        }
      }
    })
  } catch (error: any) {
    console.error('Table check failed:', error)
    return NextResponse.json(
      {
        status: 'error',
        message: 'Failed to check tables',
        error: error.message || String(error)
      },
      { status: 500 }
    )
  }
} 