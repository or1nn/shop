import { Router } from 'express';
import userController from '../controllers/userController';
import { validateRegistration } from '../middlewares/validation';
import errorValidationHandler from '../middlewares/errorValidationHandler';
import authMiddleware from '../middlewares/authMiddleware';
import { uploadAvatar } from '../middlewares/uploadFileMiddleware';

const router = Router();

router.post(
  '/register',
  validateRegistration,
  errorValidationHandler,
  userController.register
);
router.post('/login', userController.login);
router.get('/current', authMiddleware, userController.current);
router.put(
  '/:id',
  authMiddleware,
  uploadAvatar.single('avatar'),
  userController.updateUser
);

export default router;
