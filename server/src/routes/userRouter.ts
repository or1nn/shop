import { Router } from 'express';
import userController from '../controllers/userController';
import { validateRegistration } from '../middlewares/validation';
import errorValidationHandler from '../middlewares/errorValidationHandler';
import { uploadAvatar } from '../middlewares/uploadFileMiddleware';
import authMiddleware from '../middlewares/authMiddleware';

const router = Router();

router.post(
  '/registration',
  validateRegistration,
  errorValidationHandler,
  userController.register
);
router.post('/login', userController.login);
router.post('/newAvatar', authMiddleware, uploadAvatar.single('avatar'), userController.uploadAvatar);
router.post('/current', authMiddleware, userController.current);

export default router;
