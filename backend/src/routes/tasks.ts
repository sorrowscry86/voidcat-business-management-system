import { Router } from 'express';
import {
  findTasksByProjectId,
  findTaskById,
  createTask,
  updateTask,
  deleteTask,
} from '../services/task.service';

const router = Router();

// GET /api/v1/tasks/project/:projectId
router.get('/project/:projectId', async (req, res, next) => {
  try {
    const tasks = await findTasksByProjectId(req.params.projectId);
    res.json({
      success: true,
      data: tasks,
      message: 'Tasks retrieved successfully',
      mysticalGuidance: 'The task realm stands ready for AI-Human collaboration',
    });
  } catch (error) {
    next(error);
  }
});

// GET /api/v1/tasks/:id
router.get('/:id', async (req, res, next) => {
  try {
    const task = await findTaskById(req.params.id);
    if (!task) {
      return res.status(404).json({
        success: false,
        error: 'Task not found',
        mysticalGuidance: 'The task you seek is not present in the sacred workflow',
      });
    }
    res.json({
      success: true,
      data: task,
      message: 'Task retrieved successfully',
    });
  } catch (error) {
    next(error);
  }
});

// POST /api/v1/tasks
router.post('/', async (req, res, next) => {
  try {
    const task = await createTask(req.body);
    res.status(201).json({
      success: true,
      data: task,
      message: 'Task created successfully',
      mysticalGuidance: 'A new task has been manifested for collaborative effort',
    });
  } catch (error) {
    next(error);
  }
});

// PUT /api/v1/tasks/:id
router.put('/:id', async (req, res, next) => {
  try {
    const task = await updateTask(req.params.id, req.body);
    res.json({
      success: true,
      data: task,
      message: 'Task updated successfully',
    });
  } catch (error) {
    next(error);
  }
});

// DELETE /api/v1/tasks/:id
router.delete('/:id', async (req, res, next) => {
  try {
    await deleteTask(req.params.id);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
});

export { router as taskRouter };
