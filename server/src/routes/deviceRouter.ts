import { Router } from 'express';
import deviceController from '../controllers/deviceController';
import { uploadDeviceImage } from '../middlewares/uploadFileMiddleware';

const router = Router();

router.get('/', deviceController.getAll);
router.post('/create', uploadDeviceImage.single('deviceImage'), deviceController.create);
router.get('/:id', deviceController.getById);

export default router