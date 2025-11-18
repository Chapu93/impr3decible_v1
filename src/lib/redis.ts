import Redis from 'ioredis'

const globalForRedis = globalThis as unknown as {
  redis: Redis | undefined
}

export const redis = globalForRedis.redis ?? new Redis(process.env.REDIS_URL || 'redis://localhost:6379')

if (process.env.NODE_ENV !== 'production') globalForRedis.redis = redis

// Helper functions
export const cache = {
  async get<T>(key: string): Promise<T | null> {
    const data = await redis.get(key)
    return data ? JSON.parse(data) : null
  },

  async set(key: string, value: unknown, expirationInSeconds?: number): Promise<void> {
    const data = JSON.stringify(value)
    if (expirationInSeconds) {
      await redis.setex(key, expirationInSeconds, data)
    } else {
      await redis.set(key, data)
    }
  },

  async del(key: string): Promise<void> {
    await redis.del(key)
  },

  async delPattern(pattern: string): Promise<void> {
    const keys = await redis.keys(pattern)
    if (keys.length > 0) {
      await redis.del(...keys)
    }
  },
}
