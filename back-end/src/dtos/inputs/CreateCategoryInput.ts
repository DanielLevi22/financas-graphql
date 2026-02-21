import { InputType, Field } from 'type-graphql';
import { MinLength } from 'class-validator';

@InputType()
export class CreateCategoryInput {
  @Field(() => String)
  @MinLength(1)
  title!: string;

  @Field(() => String, { nullable: true })
  description?: string;

  @Field(() => String, { nullable: true })
  icon?: string;

  @Field(() => String, { nullable: true })
  color?: string;
}
