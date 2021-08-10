import { Listener, Subjects, UpdateChallengeApprovedEventData } from "@eurytus/common";
import { Message } from "node-nats-streaming";
import { Challenge } from "../models/challengeModel";

export class UpdateChallengeApprovedListener extends Listener<UpdateChallengeApprovedEventData>{
    subject: Subjects.UpdateChallengeApproved = Subjects.UpdateChallengeApproved;
    QueueGroup = 'challenges-service'
    async onMessage(data: UpdateChallengeApprovedEventData["data"], msg: Message){
        const challenge = await Challenge.findByIdAndUpdate(data.challengeId, JSON.parse(data.data), {
            new: true,
            runValidators: true,
            useFindAndModify: false
        })
        msg.ack();
    }
}