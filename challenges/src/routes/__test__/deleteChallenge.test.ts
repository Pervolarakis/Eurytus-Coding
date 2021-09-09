import request from "supertest";
import {app} from '../../app';
import {dumbChallenges} from '../../test/dumbChallenges';
import mongoose from 'mongoose';
import {natsWrapper} from '../../events/NatsWrapper';
import {Challenge} from '../../models/challengeModel';

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

it('fails if user is not admin and doesnt own the challenge', async()=>{
    const userOne = new mongoose.Types.ObjectId();
    await request(app)
        .delete(`/api/v1/challenges/delete/${dumbChallenges[0]._id}`)
        .set('Cookie', global.signin(userOne, 'user'))
        .expect(403);
})

it('successfully publishes delete event if user owns the challenge', async()=>{
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
                    input: JSON.stringify(`5,10,15`),
                    output: JSON.stringify(`30`)
                },
                {
                    input: JSON.stringify(`40,10,5`),
                    output: JSON.stringify(`55`)
                }
            ]
        }),
        language: 'js'
    })
    await challenge.save();
    await request(app)
        .delete(`/api/v1/challenges/delete/${challenge.id}`)
        .set('Cookie', global.signin(userOne, 'user'))
        .expect(201);
    expect(natsWrapper.client.publish).toHaveBeenCalled();
})

it('successfully deletes challenge if user owns the challenge and challenge is private', async()=>{
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
                    input: JSON.stringify(`5,10,15`),
                    output: JSON.stringify(`30`)
                },
                {
                    input: JSON.stringify(`40,10,5`),
                    output: JSON.stringify(`55`)
                }
            ]
        }),
        language: 'js'
    })
    await challenge.save();
    await request(app)
        .delete(`/api/v1/challenges/delete/${challenge.id}`)
        .set('Cookie', global.signin(userOne, 'user'))
        .expect(200);
    expect(natsWrapper.client.publish).toHaveBeenCalled();
    const updatedChallenge = await Challenge.findById(challenge.id);
    expect(updatedChallenge?.status).toEqual('deleted')
})