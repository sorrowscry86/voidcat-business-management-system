import { Router } from 'express';
import { knowledgeService } from '../services/knowledge.service';

const router = Router();

router.get('/search', async (req, res) => {
  const { q } = req.query;
  try {
    const results = await knowledgeService.searchInsights(q as string || '');
    res.json({ data: results });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/index', async (req, res) => {
  const { category } = req.body;
  try {
    // Categories: 03_Debug_Discoveries, 04_Architectural_Patterns, 05_Project_Chronicles
    await knowledgeService.indexLibrarySubdirectory(category || '05_Project_Chronicles');
    res.json({ message: `Indexing initiated for library: ${category}` });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
