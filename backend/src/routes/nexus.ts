import { Router } from 'express';
import { pantryService } from '../services/pantry.service';
import { skillService } from '../services/skill.service';

const router = Router();

router.get('/spirits', async (req, res) => {
  try {
    const spirits = await pantryService.getActiveSpirits();
    res.json({ data: spirits });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/skills', async (req, res) => {
  try {
    const skills = await skillService.getSkills();
    res.json({ data: skills });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/sync', async (req, res) => {
  try {
    await Promise.all([
      pantryService.syncSpirits(),
      skillService.syncSkillsRegistry()
    ]);
    res.json({ message: 'VoidNexus synchronization initiated' });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
