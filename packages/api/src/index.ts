import express, {Request, Response} from "express";
import { PrismaClient } from "@prisma/client";
import cors from "cors";
const prisma = new PrismaClient()

const app = express();
app.use(cors());
app.use(express.json());

app.post('/api/createUser', (req: Request, res: Response) => {
    res.send("received");
    console.log(req.body.email)
    prisma.user.deleteMany({})
    try {
        prisma.user.deleteMany({})
        // prisma.user.create(req.body)
        console.log("success")
    } catch (err) {
        console.log(err)
    }
})


app.listen("3500", () => console.log("listening on port 3500"));