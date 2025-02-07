import { prisma } from '../utils/prismaClient';

class BrandService {
  async create(name: string) {
    const brand = await prisma.brand.create({ data: { name } });
    return brand;
  }
  async getAll() {
    const items = await prisma.brand.findMany();
    return items;
  }
}

export default new BrandService();
