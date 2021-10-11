import express, {Request, Response, NextFunction} from 'express';
import { requireAuth, BasicCustomError, YouDontOwnThisError } from '@eurytus/common';
import { Challenge } from '../models/challengeModel';
import { natsWrapper } from '../events/NatsWrapper';
import { ChallengeNewRequestPublisher } from '../events/ChallengeNewRequestPubisher';
import { DeleteChallengePublisher} from '../events/DeleteChallengePublisher'

const router = express.Router();

router.delete('/api/v1/challenges/delete/:id', requireAuth, async(req: Request, res: Response, next: NextFunction)=>{
    
    const challenge = await Challenge.findById(req.params.id);
    if(!challenge){
        return next(new BasicCustomError('Challenge Not found', 400))
    }
    if(challenge.creatorId!==req.currentUser?.id && req.currentUser!.role!=='admin'){
        return next(new YouDontOwnThisError('Challenge'));
    }
    try{
        if(req.currentUser!.role!=='admin' && challenge.isPublic ===true){
            const message = req.body.message;
            delete req.body.message
            new ChallengeNewRequestPublisher(natsWrapper.client).publish({
                kind: 'delete',
                challengeId: req.params.id,
                message: message,
                ownerId: req.currentUser?.id!
            })
            res.status(201).json({success: true, data: 'Request submited'})
            return next();
        }
        const newChallenge = await Challenge.findByIdAndUpdate(req.params.id,{status: 'deleted'},{
            new: true,
            runValidators: true,
            useFindAndModify: false
        })
        await newChallenge?.save();
        new DeleteChallengePublisher(natsWrapper.client).publish({
            id: newChallenge?.id,
            version: newChallenge?.version!
        })
        res.status(200).json({success: true, data: newChallenge});
    }catch(err){
        return next(new BasicCustomError(err,400));
    }
})

export {router as deleteChallengeRouter}