import { BasicCustomError, requireAuth } from '@eurytus/common';
import express, {Request, Response, NextFunction} from 'express';
import { History } from '../models/History';

const router = express.Router();

router.get('/api/v1/history/getuserparticipants', requireAuth, async(req: Request, res: Response, next: NextFunction)=>{
    try{
        const challengesParticipants = await History.aggregate([
            {$match: {challengeOwnerId: req.currentUser?.id} },
            {$group: {
                _id: '$challengeId',
                count: {$sum:1}
            }}
        ])
        res.status(200).json({success: true, data: challengesParticipants})
    }catch(err){
        return next(new BasicCustomError(err, 400));
    }
})

export {router as getUserParticipants};