import type { PrismaClient } from '@prisma/client';
import type { CreateTransactionInput } from '../dtos/inputs/CreateTransactionInput';
import type { UpdateTransactionInput } from '../dtos/inputs/UpdateTransactionInput';

export class TransactionService {
  constructor(private prisma: PrismaClient) {}

  async getAllTransactions(userId: string) {
    return this.prisma.transaction.findMany({
      where: { userId },
      orderBy: { date: 'desc' },
    });
  }

  async getTransactionById(id: string, userId: string) {
    return this.prisma.transaction.findFirst({
      where: { id, userId },
    });
  }

  async createTransaction(input: CreateTransactionInput, userId: string) {
    if (input.categoryId) {
      const category = await this.prisma.category.findFirst({
        where: { id: input.categoryId, userId },
      });
      if (!category) {
        throw new Error('Category not found or access denied');
      }
    }

    return this.prisma.transaction.create({
      data: {
        description: input.description,
        amount: input.amount,
        type: input.type,
        date: new Date(input.date),
        categoryId: input.categoryId ?? null,
        userId,
      },
    });
  }

  async updateTransaction(id: string, input: UpdateTransactionInput, userId: string) {
    const transaction = await this.getTransactionById(id, userId);
    if (!transaction) {
      throw new Error('Transaction not found or access denied');
    }

    if (input.categoryId) {
      const category = await this.prisma.category.findFirst({
        where: { id: input.categoryId, userId },
      });
      if (!category) {
        throw new Error('Category not found or access denied');
      }
    }

    return this.prisma.transaction.update({
      where: { id },
      data: {
        ...(input.description !== undefined && { description: input.description }),
        ...(input.amount !== undefined && { amount: input.amount }),
        ...(input.type !== undefined && { type: input.type }),
        ...(input.date !== undefined && { date: new Date(input.date) }),
        ...(input.categoryId !== undefined && { categoryId: input.categoryId ?? null }),
      },
    });
  }

  async deleteTransaction(id: string, userId: string) {
    const transaction = await this.getTransactionById(id, userId);
    if (!transaction) {
      throw new Error('Transaction not found or access denied');
    }

    await this.prisma.transaction.delete({
      where: { id },
    });

    return true;
  }

  async getTransactionCategory(transaction: any) {
    if (!transaction.categoryId) return null;
    
    return this.prisma.category.findUnique({
      where: { id: transaction.categoryId },
    });
  }
}
