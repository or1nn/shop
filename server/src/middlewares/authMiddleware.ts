import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

export default function (req: Request, res: Response, next: NextFunction) {
  const KEY = process.env.JWT_SECRET!;
  if (req.method === 'OPTION') {
    next();
  }
  try {
    if (!req.headers.authorization) {
      res.status(400).json({ message: 'не авторизован' });
      return;
    }
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, KEY);
    req.user = decoded;
    next();
  } catch (e) {
    res.status(401).json({ message: 'пользователь не авторизован' });
  }
}
