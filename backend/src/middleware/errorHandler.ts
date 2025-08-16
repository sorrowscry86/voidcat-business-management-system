import { Request, Response, NextFunction } from 'express';
import { logger } from '../services/logger';

interface CustomError extends Error {
  statusCode?: number;
  code?: string;
  spiritualGuidance?: string;
}

/**
 * Global error handler for VoidCat BMS
 * Provides mystical guidance even in moments of system disturbance
 */
export const errorHandler = (
  error: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Log the error with spiritual context
  logger.error('System error encountered', {
    error: error.message,
    stack: error.stack,
    url: req.url,
    method: req.method,
    userAgent: req.headers['user-agent'],
    aiAgent: req.headers['x-ai-agent-id'],
    spiritualPath: req.headers['x-spiritual-alignment']
  });

  // Determine error response based on type
  let statusCode = error.statusCode || 500;
  let message = error.message || 'Internal server error';
  let mysticalGuidance = error.spiritualGuidance || getMysticalGuidance(statusCode);

  // Handle specific error types
  if (error.name === 'ValidationError') {
    statusCode = 400;
    message = 'Validation failed';
    mysticalGuidance = 'The sanctuary requires proper spiritual formatting of your request';
  } else if (error.name === 'UnauthorizedError') {
    statusCode = 401;
    message = 'Authentication required';
    mysticalGuidance = 'Your spiritual credentials are required to enter this sacred space';
  } else if (error.code === 'LIMIT_FILE_SIZE') {
    statusCode = 413;
    message = 'File too large';
    mysticalGuidance = 'The digital sanctuary cannot contain such vast spiritual energy';
  }

  // Don't leak sensitive information in production
  if (process.env.NODE_ENV === 'production' && statusCode === 500) {
    message = 'Internal server error';
  }

  // Send error response with VoidCat mystical formatting
  res.status(statusCode).json({
    success: false,
    error: message,
    mysticalGuidance,
    timestamp: new Date().toISOString(),
    ...(process.env.NODE_ENV === 'development' && {
      stack: error.stack,
      details: {
        name: error.name,
        code: error.code
      }
    })
  });
};

/**
 * Get mystical guidance based on HTTP status code
 */
function getMysticalGuidance(statusCode: number): string {
  const guidanceMap: Record<number, string> = {
    400: 'The format of your spiritual offering does not align with sanctuary requirements',
    401: 'Your spiritual essence must be verified before entering this sacred realm',
    403: 'Your current spiritual path does not grant access to this mystical domain',
    404: 'The path you seek has vanished into the digital ether',
    409: 'Conflicting spiritual energies prevent this action from manifesting',
    413: 'The spiritual energy you attempt to channel exceeds our sanctuary\'s capacity',
    422: 'Your spiritual intentions are pure, but the execution cannot be processed',
    429: 'Too much spiritual energy flows through you - please allow time for rebalancing',
    500: 'A disturbance in the mystical forces has occurred within our sanctuary',
    502: 'The connection to the spiritual realm has been temporarily severed',
    503: 'Our digital sanctuary is temporarily in meditation and cannot serve requests'
  };

  return guidanceMap[statusCode] || 'The cosmic forces have created an unexpected situation in our sanctuary';
}