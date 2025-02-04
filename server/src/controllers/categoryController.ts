import { Request, Response } from 'express';
import { prisma } from '../utils/prismaClient';

class TypeController {
  async create(req: Request, res: Response) {
    try {
      const { name } = req.body;
      const item = await prisma.category.create({ data: { name } });
      res.status(200).json(item);
    } catch (error) {
      res.status(200).json({ message: `Ошибка при создании типа ${error}` });
    }
  }
  async getAll(req: Request, res: Response) {
    try {
      const types = await prisma.category.findMany();
      res.status(200).json(types);
    } catch (error) {
      res.status(200).json({ message: `Ошибка при получении типов ${error}` });
    }
  }
}

export default new TypeController();
