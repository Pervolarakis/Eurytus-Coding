import { requireAuth, asyncHandler } from '@eurytus/common';
import express, {Request, Response, NextFunction} from 'express';
import { PendingRequest } from '../models/PendingRequests';

const router = express.Router();

router.get('/api/v1/moderate/myrequests', requireAuth, asyncHandler(async(req: Request, res: Response, next: NextFunction)=>{ 

    const requests = await PendingRequest.aggregate([
        {
            $match: {ownerId: req.currentUser?.id}
        },
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
                            message: {$last: '$message'},
                            ownerEmail: {$last: '$ownerEmail'},
                            challengeName: {$last: '$challengeName'}
                        }
                    },{
                        $project: {
                            _id: '$id',
                            challengeId: '$_id',
                            kind: '$kind',
                            ownerId: '$ownerId',
                            data: '$data',
                            created_at: '$created_at' ,
                            message: '$message',
                            ownerEmail: '$ownerEmail',
                            challengeName: '$challengeName'
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

export {router as getUserRequestsRouter}