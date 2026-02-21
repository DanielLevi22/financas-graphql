export const TransactionType = {
  INCOME: 'INCOME',
  EXPENSE: 'EXPENSE',
} as const;

export type TransactionType = typeof TransactionType[keyof typeof TransactionType];

export interface User {
  id: string;
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  id: string;
  title: string;
  description?: string;
  icon?: string;
  color?: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export interface Transaction {
  id: string;
  description: string;
  amount: number;
  type: TransactionType;
  date: string;
  categoryId?: string;
  category?: Category;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export interface AuthPayload {
  token: string;
  user: User;
}

export interface RegisterInput {
  name: string;
  email: string;
  password: string;
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface CreateCategoryInput {
  title: string;
  description?: string;
  icon?: string;
  color?: string;
}

export interface UpdateCategoryInput {
  title?: string;
  description?: string;
  icon?: string;
  color?: string;
}

export interface CreateTransactionInput {
  description: string;
  amount: number;
  type: TransactionType;
  date: string;
  categoryId?: string;
}

export interface UpdateTransactionInput {
  description?: string;
  amount?: number;
  type?: TransactionType;
  date?: string;
  categoryId?: string;
}
