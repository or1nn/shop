import { NextFunction, Request, Response } from 'express';
import ApiError from '../error/ApiError';
import CategoryService from '../services/CategoryService';

class CategoryController {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { name } = req.body;
      if (!name) {
        return next(ApiError.forbidden('Введите название категории'));
      }
      const item = await CategoryService.create(name);
      res.status(200).json(item);
    } catch (error) {
      next(ApiError.internal());
    }
  }
  async getAll(_: Request, res: Response, next: NextFunction) {
    try {
      const categories = await CategoryService.getAll();
      res.status(200).json(categories);
    } catch (error) {
      next(ApiError.internal());
    }
  }
}

export default new CategoryController();
