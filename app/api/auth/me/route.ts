import { NextResponse } from 'next/server'
import { getSession } from '@/lib/pi-session'

export async function GET(req: Request) {
  try {
    const cookie = req.headers.get('cookie') || ''
    const match = cookie.match(/(?:^|; )pi_sid=([^;]+)/)
    const sid = match?.[1]
    if (!sid) return NextResponse.json({ user: null })

    const session = await getSession(sid)
    if (!session) return NextResponse.json({ user: null })

    return NextResponse.json({ user: session.user || session })
  } catch (err) {
    return NextResponse.json({ user: null }, { status: 500 })
  }
}
