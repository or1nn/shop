import { Request, Response } from 'express';
import { prisma } from '../utils/prismaClient';

class FavoritesController {
  async addFavorite(req: Request, res: Response) {
    const userId = req.user.userId;
    const { deviceId } = req.body;
    if (!deviceId) {
      res.status(400).json({ message: 'Все поля обязательны' });
      return;
    }
    try {
      const existingLike = await prisma.favorite.findFirst({
        where: { userId, deviceId: Number(deviceId) },
      });
      if (existingLike) {
        res
          .status(400)
          .json({ message: 'Вы уже добавляли этот товар в избранное' });
        return;
      }
      const like = await prisma.favorite.create({
        data: { userId, deviceId: Number(deviceId) },
        include: { device: true },
      });
      res.status(200).json(like);
    } catch (error) {
      res
        .status(400)
        .json({ message: `Произошла ошибка на стороне сервера ${error}` });
    }
  }
  async deleteFavorite(req: Request, res: Response) {
    const userId = req.user.userId as number;
    const { id } = req.params;
    try {
      const existingLike = await prisma.favorite.findFirst({
        where: { userId, deviceId: Number(id) },
        include: { device: true },
      });
      if (!existingLike) {
        res.status(400).json({ mesage: 'Товар не добавлен в избранное' });
        return;
      }
      await prisma.favorite.deleteMany({
        where: { deviceId: Number(id), userId },
      });
      res.json(existingLike);
    } catch (error) {
      res.status(400).json({ message: `Произошла ошибка на стороне сервера` });
    }
  }
}

export default new FavoritesController();
