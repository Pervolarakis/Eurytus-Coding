import request from 'supertest';
import {app} from '../../app';
import mongoose from 'mongoose';
import {History} from '../../models/History';

it('successfully returns all history for specific user', async()=>{
    const user = new mongoose.Types.ObjectId();
    const history1 = new History({
        playerId: user,
        testId: new mongoose.Types.ObjectId(),
        testName: 'test name 1',
        score: '5/10'})
    const history2 = new History({
        playerId: user,
        testId: new mongoose.Types.ObjectId(),
        testName: 'test name 2',
        score: '6/5'})
    await history1.save();
    await history2.save();
    const result = await request(app)
        .get('/api/v1/history/user')
        .set('Cookie', global.signin(user, 'user'))
        .expect(200)
    expect(result.body.data).toHaveLength(2)
})