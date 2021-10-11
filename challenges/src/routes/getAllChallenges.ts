import { Challenge } from "../models/challengeModel";
import express from 'express';
import { BasicCustomError } from "@eurytus/common";

const router = express.Router();

router.get('/api/v1/challenges/',async(req,res,next)=>{
    try{
        if(req.query.language){
            const challenges = await Challenge.find({isPublic: true, status: 'approved', ...req.query});
            res.status(200).json({success: true, data: challenges})
            return next();
        }
        const challenges = await Challenge.find({isPublic: true, status: 'approved'});
        res.status(200).json({success: true, data: challenges})
    }catch(err){
        return next(new BasicCustomError(err, 400));
    }
})

export {router as getAllChallengesRouter}