import { BasicCustomError, requireAuth, YouDontOwnThisError } from '@eurytus/common';
import express, {Request, Response, NextFunction} from 'express';
import { History } from '../models/History';

const router = express.Router();

router.get('/api/v1/history/:testId', requireAuth, async(req: Request, res: Response, next: NextFunction)=>{
    try{
        const testHistory = await History.find({challengeId: req.params.testId})
        if(testHistory[0].challengeOwnerId===req.currentUser?.id||req.currentUser?.role==='admin'){
            res.status(200).json({success: true, data: testHistory})
        }else{
            return next(new YouDontOwnThisError('Challenge'));
        }
    }catch(err){
        return next(new BasicCustomError(err, 400))
    }
})

export {router as getTestHistoryRouter}