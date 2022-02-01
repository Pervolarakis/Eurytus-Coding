import request from 'supertest';
import {app} from '../../app'
import mongoose from 'mongoose';
import {History} from '../../models/History';

it('successfully returns challenge participations for all user challenges', async()=>{
    const challengeId = new mongoose.Types.ObjectId();
    const challengeId2 = new mongoose.Types.ObjectId();
    const challengeId3 = new mongoose.Types.ObjectId();
    const challengeId4 = new mongoose.Types.ObjectId();
    const user = new mongoose.Types.ObjectId();
    const user2 = new mongoose.Types.ObjectId();
    const testHistory1 = new History({
        userId: new mongoose.Types.ObjectId(),
        challengeId: challengeId,
        challengeOwnerId: user,
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
        challengeOwnerId: user,
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
        challengeOwnerId: user,
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
    const testHistory4 = new History({
        userId: new mongoose.Types.ObjectId(),
        challengeId: challengeId2,
        challengeOwnerId: user,
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
    const testHistory5 = new History({
        userId: new mongoose.Types.ObjectId(),
        challengeId: challengeId2,
        language: 'java',
        running: true,
        challengeOwnerId: user,
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
    const testHistory6 = new History({
        userId: new mongoose.Types.ObjectId(),
        challengeId: challengeId3,
        language: 'java',
        running: true,
        challengeOwnerId: user,
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
    const testHistory7 = new History({
        userId: new mongoose.Types.ObjectId(),
        challengeId: challengeId4,
        language: 'java',
        running: true,
        challengeOwnerId: user2,
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
    const testHistory8 = new History({
        userId: new mongoose.Types.ObjectId(),
        challengeId: challengeId4,
        language: 'java',
        running: true,
        challengeOwnerId: user2,
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
    await testHistory4.save();
    await testHistory5.save();
    await testHistory6.save();
    await testHistory7.save();
    await testHistory8.save();
    const response = await request(app)
        .get('/api/v1/history/getuserparticipants')
        .set('Cookie', global.signin(user, 'user'))
        .expect(200)
    // console.log(response.body.data);
    // expect(response.body.data).toEqual(
    //     expect.arrayContaining([
    //         expect.objectContaining({_id: challengeId, count: 3}),
    //         expect.objectContaining({_id: challengeId2, count: 2}),
    //         expect.objectContaining({_id: challengeId3, count: 1})
    //     ])
    // )
})