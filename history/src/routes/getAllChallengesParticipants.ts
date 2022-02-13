import { asyncHandler, NotAnAdminError, requireAuth } from '@eurytus/common';
import express, {Request, Response, NextFunction} from 'express';
import { History } from '../models/History';

const router = express.Router();

router.get('/api/v1/history/getallparticipants', requireAuth, asyncHandler(async(req: Request, res: Response, next: NextFunction)=>{
    
    if(req.currentUser?.role!=='admin'){
        return next(new NotAnAdminError());
    }
    const challengesParticipants = await History.aggregate([
        {$group: {
            _id: '$challengeId',
            count: {$sum:1}
        }}
    ])
    res.status(200).json({success: true, data: challengesParticipants})
    
}))

export {router as getAllParticipants}