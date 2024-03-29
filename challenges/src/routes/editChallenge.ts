import express, {Request, Response, NextFunction} from 'express';
import { BasicCustomError,requireAuth, asyncHandler, YouDontOwnThisError, validateRequestSchema } from '@eurytus/common';
import { Challenge } from '../models/challengeModel';
import { natsWrapper } from '../events/NatsWrapper';
import { ChallengeNewRequestPublisher } from '../events/ChallengeNewRequestPubisher';
import { UpdateChallengePublisher } from '../events/UpdateChallengePublisher';
import { editChallengeSchema } from './requestSchemas/editChallengeSchema';

const router = express.Router();

router.put('/api/v1/challenges/update/:id', requireAuth, editChallengeSchema, validateRequestSchema, asyncHandler(async(req: Request, res: Response, next: NextFunction)=>{
    
    const challenge = await Challenge.findById(req.params.id);
    if(!challenge){
        return next(new BasicCustomError('Challenge Not found', 400))
    }
    
    if(challenge.creatorId!==req.currentUser?.id && req.currentUser!.role!=='admin'){
        return next(new YouDontOwnThisError('Challenge'));
    }
    
    if(req.currentUser!.role!=='admin' && (challenge.isPublic ===true || req.body.isPublic === 'true')){
        const message = req.body.message;
        delete req.body.message
        new ChallengeNewRequestPublisher(natsWrapper.client).publish({
            kind: 'update',
            challengeId: req.params.id,
            data: JSON.stringify(req.body),
            message: message,
            ownerId: req.currentUser?.id!,
            created_at: new Date().toISOString(),
            ownerEmail: req.currentUser?.email!,
            challengeName: challenge.name
        })
        res.status(201).json({success: true, data: 'Request submited'})
        return next();
    }
    const newChallenge = await Challenge.findByIdAndUpdate(req.params.id, req.body,{
        new: true,
        runValidators: true,
        useFindAndModify: false
    });
    await newChallenge?.save();
    
    new UpdateChallengePublisher(natsWrapper.client).publish({
        id: newChallenge?.id!,
        ownerId: newChallenge?.creatorId!,
        expectedOutputTests: newChallenge?.expectedOutputTests!, 
        expectedStructure: newChallenge?.expectedStructure!, 
        expectedDesignPatterns: newChallenge?.expectedDesignPatterns!,
        status: newChallenge?.status!,
        startsAt: newChallenge?.startsAt!,
        expiresAt: newChallenge?.expiresAt!,
        version: newChallenge?.version!,
        language: newChallenge?.language!,
        isPublic: newChallenge?.isPublic!,

    })
    res.status(200).json({success: true, data: newChallenge});
    
    
}))

export {router as editChallengeRouter}