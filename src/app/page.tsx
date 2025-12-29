'use client'

import { useState, FormEvent } from 'react'
import { useRouter } from 'next/navigation'

export default function Home() {
  const [accessCode, setAccessCode] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      // Send access code to server for verification
      const response = await fetch('/api/verify-access', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ accessCode }),
      })

      const data = await response.json()

      if (response.ok) {
        // Access granted - redirect to the protected game
        router.push('/api/game')
      } else {
        // Show error message
        setError(data.error || 'Invalid access code')
      }
    } catch (err) {
      setError('An error occurred. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      padding: '1rem'
    }}>
      <div style={{
        width: '100%',
        maxWidth: '400px',
        textAlign: 'center'
      }}>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={accessCode}
            onChange={(e) => setAccessCode(e.target.value)}
            placeholder="Enter access code"
            required
            disabled={isLoading}
            style={{
              width: '100%',
              padding: '0.75rem 1rem',
              fontSize: '1rem',
              border: '1px solid #e0e0e0',
              borderRadius: '5px',
              marginBottom: '1rem',
              outline: 'none',
              opacity: isLoading ? 0.6 : 1
            }}
            onFocus={(e) => e.target.style.borderColor = '#0070f3'}
            onBlur={(e) => e.target.style.borderColor = '#e0e0e0'}
          />

          {error && (
            <div style={{
              color: '#d32f2f',
              fontSize: '0.9rem',
              marginBottom: '1rem',
              textAlign: 'left'
            }}>
              {error}
            </div>
          )}

          <button
            type="submit"
            className="btn btn-primary"
            disabled={isLoading}
            style={{
              width: '100%',
              padding: '0.75rem 1rem',
              fontSize: '1rem',
              opacity: isLoading ? 0.6 : 1,
              cursor: isLoading ? 'not-allowed' : 'pointer'
            }}
          >
            {isLoading ? 'Verifying...' : 'Submit'}
          </button>
        </form>
      </div>
    </div>
  )
}
