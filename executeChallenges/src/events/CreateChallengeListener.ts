import {Listener, CreateChallengeEventData, Subjects} from '@eurytus/common'
import { Message } from 'node-nats-streaming';
import { Challenge } from '../models/Challenge';

export class CreateChallengeListener extends Listener<CreateChallengeEventData>{
    subject: Subjects.CreateChallenge = Subjects.CreateChallenge;
    QueueGroup = 'executechallenge-service'
    async onMessage(data: CreateChallengeEventData["data"], msg: Message){
        const challenge = new Challenge({_id: data.id, tests: data.tests, expiresAt: data.expiresAt, startsAt: data.startsAt, status: data.status, availableLanguages: data.availableLanguages});
        await challenge.save();
        msg.ack();
    }
}