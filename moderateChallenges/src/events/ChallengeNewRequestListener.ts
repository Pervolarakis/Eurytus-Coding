import { Message } from "node-nats-streaming";
import { ChallengeNewRequestEventData, Listener, Subjects } from "@eurytus/common";
import { PendingRequest } from "../models/PendingRequests";

export class ChallengeNewRequestListener extends Listener<ChallengeNewRequestEventData>{

    subject: Subjects.ChallengeNewRequest = Subjects.ChallengeNewRequest;
    QueueGroup = 'pendingChallenges-service';

    async onMessage(data: ChallengeNewRequestEventData["data"], msg: Message){
        const request = new PendingRequest({kind: data.kind, data: data.data});
        await request.save();
        msg.ack();
    }
}