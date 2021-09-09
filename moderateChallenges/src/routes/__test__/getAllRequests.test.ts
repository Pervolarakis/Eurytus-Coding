import request from 'supertest';
import {app} from '../../app';
import mongoose from 'mongoose'
import { dumbRequests } from '../../test/dumbRequests';

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