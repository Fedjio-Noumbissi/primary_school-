import { Router, Request, Response } from 'express';
import { protect } from '../middleware/authMiddleware';

const router = Router();

// GET /api/notifications?limit=10
// Retourne les notifications de l'utilisateur connecté
router.get('/', protect, (req: Request, res: Response) => {
  // Pour l'instant retourner une liste vide (pas de table Notification en DB)
  // Vous pouvez étendre ici avec une vraie table plus tard
  res.status(200).json({
    success: true,
    data: [],
    total: 0,
  });
});

// PATCH /api/notifications/read-all
// Marquer toutes les notifications comme lues
router.patch('/read-all', protect, (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: 'Toutes les notifications marquées comme lues',
  });
});

export default router;
