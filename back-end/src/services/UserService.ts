import type { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import type { RegisterInput } from '../dtos/inputs/RegisterInput';
import type { LoginInput } from '../dtos/inputs/LoginInput';
import type { UpdateUserInput } from '../dtos/inputs/UpdateUserInput';

export class UserService {
  constructor(private prisma: PrismaClient) {}

  async getUserById(id: string) {
    return this.prisma.user.findUnique({
      where: { id },
    });
  }

  async getUserByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  async register(input: RegisterInput) {
    const hashedPassword = await bcrypt.hash(input.password, 10);
    
    return this.prisma.user.create({
      data: {
        name: input.name,
        email: input.email,
        password: hashedPassword,
      },
    });
  }

  async login(input: LoginInput) {
    const user = await this.getUserByEmail(input.email);
    
    if (!user) {
      throw new Error('No such user found');
    }

    const valid = await bcrypt.compare(input.password, user.password);
    
    if (!valid) {
      throw new Error('Invalid password');
    }

    return user;
  }

  async updateUser(userId: string, input: UpdateUserInput) {
    const data: any = {};
    if (input.name) data.name = input.name;

    return this.prisma.user.update({
      where: { id: userId },
      data,
    });
  }
}
