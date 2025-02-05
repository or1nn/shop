import { Router } from 'express';
import categoryController from '../controllers/categoryController';

const router = Router();

router.post('/create', categoryController.create);
router.get('/', categoryController.getAll);

export default router;
