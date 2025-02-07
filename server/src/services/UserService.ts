import { prisma } from '../utils/prismaClient';
import bcrypt from 'bcrypt';
import JwtService from './JwtService';
class UserService {
  async register(
    name: string,
    surname: string,
    email: string,
    password: string
  ) {
    const candidate = await prisma.user.findFirst({ where: { email } });
    if (candidate) {
      throw new Error(
        'Пользователь с таким E-Mail`ом или именем уже зарегистрирован'
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
    return user;
  }
  async login(email: string, password: string) {
    const user = await prisma.user.findFirst({
      where: { email },
      include: { favorites: true },
    });
    const isPasswordCorrect =
      user && (await bcrypt.compare(password, user.password));
    const secret = process.env.JWT_SECRET;
    if (isPasswordCorrect && user && secret) {
      const token = JwtService.generateJwt(user.id);
      return token;
    } else {
      throw new Error('Неверно введен логин и пароль');
    }
  }
  async current(id: number) {
    const user = await prisma.user.findUnique({
      where: { id },
      include: { favorites: { include: { device: true } } },
    });
    if (!user) {
      throw new Error('Пользователь не найден');
    }
    return user;
  }
  async updateUser(
    userId: number,
    name: string,
    surname: string,
    email: string,
    avatar?: string
  ) {
    if (email) {
      const existingUser = await prisma.user.findFirst({ where: { email } });
      if (existingUser && existingUser.id !== userId) {
        throw new Error('Почта уже занята');
      }
    }
    const user = await prisma.user.update({
      where: { id: userId },
      data: {
        email: email || undefined,
        surname: surname || undefined,
        name: name || undefined,
        avatar,
      },
    });
    return user;
  }
}

export default new UserService();
