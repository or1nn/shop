import { NextFunction, Request, Response } from 'express';
import { prisma } from '../utils/prismaClient';
import ApiError from '../error/ApiError';

class FavoritesController {
  async addFavorite(req: Request, res: Response, next: NextFunction) {
    const userId = req.user.userId;
    const { deviceId } = req.body;
    if (!deviceId) {
      return next(ApiError.forbidden('Все поля обязательны'));
    }
    try {
      const existingLike = await prisma.favorite.findFirst({
        where: { userId, deviceId: Number(deviceId) },
      });
      if (existingLike) {
        return next(
          ApiError.badRequest('Вы уже добавляли этот товар в избранное')
        );
      }
      const like = await prisma.favorite.create({
        data: { userId, deviceId: Number(deviceId) },
        include: { device: true },
      });
      res.status(200).json(like);
    } catch (error) {
      next(ApiError.internal());
    }
  }
  async deleteFavorite(req: Request, res: Response, next: NextFunction) {
    const userId = req.user.userId as number;
    const { id } = req.params;
    try {
      const existingLike = await prisma.favorite.findFirst({
        where: { userId, deviceId: Number(id) },
        include: { device: true },
      });
      if (!existingLike) {
        return next(ApiError.badRequest('Товар не добавлен в избранное'));
      }
      await prisma.favorite.deleteMany({
        where: { deviceId: Number(id), userId },
      });
      res.json(existingLike);
    } catch (error) {
      next(ApiError.internal());
    }
  }
}

export default new FavoritesController();
