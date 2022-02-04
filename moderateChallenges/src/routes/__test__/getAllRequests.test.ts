import request from 'supertest';
import {app} from '../../app';
import mongoose from 'mongoose'
import { dumbRequests } from '../../test/dumbRequests';
import { PendingRequest } from '../../models/PendingRequests';

it('fails if user is not an admin', async()=>{
    const user = new mongoose.Types.ObjectId();
    await request(app)
        .get('/api/v1/moderate/requests')
        .set('Cookie', global.signin(user, 'user'))
        .expect(403)
})

it('successfully returns all requests', async()=>{
    const user = new mongoose.Types.ObjectId();
    const result = await request(app)
        .get('/api/v1/moderate/requests')
        .set('Cookie', global.signin(user, 'admin'))
        .expect(200)
    expect(result.body.data.length).toEqual(dumbRequests.length)
})

it('successfully returns latest request for each challenge', async()=>{
    const user = new mongoose.Types.ObjectId();
    const date = new Date();
    const challengeId = new mongoose.Types.ObjectId();
    date.setDate(date.getDate()+1)
    const date2 = new Date();
    date2.setDate(date2.getDate()+5)
    const request1 = new PendingRequest({
        kind: 'update',
        ownerId: user,
        challengeId: challengeId,
        data: JSON.stringify({
            name: "Multiply Challenge2",
            description: "Write a challenge that multiplies 99 numbers"
        }),
        message: 'update my challenge',
        created_at: date.toISOString(),
        ownerEmail: 'admin@gmail.com',
        challengeName: "Multiply Challenge2"
    })
    const request2 = new PendingRequest({
        kind: 'update',
        ownerId: user,
        challengeId: challengeId,
        data: JSON.stringify({
            name: "Multiply Challenge2",
            description: "Write a challenge that multiplies 160 numbers"
        }),
        message: 'update my challenge',
        created_at: new Date().toISOString(),
        ownerEmail: 'admin@gmail.com',
        challengeName: "Multiply Challenge2"
    })
    const request3 = new PendingRequest({
        kind: 'update',
        ownerId: user,
        challengeId: challengeId,
        data: JSON.stringify({
            name: "Multiply Challenge2",
            description: "Write a challenge that multiplies 667 numbers"
        }),
        message: 'update my challenge',
        created_at: date2.toISOString(),
        ownerEmail: 'admin@gmail.com',
        challengeName: "Multiply Challenge2"
    })
    request1.save();
    request2.save();
    request3.save();
    const result = await request(app)
        .get('/api/v1/moderate/requests')
        .set('Cookie', global.signin(user, 'admin'))
        .expect(200)
    expect(result.body.data.length).toEqual(dumbRequests.length+1)
    expect(result.body.data).toEqual(
        expect.arrayContaining([
            expect.objectContaining({data: JSON.stringify({
                name: "Multiply Challenge2",
                description: "Write a challenge that multiplies 667 numbers"
            })})
        ])
    )
})