import { InputType, Field, Float, GraphQLISODateTime } from 'type-graphql';
import { MinLength, Min } from 'class-validator';
import { TransactionType } from '../enums/TransactionType';

@InputType()
export class CreateTransactionInput {
  @Field(() => String)
  @MinLength(1)
  description!: string;

  @Field(() => Float)
  @Min(0)
  amount!: number;

  @Field(() => TransactionType)
  type!: TransactionType;

  @Field(() => GraphQLISODateTime)
  date!: Date;

  @Field(() => String, { nullable: true })
  categoryId?: string;
}
