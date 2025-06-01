import { NextResponse } from 'next/server'
import { connectSnowflake, executeQuery } from '@/lib/snowflake-node'

export async function GET() {
  try {
    // Test connection
    const pool = await connectSnowflake()
    
    // Test query
    const result = await executeQuery(
      'SELECT CURRENT_TIMESTAMP() as timestamp',
      [],
      false // Disable caching for test
    )

    return NextResponse.json({
      status: 'success',
      message: 'Successfully connected to Snowflake',
      timestamp: result[0].TIMESTAMP
    })
  } catch (error: any) {
    console.error('Snowflake connection test failed:', error)
    return NextResponse.json(
      {
        status: 'error',
        message: 'Failed to connect to Snowflake',
        error: error.message || String(error)
      },
      { status: 500 }
    )
  }
} 