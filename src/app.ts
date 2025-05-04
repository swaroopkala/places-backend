import express, { Express } from 'express';
import cors from 'cors';
import morgan from 'morgan';

import { errorHandler } from './middleware/error.middleware';
import { rateLimiter } from './middleware/rateLimiter.middleware';
import placesRoutes from './routes/places.routes';

/**
 * Express application setup
 */
export const createApp = (): Express => {
  // Create Express app
  const app: Express = express();
  
  // Configure CORS with more specific options
  app.use(cors({
    origin: '*', // Allow all origins
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
    preflightContinue: false,
    optionsSuccessStatus: 204
  }));
  
  app.use(express.json()); // Parse JSON request bodies
  app.use(morgan('dev')); // Request logging
  app.use(rateLimiter); // Apply rate limiting

  // Apply routes
  app.use('/places', placesRoutes);

  // Health check endpoint
  app.get('/health', (req, res) => {
    res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
  });

  // 404 handler for undefined routes
  app.use((req, res) => {
    res.status(404).json({
      status: 404,
      message: `Cannot ${req.method} ${req.originalUrl}`
    });
  });

  // Error handling middleware (should be last)
  app.use(errorHandler);

  return app;
};
