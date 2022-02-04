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
        message: 'please create this new challenge',
        ownerEmail: 'admin@gmail.com',
        challengeName: 'Multiply Challenge2'
        
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

it('doesnt save request if last request is of type delete', async()=>{
    const {listener, msg} = await setup();

    const challengeId = new mongoose.Types.ObjectId().toString();
    const userId = new mongoose.Types.ObjectId().toString();

    const request = new PendingRequest({
        kind: 'delete',
        challengeId: challengeId,
        created_at: new Date().toISOString(),
        ownerId: userId,
        message: 'please create this new challenge',
        ownerEmail: 'user@gmail.com',
        challengeName: 'Multiply Challenge5'
    })

    await request.save()

    const data: ChallengeNewRequestEventData["data"] = {
        kind: 'update',
        challengeId: challengeId,
        data: JSON.stringify({
            name: "Multiply Challenge5",
        }),
        created_at: new Date().toISOString(),
        ownerId: userId,
        message: 'please update this challenge',
        ownerEmail: 'user@gmail.com',
        challengeName: 'Multiply Challenge5'
        
    }

    await listener.onMessage(data,msg);

    const pendingRequests = await PendingRequest.find({challengeId: data.challengeId})

    expect(pendingRequests).toHaveLength(1);

    expect(pendingRequests[0]).toEqual(
        expect.objectContaining({kind: 'delete'})
    )
    expect(msg.ack).toHaveBeenCalled()
})
