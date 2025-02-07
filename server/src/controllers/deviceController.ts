import { NextFunction, Request, Response } from 'express';
import ApiError from '../error/ApiError';
import DeviceService from '../services/DeviceService';

class DeviceController {
  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const { search, categoryId, sortBy, brandId, order, page } = req.query;
      const token = req.headers.authorization?.split(' ')[1];
      const { devices, currentPage, totalPages } =
        await DeviceService.getAllWithFavorites(
          Number(page),
          Number(sortBy),
          token,
          String(order),
          String(search),
          Number(categoryId),
          Number(brandId)
        );
      res.status(200).json({
        devices,
        currentPage,
        totalPages,
      });
    } catch (e) {
      next(ApiError.internal((e as any).message));
    }
  }
  async getHits(req: Request, res: Response, next: NextFunction) {
    try {
      const token = req.headers.authorization?.split(' ')[1];
      const items = await DeviceService.getHits(token);
      res.status(200).json(items);
    } catch (e) {
      next(ApiError.internal((e as any).message));
    }
  }
  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const device = await DeviceService.getById(Number(id));
      res.status(200).json(device);
    } catch (e) {
      next(ApiError.internal((e as any).message));
    }
  }
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { title, price, categoryId, brandId } = req.body;
      const imageUrl = req.file?.filename;
      const item = await DeviceService.create(
        title,
        Number(price),
        Number(categoryId),
        Number(brandId),
        imageUrl
      );
      res.status(200).json(item);
    } catch (e) {
      next(ApiError.internal((e as any).message));
    }
  }
}

export default new DeviceController();
