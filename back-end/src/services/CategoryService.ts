import type { PrismaClient } from '@prisma/client';
import type { CreateCategoryInput } from '../dtos/inputs/CreateCategoryInput';
import type { UpdateCategoryInput } from '../dtos/inputs/UpdateCategoryInput';

export class CategoryService {
  constructor(private prisma: PrismaClient) {}

  async getAllCategories(userId: string) {
    return this.prisma.category.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async getCategoryById(id: string, userId: string) {
    return this.prisma.category.findFirst({
      where: { id, userId },
    });
  }

  async createCategory(input: CreateCategoryInput, userId: string) {
    return this.prisma.category.create({
      data: {
        title: input.title,
        description: input.description ?? null,
        icon: input.icon ?? null,
        color: input.color ?? null,
        userId,
      },
    });
  }

  async updateCategory(id: string, input: UpdateCategoryInput, userId: string) {
    const category = await this.getCategoryById(id, userId);
    if (!category) {
      throw new Error('Category not found or access denied');
    }

    return this.prisma.category.update({
      where: { id },
      data: {
        ...(input.title !== undefined && { title: input.title }),
        ...(input.description !== undefined && { description: input.description ?? null }),
        ...(input.icon !== undefined && { icon: input.icon ?? null }),
        ...(input.color !== undefined && { color: input.color ?? null }),
      },
    });
  }

  async deleteCategory(id: string, userId: string) {
    const category = await this.getCategoryById(id, userId);
    if (!category) {
      throw new Error('Category not found or access denied');
    }

    await this.prisma.$transaction([
      this.prisma.transaction.updateMany({
        where: { categoryId: id },
        data: { categoryId: null },
      }),
      this.prisma.category.delete({
        where: { id },
      }),
    ]);

    return true;
  }

  async getCategoryTransactions(categoryId: string) {
    return this.prisma.transaction.findMany({
      where: { categoryId },
      orderBy: { date: 'desc' },
    });
  }
}
