import { Router } from 'express';
import reviewController from '../controllers/reviewController';
import authMiddleware from '../middlewares/authMiddleware';

const router = Router();

router.get('/:id', reviewController.getReviewByDeviceId);
router.post('/:id', authMiddleware, reviewController.create);
export default router;
