import { BasicCustomError, requireAuth, YouDontOwnThisError } from '@eurytus/common';
import express, {Request, Response, NextFunction} from 'express'
import { PendingRequest } from '../models/PendingRequests';

const router = express.Router();

router.get('/api/v1/moderate/getchallengelatestrequest/:id',requireAuth, async(req: Request, res: Response, next: NextFunction)=>{
    
    const request = await PendingRequest.find({challengeId: req.params.id}).sort({created_at: -1}).limit(1);

    if(!request[0]){
        return next (new BasicCustomError('Pending Request not found', 400));
    }

    if(req.currentUser?.id!==request[0].ownerId){
        return next (new YouDontOwnThisError('Pending Request'));
    }

    res.status(200).json({success: true, data: request[0]});

})

export {router as getLatestRequestByChallengeIdRouter};