import request from 'supertest';
import { History } from '../../models/History';
import mongoose from 'mongoose';
import {app} from '../../app';

it('successfully returns all history for test', async()=>{
    const challengeId = new mongoose.Types.ObjectId();
    const testHistory1 = new History({
        userId: new mongoose.Types.ObjectId(),
        challengeId: challengeId,
        challengeOwnerId: new mongoose.Types.ObjectId(),
        completionDate: new Date().toISOString(),
        saveFileId: '11112222333444',
        language: 'java',
        running: true,
        userEmail: 'demomail1@gmail.com',
        outputTestsPassedScore: 50,
        requiredStructureFound: true,
        designPatternsFound: {
            singleton: true,
            factory: false,
            observer: true
        }})
    const testHistory2 = new History({
        userId: new mongoose.Types.ObjectId(),
        challengeId: challengeId,
        challengeOwnerId: new mongoose.Types.ObjectId(),
        completionDate: new Date().toISOString(),
        saveFileId: '11115552333444',
        language: 'js',
        running: true,
        userEmail: 'demomail3@gmail.com',
        outputTestsPassedScore: 66.34,
        requiredStructureFound: false,
        designPatternsFound: {
            singleton: true,
            factory: false,
            observer: false
        }
    })
    const testHistory3 = new History({
        userId: new mongoose.Types.ObjectId(),
        challengeId: challengeId,
        language: 'java',
        running: true,
        challengeOwnerId: new mongoose.Types.ObjectId(),
        userEmail: 'demomail9@gmail.com',
        completionDate: new Date().toISOString(),
        saveFileId: '66665552333444',
        outputTestsPassedScore: 44.32,
        requiredStructureFound: true,
        designPatternsFound: {
            singleton: true,
            factory: true,
            observer: true
        }
    })
    await testHistory1.save();
    await testHistory2.save();
    await testHistory3.save();
    const result = await request(app)
        .get(`/api/v1/history/${challengeId}`)
        .expect(200)
    expect(result.body.data).toHaveLength(3)
})