import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

/**
 * Environment configuration object
 * Contains all environment variables with defaults
 */
export const env = {
  port: process.env.PORT || 3000,
  nodeEnv: process.env.NODE_ENV || 'development',
  
  googlePlacesApiKey: process.env.GOOGLE_PLACES_API_KEY || '',
  
  rateLimitWindowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '15000', 10),
  rateLimitMaxRequests: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '100', 10),
};

/**
 * Validates that all required environment variables are present
 * @throws Error if any required environment variable is missing
 */
export const validateEnv = (): void => {
  if (!env.googlePlacesApiKey) {
    throw new Error('GOOGLE_PLACES_API_KEY is required');
  }
};
