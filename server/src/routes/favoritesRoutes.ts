import { Router } from 'express';
import FavoritesController from '../controllers/FavoritesController';
import authMiddleware from '../middlewares/authMiddleware';

const router = Router();

router.post('/', authMiddleware, FavoritesController.addFavorite);
router.delete('/:id', authMiddleware, FavoritesController.deleteFavorite);

export default router;
