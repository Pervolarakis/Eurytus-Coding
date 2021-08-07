import { Challenge } from "../models/challengeModel";
import express from 'express';
import { BasicCustomError } from "../errors/BasicCustomError";

const router = express.Router();

router.get('/api/v1/challenges/',async(req,res,next)=>{
    try{
        const challenges = await Challenge.find({isPublic: true, status: 'approved'});
        res.status(200).json({success: true, data: challenges})
    }catch(err){
        return next(new BasicCustomError(err, 400));
    }
})

export {router as getAllChallengesRouter}