import { prisma } from '../utils/prismaClient';

class FavoritesService {
  async addFavorite(userId: number, deviceId: number) {
    const existingLike = await prisma.favorite.findFirst({
      where: { userId, deviceId: Number(deviceId) },
    });
    if (existingLike) {
      throw new Error('Вы уже добавляли этот товар в избранное');
    }
    const like = await prisma.favorite.create({
      data: { userId, deviceId: Number(deviceId) },
      include: { device: true },
    });
    return like;
  }
  async deleteFavorite(userId: number, deviceId: number) {
    const existingLike = await prisma.favorite.findFirst({
      where: { userId, deviceId },
      include: { device: true },
    });
    if (!existingLike) {
      throw new Error('Товар не добавлен в избранное');
    }
    await prisma.favorite.deleteMany({
      where: { deviceId, userId },
    });
    return existingLike;
  }
}

export default new FavoritesService();
