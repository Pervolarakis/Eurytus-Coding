import request from 'supertest';
import { History } from '../../models/History';
import mongoose from 'mongoose';
import {app} from '../../app';

it('successfully returns all history for test', async()=>{
    const testId = new mongoose.Types.ObjectId();
    const testHistory1 = new History({
        playerId: new mongoose.Types.ObjectId(),
        testId: testId,
        testName: 'test name 1',
        score: '5/10'})
    const testHistory2 = new History({
        playerId: new mongoose.Types.ObjectId(),
        testId: testId,
        testName: 'test name 1',
        score: '7/10'})
    const testHistory3 = new History({
        playerId: new mongoose.Types.ObjectId(),
        testId: testId,
        testName: 'test name 1',
        score: '9/10'})
    await testHistory1.save();
    await testHistory2.save();
    await testHistory3.save();
    const result = await request(app)
        .get(`/api/v1/history/${testId}`)
        .expect(200)
    expect(result.body.data).toHaveLength(3)
})