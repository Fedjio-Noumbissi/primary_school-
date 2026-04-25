import { Request, Response, NextFunction } from 'express';

// Custom Error Class
export class AppError extends Error {
  statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    Error.captureStackTrace(this, this.constructor);
  }
}

// Validation Error Formatter (for Zod)
export const formatZodError = (err: any) => {
  return err.errors.map((e: any) => ({
    path: e.path.join('.'),
    message: e.message,
  }));
};

// Global Error Handler
export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let error = { ...err };
  error.message = err.message;

  // Log to console for dev
  if (process.env.NODE_ENV !== 'production') {
    console.log(err);
  }

  // Zod Validation Error
  if (err.name === 'ZodError') {
    const message = 'Validation Error';
    return res.status(400).json({
      success: false,
      message,
      errors: formatZodError(err),
    });
  }

  if (err.code === 'ER_DUP_ENTRY') {
    return res.status(400).json({
      success: false,
      message: 'Duplicate field value entered',
    });
  }
  
  if (err.code === 'ER_NO_DEFAULT_FOR_FIELD') {
    return res.status(400).json({
      success: false,
      message: 'Missing required field',
    });
  }

  res.status(error.statusCode || 500).json({
    success: false,
    message: error.message || 'Server Error',
  });
};
