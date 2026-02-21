import { Resolver, Query, Mutation, Arg, Ctx, FieldResolver, Root } from 'type-graphql';
import { Category } from '../../dtos/outputs/Category.model';
import { Transaction } from '../../dtos/outputs/Transaction.model';
import { CreateCategoryInput } from '../../dtos/inputs/CreateCategoryInput';
import { UpdateCategoryInput } from '../../dtos/inputs/UpdateCategoryInput';
import { CategoryService } from '../../services/CategoryService';
import type { Context } from '../../context';

@Resolver(() => Category)
export class CategoryResolver {
  @Query(() => [Category])
  async categories(@Ctx() context: Context) {
    if (!context.userId) throw new Error('Not authenticated');
    
    const service = new CategoryService(context.prisma);
    return service.getAllCategories(context.userId);
  }

  @Mutation(() => Category)
  async createCategory(
    @Arg('input', () => CreateCategoryInput) input: CreateCategoryInput,
    @Ctx() context: Context
  ) {
    if (!context.userId) throw new Error('Not authenticated');
    
    const service = new CategoryService(context.prisma);
    return service.createCategory(input, context.userId);
  }

  @Mutation(() => Category)
  async updateCategory(
    @Arg('id', () => String) id: string,
    @Arg('input', () => UpdateCategoryInput) input: UpdateCategoryInput,
    @Ctx() context: Context
  ) {
    if (!context.userId) throw new Error('Not authenticated');
    
    const service = new CategoryService(context.prisma);
    return service.updateCategory(id, input, context.userId);
  }

  @Mutation(() => Boolean)
  async deleteCategory(
    @Arg('id', () => String) id: string,
    @Ctx() context: Context
  ) {
    if (!context.userId) throw new Error('Not authenticated');
    
    const service = new CategoryService(context.prisma);
    return service.deleteCategory(id, context.userId);
  }

  @FieldResolver(() => [Transaction])
  async transactions(
    @Root() category: Category,
    @Ctx() context: Context
  ) {
    const service = new CategoryService(context.prisma);
    return service.getCategoryTransactions(category.id);
  }
}
