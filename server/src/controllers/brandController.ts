import { NextFunction, Request, Response } from 'express';
import ApiError from '../error/ApiError';
import BrandService from '../services/BrandService';

class BrandController {
  async create(req: Request, res: Response, next: NextFunction) {
    const { name } = req.body;
    if (!name) {
      return next(ApiError.forbidden('Введите название бренда'));
    }
    try {
      const brand = await BrandService.create(name);
      res.status(200).json(brand);
    } catch (error) {
      next(ApiError.internal());
    }
  }
  async getAll(_: Request, res: Response, next: NextFunction) {
    try {
      const items = await BrandService.getAll();
      res.status(200).json(items);
    } catch (error) {
      next(ApiError.internal());
    }
  }
}

export default new BrandController();
