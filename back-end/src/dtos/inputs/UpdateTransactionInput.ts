import { InputType, Field, Float, GraphQLISODateTime } from 'type-graphql';
import { MinLength, Min } from 'class-validator';
import { TransactionType } from '../enums/TransactionType';

@InputType()
export class UpdateTransactionInput {
  @Field(() => String, { nullable: true })
  @MinLength(1)
  description?: string;

  @Field(() => Float, { nullable: true })
  @Min(0)
  amount?: number;

  @Field(() => TransactionType, { nullable: true })
  type?: TransactionType;

  @Field(() => GraphQLISODateTime, { nullable: true })
  date?: Date;

  @Field(() => String, { nullable: true })
  categoryId?: string;
}
