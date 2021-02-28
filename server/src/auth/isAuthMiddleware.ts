import { MiddlewareFn } from "type-graphql";
import { verify } from "jsonwebtoken";

import { AuthContext } from "src/interface/authContext";

export const isAuth: MiddlewareFn<AuthContext> = ({ context }, next) => {
  const authorization = context.req.headers["authorization"];

  if (!authorization) throw new Error("not authorized");

  try {
    const token = authorization.split(" ")[1];
    const payload = verify(token, process.env.ACCESS_TOKEN_SECRET!);
    context.payload = payload as any;
  } catch (err) {
    throw new Error("not authorized");
  }

  return next();
};
