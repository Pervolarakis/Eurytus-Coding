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
    const response = await request(app)
        .put(`/api/v1/challenges/update/${dumbChallenges[0]._id}`)
        .set('Cookie', global.signin(userOne, 'admin'))
        .send({
            isPublic: 'pipi'
        })
        .expect(400)
    expect(response.body.error).toContainEqual({field: "isPublic", message: "Is public should be true or false"})
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
        expectedOutputTests: JSON.stringify({
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
        template: 'solution(a,b,c){}',
        language: 'js',
        expectedStructure: '',
        expectedDesignPatterns: []
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
        expectedOutputTests: JSON.stringify({
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
        template: 'solution(a,b,c){}',
        language: 'js',
        expectedStructure: '',
        expectedDesignPatterns: []
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

it('publishes request if challenge is private and gets updated to public', async()=>{
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
        expectedOutputTests: JSON.stringify({
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
        template: 'solution(a,b,c){}',
        language: 'js',
        expectedStructure: '',
        expectedDesignPatterns: []
    })
    await challenge.save();
    const response = await request(app)
        .put(`/api/v1/challenges/update/${challenge.id}`)
        .set('Cookie', global.signin(userOne, 'user'))
        .send({
            isPublic: 'true'
        })
        .expect(201);
    expect(natsWrapper.client.publish).toHaveBeenCalled();
    expect(response.body.data).toEqual('Request submited')
})