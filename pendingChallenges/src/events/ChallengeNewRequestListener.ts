import { Message } from "node-nats-streaming";
import { ChallengeNewRequestEventData } from "./ChallengeNewRequestEventData";
import { Listener } from "./Listener";
import { Subjects } from "./Subjects";

export class ChallengeNewRequestListener extends Listener<ChallengeNewRequestEventData>{
    subject: Subjects.ChallengeNewRequest = Subjects.ChallengeNewRequest;
    QueueGroup = 'pendingChallenges-service';
    onMessage(data: ChallengeNewRequestEventData["data"], msg: Message){
        console.log(`new challenge of type: ${data.kind} with body: ${data.data}`)
        msg.ack();
    }
}