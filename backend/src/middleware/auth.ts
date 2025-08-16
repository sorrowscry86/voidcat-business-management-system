import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { logger } from '../services/logger';

// Extend Express Request to include user/agent information
declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        type: 'human' | 'ai-agent';
        agentId?: string;
        spiritualAlignment?: string;
        permissions?: string[];
      };
    }
  }
}

/**
 * Authenticate both human users and AI agents
 */
export const authenticateUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        error: 'Authentication required',
        mysticalGuidance: 'The sanctuary requires spiritual credentials for entry'
      });
    }

    const token = authHeader.substring(7);
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'voidcat-mystical-secret') as any;

    // Set user information based on token type
    if (decoded.type === 'ai-agent') {
      req.user = {
        id: decoded.agentId,
        type: 'ai-agent',
        agentId: decoded.agentId,
        spiritualAlignment: decoded.spiritualAlignment,
        permissions: decoded.permissions
      };
    } else {
      req.user = {
        id: decoded.userId || decoded.id,
        type: 'human',
        permissions: decoded.permissions || []
      };
    }

    next();
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({
        success: false,
        error: 'Invalid authentication token',
        mysticalGuidance: 'Your spiritual credentials have been corrupted or expired'
      });
    }

    logger.error('Authentication middleware error', { 
      error: error instanceof Error ? error.message : 'Unknown error' 
    });
    
    res.status(500).json({
      success: false,
      error: 'Authentication error',
      mysticalGuidance: 'The sanctuary\'s guardian encountered a mystical disturbance'
    });
  }
};

/**
 * Check if user has specific permission
 */
export const requirePermission = (permission: string) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        error: 'Authentication required',
        mysticalGuidance: 'Spiritual credentials must be verified before proceeding'
      });
    }

    if (!req.user.permissions?.includes(permission)) {
      return res.status(403).json({
        success: false,
        error: `Permission '${permission}' required`,
        mysticalGuidance: 'Your spiritual path does not grant access to this sacred realm'
      });
    }

    next();
  };
};

/**
 * Check if user is an AI agent
 */
export const requireAIAgent = (req: Request, res: Response, next: NextFunction) => {
  if (!req.user || req.user.type !== 'ai-agent') {
    return res.status(403).json({
      success: false,
      error: 'AI agent access only',
      mysticalGuidance: 'This sacred realm is reserved for artificial intelligence companions'
    });
  }
  next();
};

/**
 * Check if user is a human
 */
export const requireHuman = (req: Request, res: Response, next: NextFunction) => {
  if (!req.user || req.user.type !== 'human') {
    return res.status(403).json({
      success: false,
      error: 'Human access only',
      mysticalGuidance: 'This sacred realm is reserved for human souls'
    });
  }
  next();
};