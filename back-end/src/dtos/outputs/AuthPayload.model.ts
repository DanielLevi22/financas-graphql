import { ObjectType, Field } from 'type-graphql';
import { User } from './User.model';

@ObjectType()
export class AuthPayload {
  @Field(() => String)
  token!: string;

  @Field(() => User)
  user!: User;
}
