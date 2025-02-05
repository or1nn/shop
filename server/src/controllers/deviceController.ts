import { NextFunction, Request, Response } from 'express';
import { prisma } from '../utils/prismaClient';
import jwt from 'jsonwebtoken';
import ApiError from '../error/ApiError';

class DeviceController {
  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const { search, categoryId, sortBy, brandId, order, page } = req.query;
      if (!sortBy) {
        return next(ApiError.forbidden('Укажите тип сортировки'));
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
        var [devices, totalItems] = await prisma.$transaction([
          prisma.device.findMany({
            where: {
              title: { contains: String(search), mode: 'insensitive' },
              categoryId: Number(categoryId) || undefined,
              brandId: Number(brandId) || undefined,
            },
            orderBy: orders[Number(sortBy)],
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
            skip: (Number(page) - 1) * 10,
            where: {
              categoryId: Number(categoryId) || undefined,
              brandId: Number(brandId) || undefined,
            },
          }),
          prisma.device.count({
            where: {
              categoryId: Number(categoryId) || undefined,
              brandId: Number(brandId) || undefined,
            },
          }),
        ]);
      }
      const totalPages = Math.ceil(totalItems / 10);
      const token = req.headers.authorization?.split(' ')[1];
      if (!token || token === 'null') {
        res
          .status(200)
          .json({ devices, currentPage: Number(page), totalPages });
      } else {
        const KEY = process.env.JWT_SECRET!;
        const decoded = jwt.verify(token, KEY);
        req.user = decoded;
        const deviceWithFavorites = devices.map((item) => ({
          ...item,
          isFavorite: item.favorite.some(
            (like) => like.userId === req.user.userId
          ),
        }));
        res.status(200).json({
          devices: deviceWithFavorites,
          currentPage: Number(page),
          totalPages,
        });
      }
    } catch (error) {
      next(ApiError.internal());
    }
  }
  async getHits(req: Request, res: Response, next: NextFunction) {
    try {
      const items = await prisma.device.findMany({
        orderBy: { views: 'desc' },
        take: 8,
        include: { favorite: true },
      });

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
      next(ApiError.internal());
    }
  }
  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const device = await prisma.device.findFirst({
        where: { id: Number(id) },
        include: {
          category: true,
          reviews: { include: { user: true } },
          brand: true,
          info: true,
        },
      });
      if (!device) {
        return next(ApiError.badRequest('Девайс не найден'));
      }
      await prisma.device.update({
        where: { id: Number(id) },
        data: { views: device.views + 1 },
      });
      res.status(200).json(device);
    } catch (error) {
      next(ApiError.internal());
    }
  }
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { title, price, categoryId, brandId } = req.body;
      if (!title || !price || !categoryId || !brandId) {
        return next(ApiError.forbidden('Заполните все поля'));
      }
      const imageUrl = req.file?.filename;
      if (!imageUrl) {
        return next(ApiError.forbidden('Вы не загрузили фотографию девайса'));
      }
      const item = await prisma.device.create({
        data: {
          title,
          imageUrl,
          price: Number(price),
          category: {
            connect: { id: Number(categoryId) },
          },
          brand: {
            connect: { id: Number(brandId) },
          },
        },
      });
      res.status(200).json(item);
    } catch (error) {
      console.error(error);
      next(ApiError.internal());
    }
  }
}

export default new DeviceController();
