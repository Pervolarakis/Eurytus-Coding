import { requireAuth } from '@eurytus/common';
import express, {Request, Response, NextFunction} from 'express';
import { PendingRequest } from '../models/PendingRequests';

const router = express.Router();

router.get('/api/v1/moderate/myrequests', requireAuth, async(req: Request, res: Response, next: NextFunction)=>{ 

    const requests = await PendingRequest.find({ownerId: req.currentUser?.id});
    res.status(200).json({success: true, data: requests})

})

export {router as getUserRequestsRouter}