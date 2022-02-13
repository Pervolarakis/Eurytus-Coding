import { BasicCustomError, requireAuth, asyncHandler } from '@eurytus/common';
import express, {Request, Response, NextFunction} from 'express';
import { Challenge } from '../models/challengeModel';

const router = express.Router();

router.get('/api/v1/challenges/myChallenges',requireAuth, asyncHandler(async(req: Request, res: Response, next: NextFunction)=>{

    const myChallenges = await Challenge.find({creatorId: req.currentUser?.id, status: 'approved'});
    res.status(200).json({success: true, data: myChallenges})

}))

export {router as getUserChallengesRouter}