import { InputType, Field } from 'type-graphql';

@InputType()
export class UpdateUserInput {
  @Field(() => String, { nullable: true })
  name?: string;
}
