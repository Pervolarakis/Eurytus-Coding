import { DeleteChallengeApprovedEventData, Listener, Subjects } from "@eurytus/common";
import { Message } from "node-nats-streaming";
import { Challenge } from "../models/challengeModel";

export class DeleteChallengeApprovedListener extends Listener<DeleteChallengeApprovedEventData>{
    subject: Subjects.DeleteChallengeApproved = Subjects.DeleteChallengeApproved;
    QueueGroup = 'Challenges-service';
    async onMessage(data: DeleteChallengeApprovedEventData["data"], msg: Message){
        const challenge = await Challenge.findByIdAndUpdate(data.challengeId, {status: 'deleted'},{
            new: true,
            runValidators: true,
            useFindAndModify: false
        })
        msg.ack();
    }
}