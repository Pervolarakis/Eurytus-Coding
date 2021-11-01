import { ChallengeNewRequestEventData } from "@eurytus/common"
import { ChallengeNewRequestListener } from "../ChallengeNewRequestListener"
import { natsWrapper } from "../NatsWrapper"
import mongoose from 'mongoose'
import { Message } from "node-nats-streaming"
import { PendingRequest } from "../../models/PendingRequests"

const setup = async()=>{
    const listener = new ChallengeNewRequestListener(natsWrapper.client)
    const data: ChallengeNewRequestEventData["data"] = {
        kind: 'create',
        challengeId: new mongoose.Types.ObjectId().toString(),
        data: JSON.stringify({
            name: "Multiply Challenge2",
            description: "Write a challenge that multiplies 3 numbers",
            difficulty: 1,
            isPublic: true,
            expiresAt: "2014-02-01T00:00:00",
            status: 'pending',
            startsAt: Date.now(),
            creatorId: new mongoose.Types.ObjectId(),
            tests: JSON.stringify({
                "challenge" : [
                    {
                        input: [5,10,2],
                        output: [100]
                    },
                    {
                        input: [10,5,3],
                        output: [150]
                    }
                ]
            }),
            template: 'solution(a,b,c){}',
            language: 'js',
            expectedStructure: '',
            expectedDesignPatterns: []
        }),
        created_at: new Date().toISOString(),
        ownerId: new mongoose.Types.ObjectId().toString(),
        message: 'please create this new challenge'
        
    }

    //@ts-ignore
    const msg: Message = {
        ack: jest.fn()
    }

    return {listener, data, msg}

}

it('successfully listens and creates request', async()=>{
    const {listener, data, msg} = await setup();

    await listener.onMessage(data,msg);

    const pendingRequest = await PendingRequest.findOne({challengeId: data.challengeId})

    expect(pendingRequest).toBeDefined()

    expect(msg.ack).toHaveBeenCalled()

})