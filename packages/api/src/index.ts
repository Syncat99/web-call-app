import express, {Request, Response} from "express";
import { PrismaClient } from "@prisma/client";
import cors from "cors";
import bcrypt from "bcrypt"
const prisma = new PrismaClient()

const app = express();
app.use(cors());
app.use(express.json());

app.post('/api/createUser', async (req: Request, res: Response) => {

    const hashed = await bcrypt.hash(req.body.password, 7)
    try {
        const newUser = await prisma.user.create({
            data: {
              email: req.body.email,
              name: req.body.name,
              username: req.body.username,
              password: hashed
            },
          });
        console.log(req.body.password+": "+ hashed)
        res.status(200).send("user created");
    }
    catch (err) {
        res.status(404).send("user not created");
    }
})
app.post('/api/connect', async (req: Request, res: Response) => {
    const {username, password} = req.body.params
    console.log(req.body.params.username)
    try {
        const userConnect = await prisma.user.findUnique({
            where : {
                username: username
            }
        })
        if (!userConnect) {
            res.send("Invalid username or user does not exist")
            return
        }
        const compare = await bcrypt.compare(password, userConnect!.password)
        if (compare) {
            res.send("correct")
        }
        else {
            res.send("wrong password")
        }
    }
    catch (err) {
        console.log(err);
    }
})


app.listen("3500", () => console.log("listening on port 3500"));