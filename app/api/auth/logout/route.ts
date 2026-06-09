import { NextResponse } from 'next/server'
import { destroySession } from '@/lib/pi-session'

export async function POST(req: Request) {
  try {
    const cookie = req.headers.get('cookie') || ''
    const match = cookie.match(/(?:^|; )pi_sid=([^;]+)/)
    const sid = match?.[1]
    if (sid) await destroySession(sid)

    // clear cookie; do not set Secure for localhost to allow clearing during dev
    const hostHeader = req.headers.get('host') || ''
    const isLocalHost = hostHeader.includes('localhost') || hostHeader.includes('127.0.0.1')
    const secureAttr = process.env.NODE_ENV === 'production' && !isLocalHost ? 'Secure; ' : ''
    const cleared = `pi_sid=; Path=/; HttpOnly; SameSite=Lax; ${secureAttr}Max-Age=0`
    return NextResponse.json({ ok: true }, { headers: { 'Set-Cookie': cleared } })
  } catch (err) {
    return NextResponse.json({ ok: false }, { status: 500 })
  }
}
