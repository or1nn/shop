import { prisma } from '../utils/prismaClient';
import jwt from 'jsonwebtoken';
class DeviceService {
  async getAll(
    page: number = 1,
    sortBy: number = 0,
    order?: string,
    search?: string,
    categoryId?: number,
    brandId?: number
  ) {
    const orders: any[] = [
      { views: order || 'asc' },
      { price: order || 'asc' },
      { reviews: { _avg: { rate: order || 'asc' } } },
      {
        reviews: {
          _count: order || 'asc',
        },
      },
      { title: order || 'asc' },
    ];
    if (search) {
      var [devices, totalItems] = await prisma.$transaction([
        prisma.device.findMany({
          where: {
            title: { contains: String(search), mode: 'insensitive' },
            categoryId: categoryId || undefined,
            brandId: brandId || undefined,
          },
          orderBy: orders[sortBy],
          include: {
            favorite: true,
            brand: true,
            category: true,
            reviews: true,
            info: true,
          },
        }),
        prisma.device.count({
          where: {
            title: { contains: String(search), mode: 'insensitive' },
            categoryId: Number(categoryId) || undefined,
            brandId: Number(brandId) || undefined,
          },
        }),
      ]);
    } else {
      var [devices, totalItems] = await prisma.$transaction([
        prisma.device.findMany({
          orderBy: orders[Number(sortBy)],
          include: {
            favorite: true,
            reviews: true,
            brand: true,
            category: true,
            info: true,
          },
          take: 10,
          skip: (page - 1) * 10,
          where: {
            categoryId: categoryId || undefined,
            brandId: brandId || undefined,
          },
        }),
        prisma.device.count({
          where: {
            categoryId: categoryId || undefined,
            brandId: brandId || undefined,
          },
        }),
      ]);
    }
    const totalPages = Math.ceil(totalItems / 10);
    return { devices, currentPage: page, totalPages };
  }
  async getAllWithFavorites(
    sortBy: number,
    page: number,
    token?: string,
    order?: string,
    search?: string,
    categoryId?: number,
    brandId?: number
  ) {
    const items = await this.getAll(
      sortBy,
      page,
      order,
      search,
      categoryId,
      brandId
    );
    if (!token || token === 'null') {
      return items;
    } else {
      const { devices, currentPage, totalPages } = items;
      const KEY = process.env.JWT_SECRET!;
      const user = jwt.verify(token, KEY);
      if (!user) {
        return items;
      }
      const deviceWithFavorites = devices.map((item) => ({
        ...item,
        isFavorite: item.favorite.some(
          (like) => like.userId === (user as any).userId
        ),
      }));
      return { devices: deviceWithFavorites, currentPage, totalPages };
    }
  }
  async getHits(token?: string) {
    const items = await prisma.device.findMany({
      orderBy: { views: 'desc' },
      take: 8,
      include: { favorite: true },
    });

    if (!token || token === 'null') {
      return items;
    } else {
      const KEY = process.env.JWT_SECRET!;
      const user = jwt.verify(token, KEY);
      const deviceWithFavorites = items.map((item) => ({
        ...item,
        isFavorite: item.favorite.some(
          (like) => like.userId === (user as any).userId
        ),
      }));
      return deviceWithFavorites;
    }
  }
  async getById(id: number) {
    const device = await prisma.device.findFirst({
      where: { id },
      include: {
        category: true,
        reviews: { include: { user: true } },
        brand: true,
        info: true,
      },
    });
    if (!device) {
      throw new Error('Девайс не найден');
    }
    await prisma.device.update({
      where: { id: Number(id) },
      data: { views: device.views + 1 },
    });
    return device;
  }
  async create(
    title: string,
    price: number,
    categoryId: number,
    brandId: number,
    imageUrl?: string
  ) {
    if (!title || !price || !categoryId || !brandId) {
      throw new Error('Заполните все поля');
    }
    if (!imageUrl) {
      throw new Error('Вы не загрузили фотографию девайса');
    }
    const item = await prisma.device.create({
      data: {
        title,
        imageUrl,
        price,
        category: {
          connect: { id: categoryId },
        },
        brand: {
          connect: { id: brandId },
        },
      },
    });
    return item;
  }
}

export default new DeviceService();
