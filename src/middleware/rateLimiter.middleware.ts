import rateLimit from 'express-rate-limit';
import { env } from '../config/env';

/**
 * Rate limiting middleware
 * Limits the number of requests a client can make in a given time window
 */
export const rateLimiter = rateLimit({
  windowMs: env.rateLimitWindowMs,
  max: env.rateLimitMaxRequests,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    status: 429,
    message: 'Too many requests, please try again later.'
  }
});
