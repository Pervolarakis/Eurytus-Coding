import request from "supertest";
import {app} from '../../app';
import {dumbChallenges} from '../../test/dumbChallenges';
import mongoose from 'mongoose'

it('Successfully edits a challenge', async()=>{
    const userOne = new mongoose.Types.ObjectId();
    const response = await request(app)
        .put(`/api/v1/challenges/update/${dumbChallenges[0]._id}`)
        .set('Cookie', global.signin(userOne, 'admin'))
        .send({
            name: 'new challenge 1 name'
        })
        .expect(200)
    expect(response.body.data.name).toBe('new challenge 1 name')
})

it('fails is user is not authed', async()=>{
    await request(app)
        .put(`/api/v1/challenges/update/${dumbChallenges[0]._id}`)
        .send({
            name: 'new challenge 1 name'
        })
        .expect(401)
})

it('fails if user is not admin', async()=>{
    const userOne = new mongoose.Types.ObjectId();
    await request(app)
        .put(`/api/v1/challenges/update/${dumbChallenges[0]._id}`)
        .set('Cookie', global.signin(userOne, 'user'))
        .send({
            name: 'new challenge 1 name'
        })
        .expect(403)
})

it('fails challenge doesnt exist', async()=>{
    const userOne = new mongoose.Types.ObjectId();
    const challengeId = new mongoose.Types.ObjectId();
    await request(app)
        .put(`/api/v1/challenges/update/${challengeId}`)
        .set('Cookie', global.signin(userOne, 'admin'))
        .send({
            name: 'new challenge 1 name'
        })
        .expect(400)
})

it('fails if data is not valid', async()=>{
    const userOne = new mongoose.Types.ObjectId();
    await request(app)
        .put(`/api/v1/challenges/update/${dumbChallenges[0]._id}`)
        .set('Cookie', global.signin(userOne, 'admin'))
        .send({
            isPublic: 'pipi'
        })
        .expect(400)
})