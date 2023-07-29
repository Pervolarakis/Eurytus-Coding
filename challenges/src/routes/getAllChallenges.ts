import { Challenge } from "../models/challengeModel";
import express, { NextFunction, Request, Response } from 'express';
import { asyncHandler } from "@eurytus/common";

const router = express.Router();

router.get('/api/v1/challenges/', asyncHandler(async(req: Request, res: Response, next: NextFunction)=>{
    
    const challenges = Challenge.find({status: 'approved', ...req.query}).select(['-expectedOutputTests', '-expectedStructure', '-expectedDesignPatterns']);
    if(req.currentUser?.role!=='admin'){
        challenges.find({isPublic: true})
    }
    const selectedChallenges = await challenges
    res.status(200).json({success: true, data: selectedChallenges})

    
}))

export {router as getAllChallengesRouter}