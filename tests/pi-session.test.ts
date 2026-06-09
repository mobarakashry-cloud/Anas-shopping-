import { describe, it, expect } from 'vitest'
import { createSession, getSession, destroySession } from '@/lib/pi-session'

describe('pi-session', () => {
  it('creates, retrieves, and destroys a session (memory store)', async () => {
    const payload = { user: { id: 'u1', username: 'tester' } }
    const signed = await createSession(payload, 60)
    expect(typeof signed).toBe('string')

    const got = await getSession(signed)
    expect(got).not.toBeNull()
    expect(got.user?.id || got.user?.username || got.id || got).toBeTruthy()

    await destroySession(signed)
    const after = await getSession(signed)
    expect(after).toBeNull()
  })
})
