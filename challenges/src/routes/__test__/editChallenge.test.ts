import request from "supertest";
import {app} from '../../app';
import {dumbChallenges} from '../../test/dumbChallenges';
import mongoose from 'mongoose';
import {Challenge} from '../../models/challengeModel';
import {natsWrapper} from '../../events/NatsWrapper';

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

it('fails if user is not admin and doesnt own the challenge', async()=>{
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

it('successfully publishes update event if user owns the challenge', async()=>{
    const userOne = new mongoose.Types.ObjectId();
    const challenge = new Challenge({
        name: "Sum Challenge",
        description: "Write a function that sums 3 numbers",
        difficulty: 1,
        isPublic: true,
        expiresAt: "2014-02-01T00:00:00",
        status: 'approved',
        startsAt: Date.now(),
        creatorId: userOne,
        tests: JSON.stringify({
            "challenge" : [
                {
                    input: [5,10,15],
                    output: [30]
                },
                {
                    input: [10,40,5],
                    output: [55]
                }
            ]
        }),
        language: 'js'
    })
    await challenge.save();
    await request(app)
        .put(`/api/v1/challenges/update/${challenge.id}`)
        .set('Cookie', global.signin(userOne, 'user'))
        .send({
            name: 'new challenge 1 name'
        })
        .expect(201);
    expect(natsWrapper.client.publish).toHaveBeenCalled();
})

it('successfully updates challenge if user owns the challenge and challenge is private', async()=>{
    const userOne = new mongoose.Types.ObjectId();
    const challenge = new Challenge({
        name: "Sum Challenge",
        description: "Write a function that sums 3 numbers",
        difficulty: 1,
        isPublic: false,
        expiresAt: "2014-02-01T00:00:00",
        status: 'approved',
        startsAt: Date.now(),
        creatorId: userOne,
        tests: JSON.stringify({
            "challenge" : [
                {
                    input: [5,10,15],
                    output: [30]
                },
                {
                    input: [10,40,5],
                    output: [55]
                }
            ]
        }),
        language: 'js'
    })
    await challenge.save();
    await request(app)
        .put(`/api/v1/challenges/update/${challenge.id}`)
        .set('Cookie', global.signin(userOne, 'user'))
        .send({
            name: 'new challenge 1 name'
        })
        .expect(200);
    expect(natsWrapper.client.publish).toHaveBeenCalled();
    const updatedChallenge = await Challenge.findById(challenge.id);
    expect(updatedChallenge?.name).toEqual('new challenge 1 name')
})