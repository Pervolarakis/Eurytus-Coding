import {Listener, CreateHistoryEventData, Subjects} from '@eurytus/common'
import { Message } from 'node-nats-streaming';
import { History } from '../models/History';

export class CreateHistoryListener extends Listener<CreateHistoryEventData>{
    subject: Subjects.CreateHistory = Subjects.CreateHistory;
    QueueGroup = 'history-service'
    async onMessage(data: CreateHistoryEventData["data"], msg: Message){
        const history = new History({userId: data.userId, challengeId: data.challengeId, challengeName: data.challengeName, score: data.score});
        await history.save();
        msg.ack();
    }
}