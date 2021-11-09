import { CreateHistoryEventData, DeleteChallengeEventData } from "@eurytus/common"
import { natsWrapper } from "../NatsWrapper";
import mongoose from 'mongoose'
import { Message } from "node-nats-streaming"
import { History } from "../../models/History";
import { CreateHistoryListener } from "../CreateHistoryListener";

const setup = async()=>{
    const listener = new CreateHistoryListener(natsWrapper.client)

    const history = new History({
        userId: new mongoose.Types.ObjectId(),
        challengeId: new mongoose.Types.ObjectId(),
        challengeName: 'Dumb challenge 3',
        completionDate: new Date().toISOString(),
        saveFileId: '9995552333444',
        outputTestsPassedScore: 33.33,
        requiredStructureFound: null,
        designPatternsFound: null
    })
    await history.save();
    const data: CreateHistoryEventData["data"] = {
        userId: history.userId,
        challengeId: history.challengeId,
        challengeName: history.challengeName,
        completionDate: history.completionDate,
        saveFileId: history.saveFileId,
        outputTestsPassedScore: history.outputTestsPassedScore,
        requiredStructureFound: history.requiredStructureFound,
        designPatternsFound: history.designPatternsFound
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
    //@ts-ignore
    const history = await History.findOne({challengeName: data.challengeName});

    expect(history).toBeDefined();

    expect(msg.ack).toHaveBeenCalled();

})