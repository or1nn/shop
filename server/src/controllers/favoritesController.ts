import { NextFunction, Request, Response } from 'express';
import ApiError from '../error/ApiError';
import FavoritesService from '../services/FavoritesService';

class FavoritesController {
  async addFavorite(req: Request, res: Response, next: NextFunction) {
    const userId = req.user.userId;
    const { deviceId } = req.body;
    if (!deviceId) {
      return next(ApiError.forbidden('Все поля обязательны'));
    }
    try {
      const like = await FavoritesService.addFavorite(userId, Number(deviceId));
      res.status(200).json(like);
    } catch (e) {
      next(ApiError.internal((e as any).message));
    }
  }
  async deleteFavorite(req: Request, res: Response, next: NextFunction) {
    const userId = req.user.userId as number;
    const { id } = req.params;
    try {
      const existingLike = await FavoritesService.deleteFavorite(
        userId,
        Number(id)
      );
      res.json(existingLike);
    } catch (e) {
      next(ApiError.internal((e as any).message));
    }
  }
}

export default new FavoritesController();
