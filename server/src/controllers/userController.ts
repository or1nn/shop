import { NextFunction, Request, Response } from 'express';
import ApiError from '../error/ApiError';
import UserService from '../services/UserService';

class UserController {
  async register(req: Request, res: Response, next: NextFunction) {
    const { email, name, surname, password } = req.body;
    if (!email || !name || !surname || !password) {
      next(ApiError.badRequest('Все поля обязательны'));
    }
    try {
      const user = await UserService.register(name, surname, email, password);
      res.status(200).json(user);
    } catch (e) {
      next(ApiError.internal((e as any).message));
    }
  }
  async login(req: Request, res: Response, next: NextFunction) {
    const { email, password } = req.body;
    if (!email || !password) {
      return next(ApiError.badRequest('Все поля обязательны'));
    }
    try {
      const token = await UserService.login(email, password);
      res.status(200).json({ token });
    } catch (e) {
      next(ApiError.internal((e as any).message));
    }
  }
  async current(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await UserService.current(req.user.userId);
      res.status(200).json(user);
    } catch (e) {
      next(ApiError.internal((e as any).message));
    }
  }
  async updateUser(req: Request, res: Response, next: NextFunction) {
    const userId = req.user.userId;
    const { email, name, surname } = req.body;
    const { id } = req.params;
    let filePath;
    if (req.file && req.file.filename) {
      filePath = req.file.filename;
    }
    if (userId !== Number(id)) {
      return next(ApiError.forbidden('Нет доступа'));
    }
    try {
      const user = await UserService.updateUser(
        userId,
        name,
        surname,
        email,
        filePath
      );
      res.json(user);
    } catch (e) {
      next(ApiError.internal((e as any).message));
    }
  }
}

export default new UserController();
