import express, {Request, Response, NextFunction} from 'express';
import { BasicCustomError } from '../errors/BasicCustomError';
import { Challenge } from '../models/challengeModel';
import { requireAuth } from '../middlewares/requireAuth';
import { NotAnAdminError } from '../errors/NotAnAdminError';

const router = express.Router();

router.put('/api/v1/challenges/update/:id', requireAuth, async(req: Request, res: Response, next: NextFunction)=>{
    if(req.currentUser!.role!=='admin'){
        return next(new NotAnAdminError())
    }
    const challenge = await Challenge.findById(req.params.id);
    if(!challenge){
        return next(new BasicCustomError('Challenge Not found', 400))
    }
    try{
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