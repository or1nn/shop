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
  async create(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { rate, body } = req.body;
      const { id: userId } = req.user;
      const candidate = await prisma.review.findFirst({
        where: {
          userId: Number(userId),
          deviceId: Number(id),
        },
      });
      if (candidate) {
        throw new Error('вы уже оставляли отзыв об этом товаре');
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
