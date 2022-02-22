import { asyncHandler, BasicCustomError, requireAuth, YouDontOwnThisError } from '@eurytus/common';
import express, {Request, Response, NextFunction} from 'express';
import { History } from '../models/History';

const router = express.Router();

router.get('/api/v1/history/:testId', requireAuth, asyncHandler(async(req: Request, res: Response, next: NextFunction)=>{
    
    const testHistory = await History.find({challengeId: req.params.testId})

    if(!testHistory.length){
        return next(new BasicCustomError('This challenge doesnt have any participants yet!', 400));
    }

    if(testHistory[0].challengeOwnerId===req.currentUser?.id||req.currentUser?.role==='admin'){
        res.status(200).json({success: true, data: testHistory})
    }else{
        return next(new YouDontOwnThisError('Challenge'));
    }
    
}))

export {router as getTestHistoryRouter}