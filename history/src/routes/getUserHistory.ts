import express, { NextFunction, Request, Response } from 'express';
import { History } from '../models/History';
import { asyncHandler, BasicCustomError, requireAuth } from '@eurytus/common';

const router = express.Router();

router.get('/api/v1/history/user', requireAuth, asyncHandler(async(req: Request, res: Response, next: NextFunction)=>{
   
    const userHistory = await History.find({userId: req.currentUser?.id});
    res.status(200).json({success: true, data: userHistory});

}))

export {router as userHistoryRouter}