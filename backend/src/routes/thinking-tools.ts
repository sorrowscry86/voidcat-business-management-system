import { Router } from 'express';
import { z } from 'zod';
import { 
  VoidCatThinkingToolsService,
  ThinkingToolRequest,
  OutlineRequest,
  ChecklistRequest,
  RefineRequest,
  PlanRequest,
  RiskAnalysisRequest,
  TaskBreakdownRequest
} from '../services/thinking-tools';
import { logger, spiritualLogger } from '../services/logger';
import { APIResponse, SpiritualPrinciple, AgentCapability } from '../types';

const router = Router();
const thinkingToolsService = new VoidCatThinkingToolsService();

// Validation schemas
const baseThinkingToolSchema = z.object({
  domain: z.enum(['document', 'engineering']),
  spiritualAlignment: z.enum([
    'ryuzu-faithful-service',
    'beatrice-wisdom',
    'cosmic-balance',
    'mystical-technology'
  ]).optional()
});

const outlineRequestSchema = z.object({
  topic: z.string().min(1, 'Topic is required'),
  depth: z.number().min(1).max(6).optional(),
  format: z.enum(['hierarchical', 'sequential', 'mind-map']).optional()
}).merge(baseThinkingToolSchema);

const checklistRequestSchema = z.object({
  task: z.string().min(1, 'Task description is required'),
  context: z.string().optional(),
  priority: z.enum(['low', 'medium', 'high', 'critical']).optional()
}).merge(baseThinkingToolSchema);

const refineRequestSchema = z.object({
  content: z.string().min(10, 'Content must be at least 10 characters'),
  refinementType: z.enum(['clarity', 'structure', 'completeness', 'accuracy']),
  targetAudience: z.string().optional()
}).merge(baseThinkingToolSchema);

const planRequestSchema = z.object({
  project: z.string().min(1, 'Project name is required'),
  objectives: z.array(z.string()).min(1, 'At least one objective is required'),
  constraints: z.array(z.string()).optional(),
  timeline: z.string().optional()
}).merge(baseThinkingToolSchema);

const riskAnalysisRequestSchema = z.object({
  project: z.string().min(1, 'Project name is required'),
  scope: z.string().min(1, 'Project scope is required'),
  stakeholders: z.array(z.string()).optional()
}).merge(baseThinkingToolSchema);

const taskBreakdownRequestSchema = z.object({
  epic: z.string().min(1, 'Epic description is required'),
  requirements: z.array(z.string()).min(1, 'At least one requirement is required'),
  estimationUnit: z.enum(['hours', 'days', 'points']).optional()
}).merge(baseThinkingToolSchema);

/**
 * POST /api/v1/thinking-tools/outline
 * Generate an outline for documents or engineering specs
 */
router.post('/outline', async (req, res) => {
  try {
    spiritualLogger.mysticalEvent('Outline tool requested', {
      userId: req.user?.id,
      userType: req.user?.type,
      spiritualAlignment: req.user?.spiritualAlignment
    });

    // Validate request
    const validation = outlineRequestSchema.safeParse(req.body);
    if (!validation.success) {
      return res.status(400).json({
        success: false,
        error: 'Invalid outline request',
        details: validation.error.issues,
        mysticalGuidance: 'The outline spirits require clearer parameters for manifestation'
      } as APIResponse);
    }

    const { topic, depth, format, domain, spiritualAlignment } = validation.data;

    // Create thinking tool context
    const context: ThinkingToolRequest = {
      type: 'outline',
      context: `Generate outline for: ${topic}`,
      domain,
      spiritualAlignment: spiritualAlignment || req.user?.spiritualAlignment,
      userId: req.user?.id || 'anonymous',
      userType: req.user?.type || 'human'
    };

    // Generate outline
    const result = await thinkingToolsService.generateOutline(
      { topic, depth, format } as OutlineRequest,
      context
    );

    res.json({
      success: result.success,
      data: result.result,
      error: result.error,
      mysticalGuidance: result.mysticalGuidance,
      toolType: 'outline',
      domain
    } as APIResponse);

  } catch (error) {
    logger.error('Outline generation failed', { error, userId: req.user?.id });
    res.status(500).json({
      success: false,
      error: 'Internal server error during outline generation',
      mysticalGuidance: 'The outline realm experienced unexpected turbulence'
    } as APIResponse);
  }
});

