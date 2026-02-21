import 'reflect-metadata';
import { buildSchema } from 'type-graphql';
import { UserResolver } from './resolvers/UserResolver';
import { CategoryResolver } from './resolvers/CategoryResolver';
import { TransactionResolver } from './resolvers/TransactionResolver';

export async function createSchema() {
  return await buildSchema({
    resolvers: [UserResolver, CategoryResolver, TransactionResolver],
    validate: true,
  });
}
