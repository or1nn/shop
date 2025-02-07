import { Router } from 'express';
import UserController from '../controllers/UserController';
import { validateRegistration } from '../middlewares/validation';
import errorValidationHandler from '../middlewares/errorValidationHandler';
import authMiddleware from '../middlewares/authMiddleware';
import { uploadAvatar } from '../middlewares/uploadFileMiddleware';

const router = Router();

router.post(
  '/register',
  validateRegistration,
  errorValidationHandler,
  UserController.register
);
router.post('/login', UserController.login);
router.get('/current', authMiddleware, UserController.current);
router.put(
  '/:id',
  authMiddleware,
  uploadAvatar.single('avatar'),
  UserController.updateUser
);

export default router;
