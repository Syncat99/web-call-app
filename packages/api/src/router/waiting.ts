import { assertPrivate } from "@auth";
import { getWaiting } from "@lib/waiting";
import { Router } from "express";

const waitingRouter = Router()

waitingRouter.post("/waiting", assertPrivate((req,res,next)=>{
    const { language, peerId } = req.body;
    const { id:userId } = req.user;

    const peer = getWaiting().addUser({userId,language,peerId});
    if(!peer) return res.status(200).json({
        status:"waiting"
    });

    return res.status(200).json({ status:"success", peer });
}));

export default waitingRouter;