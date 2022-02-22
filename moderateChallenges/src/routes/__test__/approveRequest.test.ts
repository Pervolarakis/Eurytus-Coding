import {app} from '../../app';
import request from 'supertest';
import {dumbRequests} from '../../test/dumbRequests';
import mongoose from 'mongoose';
import {natsWrapper} from '../../events/NatsWrapper';
import { PendingRequest } from '../../models/PendingRequests';

it('fails if user is not logged in', async()=>{
    await request(app)
        .post(`/api/v1/moderate/approve/${dumbRequests[0]._id}`)
        .expect(401)
})

it('fails if user is not an admin', async()=>{
    const user = new mongoose.Types.ObjectId();
    await request(app)
        .post(`/api/v1/moderate/approve/${dumbRequests[0]._id}`)
        .set('Cookie', global.signin(user, 'user'))
        .expect(403)
})

it('successfully approves create request and deletes it', async()=>{
    const user = new mongoose.Types.ObjectId();
    await request(app)
        .post(`/api/v1/moderate/approve/${dumbRequests[0]._id}`)
        .set('Cookie', global.signin(user, 'admin'))
        .expect(201)
    const PendingRequests = await PendingRequest.find({})
    expect(natsWrapper.client.publish).toHaveBeenCalled()
    expect(PendingRequests.length).toBe(dumbRequests.length-1)
})

it('successfully approves update request and deletes it', async()=>{
    const user = new mongoose.Types.ObjectId();
    await request(app)
        .post(`/api/v1/moderate/approve/${dumbRequests[3]._id}`)
        .set('Cookie', global.signin(user, 'admin'))
        .expect(201)
    expect(natsWrapper.client.publish).toHaveBeenCalled()
    const PendingRequests = await PendingRequest.find({})
    expect(PendingRequests.length).toBe(dumbRequests.length-1)
})

it('successfully approves delete request and deletes it', async()=>{
    const user = new mongoose.Types.ObjectId();
    await request(app)
        .post(`/api/v1/moderate/approve/${dumbRequests[1]._id}`)
        .set('Cookie', global.signin(user, 'admin'))
        .expect(201)
    expect(natsWrapper.client.publish).toHaveBeenCalled()
    const PendingRequests = await PendingRequest.find({})
    expect(PendingRequests.length).toBe(dumbRequests.length-1)
})

it('successfully approves and removes request', async()=>{
    const user = new mongoose.Types.ObjectId();
    const challengeId = new mongoose.Types.ObjectId();
    const date = new Date();
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
    })
    const request3 = new PendingRequest({
        kind: 'update',
        ownerId: user,
        challengeId: challengeId,
        data: JSON.stringify({
            name: "Multiply Challenge2",
            description: "Write a challenge that multiplies 666 numbers"
        }),
        message: 'update my challenge',
        created_at: date2.toISOString(),
    })
    request1.save();
    request2.save();
    request3.save();
    const result = await request(app)
        .post(`/api/v1/moderate/approve/${request1._id}`)
        .set('Cookie', global.signin(user, 'admin'))
        .expect(201)
    const allPendingRequests = await PendingRequest.find({})
    expect(allPendingRequests).toHaveLength(dumbRequests.length+1)
})

it('successfully approves and removes request 2', async()=>{
    const user = new mongoose.Types.ObjectId();
    const challengeId = new mongoose.Types.ObjectId();
    const date = new Date();
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
    })
    const request3 = new PendingRequest({
        kind: 'update',
        ownerId: user,
        challengeId: challengeId,
        data: JSON.stringify({
            name: "Multiply Challenge2",
            description: "Write a challenge that multiplies 666 numbers"
        }),
        message: 'update my challenge',
        created_at: date2.toISOString(),
    })
    request1.save();
    request2.save();
    request3.save();
    const result = await request(app)
        .post(`/api/v1/moderate/approve/${request2._id}`)
        .set('Cookie', global.signin(user, 'admin'))
        .expect(201)
    const allPendingRequests = await PendingRequest.find({})
    expect(allPendingRequests).toHaveLength(dumbRequests.length+2)
})

it('successfully approves and removes request 3', async()=>{
    const user = new mongoose.Types.ObjectId();
    const challengeId = new mongoose.Types.ObjectId();
    const date = new Date();
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
    })
    const request3 = new PendingRequest({
        kind: 'update',
        ownerId: user,
        challengeId: challengeId,
        data: JSON.stringify({
            name: "Multiply Challenge2",
            description: "Write a challenge that multiplies 666 numbers"
        }),
        message: 'update my challenge',
        created_at: date2.toISOString(),
    })
    request1.save();
    request2.save();
    request3.save();
    const result = await request(app)
        .post(`/api/v1/moderate/approve/${request3._id}`)
        .set('Cookie', global.signin(user, 'admin'))
        .expect(201)
    const allPendingRequests = await PendingRequest.find({})
    expect(allPendingRequests).toHaveLength(dumbRequests.length)
})