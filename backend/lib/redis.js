import Redis from "ioredis"
import configarations from '../utils/dotEnvProcess.js'

export const redis = new Redis(configarations.UPSTASH_REDIS_URL);
await redis.set('foo', 'bar');