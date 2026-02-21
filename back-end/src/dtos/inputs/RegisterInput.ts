import { InputType, Field } from 'type-graphql';
import { IsEmail, MinLength } from 'class-validator';

@InputType()
export class RegisterInput {
  @Field(() => String)
  @MinLength(2)
  name!: string;

  @Field(() => String)
  @IsEmail()
  email!: string;

  @Field(() => String)
  @MinLength(6)
  password!: string;
}
