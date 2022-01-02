import { NotAnAdminError, requireAuth } from '@eurytus/common';
import express, {Request, Response, NextFunction} from 'express';
import { PendingRequest } from '../models/PendingRequests';

const router = express.Router();

router.get('/api/v1/moderate/requests', requireAuth, async(req: Request, res: Response, next: NextFunction)=>{
    
    if(req.currentUser?.role!=='admin'){
        return next(new NotAnAdminError());
    }

    const requests = await PendingRequest.aggregate([
        {
            $sort: { created_at: 1 } ,
        },
        { 
            $group: { 
                _id: '$challengeId',
                id: {$last: '$_id'},
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

export {router as getAllRequestsRouter}