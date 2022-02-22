import { BasicCustomError, requireAuth, asyncHandler } from '@eurytus/common';
import express, {Request, Response, NextFunction} from 'express';
import { Challenge } from '../models/challengeModel';

const router = express.Router();

router.get('/api/v1/challenges/myChallenges',requireAuth, asyncHandler(async(req: Request, res: Response, next: NextFunction)=>{
    try{
        const myChallenges = await Challenge.find({creatorId: req.currentUser?.id});
        res.status(200).json({success: true, data: myChallenges})
    }catch(err){
        return next(new BasicCustomError(err, 400));
    }
}))

export {router as getUserChallengesRouter}