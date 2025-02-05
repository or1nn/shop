import { prisma } from '../utils/prismaClient';
import { NextFunction, Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import ApiError from '../error/ApiError';

const generateJwt = (userId: number, KEY: string) => {
  return jwt.sign({ userId }, KEY, {
    expiresIn: '24h',
  });
};

class UserController {
  async register(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, name, surname, password } = req.body;
      if (!email || !name || !surname || !password) {
        next(ApiError.badRequest('Все поля обязательны'));
      }
      const candidate = await prisma.user.findFirst({ where: { email } });
      if (candidate) {
        return next(
          ApiError.badRequest(
            'Пользователь с таким E-Mail`ом или именем уже зарегистрирован'
          )
        );
      }
      const salt = await bcrypt.genSalt(5);
      const hashPassword = await bcrypt.hash(password, salt);
      const user = await prisma.user.create({
        data: {
          email,
          name,
          surname,
          password: hashPassword,
        },
        include: {
          favorites: {
            include: {
              device: true,
            },
          },
        },
      });
      res.status(200).json(user);
    } catch (error) {
      next(ApiError.internal());
    }
  }
  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return next(ApiError.badRequest('Все поля обязательны'));
      }
      const user = await prisma.user.findFirst({
        where: { email },
        include: { favorites: true },
      });
      const isPasswordCorrect =
        user && (await bcrypt.compare(password, user.password));
      const secret = process.env.JWT_SECRET;
      if (isPasswordCorrect && user && secret) {
        const token = generateJwt(user.id, secret);
        res.status(200).json({
          token,
        });
      } else {
        return next(ApiError.badRequest('Неверно введен логин и пароль'));
      }
    } catch (error) {
      next(ApiError.internal());
    }
  }
  async current(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await prisma.user.findUnique({
        where: { id: req.user.userId },
        include: { favorites: { include: { device: true } } },
      });
      if (!user) {
        return next(ApiError.forbidden('Пользователь не найден'));
      }
      res.status(200).json(user);
    } catch (error) {
      next(ApiError.internal());
    }
  }
  async updateUser(req: Request, res: Response, next: NextFunction) {
    const userId = req.user.userId;
    const { email, name, surname } = req.body;
    const { id } = req.params;
    let filePath;
    if (req.file && req.file.filename) {
      filePath = req.file.filename;
    }
    console.log(filePath);
    if (userId !== Number(id)) {
      return next(ApiError.forbidden('Нет доступа'));
    }
    try {
      if (email) {
        const existingUser = await prisma.user.findFirst({ where: { email } });
        if (existingUser && existingUser.id !== userId) {
          return next(ApiError.badRequest('Почта уже занята'));
        }
      }
      const user = await prisma.user.update({
        where: { id: userId },
        data: {
          email: email || undefined,
          surname: surname || undefined,
          name: name || undefined,
          avatar: filePath,
        },
      });
      res.json(user);
    } catch (error) {
      next(ApiError.internal());
    }
  }
}

export default new UserController();
