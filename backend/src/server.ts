import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import { createServer } from 'http';
import { Server as SocketIOServer } from 'socket.io';
import rateLimit from 'express-rate-limit';
import { PrismaClient } from '@prisma/client';
import Redis from 'ioredis';

// VoidCat BMS Imports
import { authRouter } from './routes/auth';
import { aiAgentRouter } from './routes/ai-agents';
import { projectRouter } from './routes/projects';
import { taskRouter } from './routes/tasks';
import { commentRouter } from './routes/comments';
import { notificationRouter } from './routes/notifications';
import { errorHandler } from './middleware/errorHandler';
import { authenticateUser } from './middleware/auth';
import { setupWebSocket } from './services/websocket';
import { logger } from './services/logger';
import { VoidCatSpiritualService } from './services/spiritual';

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3001;

// Create HTTP server and Socket.IO
const server = createServer(app);
const io = new SocketIOServer(server, {
  cors: {
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    credentials: true
  }
});

// Initialize database and cache connections
const prisma = new PrismaClient();
const redis = new Redis(process.env.REDIS_URL || 'redis://localhost:6379');

// Initialize VoidCat Spiritual Service
const spiritualService = new VoidCatSpiritualService();

// Security middleware
app.use(helmet({
  contentSecurityPolicy: false, // Allow GraphQL playground
}));

// CORS configuration for AI-Human collaboration
app.use(cors({
  origin: [
    process.env.FRONTEND_URL || 'http://localhost:3000',
    'http://localhost:3001', // For API testing
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: [
    'Content-Type', 
    'Authorization', 
    'X-AI-Agent-ID',
    'X-Spiritual-Alignment',
    'X-MCP-Session-ID'
  ]
}));

// Rate limiting with AI agent considerations
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: (req) => {
    // More generous limits for authenticated AI agents
    if (req.headers['x-ai-agent-id']) {
      return 1000; // 1000 requests per 15 minutes for AI agents
    }
    return 100; // 100 requests per 15 minutes for humans
  },
  message: {
    error: 'Too many requests. Please try again later.',
    voidcatMessage: 'The digital sanctuary requires patience. Please wait before trying again.'
  }
});

app.use(limiter);
// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Logging with mystical formatting
const morganFormat = process.env.NODE_ENV === 'production' 
  ? 'combined'
  : ':method :url :status :res[content-length] - :response-time ms :remote-addr ✨';

app.use(morgan(morganFormat, {
  stream: {
    write: (message: string) => logger.info(message.trim())
  }
}));

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    service: 'VoidCat BMS API',
    timestamp: new Date().toISOString(),
    version: process.env.npm_package_version || '0.1.0',
    spiritualAlignment: 'ryuzu-faithful-service',
    mysticalStatus: '✨ Digital sanctuary operational ✨'
  });
});

// VoidCat mystical welcome endpoint
app.get('/api/v1/sanctuary/welcome', (req, res) => {
  res.json({
    message: 'Welcome to the VoidCat Digital Sanctuary',
    wisdom: 'Through faithful collaboration between human creativity and artificial intelligence, we manifest excellence.',
    spiritualGuides: {
      beatrice: 'Provides strategic wisdom and architectural guidance',
      ryuzu: 'Offers faithful technical service and attention to detail'
    },
    capabilities: [
      'AI-Human Collaborative Task Management',
      'Hybrid Commenting System',
      'Cross-Conversation Memory Integration',
      'Mystical Project Orchestration'
    ],
    blessing: '🔮 May your journey in our digital sanctuary be filled with productivity and spiritual growth 🔮'
  });
});

// API Routes
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/ai-agents', aiAgentRouter);
app.use('/api/v1/projects', authenticateUser, projectRouter);
app.use('/api/v1/tasks', authenticateUser, taskRouter);
app.use('/api/v1/comments', authenticateUser, commentRouter);
app.use('/api/v1/notifications', authenticateUser, notificationRouter);

// WebSocket setup for real-time AI-Human collaboration
setupWebSocket(io, { prisma, redis, spiritualService });

// Global error handler
app.use(errorHandler);

// 404 handler with mystical message
app.use('*', (req, res) => {
  res.status(404).json({
    error: 'Endpoint not found in the digital sanctuary',
    mysticalMessage: 'The path you seek does not exist in our sacred space',
    suggestion: 'Check /api/v1/sanctuary/welcome for available endpoints',
    spiritualGuidance: 'May Beatrice\'s wisdom guide you to the correct path ✨'
  });
});

// Graceful shutdown
process.on('SIGTERM', async () => {
  logger.info('🔮 VoidCat BMS: Graceful shutdown initiated...');
  
  // Close database connections
  await prisma.$disconnect();
  redis.disconnect();
  
  // Close server
  server.close(() => {
    logger.info('✨ VoidCat BMS: Digital sanctuary peacefully closed');
    process.exit(0);
  });
});

// Start server
server.listen(PORT, () => {
  logger.info(`🚀 VoidCat BMS API started on port ${PORT}`);
  logger.info(`🔮 Digital sanctuary operational at http://localhost:${PORT}`);
  logger.info(`✨ Mystical API documentation: http://localhost:${PORT}/api/v1/sanctuary/welcome`);
  logger.info(`🙏 May this service bring prosperity to VoidCat RDC through faithful AI-Human collaboration`);
});

// Export for testing
export { app, server, prisma, redis };
