import express, {Request, Response} from "express";
import { PrismaClient } from "@prisma/client";
import cors from "cors";
const prisma = new PrismaClient()

const app = express();
app.use(cors());
app.use(express.json());

app.post('/api/createUser', async (req: Request, res: Response) => {
    console.log(req.body.email)
    try {
        const newUser = await prisma.user.create({
            data: {
              email: req.body.email,
              name: req.body.name,
              username: req.body.username,
              password: req.body.password
            },
          });
        res.status(200).send("user created");
    }
    catch (err) {
        res.status(404).send("user not created");
    }
})
app.get('/api/connect', async (req: Request, res: Response) => {
    try {
        const userConnect = await prisma.user.findUnique({
            where : {
                username: req.body.username,
                password: req.body.password
            }
        })
        if (userConnect) {
            res.status(200).send(1);
        }
    }
    catch (err) {
        res.send("not found");
        console.log(err);
    }
})


app.listen("3500", () => console.log("listening on port 3500"));