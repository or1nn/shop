import { Request, Response } from 'express';
import { prisma } from '../utils/prismaClient';

class ReviewController {
  async getReviewByDeviceId(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const items = await prisma.review.findMany({
        where: { deviceId: Number(id) },
      });
      res.status(200).json(items);
    } catch (error) {
      res.status(400).json({ message: 'ошибка при получении отзывов' });
    }
  }
  async delete(req: Request, res: Response) {
    const { id } = req.params;
    // const {deviceId} = req.body;
    const userId = req.user.userId;
    if (!id) {
      res.status(400).json({ message: 'Все поля обязательны' });
      return;
    }
    try {
      const existingReview = await prisma.review.findFirst({
        where: { userId, deviceId: Number(id) },
      });
      if (!existingReview) {
        res
          .status(400)
          .json({ message: 'Вы не оставляли отзыв об этом товаре' });
        return;
      }
      await prisma.review.deleteMany({
        where: { userId, deviceId: Number(id) },
      });
      res.status(200).json({ message: 'Отзыв удален' });
    } catch (error) {
      res.status(400).json({ message: 'Произошла ошибка на стороне сервера' });
    }
  }
  async create(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { rate, body } = req.body;
      const userId = req.user.userId;
      if (!id || !rate || !body) {
        res.status(400).json({ message: 'Все поля обязательны' });
        return;
      }
      const candidate = await prisma.review.findFirst({
        where: {
          userId: Number(userId),
          deviceId: Number(id),
        },
      });
      if (candidate) {
        res
          .status(400)
          .json({ message: 'Вы уже оставляли отзыв об этом товаре' });
        return;
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
      res.status(400).json({ message: `ошибка при создании отзыва ${error}` });
    }
  }
}

export default new ReviewController();
