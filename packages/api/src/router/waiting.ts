import { assertPrivate } from "@auth";
import { getWaiting } from "@lib/waiting";
import { Router } from "express";

const waitingRouter = Router();

waitingRouter.post(
  "/join",
  assertPrivate((req, res, next) => {
    const { language, peerId } = req.body;
    const { id: userId } = req.user;

    const peer = getWaiting().addUser({ userId, language, peerId });
    console.log("found when adding", peer);

    if (!peer)
      res.status(200).json({
        status: "waiting",
      });

    return res.status(200).json({ status: "success", peer });
  })
);

waitingRouter.get(
  "/status",
  assertPrivate((req, res) => {
    const { id: userId } = req.user;
    const peer = getWaiting().getUser(userId);

    if (!peer)
      return res
        .status(404)
        .json({ status: "error", message: "User not found" });

    console.log("status checked", peer);

    return res.status(200).json(peer);
  })
);

export default waitingRouter;
