import rateLimit from 'express-rate-limit';
import { env } from '../config/env';

/**
 * Rate limiting middleware
 * Limits the number of requests a client can make in a given time window
 */
export const rateLimiter = rateLimit({
  windowMs: env.rateLimitWindowMs, // Time window in milliseconds
  max: env.rateLimitMaxRequests, // Max number of requests per window
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  message: {
    status: 429,
    message: 'Too many requests, please try again later.'
  }
});