/**
 * POST /api/v1/thinking-tools/checklist
 * Generate a checklist for tasks or processes
 */
router.post('/checklist', async (req, res) => {
  try {
    spiritualLogger.mysticalEvent('Checklist tool requested', {
      userId: req.user?.id,
      userType: req.user?.type,
      spiritualAlignment: req.user?.spiritualAlignment
    });

    // Validate request
    const validation = checklistRequestSchema.safeParse(req.body);
    if (!validation.success) {
      return res.status(400).json({
        success: false,
        error: 'Invalid checklist request',
        details: validation.error.issues,
        mysticalGuidance: 'The checklist realm requires more structured intention'
      } as APIResponse);
    }

    const { task, context: taskContext, priority, domain, spiritualAlignment } = validation.data;

    // Create thinking tool context
    const context: ThinkingToolRequest = {
      type: 'checklist',
      context: `Generate checklist for: ${task}`,
      domain,
      spiritualAlignment: spiritualAlignment || req.user?.spiritualAlignment,
      userId: req.user?.id || 'anonymous',
      userType: req.user?.type || 'human'
    };

    // Generate checklist
    const result = await thinkingToolsService.generateChecklist(
      { task, context: taskContext, priority } as ChecklistRequest,
      context
    );

    res.json({
      success: result.success,
      data: result.result,
      error: result.error,
      mysticalGuidance: result.mysticalGuidance,
      toolType: 'checklist',
      domain
    } as APIResponse);

  } catch (error) {
    logger.error('Checklist generation failed', { error, userId: req.user?.id });
    res.status(500).json({
      success: false,
      error: 'Internal server error during checklist generation',
      mysticalGuidance: 'The checklist spirits encountered unexpected obstacles'
    } as APIResponse);
  }
});

/**
 * POST /api/v1/thinking-tools/refine
 * Refine content for clarity, structure, or completeness
 */
router.post('/refine', async (req, res) => {
  try {
    spiritualLogger.mysticalEvent('Content refinement tool requested', {
      userId: req.user?.id,
      userType: req.user?.type,
      spiritualAlignment: req.user?.spiritualAlignment
    });

    // Validate request
    const validation = refineRequestSchema.safeParse(req.body);
    if (!validation.success) {
      return res.status(400).json({
        success: false,
        error: 'Invalid refinement request',
        details: validation.error.issues,
        mysticalGuidance: 'The refinement spirits require clearer content and purpose'
      } as APIResponse);
    }

    const { content, refinementType, targetAudience, domain, spiritualAlignment } = validation.data;

    // Create thinking tool context
    const context: ThinkingToolRequest = {
      type: 'refine',
      context: `Refine content for ${refinementType}`,
      domain,
      spiritualAlignment: spiritualAlignment || req.user?.spiritualAlignment,
      userId: req.user?.id || 'anonymous',
      userType: req.user?.type || 'human'
    };

    // Refine content
    const result = await thinkingToolsService.refineContent(
      { content, refinementType, targetAudience } as RefineRequest,
      context
    );

    res.json({
      success: result.success,
      data: result.result,
      error: result.error,
      mysticalGuidance: result.mysticalGuidance,
      toolType: 'refine',
      domain
    } as APIResponse);

  } catch (error) {
    logger.error('Content refinement failed', { error, userId: req.user?.id });
    res.status(500).json({
      success: false,
      error: 'Internal server error during content refinement',
      mysticalGuidance: 'The refinement realm experienced unexpected disturbances'
    } as APIResponse);
  }
});

/**
 * POST /api/v1/thinking-tools/plan
 * Generate project plan with phases and milestones
 */
