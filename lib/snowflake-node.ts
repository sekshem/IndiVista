import snowflake from 'snowflake-sdk'

// Validate required environment variables
const requiredEnvVars = {
  SNOWFLAKE_ACCOUNT: process.env.SNOWFLAKE_ACCOUNT,
  SNOWFLAKE_USER: process.env.SNOWFLAKE_USER,
  SNOWFLAKE_PASSWORD: process.env.SNOWFLAKE_PASSWORD,
  SNOWFLAKE_WAREHOUSE: process.env.SNOWFLAKE_WAREHOUSE,
  SNOWFLAKE_DATABASE: process.env.SNOWFLAKE_DATABASE,
  SNOWFLAKE_SCHEMA: process.env.SNOWFLAKE_SCHEMA,
}

// Check if any required environment variables are missing
const missingEnvVars = Object.entries(requiredEnvVars)
  .filter(([_, value]) => !value)
  .map(([key]) => key)

if (missingEnvVars.length > 0) {
  console.error('Missing Snowflake environment variables:', missingEnvVars)
  throw new Error(`Missing required environment variables: ${missingEnvVars.join(', ')}`)
}

// Log connection configuration (excluding sensitive data)
console.log('Snowflake connection configuration:', {
  account: requiredEnvVars.SNOWFLAKE_ACCOUNT,
  user: requiredEnvVars.SNOWFLAKE_USER,
  warehouse: requiredEnvVars.SNOWFLAKE_WAREHOUSE,
  database: requiredEnvVars.SNOWFLAKE_DATABASE,
  schema: requiredEnvVars.SNOWFLAKE_SCHEMA,
})

// Connection pool configuration
const poolConfig = {
  account: requiredEnvVars.SNOWFLAKE_ACCOUNT!,
  username: requiredEnvVars.SNOWFLAKE_USER!,
  password: requiredEnvVars.SNOWFLAKE_PASSWORD!,
  warehouse: requiredEnvVars.SNOWFLAKE_WAREHOUSE!,
  database: requiredEnvVars.SNOWFLAKE_DATABASE!,
  schema: requiredEnvVars.SNOWFLAKE_SCHEMA!,
  pool: {
    min: 1,
    max: 10,
    idleTimeoutMillis: 30000,
    acquireTimeoutMillis: 30000,
  }
}

// Create connection pool
const pool = snowflake.createPool(poolConfig)

// Cache for storing query results
const queryCache = new Map<string, { data: any[], timestamp: number }>()
const CACHE_TTL = 5 * 60 * 1000 // 5 minutes in milliseconds

export async function connectSnowflake(): Promise<typeof pool> {
  try {
    // Test the connection
    const connection = await pool.acquire()
    await pool.release(connection)
    console.log('Successfully connected to Snowflake')
    return pool
  } catch (error) {
    console.error('Failed to connect to Snowflake:', error)
    throw error
  }
}

export async function executeQuery<T = any>(sql: string, binds: any[] = [], useCache: boolean = true): Promise<T[]> {
  try {
    // Generate cache key
    const cacheKey = `${sql}-${JSON.stringify(binds)}`
    
    // Check cache if enabled
    if (useCache) {
      const cachedResult = queryCache.get(cacheKey)
      if (cachedResult && Date.now() - cachedResult.timestamp < CACHE_TTL) {
        console.log('Returning cached result for query:', sql)
        return cachedResult.data as T[]
      }
    }

    console.log('Executing query:', sql, 'with binds:', binds)
    
    // Get connection from pool
    const connection = await pool.acquire()
    
    try {
      const result = await new Promise<T[]>((resolve, reject) => {
        connection.execute({
          sqlText: sql,
          binds,
          complete: (err, stmt, rows) => {
            if (err) {
              console.error('Query execution error:', err)
              reject(err)
            } else {
              console.log('Query executed successfully, rows returned:', rows?.length || 0)
              resolve((rows || []) as T[])
            }
          },
        })
      })

      // Cache the result if caching is enabled
      if (useCache) {
        queryCache.set(cacheKey, {
          data: result,
          timestamp: Date.now()
        })
      }

      return result
    } finally {
      // Always release the connection back to the pool
      await pool.release(connection)
    }
  } catch (err) {
    console.error('Error in executeQuery:', err)
    throw err
  }
}

// Clear the query cache
export function clearQueryCache(): void {
  queryCache.clear()
  console.log('Query cache cleared')
}

// Note: Removed getPoolStats function as the Snowflake SDK's Pool type doesn't expose these properties 