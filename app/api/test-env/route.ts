import { NextResponse } from 'next/server'

export async function GET() {
  const envVars = {
    SNOWFLAKE_ACCOUNT: process.env.SNOWFLAKE_ACCOUNT,
    SNOWFLAKE_USER: process.env.SNOWFLAKE_USER,
    SNOWFLAKE_WAREHOUSE: process.env.SNOWFLAKE_WAREHOUSE,
    SNOWFLAKE_DATABASE: process.env.SNOWFLAKE_DATABASE,
    SNOWFLAKE_SCHEMA: process.env.SNOWFLAKE_SCHEMA,
    // Don't include password for security
  }

  return NextResponse.json({
    environmentVariables: envVars,
    nodeEnv: process.env.NODE_ENV,
  })
} 