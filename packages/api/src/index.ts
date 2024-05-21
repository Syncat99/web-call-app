import express, { Request, Response } from "express";
import { PrismaClient, user } from "@prisma/client";
import cors from "cors";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import env from "@env";

declare module "express" {
  export interface Request {
    user?: any;
  }
}

dotenv.config();

const prisma = new PrismaClient();
const app = express();

const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
const sendToken = (res: Response, user: user) => {
  const token = jwt.sign(
    {
      id: user.id,
      username: user.username,
    },
    process.env.TOKEN_STRING as string,
    { expiresIn: "3600s" },
  );
  res.cookie("authCookie", token, {
    httpOnly: true,
  });

  return token;
};

app.post("/api/createUser", async (req: Request, res: Response) => {
  const hashed = await bcrypt.hash(req.body.password, 7);
  try {
    const newUser = await prisma.user.create({
      data: {
        email: req.body.email,
        name: req.body.name,
        username: req.body.username,
        password: hashed,
      },
    });
    const token = sendToken(res, newUser);
    res.status(201).json({
      success: true,
      data: {
        userID: newUser.id,
        token,
      },
    });
  } catch (err) {
    res.status(404).send("user not created");
  }
});

app.post("/api/connect", async (req: Request, res: Response) => {
  const { username, password } = req.body.params;
  try {
    const userConnect = await prisma.user.findUnique({
      where: {
        username: username,
      },
    });
    if (!userConnect) {
      res.send("Invalid username or user does not exist");
      return;
    }
    const compare = await bcrypt.compare(password, userConnect.password);
    if (compare) {
      const token = sendToken(res, userConnect);
      res.status(200).json({
        success: true,
        data: {
          userID: userConnect.id,
          token,
        },
      });
    } else {
      res.status(401).json({
        success: false,
      });
    }
  } catch (err) {
    console.log(err);
  }
});

function authenticateToken(req: Request, res: Response, next: any) {
  const token = req.cookies.authCookie;
  console.log(req.cookies.authCookie);
  if (!token) return res.sendStatus(401);

  jwt.verify(token, env.TOKEN_STRING, (err: any, user: any) => {
    console.log("err", err);

    if (err) return res.sendStatus(403);

    req.user = user;

    next();
  });
}

app.post("/api/tokenCheck", authenticateToken, (req, res) => {
  res.sendStatus(200);
});

app.listen("3500", () => console.log("listening on port 3500"));
