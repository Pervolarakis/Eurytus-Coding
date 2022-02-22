import {Listener, CreateHistoryEventData, Subjects} from '@eurytus/common'
import { Message } from 'node-nats-streaming';
import { History } from '../models/History';

export class CreateHistoryListener extends Listener<CreateHistoryEventData>{
    subject: Subjects.CreateHistory = Subjects.CreateHistory;
    QueueGroup = 'history-service'
    async onMessage(data: CreateHistoryEventData["data"], msg: Message){
        const history = new History({
            userId: data.userId, 
            challengeId: data.challengeId, 
            completionDate: data.completionDate,
            userEmail: data.userEmail, 
            saveFileId: data.saveFileId, 
            language: data.language,
            running: data.running,
            outputTestsPassedScore: data.outputTestsPassedScore,
            requiredStructureFound: data.requiredStructureFound,
            designPatternsFound: data.designPatternsFound
        });
        await history.save();
        msg.ack();
    }
}