import { prisma } from '../utils/prismaClient';

class CategoryService {
  async create(name: string) {
    const item = await prisma.category.create({ data: { name } });
    return item;
  }
  async getAll() {
    const categories = await prisma.category.findMany();
    return categories;
  }
}

export default new CategoryService();
