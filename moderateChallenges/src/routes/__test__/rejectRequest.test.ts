import request from 'supertest';
import {app} from '../../app';
import mongoose from 'mongoose'
import { dumbRequests } from '../../test/dumbRequests';
import { PendingRequest } from '../../models/PendingRequests';

it('fails if user is not an admin', async()=>{
    const user = new mongoose.Types.ObjectId();
    await request(app)
        .delete(`/api/v1/moderate/reject/${dumbRequests[0]._id}`)
        .set('Cookie', global.signin(user, 'user'))
        .expect(403)
})

it('successfully rejects request', async()=>{
    const user = new mongoose.Types.ObjectId();
    await request(app)
        .delete(`/api/v1/moderate/reject/${dumbRequests[0]._id}`)
        .set('Cookie', global.signin(user, 'admin'))
        .expect(200)
    const pendingRequests = await PendingRequest.find({});
    expect(pendingRequests.length).toEqual(dumbRequests.length-1)
})