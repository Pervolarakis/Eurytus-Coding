import request from 'supertest';
import { History } from '../../models/History';
import mongoose from 'mongoose';
import {app} from '../../app';

it('successfully returns all history for test if user owns the challenge', async()=>{
    const challengeId = new mongoose.Types.ObjectId();
    const user = new mongoose.Types.ObjectId();
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
    await testHistory1.save();
    await testHistory2.save();
    await testHistory3.save();
    const result = await request(app)
        .get(`/api/v1/history/${challengeId}`)
        .set('Cookie', global.signin(user, 'user'))
        .expect(200)
    expect(result.body.data).toHaveLength(3)
})

it('successfully returns all history for test if user is admin', async()=>{
    const challengeId = new mongoose.Types.ObjectId();
    const user = new mongoose.Types.ObjectId();
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
    await testHistory1.save();
    await testHistory2.save();
    await testHistory3.save();
    const result = await request(app)
        .get(`/api/v1/history/${challengeId}`)
        .set('Cookie', global.signin(new mongoose.Types.ObjectId(), 'admin'))
        .expect(200)
    expect(result.body.data).toHaveLength(3)
})

it('fails if user is not an admin and doesnt own the challenge', async()=>{
    const challengeId = new mongoose.Types.ObjectId();
    const user = new mongoose.Types.ObjectId();
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
    await testHistory1.save();
    await testHistory2.save();
    await testHistory3.save();
    await request(app)
        .get(`/api/v1/history/${challengeId}`)
        .set('Cookie', global.signin(new mongoose.Types.ObjectId(), 'user'))
        .expect(403)
})

it('returns err if challenge doesnt exist', async()=>{
    const response = await request(app)
        .get(`/api/v1/history/${new mongoose.Types.ObjectId()}`)
        .set('Cookie', global.signin(new mongoose.Types.ObjectId(), 'admin'))
        .expect(400)
    expect(response.body.error).toEqual('This challenge doesnt have any participants yet!')
})
