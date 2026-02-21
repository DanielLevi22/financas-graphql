import { InputType, Field } from 'type-graphql';
import { MinLength } from 'class-validator';

@InputType()
export class UpdateCategoryInput {
  @Field(() => String, { nullable: true })
  @MinLength(1)
  title?: string;

  @Field(() => String, { nullable: true })
  description?: string;

  @Field(() => String, { nullable: true })
  icon?: string;

  @Field(() => String, { nullable: true })
  color?: string;
}
