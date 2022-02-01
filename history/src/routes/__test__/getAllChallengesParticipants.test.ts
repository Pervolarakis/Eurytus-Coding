import request from 'supertest';
import { app } from '../../app';
import mongoose from 'mongoose';

it('successfully returns all challenges participants', async()=>{
    const result = await request(app)
        .get('/api/v1/history/getallparticipants')
        .set('Cookie', global.signin(new mongoose.Types.ObjectId(), 'admin'))
        .expect(200)
    console.log(result.body.data);
    // expect(result.body.data).toEqual(
    //     expect.arrayContaining([
    //         expect.objectContaining({data: JSON.stringify({
    //             name: "Multiply Challenge2",
    //             description: "Write a challenge that multiplies 667 numbers"
    //         })})
    //     ])
    // )
})