import crypto from 'crypto'

const SECRET = process.env.SESSION_SECRET || ''

let redisClient: any = null
if (process.env.REDIS_URL) {
  try {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const IORedis = require('ioredis')
    redisClient = new IORedis(process.env.REDIS_URL)
  } catch (e) {
    // ioredis not installed; fallback to memory store
    redisClient = null
  }
}

const memoryStore = new Map<string, any>()

function sign(id: string) {
  if (!SECRET) return id
  const sig = crypto.createHmac('sha256', SECRET).update(id).digest('hex')
  return `${id}.${sig}`
}

function unsign(signed: string) {
  if (!SECRET) return signed
  const idx = signed.lastIndexOf('.')
  if (idx === -1) return null
  const id = signed.slice(0, idx)
  const sig = signed.slice(idx + 1)
  try {
    const expected = crypto.createHmac('sha256', SECRET).update(id).digest('hex')
    const a = Buffer.from(sig)
    const b = Buffer.from(expected)
    if (a.length !== b.length) return null
    if (!crypto.timingSafeEqual(a, b)) return null
    return id
  } catch (e) {
    return null
  }
}

export async function createSession(payload: any, ttl = 60 * 60 * 24 * 7) {
  const id = crypto.randomBytes(16).toString('hex')
  if (redisClient) {
    try {
      await redisClient.set(`sess:${id}`, JSON.stringify(payload), 'EX', ttl)
    } catch (e) {
      memoryStore.set(id, payload)
    }
  } else {
    memoryStore.set(id, payload)
  }
  return sign(id)
}

export async function getSession(signedId: string) {
  const id = unsign(signedId)
  if (!id) return null
  if (redisClient) {
    try {
      const v = await redisClient.get(`sess:${id}`)
      return v ? JSON.parse(v) : null
    } catch (e) {
      return memoryStore.get(id) || null
    }
  }
  return memoryStore.get(id) || null
}

export async function destroySession(signedId: string) {
  const id = unsign(signedId)
  if (!id) return
  if (redisClient) {
    try {
      await redisClient.del(`sess:${id}`)
      return
    } catch (e) {
      // fallback
    }
  }
  memoryStore.delete(id)
}

