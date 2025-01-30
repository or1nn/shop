import { Router } from 'express';
import brandController from '../controllers/brandController';

const router = Router();

router.post('/create', brandController.create);
router.get('/', brandController.getAll);

export default router;
