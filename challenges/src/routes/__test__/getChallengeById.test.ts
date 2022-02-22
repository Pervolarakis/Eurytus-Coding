import request from 'supertest';
import {app} from '../../app';
import mongoose from 'mongoose'
import { Challenge } from '../../models/challengeModel';

it('successfully returns challenge by id with hidden fields for owner', async()=>{
    const user = new mongoose.Types.ObjectId();
    const challenge= new Challenge({
        _id: new mongoose.Types.ObjectId(),
        name: "Sum Challenge",
        description: "Write a function that sums 3 numbers",
        difficulty: 1,
        isPublic: true,
        expiresAt: "2014-02-01T00:00:00",
        status: 'approved',
        startsAt: Date.now(),
        creatorId: user,
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
        language: 'c',
        expectedStructure: '',
        expectedDesignPatterns: []
    })
    
    await challenge.save();
    
    const result = await request(app)
        .get(`/api/v1/challenges/${challenge.id}`)
        .set('Cookie', global.signin(user, 'user'))
        .expect(200)
    expect(result.body.data).toEqual(
        expect.objectContaining({
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
            })
        })
    )
})

it('successfully returns challenge by id with hidden fields for admin', async()=>{
    const user = new mongoose.Types.ObjectId();
    const challenge= new Challenge({
        _id: new mongoose.Types.ObjectId(),
        name: "Sum Challenge",
        description: "Write a function that sums 3 numbers",
        difficulty: 1,
        isPublic: true,
        expiresAt: "2014-02-01T00:00:00",
        status: 'approved',
        startsAt: Date.now(),
        creatorId: new mongoose.Types.ObjectId(),
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
        language: 'c',
        expectedStructure: '',
        expectedDesignPatterns: []
    })
    
    await challenge.save();
    
    const result = await request(app)
        .get(`/api/v1/challenges/${challenge.id}`)
        .set('Cookie', global.signin(user, 'admin'))
        .expect(200)
    expect(result.body.data).toEqual(
        expect.objectContaining({
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
            })
        })
    )
})

it('successfully hides fields if user doesnt own challenge or user is not an admin', async()=>{
    const user = new mongoose.Types.ObjectId();
    const challenge= new Challenge({
        _id: new mongoose.Types.ObjectId(),
        name: "Sum Challenge",
        description: "Write a function that sums 3 numbers",
        difficulty: 1,
        isPublic: true,
        expiresAt: "2014-02-01T00:00:00",
        status: 'approved',
        startsAt: Date.now(),
        creatorId: new mongoose.Types.ObjectId(),
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
        language: 'c',
        expectedStructure: '',
        expectedDesignPatterns: []
    })
    
    await challenge.save();
    
    const result = await request(app)
        .get(`/api/v1/challenges/${challenge.id}`)
        .set('Cookie', global.signin(user, 'user'))
        .expect(200)
    expect(result.body.data.expectedOutputTests).not.toBeDefined()
    expect(result.body.data.description).toEqual('Write a function that sums 3 numbers')
})

it('fails if challenge id is wrongly formatted', async()=>{
    const response = await request(app)
        .get(`/api/v1/challenges/eeee`)
        .set('Cookie', global.signin(new mongoose.Types.ObjectId(), 'user'))
        .expect(400)
    expect(response.body.error).toEqual('An error occurred!')
})

it('fails if challenge doesnt exist', async()=>{
    const response = await request(app)
        .get(`/api/v1/challenges/${new mongoose.Types.ObjectId()}`)
        .set('Cookie', global.signin(new mongoose.Types.ObjectId(), 'user'))
        .expect(400)
    expect(response.body.error).toEqual('Challenge Not found')
})