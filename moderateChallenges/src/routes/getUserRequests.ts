import { requireAuth } from '@eurytus/common';
import express, {Request, Response, NextFunction} from 'express';
import { PendingRequest } from '../models/PendingRequests';

const router = express.Router();

router.get('/api/v1/moderate/myrequests', requireAuth, async(req: Request, res: Response, next: NextFunction)=>{ 

    const requests = await PendingRequest.aggregate([
        {
            $match: {ownerId: req.currentUser?.id}
        },
        {
            $sort: { created_at: 1 } ,
        },
        { 
            $group: { 
                _id: '$challengeId',
                kind: {$last: '$kind'},
                ownerId: {$last: '$ownerId'},
                data: {$last: '$data'},
                created_at: { $last: '$created_at' },
                message: {$last: '$message'}
            }
        },
    ]);


    res.status(200).json({success: true, data: requests})

})

export {router as getUserRequestsRouter}