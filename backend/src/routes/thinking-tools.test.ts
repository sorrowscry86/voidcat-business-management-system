import request from 'supertest';
import { app, server } from '../../src/server';
import { mcpService } from '../../src/services/mcp';
import { Request, Response, NextFunction } from 'express';

// Mock the auth middleware
jest.mock('../../src/middleware/auth', () => ({
  authenticateUser: (req: Request, res: Response, next: NextFunction) => {
    req.user = { id: 'test-user', type: 'human', permissions: ['thinking-tools'] };
    next();
  },
  requirePermission: (permission: string) => (req: Request, res: Response, next: NextFunction) => {
    if (req.user && req.user.permissions && req.user.permissions.includes(permission)) {
      next();
    } else {
      res.status(403).json({ error: 'Forbidden' });
    }
  },
}));

describe('Thinking Tools API', () => {
  let callToolSpy: jest.SpyInstance;

  beforeEach(() => {
    callToolSpy = jest.spyOn(mcpService, 'callTool').mockResolvedValue({ result: { content: [{ type: 'text', text: 'Mocked MCP Response' }] } });
  });

  afterEach(() => {
    callToolSpy.mockRestore();
  });

  afterAll((done) => {
    server.close(done);
  });

  // Test suite for POST /api/v1/thinking-tools/plan
  describe('POST /api/v1/thinking-tools/plan', () => {
    it('should return a 200 with the plan from the MCP service', async () => {
      const response = await request(app)
        .post('/api/v1/thinking-tools/plan')
        .send({
          project: 'Test Project',
          objectives: ['Objective 1'],
          constraints: ['Constraint 1'],
        });
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('result');
    });
  });

  // Test suite for POST /api/v1/thinking-tools/outline
  describe('POST /api/v1/thinking-tools/outline', () => {
    it('should return a 200 with the outline from the MCP service', async () => {
      const response = await request(app)
        .post('/api/v1/thinking-tools/outline')
        .send({ topic: 'Test Topic' });
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('result');
    });
  });

  // Test suite for POST /api/v1/thinking-tools/checklist
  describe('POST /api/v1/thinking-tools/checklist', () => {
    it('should return a 200 with the checklist from the MCP service', async () => {
      const response = await request(app)
        .post('/api/v1/thinking-tools/checklist')
        .send({ tasks: ['Task 1', 'Task 2'] });
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('result');
    });
  });

  // Test suite for POST /api/v1/thinking-tools/refine
  describe('POST /api/v1/thinking-tools/refine', () => {
    it('should return a 200 with the refined content from the MCP service', async () => {
      const response = await request(app)
        .post('/api/v1/thinking-tools/refine')
        .send({ content: 'This is the content to refine.' });
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('result');
    });
  });

  // Test suite for POST /api/v1/thinking-tools/risk-analysis
  describe('POST /api/v1/thinking-tools/risk-analysis', () => {
    it('should return a 200 with the risk analysis from the MCP service', async () => {
      const response = await request(app)
        .post('/api/v1/thinking-tools/risk-analysis')
        .send({ project: 'Test Project' });
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('result');
    });
  });

  // Test suite for POST /api/v1/thinking-tools/task-breakdown
  describe('POST /api/v1/thinking-tools/task-breakdown', () => {
    it('should return a 200 with the task breakdown from the MCP service', async () => {
      const response = await request(app)
        .post('/api/v1/thinking-tools/task-breakdown')
        .send({ epic: 'Test Epic' });
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('result');
    });
  });
});
