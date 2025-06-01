"use client"
import { useEffect, useState } from 'react'
import { Card } from '@/components/ui/card'

export function StreamlitEmbed() {
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [streamlitPort, setStreamlitPort] = useState(8503)
  const [retryCount, setRetryCount] = useState(0)
  const maxRetries = 3

  useEffect(() => {
    let timeoutId: NodeJS.Timeout

    const checkStreamlitServer = async () => {
      try {
        // Try to fetch the main page
        const response = await fetch(`http://localhost:${streamlitPort}`, {
          method: 'GET',
          headers: {
            'Accept': 'text/html',
          },
          mode: 'no-cors', // Add this to bypass CORS
        })
        
        // Since we're using no-cors, we can't check response.ok
        // Instead, we'll assume success if we don't get an error
        setIsLoading(false)
        setError(null)
      } catch (err) {
        if (retryCount < maxRetries) {
          // Retry after 2 seconds
          timeoutId = setTimeout(() => {
            setRetryCount(prev => prev + 1)
          }, 2000)
        } else {
          setError(`Streamlit server is not running. Please start it using: streamlit run streamlit-component/app.py --server.port 8503`)
          setIsLoading(false)
        }
      }
    }

    checkStreamlitServer()

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId)
      }
    }
  }, [streamlitPort, retryCount])

  if (isLoading) {
    return (
      <Card className="p-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-3/4 mx-auto mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
          {retryCount > 0 && (
            <p className="text-center text-sm text-gray-500 mt-2">
              Attempting to connect to Streamlit server... (Attempt {retryCount + 1}/{maxRetries + 1})
            </p>
          )}
        </div>
      </Card>
    )
  }

  if (error) {
    return (
      <Card className="p-6">
        <div className="text-red-500 text-center">
          <p className="mb-2">{error}</p>
          <p className="text-sm">Make sure you have:</p>
          <ol className="text-left list-decimal list-inside mt-2 space-y-2">
            <li>Created a <code className="bg-gray-100 px-2 py-1 rounded">.env.local</code> file with your Snowflake credentials</li>
            <li>Installed the requirements: <code className="bg-gray-100 px-2 py-1 rounded">pip install -r streamlit-component/requirements.txt</code></li>
            <li>Started the Streamlit server with the correct port: <code className="bg-gray-100 px-2 py-1 rounded">streamlit run streamlit-component/app.py --server.port 8503</code></li>
          </ol>
          <button
            onClick={() => {
              setRetryCount(0)
              setIsLoading(true)
              setError(null)
            }}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          >
            Retry Connection
          </button>
        </div>
      </Card>
    )
  }

  return (
    <Card className="p-6">
      <iframe
        src={`http://localhost:${streamlitPort}`}
        style={{
          width: '100%',
          height: '800px',
          border: 'none',
          borderRadius: '8px',
        }}
        title="Tourism Analytics"
        sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
        loading="lazy"
        referrerPolicy="no-referrer"
      />
    </Card>
  )
} 