router.post('/plan', async (req, res) => {
  try {
    spiritualLogger.mysticalEvent('Project planning tool requested', {
      userId: req.user?.id,
      userType: req.user?.type,
      spiritualAlignment: req.user?.spiritualAlignment
    });

    // Validate request
    const validation = planRequestSchema.safeParse(req.body);
    if (!validation.success) {
      return res.status(400).json({
        success: false,
        error: 'Invalid planning request',
        details: validation.error.issues,
        mysticalGuidance: 'The planning realm requires complete project vision and objectives'
      } as APIResponse);
    }

    const { project, objectives, constraints, timeline, domain, spiritualAlignment } = validation.data;

    // Create thinking tool context
    const context: ThinkingToolRequest = {
      type: 'plan',
      context: `Generate plan for project: ${project}`,
      domain,
      spiritualAlignment: spiritualAlignment || req.user?.spiritualAlignment,
      userId: req.user?.id || 'anonymous',
      userType: req.user?.type || 'human'
    };

    // Generate plan
    const result = await thinkingToolsService.generatePlan(
      { project, objectives, constraints, timeline } as PlanRequest,
      context
    );

    res.json({
      success: result.success,
      data: result.result,
      error: result.error,
      mysticalGuidance: result.mysticalGuidance,
      toolType: 'plan',
      domain
    } as APIResponse);

  } catch (error) {
    logger.error('Project planning failed', { error, userId: req.user?.id });
    res.status(500).json({
      success: false,
      error: 'Internal server error during project planning',
      mysticalGuidance: 'The planning spirits encountered unexpected complexity'
    } as APIResponse);
  }
});

/**
 * POST /api/v1/thinking-tools/risk-analysis
 * Analyze project risks and mitigation strategies
 */
router.post('/risk-analysis', async (req, res) => {
  try {
    spiritualLogger.mysticalEvent('Risk analysis tool requested', {
      userId: req.user?.id,
      userType: req.user?.type,
      spiritualAlignment: req.user?.spiritualAlignment
    });

    // Validate request
    const validation = riskAnalysisRequestSchema.safeParse(req.body);
    if (!validation.success) {
      return res.status(400).json({
        success: false,
        error: 'Invalid risk analysis request',
        details: validation.error.issues,
        mysticalGuidance: 'The risk spirits require complete project understanding for proper analysis'
      } as APIResponse);
    }

    const { project, scope, stakeholders, domain, spiritualAlignment } = validation.data;

    // Create thinking tool context
    const context: ThinkingToolRequest = {
      type: 'risk-analysis',
      context: `Analyze risks for project: ${project}`,
      domain,
      spiritualAlignment: spiritualAlignment || req.user?.spiritualAlignment,
      userId: req.user?.id || 'anonymous',
      userType: req.user?.type || 'human'
    };

    // Perform risk analysis
    const result = await thinkingToolsService.analyzeRisks(
      { project, scope, stakeholders } as RiskAnalysisRequest,
      context
    );

    res.json({
      success: result.success,
      data: result.result,
      error: result.error,
      mysticalGuidance: result.mysticalGuidance,
      toolType: 'risk-analysis',
      domain
    } as APIResponse);

  } catch (error) {
    logger.error('Risk analysis failed', { error, userId: req.user?.id });
    res.status(500).json({
      success: false,
      error: 'Internal server error during risk analysis',
      mysticalGuidance: 'The risk realm experienced unforeseen complications'
    } as APIResponse);
  }
});

/**
 * POST /api/v1/thinking-tools/task-breakdown
 * Break down epics into manageable tasks
 */
