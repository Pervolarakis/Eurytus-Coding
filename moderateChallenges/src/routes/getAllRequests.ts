import { NotAnAdminError, requireAuth } from '@eurytus/common';
import express, {Request, Response, NextFunction} from 'express';
import { PendingRequest } from '../models/PendingRequests';

const router = express.Router();

router.get('/api/v1/moderate/requests', requireAuth, async(req: Request, res: Response, next: NextFunction)=>{
    
    if(req.currentUser?.role!=='admin'){
        return next(new NotAnAdminError());
    }

    const requests = await PendingRequest.find({});

    res.status(200).json({success: true, data: requests})


})

export {router as getAllRequestsRouter}