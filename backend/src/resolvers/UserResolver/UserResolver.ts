import { Resolver, Mutation, Arg, Ctx } from "type-graphql";
import { validate } from "class-validator";
import * as argon2 from "argon2";
import { UserSignup, UserLogin } from "../../types/userInputs";
import User from "../../models/User/User";
import authenticate from "../../http/utils/authenticate";


@Resolver()
class UserResolver {

  @Mutation(_returns => String)
  async login(@Arg("userData") userData: UserLogin , @Ctx() context): Promise<string> {
    try {
      const user = await User.findOneByOrFail({ email: userData.email });

      if (!user) throw new Error("Invalide email");
      if (!argon2.verify(user.password, userData.password)) {
        throw new Error("Invalid password");
      };

      return authenticate(context, user);

    } catch (error) {
      if (error.message === 'Invalid email' || error.message === 'Invalid password') {
        throw new Error(error.message);
      };
      throw new Error('Internal server error');
    };
  };

  @Mutation(_returns => String)
  async signup(@Arg("userData") userData: UserSignup, @Ctx() context): Promise<string> {
    try {
      const hashedPassword = await argon2.hash(userData.password);
      const user = new User();
      Object.assign(user, { ...userData, password: hashedPassword });

      const errors = await validate(user);
      if (errors.length > 0) {
        throw new Error('Data validation failed');
      };

      await User.save(user);

      return authenticate(context, user);
      
    } catch (error) {
      if (error.message === 'Data validation failed') {
        throw new Error(error.message);
      };
      throw new Error('Internal server error');
    };
  };
};

export default UserResolver;