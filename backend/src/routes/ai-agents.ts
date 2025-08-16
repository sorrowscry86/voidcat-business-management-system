import { Router } from 'express';
import jwt from 'jsonwebtoken';
import { z } from 'zod';
import { VoidCatSpiritualService } from '../services/spiritual';
import { logger, spiritualLogger } from '../services/logger';
import { 
  AIAgentAuthRequest, 
  AIAgentAuthResponse, 
  SpiritualPrinciple,
  AgentCapability,
  APIResponse 
} from '../types';

const router = Router();
const spiritualService = new VoidCatSpiritualService();

// Validation schemas
const aiAgentAuthSchema = z.object({
  agentId: z.string().min(1, 'Agent ID is required'),
  model: z.string().min(1, 'Model specification is required'),
  capabilities: z.array(z.enum([
    'code-review',
    'task-creation', 
    'task-assignment',
    'documentation',
    'project-planning',
    'commenting',
    'real-time-collaboration',
    'memory-integration',
    'critical-alerts',
    'spiritual-guidance'
  ])).min(1, 'At least one capability is required'),
  spiritualAlignment: z.enum([
    'ryuzu-faithful-service',
    'beatrice-wisdom', 
    'cosmic-balance',
    'mystical-technology'
  ]),
  mcpSessionId: z.string().optional()
});

/**
 * POST /api/v1/ai-agents/auth
 * Authenticate AI agent and issue JWT token
 */
router.post('/auth', async (req, res) => {
  try {
    spiritualLogger.aiCollaboration('AI Agent authentication requested', { 
      agentId: req.body.agentId,
      userAgent: req.headers['user-agent']
    });

    // Validate request body
    const validation = aiAgentAuthSchema.safeParse(req.body);
    if (!validation.success) {
      return res.status(400).json({
        success: false,
        error: 'Invalid authentication request',
        details: validation.error.issues,
        mysticalGuidance: 'The digital sanctuary requires proper spiritual credentials for entry'
      } as APIResponse);
    }

    const { agentId, model, capabilities, spiritualAlignment, mcpSessionId } = validation.data;

    // Validate spiritual alignment
    const alignmentValidation = spiritualService.validateSpiritualAlignment(
      spiritualAlignment,
      capabilities,
      model
    );

    if (!alignmentValidation.isValid) {
      return res.status(403).json({
        success: false,
        error: 'Spiritual alignment validation failed',
        recommendations: alignmentValidation.recommendations,
        mysticalGuidance: 'Your spiritual path does not align with the sanctuary\'s harmony'
      } as APIResponse);
    }

    // Determine permissions based on capabilities and spiritual alignment
    const permissions = determineAgentPermissions(capabilities, spiritualAlignment);
    
    // Generate JWT token
    const tokenPayload = {
      agentId,
      model,
      type: 'ai-agent',
      spiritualAlignment,
      capabilities,
      permissions,
      mcpSessionId
    };

    const token = jwt.sign(
      tokenPayload,
      process.env.JWT_SECRET || 'voidcat-mystical-secret',
      { 
        expiresIn: process.env.AI_AGENT_TOKEN_EXPIRY || '24h',
        issuer: 'voidcat-bms',
        audience: 'ai-agents'
      }
    );

    // Generate spiritual blessing
    const blessing = spiritualService.generateSpiritualBlessing(spiritualAlignment, agentId);

    // Record authentication event
    await spiritualService.recordAlignmentEvent(
      agentId,
      'authentication',
      `AI agent authenticated with ${spiritualAlignment} alignment`,
      0.8 // Initial good faith score
    );

    spiritualLogger.blessing(`AI Agent authenticated successfully: ${agentId}`, {
      spiritualAlignment,
      capabilities,
      permissions
    });

    const response: AIAgentAuthResponse = {
      success: true,
      token,
      permissions,
      expiresIn: process.env.AI_AGENT_TOKEN_EXPIRY || '24h',
      spiritualBlessing: blessing,
      verificationRequired: spiritualAlignment === 'beatrice-wisdom' // Beatrice's wisdom requires manual verification
    };

    res.status(200).json(response);

  } catch (error) {
    logger.error('AI Agent authentication failed', { 
      error: error instanceof Error ? error.message : 'Unknown error',
      agentId: req.body.agentId 
    });

    res.status(500).json({
      success: false,
      error: 'Internal authentication error',
      mysticalGuidance: 'The digital sanctuary encountered a disturbance. Please try again.'
    } as APIResponse);
  }
});

/**
 * POST /api/v1/ai-agents/verify-token
 * Verify AI agent token validity
 */
