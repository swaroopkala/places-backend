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
  const app: Express = express();
  
  app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
    preflightContinue: false,
    optionsSuccessStatus: 204
  }));
  
  app.use(express.json());
  app.use(morgan('dev'));
  app.use(rateLimiter);

  app.use('/places', placesRoutes);

  app.get('/health', (req, res) => {
    res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
  });

  app.use((req, res) => {
    res.status(404).json({
      status: 404,
      message: 'Resource not found'
    });
  });

  app.use(errorHandler);

  return app;
};
