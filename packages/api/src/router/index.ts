import { authenticateToken, sendToken } from "@auth";
import { prisma } from "@lib/db";
import { Router } from "express";
import bcrypt from "bcrypt";

const router = Router();

router.post("/createUser", async (req, res) => {
  const { email, name, username, password } = req.body;

  console.log(req.body);

  const hashed = await bcrypt.hash(password, 7);

  try {
    const newUser = await prisma.user.create({
      data: {
        email,
        name,
        username,
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
    res.status(500).send("user not created");
  }
});

router.post("/connect", async (req, res) => {
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
    res.status(400).send("user not found");
  }
});
router.post("/newRoom", async (req, res) => {
  const { user1ID, user2ID } = req.body;
  const user_1 = await prisma.user.findUnique({ where: { id: user1ID } });
  const user_2 = await prisma.user.findUnique({ where: { id: user2ID } });
  try {
    const room = await prisma.room.create({
      data: {
        participants: {
          connect: [{ id: user1ID }, { id: user2ID }],
        },
        messages: { create: [] },
      },
    });
    res.status(201).json({ success: true, room });
  } catch (error) {
    console.error("Error creating room:", error);
    res.status(500).json({ success: false, error: "Could not create room" });
  }
});

router.post("/tokenCheck", authenticateToken, (req, res) => {
  res.sendStatus(200);
});

export default router;
