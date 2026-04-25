import { Router } from 'express';
import { getEleves, getEleveById, createEleve, updateEleve, deleteEleve } from '../controllers/eleve.controller';
import { protect } from '../middleware/authMiddleware';

const router = Router();

// Apply auth middleware to all routes
router.use(protect);

router.get('/', getEleves);
router.get('/:id', getEleveById);
router.post('/', createEleve);
router.put('/:id', updateEleve);
router.delete('/:id', deleteEleve);

export default router;
