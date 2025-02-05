import { NextFunction, Request, Response } from 'express';
import { prisma } from '../utils/prismaClient';
import ApiError from '../error/ApiError';

class ReviewController {
  async getReviewByDeviceId(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const items = await prisma.review.findMany({
        where: { deviceId: Number(id) },
      });
      res.status(200).json(items);
    } catch (error) {
      next(ApiError.internal());
    }
  }
  async delete(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    const userId = req.user.userId;
    try {
      const existingReview = await prisma.review.findFirst({
        where: { userId, deviceId: Number(id) },
      });
      if (!existingReview) {
        return next(
          ApiError.badRequest('Вы не оставляли отзыв об этом товаре')
        );
      }
      await prisma.review.deleteMany({
        where: { userId, deviceId: Number(id) },
      });
      res.status(200).json({ message: 'Отзыв удален' });
    } catch (error) {
      next(ApiError.internal());
    }
  }
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const { rate, body } = req.body;
      const userId = req.user.userId;
      if (!rate || !body) {
        return next(ApiError.forbidden('Все поля обязательны'));
      }
      const candidate = await prisma.review.findFirst({
        where: {
          userId: Number(userId),
          deviceId: Number(id),
        },
      });
      if (candidate) {
        return next(
          ApiError.badRequest('Вы уже оставляли отзыв об этом товаре')
        );
      }
      const item = await prisma.review.create({
        data: {
          rate: Number(rate),
          body,
          device: {
            connect: { id: Number(id) },
          },
          user: {
            connect: {
              id: Number(userId),
            },
          },
        },
      });
      res.status(200).json(item);
    } catch (error) {
      next(ApiError.internal());
    }
  }
}

export default new ReviewController();
