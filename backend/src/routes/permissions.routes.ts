import { Router } from 'express';
import { getPermissions, updatePermission, deletePermission } from '../controllers/permissions.controller';
// import { protect, authorize } from '../middleware/auth'; // Si vous avez un middleware d'auth, on peut l'utiliser

const router = Router();

// Routes for handling permissions
router.route('/')
  .get(getPermissions)
  .post(updatePermission);

router.route('/:route/:role')
  .delete(deletePermission);

export default router;
