import { registerEnumType } from 'type-graphql';

export enum TransactionType {
  INCOME = 'INCOME',
  EXPENSE = 'EXPENSE',
}

registerEnumType(TransactionType, {
  name: 'TransactionType',
  description: 'The type of transaction',
});
