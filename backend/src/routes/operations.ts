import { Router } from 'express';
import { operationService } from '../services/operation.service';

const router = Router();

router.get('/', async (req, res) => {
  try {
    const events = await operationService.getRecentEvents();
    res.json({ data: events });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/sync', async (req, res) => {
  try {
    await operationService.syncCmcEvents();
    res.json({ message: 'CMC synchronization initiated' });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
