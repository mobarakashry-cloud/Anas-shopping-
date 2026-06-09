"use client"

import React, { useEffect, useState } from 'react'
import { PI_NETWORK_CONFIG } from '@/lib/system-config'

async function loadPiSdk(): Promise<void> {
  if (typeof window === 'undefined') return
  if ((window as any).Pi) return
  const src = (PI_NETWORK_CONFIG && (PI_NETWORK_CONFIG as any).SDK_URL) || 'https://sdk.minepi.com/pi-sdk.js'
  return new Promise((resolve, reject) => {
    const s = document.createElement('script')
    s.src = src
    s.async = true
    s.onload = () => resolve()
    s.onerror = () => reject(new Error('Failed to load Pi SDK'))
    document.head.appendChild(s)
  })
}

export default function PiAuth() {
  const [loading, setLoading] = useState(false)
  const [user, setUser] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)
  const [debug, setDebug] = useState<string | null>(null)
  const [mockName, setMockName] = useState('devuser')

  async function authenticate() {
    setError(null)
    try {
      setLoading(true)
      await loadPiSdk()
      const Pi = (window as any).Pi
      if (!Pi) throw new Error('Pi SDK not available')

      // await Pi.init as a Promise before authenticating
      if (typeof Pi.init === 'function') {
        const appName = process.env.NEXT_PUBLIC_APP_NAME || 'Anas Shopping'
        await Pi.init({ appName })
      }

      let authResult: any
      try {
        // request username scope explicitly
        console.debug('Calling Pi.authenticate with scope username')
        authResult = await Pi.authenticate({ scope: 'username' })
      } catch (e: any) {
        const msg = e?.message || String(e)
        setDebug(msg)
        console.error('Pi.authenticate failed', { message: msg, err: e })
        // Detect common user-gesture requirement errors
        if (/gesture|user action|required/i.test(msg)) {
          setDebug('Pi.authenticate requires a user gesture (tap the Sign in button).')
        }
        throw new Error(`Pi SDK authenticate failed: ${msg}`)
      }

      // support different token keys returned by SDK
      const accessToken = authResult?.accessToken ?? authResult?.token ?? authResult?.code
      if (!accessToken) throw new Error('No access token returned from Pi.authenticate')

      // send token to backend for validation and session creation with retries
      let attempts = 0
      let ok = false
      while (attempts < 3 && !ok) {
        attempts += 1
        try {
          const res = await fetch('/api/auth/pi', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ accessToken }),
          })
          if (res.ok) ok = true
          else {
            const txt = await res.text()
            throw new Error(`Server responded ${res.status}: ${txt}`)
          }
        } catch (e) {
          if (attempts >= 3) throw e
          await new Promise((r) => setTimeout(r, 500 * attempts))
        }
      }

      // fetch session user
      const meRes = await fetch('/api/auth/me')
      if (meRes.ok) {
        const data = await meRes.json()
        setUser(data.user || null)
      }
    } catch (err: any) {
      console.error('Pi auth error', err)
      setError(err?.message || 'Authentication failed')
    } finally {
      setLoading(false)
    }
  }

  // Mock/dev signin for localhost when Pi SDK can't be used
  async function mockSignIn() {
    setError(null)
    setDebug('Using mock sign-in (dev)')
    try {
      setLoading(true)
      const accessToken = `mock:${mockName}`
      const res = await fetch('/api/auth/pi', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ accessToken }),
      })
      if (!res.ok) {
        const txt = await res.text()
        throw new Error(`Server responded ${res.status}: ${txt}`)
      }
      const me = await fetch('/api/auth/me')
      if (me.ok) {
        const data = await me.json()
        setUser(data.user || null)
      }
    } catch (e: any) {
      setError(e?.message || String(e))
    } finally {
      setLoading(false)
    }
  }

  async function logout() {
    try {
      setLoading(true)
      await fetch('/api/auth/logout', { method: 'POST' })
      setUser(null)
    } catch (err) {
      console.error('Logout failed', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    // automatically trigger authentication when app loads
    // run in background, user can also click button to trigger manually
    authenticate()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div style={{ display: 'contents' }}>
      {error && (
        <div style={{ color: 'crimson', padding: 4, display: 'inline-block' }}>
          <strong>خطأ:</strong> {error}
        </div>
      )}

      {debug && (
        <div style={{ color: '#b07000', padding: 4, display: 'inline-block' }}>
          <strong>Debug:</strong> {debug}
        </div>
      )}

      {user ? (
        <div style={{ display: 'inline-flex', gap: 8, alignItems: 'center' }}>
          <span>{user?.username || user?.address || user?.id || 'Pi User'}</span>
          <button onClick={logout} disabled={loading} style={{ display: 'inline-block' }}>
            {loading ? '...' : 'Logout'}
          </button>
        </div>
      ) : (
        <div style={{ display: 'inline-flex', gap: 8, alignItems: 'center' }}>
          <button onClick={authenticate} disabled={loading} style={{ display: 'inline-block' }}>
            {loading ? 'Signing in with Pi...' : 'Sign in with Pi'}
          </button>

          {/* Show mock sign-in controls when on localhost or if NEXT_PUBLIC_PI_MOCK=1 */}
          {(typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' || process.env.NEXT_PUBLIC_PI_MOCK === '1' || window.location.hostname === process.env.NEXT_PUBLIC_PROD_DOMAIN)) && (
            <div style={{ display: 'inline-flex', gap: 6, alignItems: 'center' }}>
              <input value={mockName} onChange={(e) => setMockName(e.target.value)} placeholder="dev user" style={{ padding: 6, borderRadius: 6 }} />
              <button onClick={mockSignIn} disabled={loading} style={{ background: 'crimson', color: 'white', padding: '6px 10px', borderRadius: 6 }}>
                Mock sign-in
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
