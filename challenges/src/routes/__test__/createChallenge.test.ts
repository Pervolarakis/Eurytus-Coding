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
            expectedOutputTests: JSON.stringify({
                "challenge" : [
                    {
                        input: JSON.stringify(`5,10,15`),
                        output: JSON.stringify(`30`)
                    },
                    {
                        input: JSON.stringify(`40,10,5`),
                        output: JSON.stringify(`55`)
                    }
                ]
            }),
            template: 'solution(a,b,c){}',
            language: 'js',
            expectedStructure: '',
            expectedDesignPatterns: []  
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
            expectedOutputTests: JSON.stringify({
                "challenge" : [
                    {
                        input: JSON.stringify(`5,10,15`),
                        output: JSON.stringify(`30`)
                    },
                    {
                        input: JSON.stringify(`40,10,5`),
                        output: JSON.stringify(`55`)
                    }
                ]
            }),
            template: 'solution(a,b,c){}',
            language: 'js',
            expectedStructure: '',
            expectedDesignPatterns: []
        })
        .expect(401)
})

it('fails if fields are missing', async()=>{
    const userOne = new mongoose.Types.ObjectId();
    const response = await request(app)
        .post('/api/v1/challenges/new')
        .set('Cookie', global.signin(userOne, 'admin'))
        .send({
            name: "Sum Challenge",
            description: "Write a function that sums 3 numbers",
            isPublic: true,
            expiresAt: "2014-02-01T00:00:00",
            expectedOutputTests: JSON.stringify({
                "challenge" : [
                    {
                        input: JSON.stringify(`5,10,15`),
                        output: JSON.stringify(`30`)
                    },
                    {
                        input: JSON.stringify(`40,10,5`),
                        output: JSON.stringify(`55`)
                    }
                ]
            }),
            template: 'solution(a,b,c){}',
            language: 'js',
            expectedStructure: '',
            expectedDesignPatterns: []
        })
        .expect(400)
    expect(response.body.error).toContainEqual({field: "difficulty", message: "Difficulty cant be empty"})
    expect(response.body.error).toContainEqual({field: "startsAt", message: "Starts at cant be empty"})
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
            expectedOutputTests: JSON.stringify({
                "challenge" : [
                    {
                        input: JSON.stringify(`5,10,15`),
                        output: JSON.stringify(`30`)
                    },
                    {
                        input: JSON.stringify(`40,10,5`),
                        output: JSON.stringify(`55`)
                    }
                ]
            }),
            template: '',
            language: 'js',
            expectedStructure: '',
            expectedDesignPatterns: []
        })
        .expect(201)
    expect(natsWrapper.client.publish).toHaveBeenCalled();
})