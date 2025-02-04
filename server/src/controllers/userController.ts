import { prisma } from '../utils/prismaClient';
import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const generateJwt = (userId: number, KEY: string) => {
  return jwt.sign({ userId }, KEY, {
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
        res.status(400).json({ message: 'Неверно введен логин и пароль' });
        return;
      }
    } catch (error) {
      res.status(400).json({ message: `Произошла ошибка при авторизации` });
    }
  }
  async current(req: Request, res: Response) {
    try {
      const user = await prisma.user.findUnique({
        where: { id: req.user.userId },
        include: { favorites: {include: {device: true}}},
      });
      if (!user) {
        res.status(400).json({ message: 'Пользователь не найден' });
        return;
      }
      res.status(200).json(user);
    } catch (error) {
      res.status(400).json({ message: 'ошибка' });
    }
  }
  async updateUser(req: Request, res: Response) {
    const userId = req.user.userId;
    const { email, name, surname } = req.body;
    const { id } = req.params;
    let filePath;
    if (req.file && req.file.filename) {
      filePath = req.file.filename;
    }
    console.log(filePath);
    if (userId !== Number(id)) {
      res.status(400).json({ message: 'Нет доступа' });
      return;
    }
    try {
      if (email) {
        const existingUser = await prisma.user.findFirst({ where: { email } });
        if (existingUser && existingUser.id !== userId) {
          res.status(400).json({ message: 'Почта уже занята' });
          return;
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
      res.json({ message: `Произошла ошибка на стороне сервера ${error}` });
    }
  }
  // async uploadAvatar(req: Request, res: Response) {
  //   try {
  //     const avatar = req.file?.filename;
  //     const { id } = req.user;
  //     if (!avatar) {
  //       throw new Error('загрузите аватарку');
  //     }
  //     const user = await prisma.user.update({
  //       data: {
  //         avatar,
  //       },
  //       where: { id: Number(id) },
  //       include: { favorites: true },
  //     });
  //     const token = generateJwt(
  //       id,
  //       user.name,
  //       user.surname,
  //       user.email,
  //       user.role,
  //       user.avatar,
  //       user.favorites,
  //       KEY
  //     );
  //     res.status(200).json({ user: { avatar: user.avatar }, token });
  //   } catch (error) {
  //     res
  //       .status(400)
  //       .json({ message: `Произошла ошибка при загрузке фото: ${error}` });
  //   }
  // }
  // async toggleFavorite(req: Request, res: Response) {
  //   try {
  //     const { id: deviceId } = req.body;
  //     const userId = req.user.id;
  //     const user = await prisma.user.findUnique({
  //       where: { id: Number(userId) },
  //       include: { favorites: true },
  //     });
  //     if (!user) {
  //       throw Error('не найден пользователь');
  //     }
  //     const isExists = user.favorites.some(
  //       (device) => device.id === Number(deviceId)
  //     );
  //     const newUser = await prisma.user.update({
  //       where: { id: Number(userId) },
  //       include: {
  //         favorites: true,
  //       },
  //       data: {
  //         favorites: {
  //           set: isExists
  //             ? user.favorites.filter(
  //                 (device) => device.id !== Number(deviceId)
  //               )
  //             : [...user.favorites, { id: deviceId }],
  //         },
  //       },
  //     });
  //     const token = generateJwt(
  //       newUser.id,
  //       newUser.name,
  //       newUser.surname,
  //       newUser.email,
  //       newUser.role,
  //       newUser.avatar,
  //       newUser.favorites,
  //       KEY
  //     );
  //     res.status(200).json({ favorites: newUser.favorites, token });
  //   } catch (error) {
  //     res
  //       .status(400)
  //       .json({ message: 'Ошибка при добавлении/удалении в избранное' });
  //   }
  // }
}

export default new UserController();
