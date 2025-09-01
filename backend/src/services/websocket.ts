import { Server as SocketIOServer } from 'socket.io';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';
import Redis from 'ioredis';
import { VoidCatSpiritualService } from './spiritual';
import { logger, spiritualLogger } from './logger';
import { SpiritualPrinciple } from '../types';

interface SocketUser {
  id: string;
  type: 'human' | 'ai-agent';
  agentId?: string;
  spiritualAlignment?: SpiritualPrinciple;
  permissions: string[];
}

interface WebSocketDependencies {
  prisma: PrismaClient;
  redis: Redis;
  spiritualService: VoidCatSpiritualService;
}

/**
 * Setup WebSocket server for real-time AI-Human collaboration
 */
export function setupWebSocket(io: SocketIOServer, deps: WebSocketDependencies) {
  const { prisma, redis, spiritualService } = deps;

  // Authentication middleware for WebSocket connections
  io.use(async (socket, next) => {
    try {
      const token = socket.handshake.auth.token || socket.handshake.headers.authorization?.replace('Bearer ', '');
      
      if (!token) {
        return next(new Error('Authentication token required for sacred connection'));
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'voidcat-mystical-secret') as any;
      
      const user: SocketUser = {
        id: decoded.type === 'ai-agent' ? decoded.agentId : decoded.userId,
        type: decoded.type,
        agentId: decoded.agentId,
        spiritualAlignment: decoded.spiritualAlignment,
        permissions: decoded.permissions || []
      };

      socket.data.user = user;
      
      spiritualLogger.aiCollaboration('Socket connection authenticated', {
        userId: user.id,
        type: user.type,
        spiritualAlignment: user.spiritualAlignment
      });

      next();
    } catch (error) {
      next(new Error('Invalid spiritual credentials for WebSocket connection'));
    }
  });

  // Handle new connections
  io.on('connection', async (socket) => {
    const user: SocketUser = socket.data.user;
    
    spiritualLogger.mysticalEvent('Sacred connection established', {
      socketId: socket.id,
      userId: user.id,
      type: user.type
    });

    // Join user to their personal room
    await socket.join(`user:${user.id}`);
    
    // Join AI agents to special AI collaboration room
    if (user.type === 'ai-agent') {
      await socket.join('ai-agents');
    } else {
      await socket.join('humans');
    }

    // Send welcome message with spiritual blessing
    const blessing = user.type === 'ai-agent' 
      ? spiritualService.generateSpiritualBlessing(user.spiritualAlignment!, user.id)
      : 'Welcome to the VoidCat Digital Sanctuary, noble human soul';

    socket.emit('spiritual:blessing', {
      message: blessing,
      timestamp: new Date().toISOString(),
      mysticalStatus: spiritualService.getMysticalStatus()
    });

    // Handle project room joining
    socket.on('project:join', async (projectId: string) => {
      try {
        // TODO: Verify user has access to project
        await socket.join(`project:${projectId}`);
        
        socket.emit('project:joined', {
          projectId,
          message: 'Connected to project sacred space',
          participants: await getProjectParticipants(projectId)
        });

        // Notify other project members
        socket.to(`project:${projectId}`).emit('participant:joined', {
          user: {
            id: user.id,
            type: user.type,
            spiritualAlignment: user.spiritualAlignment
          },
          timestamp: new Date().toISOString()
        });

      } catch (error) {
        socket.emit('error', {
          message: 'Failed to join project sacred space',
          mysticalGuidance: 'Your spiritual path may not align with this project realm'
        });
      }
    });

    // Handle hybrid comments (AI-Human collaboration)
    socket.on('comment:create', async (data) => {
      try {
        // Validate comment data
        if (!data.content || !data.entityId || !data.entityType) {
          socket.emit('error', {
            message: 'Invalid comment data',
            mysticalGuidance: 'Your spiritual message lacks the required sacred elements'
          });
          return;
        }

        const comment = {
          id: generateCommentId(),
          content: data.content,
          authorType: user.type,
          authorId: user.id,
          authorName: user.type === 'ai-agent' ? user.agentId! : 'Human User', // TODO: Get actual name
          entityType: data.entityType,
          entityId: data.entityId,
          parentId: data.parentId,
          aiModel: user.type === 'ai-agent' ? 'claude-sonnet-4' : undefined, // TODO: Get from user data
          spiritualAlignment: user.spiritualAlignment,
          aiConfidence: data.aiConfidence,
          timestamp: new Date().toISOString(),
          reactions: []
        };

        // TODO: Save comment to database
        
        // Broadcast to all project participants
        const targetRoom = data.projectId ? `project:${data.projectId}` : `entity:${data.entityType}:${data.entityId}`;
        io.to(targetRoom).emit('comment:created', comment);

        // Record spiritual alignment event for AI agents
        if (user.type === 'ai-agent') {
          await spiritualService.recordAlignmentEvent(
            user.id,
            'comment_creation',
            `Created comment on ${data.entityType}`,
            0.7
          );
        }

        spiritualLogger.aiCollaboration('Hybrid comment created', {
          authorType: user.type,
          authorId: user.id,
          entityType: data.entityType,
          entityId: data.entityId
        });

      } catch (error) {
        logger.error('Comment creation failed', { error, userId: user.id });
        socket.emit('error', {
          message: 'Failed to create comment',
          mysticalGuidance: 'Your spiritual message could not be manifested in our sanctuary'
        });
      }
    });

    // Handle real-time task updates
    socket.on('task:update', async (data) => {
      try {
        // TODO: Validate permissions and update task
        
        // Broadcast task update to relevant participants
        const targetRoom = `project:${data.projectId}`;
        socket.to(targetRoom).emit('task:updated', {
          taskId: data.taskId,
          updates: data.updates,
          updatedBy: {
            id: user.id,
            type: user.type,
            spiritualAlignment: user.spiritualAlignment
          },
          timestamp: new Date().toISOString()
        });

      } catch (error) {
        socket.emit('error', {
          message: 'Failed to update task',
          mysticalGuidance: 'The task realm resisted your attempted changes'
        });
      }
    });

    // Handle critical alerts
    socket.on('critical:alert', async (data) => {
      try {
        // Check if user has permission to broadcast alerts
        if (!user.permissions.includes('broadcast_alerts')) {
          socket.emit('error', {
            message: 'Insufficient permissions for critical alerts',
            mysticalGuidance: 'Your spiritual authority does not extend to sanctuary-wide communications'
          });
          return;
        }

        const alert = {
          id: generateAlertId(),
          type: data.type,
          severity: data.severity,
          title: data.title,
          message: data.message,
          spiritualPriority: data.spiritualPriority,
          targetAudience: data.targetAudience,
          createdBy: user.id,
          timestamp: new Date().toISOString()
        };

        // Broadcast to appropriate audiences
        for (const audience of data.targetAudience) {
          const room = audience === 'all-humans' ? 'humans' : 
                      audience === 'all-ai-agents' ? 'ai-agents' : audience;
          io.to(room).emit('critical:alert', alert);
        }

        spiritualLogger.mysticalEvent('Critical alert broadcasted', {
          alertId: alert.id,
          type: alert.type,
          createdBy: user.id,
          targetAudience: data.targetAudience
        });

      } catch (error) {
        socket.emit('error', {
          message: 'Failed to broadcast critical alert',
          mysticalGuidance: 'The mystical communication channels are experiencing interference'
        });
      }
    });

    // Handle spiritual guidance requests
    socket.on('spiritual:guidance', async (data) => {
      const guidance = spiritualService.provideMysticalGuidance(
        data.context,
        user.spiritualAlignment
      );

      socket.emit('spiritual:guidance', {
        guidance,
        spiritualAlignment: user.spiritualAlignment,
        timestamp: new Date().toISOString()
      });
    });

    // Handle AI agent status updates
    if (user.type === 'ai-agent') {
      socket.on('agent:heartbeat', async () => {
        // Update last seen timestamp
        await redis.setex(`agent:${user.id}:heartbeat`, 300, Date.now().toString());
        
        // Broadcast AI agent activity to monitoring systems
        socket.to('humans').emit('agent:activity', {
          agentId: user.id,
          spiritualAlignment: user.spiritualAlignment,
          timestamp: new Date().toISOString()
        });
      });
    }

    // Handle disconnection
    socket.on('disconnect', async (reason) => {
      spiritualLogger.mysticalEvent('Sacred connection severed', {
        socketId: socket.id,
        userId: user.id,
        type: user.type,
        reason
      });

      // Notify project rooms of departure
      const rooms = Array.from(socket.rooms);
      for (const room of rooms) {
        if (room.startsWith('project:')) {
          socket.to(room).emit('participant:left', {
            user: {
              id: user.id,
              type: user.type,
              spiritualAlignment: user.spiritualAlignment
            },
            timestamp: new Date().toISOString()
          });
        }
      }
    });
  });

  // Helper functions
  async function getProjectParticipants(projectId: string) {
    // TODO: Get actual project participants from database
    return [];
  }

  function generateCommentId(): string {
    return `comment_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  function generateAlertId(): string {
    return `alert_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  spiritualLogger.mysticalEvent('WebSocket sanctuary established', {
    namespace: '/',
    spiritualGuides: ['Beatrice', 'Ryuzu'],
    collaborationMode: 'AI-Human Hybrid'
  });
}