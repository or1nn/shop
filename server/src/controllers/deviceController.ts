import { Request, Response } from 'express';
import { prisma } from '../utils/prismaClient';
import jwt from 'jsonwebtoken';
class DeviceController {
  async getAll(req: Request, res: Response) {
    try {
      const { search, categoryId, sortBy, order } = req.query;
      let items;
      if (!sortBy) {
        res.status(400).json({ message: 'Укажите тип сортировки' });
        return;
      }
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
        items = await prisma.device.findMany({
          where: {
            title: { contains: String(search), mode: 'insensitive' },
            categoryId: Number(categoryId) || undefined,
          },
          orderBy: orders[Number(sortBy)],
          include: { favorite: true },
        });
      } else {
        items = await prisma.device.findMany({
          orderBy: orders[Number(sortBy)],
          include: { favorite: true, reviews: true },
          where: {
            categoryId: Number(categoryId) || undefined,
          },
        });
      }

      const token = req.headers.authorization?.split(' ')[1];
      if (!token || token === 'null') {
        res.status(200).json(items);
      } else {
        const KEY = process.env.JWT_SECRET!;
        const decoded = jwt.verify(token, KEY);
        req.user = decoded;
        const deviceWithFavorites = items.map((item) => ({
          ...item,
          isFavorite: item.favorite.some(
            (like) => like.userId === req.user.userId
          ),
        }));
        res.status(200).json(deviceWithFavorites);
      }
    } catch (error) {
      res
        .status(400)
        .json({ message: `Произошла ошибка при получении товаров ${error}` });
    }
  }
  // async getMostPopular(req: Request, res: Response) {
  //   try {
  //     const { search, categoryId } = req.query;
  //     let items;

  //     if (search) {
  //       items = await prisma.device.findMany({
  //         where: {
  //           title: { contains: String(search), mode: 'insensitive' },
  //           categoryId: Number(categoryId) || undefined
  //         },
  //         orderBy: { createdAt: 'desc' },
  //         include: { favorite: true },
  //       });
  //     } else {
  //       items = await prisma.device.findMany({
  //         orderBy: { views: 'desc'},
  //         include: { favorite: true },
  //         where: {
  //           categoryId: Number(categoryId) || undefined
  //         },
  //       });
  //     }

  //     const token = req.headers.authorization?.split(' ')[1];
  //     if (!token || token === 'null') {
  //       res.status(200).json(items);
  //     } else {
  //       const KEY = process.env.JWT_SECRET!;
  //       const decoded = jwt.verify(token, KEY);
  //       req.user = decoded;
  //       const deviceWithFavorites = items.map((item) => ({
  //         ...item,
  //         isFavorite: item.favorite.some(
  //           (like) => like.userId === req.user.userId
  //         ),
  //       }));
  //       res.status(200).json(deviceWithFavorites);
  //     }
  //   } catch (error) {
  //     res
  //       .status(400)
  //       .json({ message: `Произошла ошибка при получении товаров ${error}` });
  //   }
  // }
  async getById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const device = await prisma.device.findFirst({
        where: { id: Number(id) },
        include: {
          category: true,
          reviews: {include: {user: true}},
          brand: true,
        },
      });
      if (!device) {
        res.status(400).json({ message: 'Девайс не найден' });
        return;
      }
      await prisma.device.update({
        where: { id: Number(id) },
        data: { views: device.views + 1 },
      });
      res.status(200).json(device);
    } catch (error) {
      res
        .status(400)
        .json({ message: `Произошла ошибка при получении товара ${error}` });
    }
  }
  async create(req: Request, res: Response) {
    try {
      const { title, price, typeId, brandId } = req.body;
      const imageUrl = req.file?.filename;
      if (!imageUrl) {
        throw new Error('Вы не загрузили фотографию девайса');
      }
      const item = await prisma.device.create({
        data: {
          title,
          imageUrl,
          price: Number(price),
          category: {
            connect: { id: Number(typeId) },
          },
          brand: {
            connect: { id: Number(brandId) },
          },
        },
      });
      res.status(200).json(item);
    } catch (error) {
      res.status(400).json({ message: `Ошибка при создании девайса ${error}` });
    }
  }
}

export default new DeviceController();
