import { Router } from 'express';
import favoritesController from '../controllers/favoritesController';
import authMiddleware from '../middlewares/authMiddleware';

const router = Router();

router.post('/', authMiddleware, favoritesController.addFavorite);
router.delete('/:id', authMiddleware, favoritesController.deleteFavorite);

export default router;
