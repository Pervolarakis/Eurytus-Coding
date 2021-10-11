import express, {Request,Response,NextFunction} from 'express';
import { BasicCustomError,NotAnAdminError,requireAuth, validateRequestSchema } from '@eurytus/common'
import { Challenge } from '../models/challengeModel';
import { ChallengeNewRequestPublisher } from '../events/ChallengeNewRequestPubisher';
import { natsWrapper } from '../events/NatsWrapper';
import { CreateChallengePublisher } from '../events/CreateChallengePublisher';
import { createChallengeSchema } from './requestSchemas/createChallengeSchema';

const router = express.Router();

router.post('/api/v1/challenges/new', requireAuth,  createChallengeSchema, validateRequestSchema, async(req: Request,res: Response,next: NextFunction)=>{
    
    const {name, description, difficulty, isPublic, startsAt, expiresAt, tests, language, template} = req.body;
    
    try{
        
        if(req.currentUser!.role !== 'admin' && isPublic==="true"){
            console.log("edo")
            const message = req.body.message;
            delete req.body.message
            new ChallengeNewRequestPublisher(natsWrapper.client).publish({
                kind: 'create',
                data: JSON.stringify(req.body),
                message: message,
                ownerId: req.currentUser?.id!
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
            tests: tests,
            template: template,
            language: language
        })
        await challenge.save();

        new CreateChallengePublisher(natsWrapper.client).publish({
            id: challenge.id,
            tests: challenge.tests,
            status: challenge.status,
            startsAt: challenge.startsAt,
            expiresAt: challenge.expiresAt,
            language: challenge.language
        })
        res.status(201).json({success: true, data: challenge})
    }catch(err){
        return next(new BasicCustomError(err,400))
    }

})

export {router as createChallengeRouter}