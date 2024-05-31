import { Resolver, Mutation, Arg, Ctx } from "type-graphql";
import { validate } from "class-validator";
import * as argon2 from "argon2";
import * as jwt from "jsonwebtoken";
import UserInput from "../../types/UserInput";
import User from "../../models/User/User";


@Resolver()
class UserResolver {

  @Mutation(_returns => String)
  async signup(@Arg("userData") userData: UserInput, @Ctx() context): Promise<string> {
    try {
      const hashedPassword = await argon2.hash(userData.password);
      const user = new User();
      Object.assign(user, { ...userData, password: hashedPassword });

      const errors = await validate(user);
      if (errors.length > 0) {
        throw new Error('Data validation failed');
      };

      await User.save(user);

      const token = jwt.sign({
          userId: user.id,
          userName: user.firstName + " " + user.lastName,
          email: user.email
        }, 
        process.env.JWT_SECRET, 
        { expiresIn: "1h" }
    );

    context.res.setHeader("Set-Cookie", `token=${token}`);

    return JSON.stringify({
      userId: user.id,
      userName: user.firstName + " " + user.lastName,
      email: user.email
    });
      
    } catch (error) {
      if (error.message === 'Data validation failed') {
        throw new Error(error.message);
      };
      throw new Error('Internal server error');
    };
  };
};

export default UserResolver;