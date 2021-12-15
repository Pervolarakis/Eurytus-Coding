import { currentUser } from "@eurytus/common";
import express, { NextFunction, Request, Response } from "express";

const router = express.Router();

router.get('/api/v1/users/auth/currentUser', currentUser, async(req: Request, res: Response, next: NextFunction)=>{
    res.status(200).json({success: true, data: req.currentUser})
})

export {router as currentUserRouter}