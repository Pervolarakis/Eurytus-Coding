import express, { NextFunction, Request, Response } from 'express';
import { History } from '../models/History';
import { BasicCustomError, requireAuth } from '@eurytus/common';

const router = express.Router();

router.get('/api/v1/history/user', requireAuth, async(req: Request, res: Response, next: NextFunction)=>{
    try{
        const userHistory = await History.find({userId: req.currentUser?.id});
        res.status(200).json({success: true, data: userHistory});
    }catch(err){
        return next(new BasicCustomError(err, 400));
    }
})

export {router as userHistoryRouter}