import { CreateChallengeEventData } from "@eurytus/common"
import { natsWrapper } from "../NatsWrapper"
import mongoose from 'mongoose'
import { Message } from "node-nats-streaming"
import { CreateChallengeListener } from "../CreateChallengeListener"
import { Challenge } from "../../models/Challenge"

const setup = async()=>{
    const listener = new CreateChallengeListener(natsWrapper.client)
    const data: CreateChallengeEventData["data"] = {
        id: new mongoose.Types.ObjectId().toString(),
        expiresAt: new Date(),
        status: 'approved',
        startsAt: new Date(),
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
        language: "java",
        expectedDesignPatterns: [],
        expectedStructure: ''
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

    const challenge = await Challenge.findById(data.id)

    expect(challenge).toBeDefined()

    expect(msg.ack).toHaveBeenCalled()

})