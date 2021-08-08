import express, {Request, Response, NextFunction} from 'express';
import { requireAuth, NotAnAdminError, BasicCustomError } from '@eurytus/common';
import { Challenge } from '../models/challengeModel';

const router = express.Router();

router.delete('/api/v1/challenges/delete/:id', requireAuth, async(req: Request, res: Response, next: NextFunction)=>{
    if(req.currentUser!.role!=='admin'){
        return next(new NotAnAdminError());
    }
    const challenge = await Challenge.findById(req.params.id);
    if(!challenge){
        return next(new BasicCustomError('Challenge Not found', 400))
    }
    try{
        const challenge = await Challenge.findByIdAndUpdate(req.params.id,{status: 'deleted'},{
            new: true,
            runValidators: true,
            useFindAndModify: false
        })
        res.status(200).json({success: true, data: challenge});
    }catch(err){
        return next(new BasicCustomError(err,400));
    }
})

export {router as deleteChallengeRouter}