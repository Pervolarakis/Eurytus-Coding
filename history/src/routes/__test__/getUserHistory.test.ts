import request from 'supertest';
import {app} from '../../app';
import mongoose from 'mongoose';
import {History} from '../../models/History';

it('successfully returns all history for specific user', async()=>{
    const user = new mongoose.Types.ObjectId();
    const history1 = new History({
        userId: user,
        challengeId: new mongoose.Types.ObjectId(),
        challengeName: 'Dumb challenge 1',
        completionDate: new Date().toISOString(),
        saveFileId: '11112222333444',
        outputTestsPassedScore: 50,
        requiredStructureFound: true,
        designPatternsFound: JSON.stringify({
            singleton: true,
            factory: false,
            observer: true
        })})
    const history2 = new History({
        userId: user,
        challengeId: new mongoose.Types.ObjectId(),
        challengeName: 'Dumb challenge 3',
        completionDate: new Date().toISOString(),
        saveFileId: '9995552333444',
        outputTestsPassedScore: 33.33,
        requiredStructureFound: null,
        designPatternsFound: null
    })
    await history1.save();
    await history2.save();
    const result = await request(app)
        .get('/api/v1/history/user')
        .set('Cookie', global.signin(user, 'user'))
        .expect(200)
    expect(result.body.data).toHaveLength(2)
})