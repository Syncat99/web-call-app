import jwt from "jsonwebtoken";
import env from "@env";
import { user } from "@prisma/client";
import { NextFunction, Request, RequestHandler, Response } from "express";

export interface RequestWithUser extends Request {
  user: user;
}

export type PrivateRequestHandler = (
  req: RequestWithUser,
  res: Response,
  next: NextFunction,
) => any;

export const assertPrivate =
  (handler: PrivateRequestHandler) =>
  (req: Request, res: Response, next: NextFunction) => {
    //@ts-ignore
    if (!req.user) {
      return res.sendStatus(401);
    }

    return handler(req as RequestWithUser, res, next);
  };

export const authenticateToken: RequestHandler = (req, res, next) => {
  const token = req.cookies.authCookie;
  // console.log(req.cookies.authCookie);
  if (!token) return res.sendStatus(401);

  jwt.verify(token, env.TOKEN_STRING, (err: any, user: any) => {
    if (err) return res.sendStatus(403);
    (req as RequestWithUser).user = user;

    next();
  });
};

export const sendToken = (res: Response, { id, username }: user) => {
  const token = jwt.sign(
    {
      id,
      username,
    },
    process.env.TOKEN_STRING as string,
    { expiresIn: "3600s" },
  );
  res.cookie("authCookie", token, {
    httpOnly: true,
  });

  return token;
};
