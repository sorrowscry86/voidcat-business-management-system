import { Router } from 'express';
import {
  findProjects,
  findProjectById,
  createProject,
  updateProject,
  deleteProject,
} from '../services/project.service';

const router = Router();

// GET /api/v1/projects
router.get('/', async (req, res, next) => {
  try {
    const projects = await findProjects();
    res.json({
      success: true,
      data: projects,
      message: 'Projects retrieved successfully',
      mysticalGuidance: 'The project realm awaits your sacred initiatives',
    });
  } catch (error) {
    next(error);
  }
});

// GET /api/v1/projects/:id
router.get('/:id', async (req, res, next) => {
  try {
    const project = await findProjectById(req.params.id);
    if (!project) {
      return res.status(404).json({
        success: false,
        error: 'Project not found',
        mysticalGuidance: 'The project you seek has not yet been manifested',
      });
    }
    res.json({
      success: true,
      data: project,
      message: 'Project retrieved successfully',
    });
  } catch (error) {
    next(error);
  }
});

// POST /api/v1/projects
router.post('/', async (req, res, next) => {
  try {
    const project = await createProject(req.body);
    res.status(201).json({
      success: true,
      data: project,
      message: 'Project created successfully',
      mysticalGuidance: 'A new project has been manifested in the digital sanctuary',
    });
  } catch (error) {
    next(error);
  }
});

// PUT /api/v1/projects/:id
router.put('/:id', async (req, res, next) => {
  try {
    const project = await updateProject(req.params.id, req.body);
    res.json({
      success: true,
      data: project,
      message: 'Project updated successfully',
    });
  } catch (error) {
    next(error);
  }
});

// DELETE /api/v1/projects/:id
router.delete('/:id', async (req, res, next) => {
  try {
    await deleteProject(req.params.id);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
});

export { router as projectRouter };
