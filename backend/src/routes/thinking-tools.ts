import { Router } from 'express';
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

// Outline Generation
router.post('/outline', authenticateUser, requirePermission(THINKING_TOOLS_PERMISSION), async (req, res) => {
  const { topic } = req.body;
  if (!topic) {
    return res.status(400).json({ error: 'Missing required field: topic' });
  }

  try {
    const prompt = getOutlinePrompt(topic);
    const result = await mcpService.callTool('create_plan', { text: prompt });
    const blessing = spiritualService.generateSpiritualBlessing(
      req.user?.spiritualAlignment as SpiritualPrinciple || 'cosmic-balance',
      req.user?.id || 'seeker'
    );
    const guidance = spiritualService.provideMysticalGuidance('success');
    res.json({ ...result, blessing, guidance });
  } catch (error) {
    logger.error('Error calling create_plan for outline:', error);
    res.status(500).json({ error: 'Failed to generate outline' });
  }
});

// Checklist Creation
router.post('/checklist', authenticateUser, requirePermission(THINKING_TOOLS_PERMISSION), async (req, res) => {
  const { tasks } = req.body;
  if (!tasks || !Array.isArray(tasks)) {
    return res.status(400).json({ error: 'Missing or invalid field: tasks' });
  }

  try {
    const prompt = getChecklistPrompt(tasks);
    const result = await mcpService.callTool('create_tasks', { text: prompt });
    const blessing = spiritualService.generateSpiritualBlessing(
      req.user?.spiritualAlignment as SpiritualPrinciple || 'cosmic-balance',
      req.user?.id || 'seeker'
    );
    const guidance = spiritualService.provideMysticalGuidance('success');
    res.json({ ...result, blessing, guidance });
  } catch (error) {
    logger.error('Error calling create_tasks for checklist:', error);
    res.status(500).json({ error: 'Failed to generate checklist' });
  }
});

// Content Refinement
router.post('/refine', authenticateUser, requirePermission(THINKING_TOOLS_PERMISSION), async (req, res) => {
  const { content } = req.body;
  if (!content) {
    return res.status(400).json({ error: 'Missing required field: content' });
  }

  try {
    const prompt = getRefinePrompt(content);
    const result = await mcpService.callTool('create_plan', { text: prompt });
    const blessing = spiritualService.generateSpiritualBlessing(
      req.user?.spiritualAlignment as SpiritualPrinciple || 'cosmic-balance',
      req.user?.id || 'seeker'
    );
    const guidance = spiritualService.provideMysticalGuidance('success');
    res.json({ ...result, blessing, guidance });
  } catch (error) {
    logger.error('Error calling create_plan for refine:', error);
    res.status(500).json({ error: 'Failed to refine content' });
  }
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

  try {
    const prompt = getPlanPrompt(idea);
    const result = await mcpService.callTool('create_plan', { text: prompt });
    const blessing = spiritualService.generateSpiritualBlessing(
      req.user?.spiritualAlignment as SpiritualPrinciple || 'cosmic-balance',
      req.user?.id || 'seeker'
    );
    const guidance = spiritualService.provideMysticalGuidance('success');
    res.json({ ...result, blessing, guidance });
  } catch (error) {
    logger.error('Error calling create_plan tool:', error);
    res.status(500).json({ error: 'Failed to generate project plan' });
  }
});

// Risk Analysis
router.post('/risk-analysis', authenticateUser, requirePermission(THINKING_TOOLS_PERMISSION), async (req, res) => {
  const { project } = req.body;
  if (!project) {
    return res.status(400).json({ error: 'Missing required field: project' });
  }

  try {
    const prompt = getRiskAnalysisPrompt(project);
    const result = await mcpService.callTool('create_plan', { text: prompt });
    const blessing = spiritualService.generateSpiritualBlessing(
      req.user?.spiritualAlignment as SpiritualPrinciple || 'cosmic-balance',
      req.user?.id || 'seeker'
    );
    const guidance = spiritualService.provideMysticalGuidance('success');
    res.json({ ...result, blessing, guidance });
  } catch (error) {
    logger.error('Error calling create_plan for risk analysis:', error);
    res.status(500).json({ error: 'Failed to generate risk analysis' });
  }
});

// Task Breakdown
router.post('/task-breakdown', authenticateUser, requirePermission(THINKING_TOOLS_PERMISSION), async (req, res) => {
  const { epic } = req.body;
  if (!epic) {
    return res.status(400).json({ error: 'Missing required field: epic' });
  }

  try {
    const prompt = getTaskBreakdownPrompt(epic);
    const result = await mcpService.callTool('create_tasks', { text: prompt });
    const blessing = spiritualService.generateSpiritualBlessing(
      req.user?.spiritualAlignment as SpiritualPrinciple || 'cosmic-balance',
      req.user?.id || 'seeker'
    );
    const guidance = spiritualService.provideMysticalGuidance('success');
    res.json({ ...result, blessing, guidance });
  } catch (error) {
    logger.error('Error calling create_tasks for task breakdown:', error);
    res.status(500).json({ error: 'Failed to break down epic' });
  }
});

export const thinkingToolsRouter = router;
