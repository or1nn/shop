import { prisma } from '../utils/prismaClient';

class ReviewService {
  async getReviewByDeviceId(deviceId: number) {
    const items = await prisma.review.findMany({
      where: { deviceId },
    });
    return items;
  }
  async delete(userId: number, deviceId: number) {
    const existingReview = await prisma.review.findFirst({
      where: { userId, deviceId },
    });
    if (!existingReview) {
      throw new Error('Вы не оставляли отзыв об этом товаре');
    }
    await prisma.review.deleteMany({
      where: { userId, deviceId },
    });
  }
  async create(rate: number, body: string, userId: number, deviceId: number) {
    const candidate = await prisma.review.findFirst({
      where: {
        userId,
        deviceId,
      },
    });
    if (candidate) {
      throw new Error('Вы уже оставляли отзыв об этом товаре');
    }
    const item = await prisma.review.create({
      data: {
        rate: Number(rate),
        body,
        device: {
          connect: { id: deviceId },
        },
        user: {
          connect: {
            id: userId,
          },
        },
      },
    });
    return item;
  }
}

export default new ReviewService();
