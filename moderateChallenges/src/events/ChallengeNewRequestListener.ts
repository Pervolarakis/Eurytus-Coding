import { Message } from "node-nats-streaming";
import { ChallengeNewRequestEventData, Listener, Subjects } from "@eurytus/common";
import { PendingRequest } from "../models/PendingRequests";

export class ChallengeNewRequestListener extends Listener<ChallengeNewRequestEventData>{

    subject: Subjects.ChallengeNewRequest = Subjects.ChallengeNewRequest;
    QueueGroup = 'pendingChallenges-service';

    async onMessage(data: ChallengeNewRequestEventData["data"], msg: Message){
        if(data.kind!=='create'){
            const request = await PendingRequest.find({challengeId: data.challengeId}).sort({created_at: -1}).limit(1);
            if(request[0].kind==='delete'){
                return msg.ack();
            }
        }
        const request = new PendingRequest(data);
        await request.save();
        msg.ack();
    }
}