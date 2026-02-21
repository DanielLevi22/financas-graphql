import { Resolver, Query, Mutation, Arg, Ctx, FieldResolver, Root } from 'type-graphql';
import { Transaction } from '../../dtos/outputs/Transaction.model';
import { Category } from '../../dtos/outputs/Category.model';
import { CreateTransactionInput } from '../../dtos/inputs/CreateTransactionInput';
import { UpdateTransactionInput } from '../../dtos/inputs/UpdateTransactionInput';
import { TransactionService } from '../../services/TransactionService';
import type { Context } from '../../context';

@Resolver(() => Transaction)
export class TransactionResolver {
  @Query(() => [Transaction])
  async transactions(@Ctx() context: Context) {
    if (!context.userId) throw new Error('Not authenticated');
    
    const service = new TransactionService(context.prisma);
    return service.getAllTransactions(context.userId);
  }

  @Mutation(() => Transaction)
  async createTransaction(
    @Arg('input', () => CreateTransactionInput) input: CreateTransactionInput,
    @Ctx() context: Context
  ) {
    if (!context.userId) throw new Error('Not authenticated');
    
    const service = new TransactionService(context.prisma);
    return service.createTransaction(input, context.userId);
  }

  @Mutation(() => Transaction)
  async updateTransaction(
    @Arg('id', () => String) id: string,
    @Arg('input', () => UpdateTransactionInput) input: UpdateTransactionInput,
    @Ctx() context: Context
  ) {
    if (!context.userId) throw new Error('Not authenticated');
    
    const service = new TransactionService(context.prisma);
    return service.updateTransaction(id, input, context.userId);
  }

  @Mutation(() => Boolean)
  async deleteTransaction(
    @Arg('id', () => String) id: string,
    @Ctx() context: Context
  ) {
    if (!context.userId) throw new Error('Not authenticated');
    
    const service = new TransactionService(context.prisma);
    return service.deleteTransaction(id, context.userId);
  }

  @FieldResolver(() => Category, { nullable: true })
  async category(
    @Root() transaction: Transaction,
    @Ctx() context: Context
  ) {
    const service = new TransactionService(context.prisma);
    return service.getTransactionCategory(transaction);
  }
}
