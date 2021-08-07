import request from "supertest";
import {app} from '../../app';
import mongoose from 'mongoose';

it('creates Challenge successfully', async()=>{
    const userOne = new mongoose.Types.ObjectId();
    request(app)
        .post('/api/v1/challenges/new')
        .set('Cookie', global.signin(userOne))
        .send({
            name: "Sum Challenge",
            description: "Write a function that sums 3 numbers",
            difficulty: 1,
            isPublic: true,
            expiresAt: "2014-02-01T00:00:00",
            tests: JSON.stringify({
                "challenge" : [
                    {
                        input: [5,10,15],
                        output: [30]
                    },
                    {
                        input: [10,40,5],
                        output: [55]
                    }
                ]
            })
        })
        .expect(200)
})