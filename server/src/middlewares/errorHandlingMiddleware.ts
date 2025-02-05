import ApiError from '../error/ApiError';
import { NextFunction } from 'express';

export default function (err: any, req: any, res: any, next: NextFunction) {
  if (err instanceof ApiError) {
    return res.status(err.status).json({ message: err.message });
  }
  return res.status(500).json({ message: 'Произошла непредвиденная ошибка' });
}
