import mongoose from 'mongoose';
import request from 'supertest'
import {app} from '../../app';
import { Challenge } from '../../models/Challenge';

jest.setTimeout(150000)

it('successfully runs tests', async()=>{
    const user = new mongoose.Types.ObjectId(); 
    const challenge = new Challenge({
        status: 'approved',
        startsAt: Date.now(),
        expiresAt: "2014-02-01T00:00:00",
        ownerId: new mongoose.Types.ObjectId(),
        tests: JSON.stringify({
            "challenge" : [
                {
                    input: JSON.stringify(`5,10,15`),
                    output: JSON.stringify(`30`)
                },
                {
                    input: JSON.stringify(`10,40,5`),
                    output: JSON.stringify(`55`)
                }
            ]
        }),
        language: "c",
        isPublic: true
    })
    await challenge.save()
    const result = await request(app)
        .post(`/api/v1/compile/challengec/${challenge.id}`)
        .set('Cookie', global.signin(user,'user'))
        .send({
            solution: JSON.stringify(`int solution(int a,int b, int c){int sum = a+b+c; return sum;}`)
        })
        .expect(200)
    expect(result.body.data.successfulTests).toEqual(result.body.data.totalTestsDone)

})


it('successfully runs tests 2', async()=>{
    const user = new mongoose.Types.ObjectId(); 
    const challenge = new Challenge({
        status: 'approved',
        startsAt: Date.now(),
        ownerId: new mongoose.Types.ObjectId(),
        expiresAt: "2014-02-01T00:00:00",
        tests: JSON.stringify({
            "challenge" : [
                {
                    input: JSON.stringify(`"eeeeee"`),
                    output: JSON.stringify(`"eeeeee"`)
                },
                {
                    input: JSON.stringify(`"aaaa"`),
                    output: JSON.stringify(`"aaaa"`)
                }
            ]
        }),
        language: "c",
        isPublic: true
    })
    await challenge.save()
    const result = await request(app)
        .post(`/api/v1/compile/challengec/${challenge.id}`)
        .set('Cookie', global.signin(user,'user'))
        .send({
            solution: JSON.stringify(`char* solution(char arr[]){return arr;}`)
        })
        .expect(200)
    expect(result.body.data.successfulTests).toEqual(result.body.data.totalTestsDone)

})

it('successfully runs tests 2', async()=>{
    const user = new mongoose.Types.ObjectId()
    const challenge = new Challenge({
        status: 'approved',
        startsAt: Date.now(),
        ownerId: new mongoose.Types.ObjectId(),
        expiresAt: "2014-02-01T00:00:00",
        tests: JSON.stringify({
            "challenge" : [
                {
                    input: JSON.stringify(`5,10,15`),
                    output: JSON.stringify(`30`)
                },
                {
                    input: JSON.stringify(`10,40,5`),
                    output: JSON.stringify(`55`)
                },
                {
                    input: JSON.stringify(`10,40,12`),
                    output: JSON.stringify(`55`)
                }
            ]
        }),
        language: "c",
        isPublic: true
    })
    await challenge.save()
    const result = await request(app)
        .post(`/api/v1/compile/challengec/${challenge.id}`)
        .set('Cookie', global.signin(user,'user'))
        .send({
            solution: JSON.stringify(`int solution(int a,int b, int c){int sum = a+b+c; return sum;}`)
        })
        .expect(200)
    expect(result.body.data.successfulTests).toEqual(result.body.data.totalTestsDone-1)

})

it('throws error if it cant compile', async()=>{
    const user = new mongoose.Types.ObjectId()
    const challenge = new Challenge({
        status: 'approved',
        startsAt: Date.now(),
        ownerId: new mongoose.Types.ObjectId(),
        expiresAt: "2014-02-01T00:00:00",
        tests: JSON.stringify({
            "challenge" : [
                {
                    input: JSON.stringify(`5,10,15`),
                    output: JSON.stringify(`30`)
                },
                {
                    input: JSON.stringify(`10,40,5`),
                    output: JSON.stringify(`55`)
                },
                {
                    input: JSON.stringify(`10,40,12`),
                    output: JSON.stringify(`55`)
                }
            ]
        }),
        language: "c",
        isPublic: true
    })
    await challenge.save()
    const result = await request(app)
        .post(`/api/v1/compile/challengec/${challenge.id}`)
        .set('Cookie', global.signin(user,'user'))
        .send({
            solution: JSON.stringify(`int solution(int a,int b, int c){int  = a+b+c; return sum;}`)
        })
        .expect(200)
    expect(result.body.success).toEqual(false)

})

it('fails if challenge doesnt support this language', async()=>{
    const user = new mongoose.Types.ObjectId();
    const challenge = new Challenge({
        status: 'approved',
        startsAt: Date.now(),
        ownerId: new mongoose.Types.ObjectId(),
        expiresAt: "2014-02-01T00:00:00",
        tests: JSON.stringify({
            "challenge" : [
                {
                    input: JSON.stringify(`5,10,15`),
                    output: JSON.stringify(`30`)
                },
                {
                    input: JSON.stringify(`10,40,5`),
                    output: JSON.stringify(`55`)
                },
                {
                    input: JSON.stringify(`10,40,12`),
                    output: JSON.stringify(`55`)
                }
            ]
        }),
        language: "js",
        isPublic: true
    })
    await challenge.save()
    const result = await request(app)
        .post(`/api/v1/compile/challengec/${challenge.id}`)
        .set('Cookie', global.signin(user,'user'))
        .send({
            solution: JSON.stringify(`int solution(int a,int b, int c){int sum = a+b+c; return sum;}`)
        })
        .expect(400)
})

it('fails if challenge is deleted', async()=>{
    const user = new mongoose.Types.ObjectId();
    const challenge = new Challenge({
        status: 'deleted',
        ownerId: new mongoose.Types.ObjectId(),
        startsAt: Date.now(),
        expiresAt: "2014-02-01T00:00:00",
        tests: JSON.stringify({
            "challenge" : [
                {
                    input: JSON.stringify(`5,10,15`),
                    output: JSON.stringify(`30`)
                },
                {
                    input: JSON.stringify(`10,40,5`),
                    output: JSON.stringify(`55`)
                },
                {
                    input: JSON.stringify(`10,40,12`),
                    output: JSON.stringify(`55`)
                }
            ]
        }),
        language: "c",
        isPublic: true
    })
    await challenge.save()
    const result = await request(app)
        .post(`/api/v1/compile/challengec/${challenge.id}`)
        .set('Cookie', global.signin(user,'user'))
        .send({
            solution: JSON.stringify(`int solution(int a,int b, int c){int sum = a+b+c; return sum;}`)
        })
        .expect(400)
})