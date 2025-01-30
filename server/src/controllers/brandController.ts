import { Request, Response } from 'express';
import { prisma } from '../utils/prismaClient';

class BrandController {
  async create(req: Request, res: Response) {
    try {
      const { name } = req.body;
      const brand = await prisma.brand.create({ data: { name } });
      res.status(200).json(brand);
    } catch (error) {
      res
        .status(400)
        .json({ message: `Произошла ошибка при создании бренда ${error}` });
    }
  }
  async getAll(_: Request, res: Response) {
    try {
      const items = await prisma.brand.findMany();
      res.status(200).json(items);
    } catch (error) {
      res
        .status(400)
        .json({ message: `Произошла ошибка при получении брендов ${error}` });
    }
  }
}

export default new BrandController();
