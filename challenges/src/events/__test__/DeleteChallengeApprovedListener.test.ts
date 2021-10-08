import { DeleteChallengeApprovedEventData } from "@eurytus/common"
import { natsWrapper } from "../NatsWrapper"
import mongoose from 'mongoose'
import { Message } from "node-nats-streaming"
import { Challenge } from "../../models/challengeModel"
import { DeleteChallengeApprovedListener } from "../DeleteChallengeApprovedListener"

const setup = async()=>{
    const listener = new DeleteChallengeApprovedListener(natsWrapper.client)
    const challenge = new Challenge({
        name: "Multiply Challenge2",
        description: "Write a challenge that multiplies 3 numbers",
        difficulty: 1,
        isPublic: true,
        expiresAt: "2014-02-01T00:00:00",
        status: 'pending',
        startsAt: Date.now(),
        creatorId: new mongoose.Types.ObjectId(),
        expectedOutputTests: JSON.stringify({
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
    })
    await challenge.save();
    const data: DeleteChallengeApprovedEventData["data"] = {
        challengeId: challenge.id
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

    const challenge = await Challenge.findById(data.challengeId)

    expect(challenge?.status).toBe('deleted')

    expect(msg.ack).toHaveBeenCalled()

    expect(natsWrapper.client.publish).toHaveBeenCalled();

})