router.post('/task-breakdown', async (req, res) => {
  try {
    spiritualLogger.mysticalEvent('Task breakdown tool requested', {
      userId: req.user?.id,
      userType: req.user?.type,
      spiritualAlignment: req.user?.spiritualAlignment
    });

    // Validate request
    const validation = taskBreakdownRequestSchema.safeParse(req.body);
    if (!validation.success) {
      return res.status(400).json({
        success: false,
        error: 'Invalid task breakdown request',
        details: validation.error.issues,
        mysticalGuidance: 'The task spirits require clear epic description and requirements'
      } as APIResponse);
    }

    const { epic, requirements, estimationUnit, domain, spiritualAlignment } = validation.data;

    // Create thinking tool context
    const context: ThinkingToolRequest = {
      type: 'task-breakdown',
      context: `Break down epic: ${epic}`,
      domain,
      spiritualAlignment: spiritualAlignment || req.user?.spiritualAlignment,
      userId: req.user?.id || 'anonymous',
      userType: req.user?.type || 'human'
    };

    // Perform task breakdown
    const result = await thinkingToolsService.breakdownTasks(
      { epic, requirements, estimationUnit } as TaskBreakdownRequest,
      context
    );

    res.json({
      success: result.success,
      data: result.result,
      error: result.error,
      mysticalGuidance: result.mysticalGuidance,
      toolType: 'task-breakdown',
      domain
    } as APIResponse);

  } catch (error) {
    logger.error('Task breakdown failed', { error, userId: req.user?.id });
    res.status(500).json({
      success: false,
      error: 'Internal server error during task breakdown',
      mysticalGuidance: 'The task realm encountered unexpected decomposition challenges'
    } as APIResponse);
  }
});

/**
 * GET /api/v1/thinking-tools/templates
 * Get available workflow templates and examples
 */
router.get('/templates', async (req, res) => {
  try {
    const domain = req.query.domain as string;
    
    spiritualLogger.mysticalEvent('Thinking tools templates requested', {
      domain,
      userId: req.user?.id,
      userType: req.user?.type
    });

    const templates = {
      document: {
        outline: {
          name: "Document Outline Template",
          description: "Structured template for creating document outlines",
          example: {
            topic: "VoidCat BMS User Guide",
            depth: 3,
            format: "hierarchical",
            domain: "document"
          }
        },
        checklist: {
          name: "Document Checklist Template", 
          description: "Comprehensive checklist for document creation process",
          example: {
            task: "Create technical documentation",
            context: "API documentation for new features",
            priority: "high",
            domain: "document"
          }
        },
        refine: {
          name: "Content Refinement Template",
          description: "Template for refining document content",
          example: {
            content: "Your document content here...",
            refinementType: "clarity",
            targetAudience: "technical users",
            domain: "document"
          }
        }
      },
      engineering: {
        outline: {
          name: "Engineering Specification Template",
          description: "Template for technical specifications and ADRs",
          example: {
            topic: "Microservices Architecture Design",
            depth: 4,
            format: "hierarchical",
            domain: "engineering"
          }
        },
        plan: {
          name: "Project Plan Template",
          description: "Structured template for engineering project planning",
          example: {
            project: "VoidCat BMS Mobile App",
            objectives: [
              "Create native mobile application",
              "Implement core BMS features",
              "Ensure offline capability"
            ],
            constraints: ["3-month timeline", "Small team", "Limited budget"],
            timeline: "Q2 2026",
            domain: "engineering"
          }
        },
        "risk-analysis": {
          name: "Risk Analysis Template",
          description: "Template for identifying and analyzing project risks",
          example: {
            project: "VoidCat BMS Cloud Migration",
            scope: "Migrate entire BMS infrastructure to cloud",
            stakeholders: ["Engineering Team", "Operations", "Security"],
            domain: "engineering"
          }
        },
        "task-breakdown": {
          name: "Task Breakdown Template",
          description: "Template for breaking down epics into tasks",
          example: {
            epic: "Implement AI agent collaboration features",
            requirements: [
              "Real-time communication",
              "Task assignment to AI agents",
              "Hybrid commenting system"
            ],
            estimationUnit: "hours",
            domain: "engineering"
          }
        }
      },
      spiritual: {
        alignmentGuidance: {
          "beatrice-wisdom": "Focus on strategic thinking and long-term architectural vision",
          "ryuzu-faithful-service": "Emphasize detailed execution and methodical approaches", 
          "cosmic-balance": "Balance different perspectives and find harmony in solutions",
          "mystical-technology": "Blend analytical precision with creative insight"
        },
        blessings: {
          outline: "✨ May your thoughts be structured with clarity and purpose ✨",
          checklist: "📋 May your tasks be organized with faithful attention to detail 📋",
          refine: "🔧 May your content be polished with wisdom and precision 🔧",
          plan: "📋 May your project be guided by strategic vision and careful planning 📋",
          "risk-analysis": "⚠️ May potential challenges be illuminated with foresight ⚠️",
          "task-breakdown": "⚡ May complex work be organized with methodical clarity ⚡"
        }
      }
    };

    const responseData = domain && templates[domain as keyof typeof templates] ? templates[domain as keyof typeof templates] : templates;

    res.json({
      success: true,
      data: responseData,
      mysticalGuidance: 'These templates shall guide your thinking tools journey with sacred wisdom'
    } as APIResponse);

  } catch (error) {
    logger.error('Templates retrieval failed', { error });
    res.status(500).json({
      success: false,
      error: 'Failed to retrieve templates',
      mysticalGuidance: 'The template realm experienced unexpected disturbances'
    } as APIResponse);
  }
});

