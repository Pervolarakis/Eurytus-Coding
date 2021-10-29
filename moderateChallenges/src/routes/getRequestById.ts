import { BasicCustomError, requireAuth } from '@eurytus/common';
import express, {Request, Response, NextFunction} from 'express';
import { PendingRequest } from '../models/PendingRequests';

const router = express.Router();

router.get('/api/v1/moderate/requests/:id', requireAuth, async(req: Request, res: Response, next: NextFunction)=>{
    
    const request = await PendingRequest.findById(req.params.id);

    if(!request){
        return next(new BasicCustomError('This request doesnt exist',400))
    }

    if(req.currentUser?.role!=='admin' && request?.ownerId!==req.currentUser?.id){
        return next(new BasicCustomError('You cant view this request',403));
    }

    res.status(200).json({success: true, data: request})
})

export {router as getRequestRouter}