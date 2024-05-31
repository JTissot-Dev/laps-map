import { InputType, Field } from "type-graphql";
import User from "../models/User/User";

@InputType()
class UserInput implements Partial<User> {
  @Field(_type => String)
  firstName!: string;

  @Field(_type => String)
  lastName!: string;

  @Field(_type => String)
  birthDay!: Date;

  @Field(_type => String)
  email!: string;

  @Field(_type => String)
  password!: string;
};

export default UserInput;