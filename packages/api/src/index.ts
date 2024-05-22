import cookieParser from "cookie-parser";
import express from "express";
import router from "@router";
import dotenv from "dotenv";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";
import env from "@env";

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*", // Allow all origins for testing purposes
    methods: ["GET", "POST"]
  }
});


io.on("connection", (socket) => {
  console.log("a user connected");
});

const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(cookieParser());

app.use("/api", router);
app.use(
  "/socket",
  express.static(__dirname + "/node_modules/socket.io/client-dist"),
);
server.listen('3600', () => {
  console.log("listening on 3600")
});

app.listen(env.PORT, () => console.log("listening on port 3500"));
