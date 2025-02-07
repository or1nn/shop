import { Router } from 'express';
import DeviceController from '../controllers/DeviceController';
import { uploadDeviceImage } from '../middlewares/uploadFileMiddleware';

const router = Router();

router.get('/', DeviceController.getAll);
router.get('/hits', DeviceController.getHits);
router.post(
  '/',
  uploadDeviceImage.single('deviceImage'),
  DeviceController.create
);
router.get('/:id', DeviceController.getById);

export default router;