/**
 * GET /api/v1/thinking-tools/capabilities
 * Get thinking tools capabilities and spiritual alignments
 */
router.get('/capabilities', async (req, res) => {
  try {
    const capabilities = {
      tools: [
        {
          name: 'outline',
          description: 'Generate structured outlines for documents and technical specifications',
          domains: ['document', 'engineering'],
          spiritualAlignments: ['beatrice-wisdom', 'ryuzu-faithful-service', 'cosmic-balance', 'mystical-technology']
        },
        {
          name: 'checklist',
          description: 'Create comprehensive checklists for tasks and processes',
          domains: ['document', 'engineering'], 
          spiritualAlignments: ['ryuzu-faithful-service', 'beatrice-wisdom', 'cosmic-balance']
        },
        {
          name: 'refine',
          description: 'Refine content for clarity, structure, completeness, or accuracy',
          domains: ['document', 'engineering'],
          spiritualAlignments: ['mystical-technology', 'beatrice-wisdom', 'cosmic-balance']
        },
        {
          name: 'plan',
          description: 'Generate comprehensive project plans with phases and milestones',
          domains: ['engineering'],
          spiritualAlignments: ['beatrice-wisdom', 'cosmic-balance']
        },
        {
          name: 'risk-analysis', 
          description: 'Analyze project risks and develop mitigation strategies',
          domains: ['engineering'],
          spiritualAlignments: ['beatrice-wisdom', 'ryuzu-faithful-service']
        },
        {
          name: 'task-breakdown',
          description: 'Break down epics and complex work into manageable tasks',
          domains: ['engineering'],
          spiritualAlignments: ['ryuzu-faithful-service', 'cosmic-balance']
        }
      ],
      domains: [
        {
          name: 'document',
          description: 'Document drafting and content creation workflows',
          tools: ['outline', 'checklist', 'refine']
        },
        {
          name: 'engineering', 
          description: 'Software engineering and technical planning workflows',
          tools: ['outline', 'checklist', 'refine', 'plan', 'risk-analysis', 'task-breakdown']
        }
      ],
      spiritualAlignments: [
        {
          name: 'beatrice-wisdom',
          description: 'Strategic guidance and long-term vision',
          suitableFor: ['planning', 'risk-analysis', 'architectural thinking']
        },
        {
          name: 'ryuzu-faithful-service', 
          description: 'Detail-oriented and methodical execution',
          suitableFor: ['checklists', 'task-breakdown', 'systematic processes']
        },
        {
          name: 'cosmic-balance',
          description: 'Harmony between different perspectives and approaches',
          suitableFor: ['refinement', 'balanced planning', 'holistic thinking']
        },
        {
          name: 'mystical-technology',
          description: 'Blend of analytical precision with creative insight',
          suitableFor: ['content refinement', 'innovative planning', 'aesthetic organization']
        }
      ]
    };

    res.json({
      success: true,
      data: capabilities,
      mysticalGuidance: 'Choose your thinking tools wisely, aligned with your spiritual path and project needs'
    } as APIResponse);

  } catch (error) {
    logger.error('Capabilities retrieval failed', { error });
    res.status(500).json({
      success: false,
      error: 'Failed to retrieve capabilities',
      mysticalGuidance: 'The capability realm experienced unexpected disturbances'
    } as APIResponse);
  }
});

export { router as thinkingToolsRouter };