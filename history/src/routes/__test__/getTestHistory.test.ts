import request from 'supertest';
import { History } from '../../models/History';
import mongoose from 'mongoose';
import {app} from '../../app';

it('successfully returns all history for test', async()=>{
    const challengeId = new mongoose.Types.ObjectId();
    const testHistory1 = new History({
        userId: new mongoose.Types.ObjectId(),
        challengeId: challengeId,
        challengeName: 'Dumb challenge 1',
        completionDate: new Date().toISOString(),
        saveFileId: '11112222333444',
        language: 'java',
        outputTestsPassedScore: 50,
        requiredStructureFound: true,
        designPatternsFound: JSON.stringify({
            singleton: true,
            factory: false,
            observer: true
        })})
    const testHistory2 = new History({
        userId: new mongoose.Types.ObjectId(),
        challengeId: challengeId,
        challengeName: 'Dumb challenge 2',
        completionDate: new Date().toISOString(),
        saveFileId: '11115552333444',
        language: 'js',
        outputTestsPassedScore: 66.34,
        requiredStructureFound: false,
        designPatternsFound: JSON.stringify({
            singleton: true,
            factory: false,
            observer: false
        })
    })
    const testHistory3 = new History({
        userId: new mongoose.Types.ObjectId(),
        challengeId: challengeId,
        challengeName: 'Dumb challenge 1',
        language: 'java',
        completionDate: new Date().toISOString(),
        saveFileId: '66665552333444',
        outputTestsPassedScore: 44.32,
        requiredStructureFound: true,
        designPatternsFound: JSON.stringify({
            singleton: true,
            factory: true,
            observer: true
        })
    })
    await testHistory1.save();
    await testHistory2.save();
    await testHistory3.save();
    const result = await request(app)
        .get(`/api/v1/history/${challengeId}`)
        .expect(200)
    expect(result.body.data).toHaveLength(3)
})