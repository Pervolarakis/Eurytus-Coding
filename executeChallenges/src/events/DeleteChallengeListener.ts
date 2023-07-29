import {Listener, Subjects, DeleteChallengeEventData} from '@eurytus/common'
import { Message } from 'node-nats-streaming';
import { Challenge } from '../models/Challenge';

export class DeleteChallengeListener extends Listener<DeleteChallengeEventData>{
    subject: Subjects.DeleteChallenge = Subjects.DeleteChallenge;
    QueueGroup = 'executechallenge-service'
    async onMessage(data: DeleteChallengeEventData["data"], msg: Message){
        try{
            const challenge = await Challenge.findOneAndUpdate({_id: data.id, version: data.version-1}, {
                status: 'deleted'
            },{
                new: true,
                runValidators: true,
                useFindAndModify: false
            })
            await challenge?.save();
            msg.ack();
        }catch(err){
            console.log(err)
        }
    }
}