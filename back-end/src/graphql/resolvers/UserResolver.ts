import { Resolver, Query, Mutation, Arg, Ctx, FieldResolver, Root } from 'type-graphql';
import jwt from 'jsonwebtoken';
import { User } from '../../dtos/outputs/User.model';
import { AuthPayload } from '../../dtos/outputs/AuthPayload.model';
import { Category } from '../../dtos/outputs/Category.model';
import { Transaction } from '../../dtos/outputs/Transaction.model';
import { LoginInput } from '../../dtos/inputs/LoginInput';
import { RegisterInput } from '../../dtos/inputs/RegisterInput';
import { UpdateUserInput } from '../../dtos/inputs/UpdateUserInput';
import { UserService } from '../../services/UserService';
import type { Context } from '../../context';

const APP_SECRET = process.env.JWT_SECRET || 'secret';

@Resolver(() => User)
export class UserResolver {
  @Query(() => User, { nullable: true })
  async me(@Ctx() context: Context) {
    if (!context.userId) {
      throw new Error('Not authenticated');
    }
    return context.prisma.user.findUnique({
      where: { id: context.userId },
    });
  }

  @Mutation(() => AuthPayload)
  async register(
    @Arg('input', () => RegisterInput) input: RegisterInput,
    @Ctx() context: Context
  ) {
    const service = new UserService(context.prisma);
    const user = await service.register(input);
    const token = jwt.sign({ userId: user.id }, APP_SECRET);
    return { token, user };
  }

  @Mutation(() => AuthPayload)
  async login(
    @Arg('input', () => LoginInput) input: LoginInput,
    @Ctx() context: Context
  ) {
    const service = new UserService(context.prisma);
    const user = await service.login(input);
    const token = jwt.sign({ userId: user.id }, APP_SECRET);
    return { token, user };
  }

  @Mutation(() => User)
  async updateUser(
    @Arg('input', () => UpdateUserInput) input: UpdateUserInput,
    @Ctx() context: Context
  ) {
    if (!context.userId) {
      throw new Error('Not authenticated');
    }

    const service = new UserService(context.prisma);
    return service.updateUser(context.userId, input);
  }

  @FieldResolver(() => [Category])
  async categories(
    @Root() user: User,
    @Ctx() context: Context
  ) {
    return context.prisma.category.findMany({
      where: { userId: user.id },
    });
  }

  @FieldResolver(() => [Transaction])
  async transactions(
    @Root() user: User,
    @Ctx() context: Context
  ) {
    return context.prisma.transaction.findMany({
      where: { userId: user.id },
    });
  }
}
