import { CreateChallengeApprovedEventData } from "@eurytus/common"
import { natsWrapper } from "../NatsWrapper"
import mongoose from 'mongoose'
import { Message } from "node-nats-streaming"
import { CreateChallengeApprovedListener } from "../CreateChallengeApprovedListener"
import { Challenge } from "../../models/challengeModel"

const setup = async()=>{
    const listener = new CreateChallengeApprovedListener(natsWrapper.client)
    const data: CreateChallengeApprovedEventData["data"] = {
        data: JSON.stringify({
            name: "Multiply Challenge5",
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
            language: 'js'
        })
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

    const challenge = await Challenge.findOne({name: "Multiply Challenge5"})

    expect(challenge).toBeDefined();
    expect(challenge?.status).toBe('approved');
    expect(msg.ack).toHaveBeenCalled()
    expect(natsWrapper.client.publish).toHaveBeenCalled();
})