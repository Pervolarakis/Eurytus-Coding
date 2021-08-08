import express, {Request, Response, NextFunction} from 'express';
import { BasicCustomError,requireAuth, NotAnAdminError, YouDontOwnThisError } from '@eurytus/common';
import { Challenge } from '../models/challengeModel';
import { natsWrapper } from '../events/NatsWrapper';
import { ChallengeNewRequestPublisher } from '../events/ChallengeNewRequestPubisher';

const router = express.Router();

router.put('/api/v1/challenges/update/:id', requireAuth, async(req: Request, res: Response, next: NextFunction)=>{
    if(req.currentUser!.role!=='admin'){
        return next(new NotAnAdminError())
    }
    const challenge = await Challenge.findById(req.params.id);
    if(!challenge){
        return next(new BasicCustomError('Challenge Not found', 400))
    }
    if(challenge.creatorId!==req.currentUser?.id && req.currentUser!.role!=='admin'){
        return next(new YouDontOwnThisError('Challenge'));
    }
    try{
        if(req.currentUser!.role!=='admin'){
            new ChallengeNewRequestPublisher(natsWrapper.client).publish({
                kind: 'edit',
                data: JSON.stringify({...req.body, "id": req.params.id})
            })
            res.status(201).json({success: true, data: 'Request submited'})
        }
        const challenge = await Challenge.findByIdAndUpdate(req.params.id, req.body,{
            new: true,
            runValidators: true,
            useFindAndModify: false
        });
        res.status(200).json({success: true, data: challenge});
    }catch(err){
        return next(new BasicCustomError(err,400));
    }
    
})

export {router as editChallengeRouter}