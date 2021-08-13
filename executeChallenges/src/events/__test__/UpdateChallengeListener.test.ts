import { DeleteChallengeEventData, UpdateChallengeEventData } from "@eurytus/common"
import { natsWrapper } from "../NatsWrapper"
import mongoose from 'mongoose'
import { Message } from "node-nats-streaming"
import { Challenge } from "../../models/Challenge"
import { UpdateChallengeListener } from "../UpdateChallengeListener"

const setup = async()=>{
    const listener = new UpdateChallengeListener(natsWrapper.client)

    const challengeId = new mongoose.Types.ObjectId()

    const challenge = new Challenge({
        _id: challengeId,
        expiresAt: "2014-02-01T00:00:00",
        status: 'approved',
        startsAt: Date.now(),
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
        })
    })

    await challenge.save();

    const data: UpdateChallengeEventData["data"] = {
        id: challengeId.toString(),
        version: 1,
        expiresAt: new Date("2015-02-01T00:00:00"),
        status: 'approved',
        startsAt: new Date(),
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
        availableLanguages: ["java", "js"]
    }    
    
    //@ts-ignore
    const msg: Message = {
        ack: jest.fn()
    }

    return {listener, data, msg, challengeId}

}

it('successfully listens and creates request', async()=>{
    const {listener, data, msg, challengeId} = await setup();

    await listener.onMessage(data,msg);

    const challenge = await Challenge.findById(challengeId)

    expect(challenge).toBeDefined()

    expect(challenge?.expiresAt).toEqual(new Date("2015-02-01T00:00:00"));

    expect(challenge?.version).toBe(1);

    expect(msg.ack).toHaveBeenCalled()

})