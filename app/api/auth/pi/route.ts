import { NextResponse } from 'next/server'
import { createSession } from '@/lib/pi-session'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const accessToken = body?.accessToken
    if (!accessToken) {
      return NextResponse.json({ error: 'Missing accessToken' }, { status: 400 })
    }

    // Allow mock tokens for local development/test environments.
    // Usage: send accessToken: "mock:username" to create a fake user.
    if (String(accessToken).startsWith('mock:') && (process.env.NODE_ENV !== 'production' || process.env.ALLOW_MOCK_PI === '1')) {
      const name = String(accessToken).slice(5) || 'dev'
      const user: any = { id: `mock-${name}`, username: name }

      // assign admin role for mock:admin in dev/test environments
      if (String(name).toLowerCase() === 'admin') {
        user.role = 'admin'
      }

      const sessionId = await createSession(user)
      const maxAge = 60 * 60 * 24 * 7 // 7 days
      const hostHeader = req.headers.get('host') || ''
      const isLocalHost = hostHeader.includes('localhost') || hostHeader.includes('127.0.0.1')
      const secureAttr = process.env.NODE_ENV === 'production' && !isLocalHost ? 'Secure; ' : ''
      const cookie = `pi_sid=${sessionId}; Path=/; HttpOnly; SameSite=Lax; ${secureAttr}Max-Age=${maxAge}`
      return NextResponse.json({ ok: true, user }, { headers: { 'Set-Cookie': cookie } })
    }

    // Validate token with Pi Network API
    let res
    try {
      res = await fetch('https://api.minepi.com/v2/me', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
    } catch (fetchErr) {
      console.error('Pi /v2/me fetch error', { err: String(fetchErr) })
      return NextResponse.json({ error: 'Pi validation request failed' }, { status: 502 })
    }

    const raw = await res.text()
    // try parse JSON body for logging
    let parsedBody: any = null
    try {
      parsedBody = raw ? JSON.parse(raw) : null
    } catch (e) {
      parsedBody = raw
    }

    console.debug('Pi /v2/me response', { status: res.status, body: parsedBody })

    if (!res.ok) {
      // In non-production expose debug info to assist debugging
      const debugInfo = process.env.NODE_ENV === 'production' ? undefined : { status: res.status, body: parsedBody }
      return NextResponse.json({ error: 'Invalid Pi token', debug: debugInfo }, { status: 401 })
    }

    const user = parsedBody

    // Create server-side session and set httpOnly session id cookie (do not store raw token)
    const sessionId = await createSession(user)
    const maxAge = 60 * 60 * 24 * 7 // 7 days
    const hostHeader = req.headers.get('host') || ''
    const isLocalHost = hostHeader.includes('localhost') || hostHeader.includes('127.0.0.1')
    const secureAttr = process.env.NODE_ENV === 'production' && !isLocalHost ? 'Secure; ' : ''
    const cookie = `pi_sid=${sessionId}; Path=/; HttpOnly; SameSite=Lax; ${secureAttr}Max-Age=${maxAge}`

    return NextResponse.json({ ok: true, user }, { headers: { 'Set-Cookie': cookie } })
  } catch (err) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
