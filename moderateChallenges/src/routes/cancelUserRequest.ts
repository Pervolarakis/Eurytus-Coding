import { BasicCustomError, requireAuth, YouDontOwnThisError } from '@eurytus/common';
import express, {Request, Response, NextFunction} from 'express'
import { PendingRequest } from '../models/PendingRequests';

const router = express.Router();

router.delete('/api/v1/moderate/cancel/:id',requireAuth, async(req: Request, res: Response, next: NextFunction)=>{
    
    const request = await PendingRequest.findById(req.params.id);

    if(!request){
        return next (new BasicCustomError('Pending Request not found', 400));
    }

    if(req.currentUser?.id!==request.ownerId){
        return next (new YouDontOwnThisError('Pending Request'));
    }

    await PendingRequest.findByIdAndRemove(req.params.id,{
        useFindAndModify: false
    });

    res.status(200).json({success: true, data: request.data});

})

export {router as cancelUserRequestRouter};