import { Router } from 'express';
import ReviewController from '../controllers/ReviewController';
import authMiddleware from '../middlewares/authMiddleware';

const router = Router();

router.post('/:id', authMiddleware, ReviewController.create);
router.delete('/:id', authMiddleware, ReviewController.delete);
export default router;
