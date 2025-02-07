import { NextFunction, Request, Response } from 'express';
import ApiError from '../error/ApiError';
import ReviewService from '../services/ReviewService';

class ReviewController {
  async delete(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    const userId = req.user.userId;
    try {
      await ReviewService.delete(userId, Number(id));
      res.status(200).json({ message: 'Отзыв удален' });
    } catch (e) {
      next(ApiError.internal((e as any).message));
    }
  }
  async create(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    const { rate, body } = req.body;
    const userId = req.user.userId;
    if (!rate || !body) {
      return next(ApiError.forbidden('Все поля обязательны'));
    }
    try {
      const item = await ReviewService.create(rate, body, userId, Number(id));
      res.status(200).json(item);
    } catch (e) {
      next(ApiError.internal((e as any).message));
    }
  }
}

export default new ReviewController();
