import request from "supertest";
import {app} from '../../app';
import {dumbChallenges} from '../../test/dumbChallenges';
import mongoose from 'mongoose';

it('successfully deletes challenge', async()=>{
    const userOne = new mongoose.Types.ObjectId();
    const response = await request(app)
        .delete(`/api/v1/challenges/delete/${dumbChallenges[0]._id}`)
        .set('Cookie', global.signin(userOne, 'admin'))
        .expect(200);
    expect(response.body.data.status).toBe('deleted')

})

it('fails if user is not authed', async()=>{
    const response = await request(app)
        .delete(`/api/v1/challenges/delete/${dumbChallenges[0]._id}`)
        .expect(401);
})

it('fails if challenge doesnt exists', async()=>{
    const userOne = new mongoose.Types.ObjectId();
    const challengeId = new mongoose.Types.ObjectId();
    const response = await request(app)
        .delete(`/api/v1/challenges/delete/${challengeId}`)
        .set('Cookie', global.signin(userOne, 'admin'))
        .expect(400);

})

it('fails if user is not admin', async()=>{
    const userOne = new mongoose.Types.ObjectId();
    const challengeId = new mongoose.Types.ObjectId();
    const response = await request(app)
        .delete(`/api/v1/challenges/delete/${dumbChallenges[0]._id}`)
        .set('Cookie', global.signin(userOne, 'user'))
        .expect(403);

})