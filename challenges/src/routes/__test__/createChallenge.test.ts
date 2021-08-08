import request from "supertest";
import {app} from '../../app';
import mongoose from 'mongoose';

it('creates Challenge successfully', async()=>{
    const userOne = new mongoose.Types.ObjectId();
    request(app)
        .post('/api/v1/challenges/new')
        .set('Cookie', global.signin(userOne, 'admin'))
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
        .expect(201)
})

it('fails if user is not authenticated', async()=>{
    request(app)
        .post('/api/v1/challenges/new')
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
        .expect(401)
})

it('fails if fields are missing', async()=>{
    const userOne = new mongoose.Types.ObjectId();
    request(app)
        .post('/api/v1/challenges/new')
        .set('Cookie', global.signin(userOne, 'admin'))
        .send({
            name: "Sum Challenge",
            description: "Write a function that sums 3 numbers",
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
        .expect(400)
})