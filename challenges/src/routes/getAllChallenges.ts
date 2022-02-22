import { Challenge } from "../models/challengeModel";
import express, { NextFunction, Request, Response } from 'express';
import { asyncHandler } from "@eurytus/common";

const router = express.Router();

router.get('/api/v1/challenges/', asyncHandler(async(req: Request, res: Response, next: NextFunction)=>{
    
    const challenges = await Challenge.find({isPublic: true, status: 'approved', ...req.query}).select(['-expectedOutputTests', '-expectedStructure', '-expectedDesignPatterns']);
    res.status(200).json({success: true, data: challenges})
    
}))

export {router as getAllChallengesRouter}