import cookieParser from "cookie-parser";
import express from "express";
import router from "@router";
import dotenv from "dotenv";
import cors from "cors";

import env from "@env";
dotenv.config();

const app = express();

const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));

app.use(express.json());
app.use(cookieParser());

app.use("/api", router);

app.listen(env.PORT, () => console.log("listening on port " + env.PORT));
