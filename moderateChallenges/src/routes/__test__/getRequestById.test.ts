import request from 'supertest';
import {app} from '../../app';
import { PendingRequest } from '../../models/PendingRequests';
import mongoose from 'mongoose';

it('Successfully returns pending request', async()=>{
    const userId = new mongoose.Types.ObjectId();
    const pendingReq = new PendingRequest({
        kind: 'create',
        challengeId: new mongoose.Types.ObjectId().toString(),
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
            template: 'solution(a,b,c){}',
            language: 'js',
            expectedStructure: '',
            expectedDesignPatterns: []
        }),
        ownerId: userId,
        created_at: new Date().toISOString(),
        message: 'please create this new challenge',
        ownerEmail: 'admin@gmail.com',
        challengeName: "Multiply Challenge2"
        
    })
    await pendingReq.save();
    const response = await request(app)
        .get(`/api/v1/moderate/requests/${pendingReq.id}`)
        .set('Cookie', global.signin(userId, 'user'))
        .expect(200)
    expect(response.body.data.message).toEqual('please create this new challenge')
})

it('fails if user doesnt own the challenge', async()=>{
    const userId = new mongoose.Types.ObjectId();
    const pendingReq = new PendingRequest({
        kind: 'create',
        challengeId: new mongoose.Types.ObjectId().toString(),
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
            template: 'solution(a,b,c){}',
            language: 'js',
            expectedStructure: '',
            expectedDesignPatterns: []
        }),
        ownerId: userId,
        created_at: new Date().toISOString(),
        message: 'please create this new challenge',
        ownerEmail: 'admin@gmail.com',
        challengeName: "Multiply Challenge2"
        
    })
    await pendingReq.save();
    await request(app)
        .get(`/api/v1/moderate/requests/${pendingReq.id}`)
        .set('Cookie', global.signin(new mongoose.Types.ObjectId(), 'user'))
        .expect(403)
})

it('Successfully returns pending request if user is admin', async()=>{
    const userId = new mongoose.Types.ObjectId();
    const pendingReq = new PendingRequest({
        kind: 'create',
        challengeId: new mongoose.Types.ObjectId().toString(),
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
            template: 'solution(a,b,c){}',
            language: 'js',
            expectedStructure: '',
            expectedDesignPatterns: []
        }),
        ownerId: userId,
        created_at: new Date().toISOString(),
        message: 'please create this new challenge',
        ownerEmail: 'admin@gmail.com',
        challengeName: "Multiply Challenge2"
        
    })
    await pendingReq.save();
    const response = await request(app)
        .get(`/api/v1/moderate/requests/${pendingReq.id}`)
        .set('Cookie', global.signin(new mongoose.Types.ObjectId(), 'admin'))
        .expect(200)
    expect(response.body.data.message).toEqual('please create this new challenge')
})

it('fails if challenge doesnt exist', async()=>{
    const userId = new mongoose.Types.ObjectId();
    await request(app)
        .get(`/api/v1/moderate/requests/${new mongoose.Types.ObjectId()}`)
        .set('Cookie', global.signin(new mongoose.Types.ObjectId(), 'user'))
        .expect(400)
})