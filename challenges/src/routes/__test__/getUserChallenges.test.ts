import request from 'supertest';
import {app} from '../../app';
import mongoose from 'mongoose'
import { Challenge } from '../../models/challengeModel';

it('successfully returns challenges created by the user', async()=>{
    const user = new mongoose.Types.ObjectId();
    const challenge1= new Challenge({
        _id: new mongoose.Types.ObjectId(),
        name: "Sum Challenge",
        description: "Write a function that sums 3 numbers",
        difficulty: 1,
        isPublic: true,
        expiresAt: "2014-02-01T00:00:00",
        status: 'approved',
        startsAt: Date.now(),
        creatorId: user,
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
        language: 'c'
    })
    const challenge2= new Challenge({
        _id: new mongoose.Types.ObjectId(),
        name: "Sum Challenge2 ",
        description: "Write a function that sums 4 numbers",
        difficulty: 1,
        isPublic: true,
        expiresAt: "2014-02-01T00:00:00",
        status: 'approved',
        startsAt: Date.now(),
        creatorId: user,
        tests: JSON.stringify({
            "challenge" : [
                {
                    input: JSON.stringify(`5,10,15,2`),
                    output: JSON.stringify(`32`)
                },
                {
                    input: JSON.stringify(`40,10,5,10`),
                    output: JSON.stringify(`65`)
                }
            ]
        }),
        language: 'c'
    })
    await challenge1.save();
    await challenge2.save();
    const result = await request(app)
        .get('/api/v1/challenges/myChallenges')
        .set('Cookie', global.signin(user, 'user'))
        .expect(200)
    expect(result.body.data).toHaveLength(2)
})