import express, {Request,Response,NextFunction} from 'express';
import { BasicCustomError } from '../errors/BasicCustomError';
import { requireAuth } from '../middlewares/requireAuth';
import { Challenge } from '../models/challengeModel';

const router = express.Router();

router.post('/api/v1/challenges/new', requireAuth, async(req: Request,res: Response,next: NextFunction)=>{
    const {name, description, difficulty, isPublic, expiresAt, tests} = req.body;
    console.log('eee')
    try{
        const challenge = new Challenge({
            name: name,
            description: description,
            difficulty: difficulty,
            isPublic: isPublic,
            status: 'pending',
            startsAt: Date.now(),
            expiresAt: expiresAt,
            creatorId: req.currentUser!.id,
            tests: tests
        })
        await challenge.save();
        res.status(201).json({success: true, data: challenge})
    }catch(err){
        return next(new BasicCustomError(err,400))
    }

})

export {router as createChallengeRoute}