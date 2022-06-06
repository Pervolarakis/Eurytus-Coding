import {Listener, CreateChallengeEventData, Subjects} from '@eurytus/common'
import { Message } from 'node-nats-streaming';
import { Challenge } from '../models/Challenge';

export class CreateChallengeListener extends Listener<CreateChallengeEventData>{
    subject: Subjects.CreateChallenge = Subjects.CreateChallenge;
    QueueGroup = 'executechallenge-service'
    async onMessage(data: CreateChallengeEventData["data"], msg: Message){
        try{
            const challenge = new Challenge({
                _id: data.id, 
                expectedOutputTests: data.expectedOutputTests,
                expectedDesignPatterns: data.expectedDesignPatterns,
                expectedStructure: data.expectedStructure, 
                ownerId: data.ownerId,
                expiresAt: data.expiresAt, 
                isPublic: data.isPublic,
                startsAt: data.startsAt, 
                status: data.status, 
                language: data.language});
            await challenge.save();
            msg.ack();
        }catch(err){
            console.log(err)
        }
    }
}