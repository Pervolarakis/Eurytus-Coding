import { CreateHistoryEventData, DeleteChallengeEventData } from "@eurytus/common"
import { natsWrapper } from "../NatsWrapper";
import mongoose from 'mongoose'
import { Message } from "node-nats-streaming"
import { History } from "../../models/History";
import { CreateHistoryListener } from "../CreateHistoryListener";

const setup = async()=>{
    const listener = new CreateHistoryListener(natsWrapper.client)

    const history = new History({
        userEmail: 'userEmail',
        userId: new mongoose.Types.ObjectId(),
        challengeId: new mongoose.Types.ObjectId(),
        completionDate: new Date().toISOString(),
        saveFileId: '9995552333444',
        language: 'java',
        outputTestsPassedScore: 33.33,
        running: true,
        requiredStructureFound: null,
        designPatternsFound: null
    })
    await history.save();

    const data: CreateHistoryEventData["data"] = {
        userId: history.userId,
        language: history.language,
        running: history.running,
        userEmail: history.userEmail,
        challengeId: history.challengeId,
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
    const history = await History.findOne({challengeId: data.challengeId});

    expect(history).toBeDefined();

    expect(msg.ack).toHaveBeenCalled();

})