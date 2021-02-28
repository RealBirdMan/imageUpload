import {
  Resolver,
  Query,
  Mutation,
  Arg,
  ObjectType,
  Field,
  UseMiddleware,
  Ctx,
} from "type-graphql";
import { hash, compare } from "bcryptjs";

import { User } from "../../entity/User";
import { isAuth } from "../../auth/isAuthMiddleware";
import { AuthContext } from "../../interface/authContext";
import { createUserToken } from "../../auth/auth";
import { AuthInput } from "./input/AuthInput";

@ObjectType()
class LoginResponse {
  @Field()
  accessToken: string;
}

@Resolver()
export class UserResolver {
  @Query(() => String)
  @UseMiddleware(isAuth)
  protectedRoute(@Ctx() { payload }: AuthContext) {
    //console.log(payload);
    return `I'm protected. User Id is ${payload!.userId}`;
  }

  @Query(() => [User])
  async users() {
    let user = await User.find();
    return user;
  }

  @Mutation(() => Boolean)
  async register(@Arg("input") { email, password }: AuthInput) {
    const hashedPw = await hash(password, 12);

    try {
      await User.insert({ email, password: hashedPw });
      return true;
    } catch (err) {
      throw new Error("An unknown error occurred");
    }
  }

  @Mutation(() => LoginResponse)
  async login(
    @Arg("input") { email, password }: AuthInput
  ): Promise<LoginResponse> {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      throw new Error("could not find user");
    }

    const valid = await compare(password, user.password);
    if (!valid) {
      throw new Error("wrong Password");
    }

    const token = createUserToken(user);
    return token;
  }
}
