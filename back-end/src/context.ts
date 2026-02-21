import { createRequire } from 'module';
const require = createRequire(import.meta.url);
import type { PrismaClient as PrismaClientType } from '@prisma/client';
import jwt from 'jsonwebtoken';
import { prismaClient } from '../prisma/prisma';


export interface Context {
  prisma: PrismaClientType;
  userId: string | undefined;
}

export const getUser = (token?: string): string | undefined => {
  if (token) {
    try {
      const actualToken = token.startsWith('Bearer ') ? token.slice(7) : token;
      const verified = jwt.verify(actualToken, process.env.JWT_SECRET || 'secret') as { userId: string };
      return verified.userId;
    } catch (err) {
      return undefined;
    }
  }
  return undefined;
};

export const context = async ({ req }: { req: any }): Promise<Context> => {
  const token = req.headers.authorization || '';
  const userId = getUser(token);
  return {
    prisma: prismaClient,
    userId,
  };
};
