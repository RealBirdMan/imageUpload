import { User } from "src/entity/User";
import { sign } from "jsonwebtoken";

export const createUserToken = (user: User) => {
  return {
    accessToken: sign({ userId: user.id }, process.env.ACCESS_TOKEN_SECRET!, {
      expiresIn: "6h",
    }),
  };
};
