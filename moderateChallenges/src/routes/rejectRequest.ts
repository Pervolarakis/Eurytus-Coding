import express, {Request,Response, NextFunction} from 'express';
import { BasicCustomError, NotAnAdminError, requireAuth } from '@eurytus/common';
import { PendingRequest } from '../models/PendingRequests';

const router = express.Router();

router.delete('/api/v1/moderate/reject/:id', requireAuth, async(req: Request, res: Response, next: NextFunction)=>{
    if(req.currentUser?.role!=='admin'){
        return next(new NotAnAdminError());
    }

    try{
        const request = await PendingRequest.findByIdAndRemove(req.params.id,{
            useFindAndModify: false
        });
        res.status(200).json({success: true, data: request});
    }
    catch(err){
        return next(new BasicCustomError(err,400));
    }
})

export {router as rejectRequestRouter}