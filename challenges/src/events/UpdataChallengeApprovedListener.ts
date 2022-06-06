import { Listener, Subjects, UpdateChallengeApprovedEventData } from "@eurytus/common";
import { Message } from "node-nats-streaming";
import { Challenge } from "../models/challengeModel";
import { natsWrapper } from "./NatsWrapper";
import { UpdateChallengePublisher } from "./UpdateChallengePublisher";

export class UpdateChallengeApprovedListener extends Listener<UpdateChallengeApprovedEventData>{
    subject: Subjects.UpdateChallengeApproved = Subjects.UpdateChallengeApproved;
    QueueGroup = 'challenges-service'
    async onMessage(data: UpdateChallengeApprovedEventData["data"], msg: Message){
        try{
            const challenge = await Challenge.findByIdAndUpdate(data.challengeId, JSON.parse(data.data), {
                new: true,
                runValidators: true,
                useFindAndModify: false
            })
            await challenge?.save();
            new UpdateChallengePublisher(natsWrapper.client).publish({
                id: challenge?.id!,
                expectedOutputTests: challenge?.expectedOutputTests!,
                expectedStructure: challenge?.expectedStructure!,
                expectedDesignPatterns: challenge?.expectedDesignPatterns!,
                status: challenge?.status!,
                startsAt: challenge?.startsAt!,
                ownerId: challenge?.creatorId!,
                expiresAt: challenge?.expiresAt!,
                version: challenge?.version!,
                language: challenge?.language!,
                isPublic: challenge?.isPublic!
            })
            msg.ack();
        }catch(err){
            console.log(err)
        }
    }
}