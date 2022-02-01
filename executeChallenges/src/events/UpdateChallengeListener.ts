import {Listener, CreateChallengeEventData, Subjects, UpdateChallengeEventData} from '@eurytus/common'
import { Message } from 'node-nats-streaming';
import { Challenge } from '../models/Challenge';

export class UpdateChallengeListener extends Listener<UpdateChallengeEventData>{
    subject: Subjects.UpdateChallenge = Subjects.UpdateChallenge;
    QueueGroup = 'executechallenge-service'
    async onMessage(data: UpdateChallengeEventData["data"], msg: Message){
        let challenge = await Challenge.findOneAndUpdate({_id: data.id, version: data.version-1}, {
            expectedOutputTests: data.expectedOutputTests,
            expectedDesignPatterns: data.expectedDesignPatterns,
            expectedStructure: data.expectedStructure,
            status: data.status,
            expiresAt: data.expiresAt,
            startsAt: data.startsAt,
            ownerId: data.ownerId,
            language: data.language
        },{
            new: true,
            runValidators: true,
            useFindAndModify: false
        })
        await challenge?.save();
        msg.ack();
    }
}