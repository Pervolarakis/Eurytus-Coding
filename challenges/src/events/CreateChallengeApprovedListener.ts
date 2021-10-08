import { CreateChallengeApprovedEventData, Listener, Subjects } from "@eurytus/common";
import { Message } from "node-nats-streaming";
import { Challenge } from "../models/challengeModel";
import { CreateChallengePublisher } from "./CreateChallengePublisher";
import { natsWrapper } from "./NatsWrapper";

export class CreateChallengeApprovedListener extends Listener<CreateChallengeApprovedEventData>{
    subject: Subjects.CreateChallengeApproved = Subjects.CreateChallengeApproved;
    QueueGroup = 'challenges-service'
    async onMessage(data: CreateChallengeApprovedEventData["data"], msg: Message){
        const challenge = new Challenge({...JSON.parse(data.data), status:'approved'});
        await challenge.save();
        new CreateChallengePublisher(natsWrapper.client).publish({
            id: challenge.id,
            expectedOutputTests: challenge.expectedOutputTests,
            expectedStructure: challenge.expectedStructure,
            expectedDesignPatterns: challenge.expectedDesignPatterns,
            status: challenge.status,
            startsAt: challenge.startsAt,
            expiresAt: challenge.expiresAt,
            language: challenge.language
        })
        msg.ack()
    }
}