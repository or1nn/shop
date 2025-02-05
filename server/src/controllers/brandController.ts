import { NextFunction, Request, Response } from 'express';
import { prisma } from '../utils/prismaClient';
import ApiError from '../error/ApiError';

class BrandController {
  async create(req: Request, res: Response, next: NextFunction) {
    const { name } = req.body;
    if (!name) {
      return next(ApiError.forbidden('Введите название бренда'));
    }
    try {
      const brand = await prisma.brand.create({ data: { name } });
      res.status(200).json(brand);
    } catch (error) {
      next(ApiError.internal());
    }
  }
  async getAll(_: Request, res: Response, next: NextFunction) {
    try {
      const items = await prisma.brand.findMany();
      res.status(200).json(items);
    } catch (error) {
      next(ApiError.internal());
    }
  }
}

export default new BrandController();
