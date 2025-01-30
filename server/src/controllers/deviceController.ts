import { Request, Response } from 'express';
import { prisma } from '../utils/prismaClient';
class DeviceController {
  async getAll(req: Request, res: Response) {
    try {
      const { search } = req.query;
      let items;
      if (search) {
        items = await prisma.device.findMany({
          where: {
            title: { contains: String(search), mode: 'insensitive' },
          },
        });
      } else {
        items = await prisma.device.findMany();
      }

      res.status(200).json(items);
    } catch (error) {
      res
        .status(400)
        .json({ message: 'Произошла ошибка при получении товаров' });
    }
  }
  async getById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const device = await prisma.device.findFirst({
        where: { id: Number(id) },
        include: {
          type: true,
          brand: true,
        },
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
          type: {
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
