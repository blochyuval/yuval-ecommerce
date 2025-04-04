import dotenv from 'dotenv';

dotenv.config()

const configarations = {
  PORT: process.env.PORT,
  MONGO_URI: process.env.MONGO_URI,
  UPSTASH_REDIS_URL: process.env.UPSTASH_REDIS_URL,
  ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET,
  CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
  STRIPE_SECRETE_KEY: process.env.STRIPE_SECRETE_KEY,
  CLIENT_URL: process.env.CLIENT_URL,
  NODE_ENV: process.env.NODE_ENV
}

export default configarations;