import request from "supertest";
import {app} from '../../app';
import mongoose from 'mongoose';
import { natsWrapper } from "../../events/NatsWrapper";

it('creates Challenge successfully', async()=>{
    const userOne = new mongoose.Types.ObjectId();
    await request(app)
        .post('/api/v1/challenges/new')
        .set('Cookie', global.signin(userOne, 'admin'))
        .send({
            name: "Sum Challenge",
            description: "Write a function that sums 3 numbers",
            difficulty: 1,
            startsAt: "2014-02-01T00:00:00",
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
            }),
            language: 'js'
        })
        .expect(201)
})

it('fails if user is not authenticated', async()=>{
    await request(app)
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
            }),
            language: 'js'
        })
        .expect(401)
})

it('fails if fields are missing', async()=>{
    const userOne = new mongoose.Types.ObjectId();
    await request(app)
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
            }),
            language: 'js'
        })
        .expect(400)
})

it('successfully published a create new challenge event', async()=>{
    const userOne = new mongoose.Types.ObjectId();
    await request(app)
        .post('/api/v1/challenges/new')
        .set('Cookie', global.signin(userOne, 'user'))
        .send({
            name: "Sum Challenge",
            description: "Write a function that sums 3 numbers",
            isPublic: true,
            difficulty: 1,
            startsAt: "2014-02-01T00:00:00",
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
            }),
            language: 'js'
        })
        .expect(201)
    expect(natsWrapper.client.publish).toHaveBeenCalled();
})