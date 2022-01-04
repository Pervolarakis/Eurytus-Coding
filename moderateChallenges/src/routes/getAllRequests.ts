import { NotAnAdminError, requireAuth, asyncHandler } from '@eurytus/common';
import express, {Request, Response, NextFunction} from 'express';
import { PendingRequest } from '../models/PendingRequests';

const router = express.Router();

router.get('/api/v1/moderate/requests', requireAuth, asyncHandler(async(req: Request, res: Response, next: NextFunction)=>{
    
    if(req.currentUser?.role!=='admin'){
        return next(new NotAnAdminError());
    }
    //a
    const requests = await PendingRequest.aggregate([
        {
            $sort: { created_at: 1 } ,
        },
        {
            $facet: {
                createRequests: [
                   { $match: { challengeId: { $exists:false } }}
                ],
                otherRequests: [
                    { $match: { challengeId: { $exists:true } }},
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
                    },{
                        $project: {
                            _id: '$id',
                            challengeId: '$_id',
                            kind: '$kind',
                            ownerId: '$ownerId',
                            data: '$data',
                            created_at: '$created_at' ,
                            message: '$message'
                        }
                    }
                ]
            }
        },
        {$project: {activity:{$setUnion:['$createRequests','$otherRequests']}}},
        {$unwind: '$activity'},
        {$replaceRoot: { newRoot: "$activity" }}
    ]);
    
    res.status(200).json({success: true, data: requests})


}))

export {router as getAllRequestsRouter}