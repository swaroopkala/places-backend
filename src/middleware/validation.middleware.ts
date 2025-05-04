import { Request, Response, NextFunction } from 'express';

/**
 * Middleware to validate that the query parameter exists
 * @param param The name of the query parameter to validate
 * @returns Middleware function
 */
export const validateQueryParam = (param: string) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    if (!req.query[param]) {
      const error: any = new Error(`Missing required query parameter: ${param}`);
      error.status = 400;
      return next(error);
    }
    
    if (req.query[param] === '') {
      const error: any = new Error(`Query parameter ${param} cannot be empty`);
      error.status = 400;
      return next(error);
    }
    
    next();
  };
};
