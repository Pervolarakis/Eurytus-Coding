import request from "supertest";
import { PendingRequest } from "../../models/PendingRequests";
import { app } from "../../app";
import mongoose from 'mongoose';

it('successfully returns user requests', async()=>{
    const user = new mongoose.Types.ObjectId();
    const request1 = new PendingRequest({
        kind: 'create',
        ownerId: user,
        challengeId: new mongoose.Types.ObjectId(),
        data: JSON.stringify({
            name: "Multiply Challenge2",
            description: "Write a challenge that multiplies 3 numbers",
            difficulty: 1,
            isPublic: true,
            expiresAt: "2014-02-01T00:00:00",
            status: 'pending',
            startsAt: Date.now(),
            creatorId: new mongoose.Types.ObjectId(),
            tests: JSON.stringify({
                "challenge" : [
                    {
                        input: [5,10,2],
                        output: [100]
                    },
                    {
                        input: [10,5,3],
                        output: [150]
                    }
                ]
            }),
            language: 'c',
            template: 'solution(a,b,c){}',
            expectedStructure: '',
            expectedDesignPatterns: []
        }),
        created_at: new Date().toISOString(),
        message: 'please create this new challenge'
    });
    const request2 = new PendingRequest({
        kind: 'update',
        ownerId: user,
        challengeId: new mongoose.Types.ObjectId(),
        data: JSON.stringify({
            name: "Multiply Challenge2",
            description: "Write a challenge that multiplies 3 numbers"
        }),
        message: 'update my challenge',
        created_at: new Date().toISOString(),
    })
    await request1.save();
    await request2.save();
    const result = await request(app)
        .get(`/api/v1/moderate/myrequests`)
        .set('Cookie', global.signin(user, 'user'))
        .expect(200)
    expect(result.body.data).toHaveLength(2);
})

it('successfully returns user requests 2', async()=>{
    const user = new mongoose.Types.ObjectId();
    
    const result = await request(app)
        .get(`/api/v1/moderate/myrequests`)
        .set('Cookie', global.signin(user, 'user'))
        .expect(200)
    expect(result.body.data).toHaveLength(0);
})