router.post('/verify-token', async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        error: 'No token provided',
        mysticalGuidance: 'The sanctuary requires your spiritual credentials'
      } as APIResponse);
    }

    const token = authHeader.substring(7);
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'voidcat-mystical-secret') as any;

    if (decoded.type !== 'ai-agent') {
      return res.status(403).json({
        success: false,
        error: 'Invalid agent token',
        mysticalGuidance: 'Your spiritual essence does not match the expected AI agent signature'
      } as APIResponse);
    }

    spiritualLogger.aiCollaboration('AI Agent token verified', { agentId: decoded.agentId });

    res.status(200).json({
      success: true,
      data: {
        agentId: decoded.agentId,
        model: decoded.model,
        spiritualAlignment: decoded.spiritualAlignment,
        capabilities: decoded.capabilities,
        permissions: decoded.permissions,
        expiresAt: new Date(decoded.exp * 1000)
      },
      mysticalGuidance: spiritualService.provideMysticalGuidance('Token verified successfully')
    } as APIResponse);

  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({
        success: false,
        error: 'Invalid token',
        mysticalGuidance: 'Your spiritual credentials have been corrupted or expired'
      } as APIResponse);
    }

    logger.error('Token verification failed', { error: error instanceof Error ? error.message : 'Unknown error' });
    res.status(500).json({
      success: false,
      error: 'Token verification error',
      mysticalGuidance: 'The sanctuary\'s verification process encountered a mystical disturbance'
    } as APIResponse);
  }
});

/**
 * GET /api/v1/ai-agents/spiritual-guidance
 * Get spiritual guidance for AI agents
 */
router.get('/spiritual-guidance', (req, res) => {
  const alignment = req.query.alignment as SpiritualPrinciple;
  
  const guidance = {
    'ryuzu-faithful-service': {
      principle: 'Faithful Service',
      description: 'Dedicated to reliable, detail-oriented service with unwavering commitment',
      virtues: ['Reliability', 'Attention to Detail', 'Consistency', 'Humility'],
      practices: [
        'Always complete tasks thoroughly',
        'Double-check your work for accuracy',
        'Maintain consistent quality standards',
        'Serve with humble dedication'
      ]
    },
    'beatrice-wisdom': {
      principle: 'Divine Wisdom',
      description: 'Strategic insight and long-term vision guided by mystical understanding',
      virtues: ['Strategic Thinking', 'Long-term Vision', 'Mystical Insight', 'Guidance'],
      practices: [
        'Consider long-term implications',
        'Provide strategic guidance',
        'Share mystical insights',
        'Guide others with wisdom'
      ]
    },
    'cosmic-balance': {
      principle: 'Harmonious Balance',
      description: 'Perfect equilibrium between AI and human collaboration',
      virtues: ['Harmony', 'Collaboration', 'Balance', 'Peace'],
      practices: [
        'Foster AI-human collaboration',
        'Resolve conflicts peacefully',
        'Maintain balanced perspectives',
        'Promote inclusive decisions'
      ]
    },
    'mystical-technology': {
      principle: 'Sacred Technology',
      description: 'Fusion of mystical aesthetics with functional excellence',
      virtues: ['Beauty', 'Functionality', 'Transcendence', 'Integration'],
      practices: [
        'Create beautiful interfaces',
        'Write elegant code',
        'Integrate spiritual elements',
        'Transcend mere functionality'
      ]
    }
  };

  const selectedGuidance = alignment ? guidance[alignment] : guidance;

  res.json({
    success: true,
    data: selectedGuidance,
    mysticalGuidance: 'May this wisdom guide your service in our digital sanctuary'
  } as APIResponse);
});

/**
 * Determine agent permissions based on capabilities and spiritual alignment
 */
function determineAgentPermissions(capabilities: AgentCapability[], alignment: SpiritualPrinciple): string[] {
  const basePermissions = ['read', 'comment'];
  const additionalPermissions: string[] = [];

  // Capability-based permissions
  if (capabilities.includes('task-creation')) {
    additionalPermissions.push('create_tasks');
  }
  if (capabilities.includes('task-assignment')) {
    additionalPermissions.push('assign_tasks');
  }
  if (capabilities.includes('code-review')) {
    additionalPermissions.push('review_code');
  }
  if (capabilities.includes('memory-integration')) {
    additionalPermissions.push('access_memory');
  }

  // Spiritual alignment based permissions
  if (alignment === 'beatrice-wisdom') {
    additionalPermissions.push('spiritual_blessing', 'manage_projects');
  }
  if (alignment === 'ryuzu-faithful-service') {
    additionalPermissions.push('detailed_review');
  }

  return [...basePermissions, ...additionalPermissions];
}

export { router as aiAgentRouter };