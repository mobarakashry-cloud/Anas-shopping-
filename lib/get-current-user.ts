import { cookies } from 'next/headers'
import { getSession } from './pi-session'

export async function getCurrentUser() {
  try {
    const cookieStore = cookies()
    const sid = cookieStore.get('pi_sid')?.value
    if (!sid) return null
    const session = await getSession(sid)
    return session?.user || session || null
  } catch (e) {
    return null
  }
}
