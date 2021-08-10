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