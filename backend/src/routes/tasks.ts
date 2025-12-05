import { Router, Request, Response } from 'express';
import { tasksRepo } from '../data/tasksRepo';

const router = Router();

// GET /api/tasks - List all tasks
router.get('/', (req: Request, res: Response) => {
  try {
    const tasks = tasksRepo.findAll();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch tasks' });
  }
});

// POST /api/tasks - Create a new task
router.post('/', (req: Request, res: Response) => {
  try {
    const { title, description } = req.body;

    if (!title || typeof title !== 'string' || title.trim().length === 0) {
      return res.status(400).json({ error: 'Title is required' });
    }

    // Validate description type if provided
    const descriptionValue = 
      description !== undefined && typeof description === 'string'
        ? description.trim()
        : '';

    const task = tasksRepo.create({
      title: title.trim(),
      description: descriptionValue,
    });

    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create task' });
  }
});

export default router;

