import { Router } from 'express';
import BrandController from '../controllers/BrandController';

const router = Router();

router.post('/create', BrandController.create);
router.get('/', BrandController.getAll);

export default router;
