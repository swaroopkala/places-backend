import { Request, Response, NextFunction } from 'express';
import { ErrorResponse } from '../types/places';

/**
 * Error handling middleware
 * Catches any errors thrown in the application and returns a standardized error response
 */
export const errorHandler = (
  err: Error & { status?: number },
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const status = err.status || 500;
  const message = err.message || 'Internal Server Error';

  console.error(`[Error] ${status} - ${message}`);
  if (status === 500) {
    console.error(err.stack);
  }

  const errorResponse: ErrorResponse = {
    status,
    message,
  };

  res.status(status).json(errorResponse);
};
