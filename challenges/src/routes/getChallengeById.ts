import { Challenge } from "../models/challengeModel";
import express, { NextFunction, Request, Response } from 'express';
import { BasicCustomError, requireAuth, asyncHandler } from "@eurytus/common";

const router = express.Router();

router.get('/api/v1/challenges/:id', requireAuth, asyncHandler(async(req: Request, res: Response, next: NextFunction)=>{
    
    const challenge = await Challenge.findById(req.params.id);

    if(!challenge){
        return next(new BasicCustomError('Challenge Not found', 400))
    }

    if(req.currentUser?.role!=='admin' && req.currentUser?.id!==challenge?.creatorId){
        const challenge = await Challenge.findById(req.params.id).select(['-expectedOutputTests', '-expectedStructure', '-expectedDesignPatterns'])
        res.status(200).json({success: true, data: challenge})
    }else{
        res.status(200).json({success: true, data: challenge})
    }
        
}))

export {router as getChallengeById}