import { CreateChallengeEventData, Listener, Subjects } from "@eurytus/common";
import { Message } from "node-nats-streaming";
import { Challenge } from "../models/challengeModel";

export class CreateChallengeApprovedListener extends Listener<CreateChallengeEventData>{
    subject: Subjects.CreateChallengeApproved = Subjects.CreateChallengeApproved;
    QueueGroup = 'challenges-service'
    async onMessage(data: CreateChallengeEventData["data"], msg: Message){
        const challenge = new Challenge(JSON.parse(data.data));
        await challenge.save();
        msg.ack()
    }
}