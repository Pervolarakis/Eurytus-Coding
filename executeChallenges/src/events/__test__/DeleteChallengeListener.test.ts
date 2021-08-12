import { DeleteChallengeEventData } from "@eurytus/common"
import { natsWrapper } from "../NatsWrapper"
import mongoose from 'mongoose'
import { Message } from "node-nats-streaming"
import { Challenge } from "../../models/Challenge"
import { DeleteChallengeListener } from "../DeleteChallengeListener"

const setup = async()=>{
    const listener = new DeleteChallengeListener(natsWrapper.client)

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
    const data: DeleteChallengeEventData["data"] = {
        id: challengeId.toString(),
        version: 1
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

    expect(challenge?.status).toBe('deleted');

    expect(challenge?.version).toBe(1);

    expect(msg.ack).toHaveBeenCalled()

})