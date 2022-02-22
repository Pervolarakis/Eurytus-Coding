import { BasicCustomError, NotAnAdminError, requireAuth, asyncHandler } from '@eurytus/common';
import express, {Request, Response, NextFunction} from 'express';
import { CreateChallengeApprovedPublisher } from '../events/CreateChallengeApprovedPublisher';
import { DeleteChallengeApprovedPublisher } from '../events/DeleteChallengeApprovedPublisher';
import { natsWrapper } from '../events/NatsWrapper';
import { UpdateChallengeApprovedPublisher } from '../events/UpdateChallengeApprovedPublisher';
import { PendingRequest } from '../models/PendingRequests';

const router = express.Router();

router.post('/api/v1/moderate/approve/:id', requireAuth, asyncHandler(async(req: Request, res: Response, next: NextFunction)=>{

    if(req.currentUser?.role!=='admin'){
        return next(new NotAnAdminError());
    }
    
    const request = await PendingRequest.findById(req.params.id);
    if(!request){
        return next(new BasicCustomError('This Request doesnt exist', 400));
    }
    
    if(request.kind==='create'){
        new CreateChallengeApprovedPublisher(natsWrapper.client).publish({
            data: JSON.stringify({
                ...JSON.parse(request.data!),
                creatorId: request.ownerId
            })
        })
        await PendingRequest.findByIdAndRemove(req.params.id,{
            useFindAndModify: false
        });
        res.status(201).json({success: true, data: request.data});
    }
    if(request.kind==='update'){
        new UpdateChallengeApprovedPublisher(natsWrapper.client).publish({
            data: request.data!,
            challengeId: request.challengeId!
        })
        // await PendingRequest.findByIdAndRemove(req.params.id,{
        //     useFindAndModify: false
        // });
        await PendingRequest.deleteMany({created_at: {$lte: request.created_at}, challengeId: request.challengeId},{
            useFindAndModify: false
        });
        res.status(201).json({success: true, data: request.data});
    }

    if(request.kind==='delete'){
        new DeleteChallengeApprovedPublisher(natsWrapper.client).publish({
            challengeId: request.challengeId!
        })
        // await PendingRequest.findByIdAndRemove(req.params.id,{
        //     useFindAndModify: false
        // });
        await PendingRequest.deleteMany({created_at: {$lte: request.created_at}, challengeId: request.challengeId},{
            useFindAndModify: false
        });
        res.status(201).json({success: true, data: request.challengeId});
    }
    // const requestToBeApproved =  await PendingRequest.find({created_at: {$lte: request.created_at}, challengeId: request.challengeId},{
    //     useFindAndModify: false
    // });
    // console.log(requestToBeApproved)
    // await PendingRequest.deleteMany({created_at: {$lte: request.created_at}, challengeId: request.challengeId},{
    //     useFindAndModify: false
    // });
    
}))

export {router as approveRequestRouter}