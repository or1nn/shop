import { NextFunction, Request, Response } from 'express';
import { prisma } from '../utils/prismaClient';
import ApiError from '../error/ApiError';

class CategoryController {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { name } = req.body;
      if (!name) {
        return next(ApiError.forbidden('Введите название категории'));
      }
      const item = await prisma.category.create({ data: { name } });
      res.status(200).json(item);
    } catch (error) {
      next(ApiError.internal());
    }
  }
  async getAll(_: Request, res: Response, next: NextFunction) {
    try {
      const types = await prisma.category.findMany();
      res.status(200).json(types);
    } catch (error) {
      next(ApiError.internal());
    }
  }
}

export default new CategoryController();
