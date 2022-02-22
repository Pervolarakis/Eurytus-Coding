import { Challenge } from "../models/challengeModel";
import express from 'express';
import { BasicCustomError, requireAuth, asyncHandler } from "@eurytus/common";

const router = express.Router();

router.get('/api/v1/challenges/:id', requireAuth, asyncHandler(async(req,res,next)=>{
    
    try{
        const challenges = await Challenge.findById(req.params.id);
        if(req.currentUser?.role!=='admin' && req.currentUser?.id!==challenges?.creatorId){
            const challenges = await Challenge.findById(req.params.id).select(['-expectedOutputTests', '-expectedStructure', '-expectedDesignPatterns'])
            res.status(200).json({success: true, data: challenges})
        }else{
            res.status(200).json({success: true, data: challenges})
        }
        
    }catch(err){
        return next(new BasicCustomError(err, 400));
    }
}))

export {router as getChallengeById}