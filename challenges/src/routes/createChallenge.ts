import express, {Request,Response,NextFunction} from 'express';
import { BasicCustomError, asyncHandler ,requireAuth, validateRequestSchema } from '@eurytus/common'
import { Challenge } from '../models/challengeModel';
import { ChallengeNewRequestPublisher } from '../events/ChallengeNewRequestPubisher';
import { natsWrapper } from '../events/NatsWrapper';
import { CreateChallengePublisher } from '../events/CreateChallengePublisher';
import { createChallengeSchema } from './requestSchemas/createChallengeSchema';

const router = express.Router();

router.post('/api/v1/challenges/new', requireAuth,  createChallengeSchema, validateRequestSchema, asyncHandler(async(req: Request,res: Response,next: NextFunction)=>{
    
    const {name, description, difficulty, isPublic, startsAt, expiresAt, expectedOutputTests, expectedStructure, expectedDesignPatterns, language, template} = req.body;
    
    if(req.currentUser!.role !== 'admin' && isPublic==="true"){
        const message = req.body.message;
        delete req.body.message
        new ChallengeNewRequestPublisher(natsWrapper.client).publish({
            kind: 'create',
            data: JSON.stringify(req.body),
            message: message,
            ownerId: req.currentUser?.id!,
            created_at: new Date().toISOString(),
            ownerEmail: req.currentUser?.email!,
            challengeName: name
        })

        res.status(201).json({success: true, data: 'Request submited'})
        return next();
    }
    const challenge = new Challenge({
        name: name,
        description: description,
        difficulty: difficulty,
        isPublic: isPublic,
        status: 'approved',
        startsAt: startsAt,
        expiresAt: expiresAt,
        creatorId: req.currentUser!.id,
        expectedOutputTests: expectedOutputTests, 
        expectedStructure: expectedStructure, 
        expectedDesignPatterns: expectedDesignPatterns,
        template: template,
        language: language
    })
    await challenge.save();

    new CreateChallengePublisher(natsWrapper.client).publish({
        id: challenge.id,
        expectedOutputTests: challenge.expectedOutputTests, 
        expectedStructure: challenge.expectedStructure, 
        ownerId: challenge.creatorId,
        expectedDesignPatterns: challenge.expectedDesignPatterns,
        status: challenge.status,
        startsAt: challenge.startsAt,
        expiresAt: challenge.expiresAt,
        language: challenge.language
    })
    res.status(201).json({success: true, data: challenge})

}))

export {router as createChallengeRouter}