import { prisma } from '../utils/prismaClient';
import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const generateJwt = (
  id: number,
  name: string,
  surname: string,
  email: string,
  role: string,
  avatar: string,
  KEY: string
) => {
  return jwt.sign({ id, name, surname, email, role, avatar }, KEY, {
    expiresIn: '24h',
  });
};
const KEY = process.env.JWT_SECRET!;

class UserController {
  async register(req: Request, res: Response) {
    try {
      const { email, name, surname, password } = req.body;
      if (!email || !name || !surname || !password) {
        res.status(400).json({
          message: `Введите все поля! ${surname}`,
        });
        return;
      }
      const candidate = await prisma.user.findFirst({ where: { email } });
      if (candidate) {
        res.status(400).json({
          message:
            'Пользователь с таким E-Mail`ом или именем уже зарегистрирован',
        });
        return;
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
      });
      const secret = process.env.JWT_SECRET;
      if (secret) {
        const token = generateJwt(
          user.id,
          user.name,
          user.surname,
          user.email,
          user.role,
          user.avatar,
          secret
        );
        res.status(200).json({
          token,
          user: {
            id: user.id,
            name: user.name,
            surname: user.surname,
            email: user.email,
            role: user.role,
            avatar: user.avatar,
          },
        });
      } else {
        throw new Error('Не удалось найти переменную окружения');
      }
    } catch (error) {
      res
        .status(400)
        .json({ message: `Не удалось зарегистироваться: ${error}` });
    }
  }
  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        res.status(400).json({ message: 'Введите все поля' });
        return;
      }
      const user = await prisma.user.findFirst({ where: { email } });
      const isPasswordCorrect =
        user && (await bcrypt.compare(password, user.password));
      const secret = process.env.JWT_SECRET;
      if (isPasswordCorrect && user && secret) {
        const token = generateJwt(
          user.id,
          user.name,
          user.surname,
          user.email,
          user.role,
          user.avatar,
          secret
        );
        res.status(200).json({
          token,
          user: {
            id: user.id,
            name: user.name,
            surname: user.surname,
            email: user.email,
            role: user.role,
            avatar: user.avatar,
          },
        });
      } else {
        res.status(400).json({ message: 'Неверно введен логин и пароль' });
        return;
      }
    } catch (error) {
      res.status(400).json({ message: `Произошла ошибка при авторизации` });
    }
  }
  async current(req: Request, res: Response) {
    try {
     
      const { role, name, surname, email, id, avatar } = req.user;
      const token = generateJwt(id, name, surname, email, role, avatar, KEY);
      res
        .status(200)
        .json({ token, user: { id, name, surname, email, role, avatar } });
    } catch (error) {
      res.status(400).json({ message: 'ошибка' });
    }
  }
  async uploadAvatar(req: Request, res: Response) {
    try {
      const avatar = req.file?.filename;
      const { id } = req.user;
      if (!avatar) {
        throw new Error('загрузите аватарку');
      }
      const user = await prisma.user.update({
        data: {
          avatar,
        },
        where: { id: Number(id) },
      });
      const token = generateJwt(id, user.name, user.surname, user.email, user.role, user.avatar, KEY);
      res.status(200).json({ user: { avatar: user.avatar }, token});
    } catch (error) {
      res
        .status(400)
        .json({ message: `Произошла ошибка при загрузке фото: ${error}` });
    }
  }
}

export default new UserController();
