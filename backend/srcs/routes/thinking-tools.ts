import { Router, Request, Response } from 'express';
import { authenticateUser, requirePermission } from '../middleware/auth';
import { mcpService } from '../services/mcp';
import {
  getPlanPrompt,
  getOutlinePrompt,
  getChecklistPrompt,
  getRefinePrompt,
  getRiskAnalysisPrompt,
  getTaskBreakdownPrompt,
} from '../services/mcp-prompts';
import { logger } from '../services/logger';
import { VoidCatSpiritualService } from '../services/spiritual';
import { SpiritualPrinciple } from '../types';

const router = Router();
const spiritualService = new VoidCatSpiritualService();

const THINKING_TOOLS_PERMISSION = 'thinking-tools';

// Helper function to handle tool calls
const handleToolCall = async (
  req: Request,
  res: Response,
  toolName: string,
  prompt: string
) => {
  try {
    const result = await mcpService.callTool(toolName, { text: prompt });
    const blessing = spiritualService.generateSpiritualBlessing(
      req.user?.spiritualAlignment as SpiritualPrinciple || 'cosmic-balance',
      req.user?.id || 'seeker'
    );
    const guidance = spiritualService.provideMysticalGuidance('success');
    res.json({ ...result, blessing, guidance });
  } catch (error) {
    logger.error(`Error calling ${toolName}:`, error);
    res.status(500).json({ error: `Failed to execute ${toolName}` });
  }
};

// Outline Generation
router.post('/outline', authenticateUser, requirePermission(THINKING_TOOLS_PERMISSION), async (req, res) => {
  const { topic } = req.body;
  if (!topic) {
    return res.status(400).json({ error: 'Missing required field: topic' });
  }
  await handleToolCall(req, res, 'create_plan', getOutlinePrompt(topic));
});

// Checklist Creation
router.post('/checklist', authenticateUser, requirePermission(THINKING_TOOLS_PERMISSION), async (req, res) => {
  const { tasks } = req.body;
  if (!tasks || !Array.isArray(tasks)) {
    return res.status(400).json({ error: 'Missing or invalid field: tasks' });
  }
  await handleToolCall(req, res, 'create_tasks', getChecklistPrompt(tasks));
});

// Content Refinement
router.post('/refine', authenticateUser, requirePermission(THINKING_TOOLS_PERMISSION), async (req, res) => {
  const { content } = req.body;
  if (!content) {
    return res.status(400).json({ error: 'Missing required field: content' });
  }
  await handleToolCall(req, res, 'create_plan', getRefinePrompt(content));
});

// Engineering Project Planning
router.post('/plan', authenticateUser, requirePermission(THINKING_TOOLS_PERMISSION), async (req, res) => {
  const { project, objectives, constraints } = req.body;
  if (!project || !objectives || !constraints) {
    return res.status(400).json({
      error: 'Missing required fields: project, objectives, constraints',
    });
  }
  const idea = `Project: ${project}\nObjectives: ${objectives.join(', ')}\nConstraints: ${constraints.join(', ')}`;
  await handleToolCall(req, res, 'create_plan', getPlanPrompt(idea));
});

// Risk Analysis
router.post('/risk-analysis', authenticateUser, requirePermission(THINKING_TOOLS_PERMISSION), async (req, res) => {
  const { project } = req.body;
  if (!project) {
    return res.status(400).json({ error: 'Missing required field: project' });
  }
  await handleToolCall(req, res, 'create_plan', getRiskAnalysisPrompt(project));
});

// Task Breakdown
router.post('/task-breakdown', authenticateUser, requirePermission(THINKING_TOOLS_PERMISSION), async (req, res) => {
  const { epic } = req.body;
  if (!epic) {
    return res.status(400).json({ error: 'Missing required field: epic' });
  }
  await handleToolCall(req, res, 'create_tasks', getTaskBreakdownPrompt(epic));
});

export const thinkingToolsRouter = router;
