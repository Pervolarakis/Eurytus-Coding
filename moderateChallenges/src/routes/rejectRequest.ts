import express, {Request,Response, NextFunction} from 'express';
import { NotAnAdminError, requireAuth, asyncHandler } from '@eurytus/common';
import { PendingRequest } from '../models/PendingRequests';

const router = express.Router();

router.delete('/api/v1/moderate/reject/:id', requireAuth, asyncHandler(async(req: Request, res: Response, next: NextFunction)=>{
    
    if(req.currentUser?.role!=='admin'){
        return next(new NotAnAdminError());
    }

    const request = await PendingRequest.findByIdAndRemove(req.params.id,{
        useFindAndModify: false
    });
    res.status(200).json({success: true, data: request});

}))

export {router as rejectRequestRouter}