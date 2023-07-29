import request from 'supertest'
import {app} from '../../app';
import { Challenge } from '../../models/Challenge';
import mongoose from 'mongoose'
import {jsDataTypesTest, jsDataTypesTestSolutions} from './jsDataTypesTest'
 
jest.setTimeout(150000)

it('successfully runs tests', async()=>{
    const user = new mongoose.Types.ObjectId();
    const challenge = new Challenge({
        status: 'approved',
        startsAt: Date.now(),
        expiresAt: "2014-02-01T00:00:00",
        ownerId: new mongoose.Types.ObjectId(),
        expectedOutputTests: JSON.stringify({
            "challenge" : [
                {
                    input: JSON.stringify(`solution(5,10,15)`),
                    output: JSON.stringify(`30`)
                },
                {
                    input: JSON.stringify(`solution(10,40,5)`),
                    output: JSON.stringify(`55`)
                }
            ]
        }),
        expectedStructure: '',
        expectedDesignPatterns: [],
        language: "js",
        isPublic: true
    })
    await challenge.save()
    const result = await request(app)
        .post(`/api/v1/compile/challengejs/${challenge.id}`)
        .set('Cookie', global.signin(user,'user'))
        .send({
            solution: JSON.stringify(`function solution(a,b,c){return(a+b+c)}`)
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
        expectedOutputTests: JSON.stringify({
            "challenge" : [
                {
                    input: JSON.stringify(`solution(5,10,15)`),
                    output: JSON.stringify(`30`)
                },
                {
                    input: JSON.stringify(`solution(10,40,5)`),
                    output: JSON.stringify(`55`)
                },
                {
                    input: JSON.stringify(`solution(10,40,12)`),
                    output: JSON.stringify(`59`)
                }
            ]
        }),
        expectedStructure: '',
        expectedDesignPatterns: [],
        language: "js",
        isPublic: true
    })
    await challenge.save()
    const result = await request(app)
        .post(`/api/v1/compile/challengejs/${challenge.id}`)
        .set('Cookie', global.signin(user,'user'))
        .send({
            solution: JSON.stringify(`function solution(a,b,c){return(a+b+c)}`)
        })
        .expect(200)
    expect(result.body.data.successfulTests).toEqual(result.body.data.totalTestsDone-1)

})

it('throws error if it cant compile', async()=>{
    const user = new mongoose.Types.ObjectId();
    const challenge = new Challenge({
        status: 'approved',
        startsAt: Date.now(),
        ownerId: new mongoose.Types.ObjectId(),
        expiresAt: "2014-02-01T00:00:00",
        expectedOutputTests: JSON.stringify({
            "challenge" : [
                {
                    input: JSON.stringify(`solution(5,10,15)`),
                    output: JSON.stringify(`30`)
                },
                {
                    input: JSON.stringify(`solution(10,40,5)`),
                    output: JSON.stringify(`55`)
                },
                {
                    input: JSON.stringify(`solution(10,40,12)`),
                    output: JSON.stringify(`55`)
                }
            ]
        }),
        expectedStructure: '',
        expectedDesignPatterns: [],
        language: "js",
        isPublic: true
    })
    await challenge.save()
    const result = await request(app)
        .post(`/api/v1/compile/challengejs/${challenge.id}`)
        .set('Cookie', global.signin(user,'user'))
        .send({
            solution: JSON.stringify(`function solution(a,b,c){return(a++c)}`)
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
        expectedOutputTests: JSON.stringify({
            "challenge" : [
                {
                    input: JSON.stringify(`solution(5,10,15)`),
                    output: JSON.stringify(`30`)
                },
                {
                    input: JSON.stringify(`solution(10,40,5)`),
                    output: JSON.stringify(`55`)
                },
                {
                    input: JSON.stringify(`solution(10,40,12)`),
                    output: JSON.stringify(`55`)
                }
            ]
        }),
        expectedStructure: '',
        expectedDesignPatterns: [],
        language: "java",
        isPublic: true
    })
    await challenge.save()
    const result = await request(app)
        .post(`/api/v1/compile/challengejs/${challenge.id}`)
        .set('Cookie', global.signin(user,'user'))
        .send({
            solution: JSON.stringify(`function solution(a,b,c){return(a++c)}`)
        })
        .expect(400)
})

it('fails if challenge is deleted', async()=>{
    const user = new mongoose.Types.ObjectId();
    const challenge = new Challenge({
        status: 'deleted',
        startsAt: Date.now(),
        ownerId: new mongoose.Types.ObjectId(),
        expiresAt: "2014-02-01T00:00:00",
        expectedOutputTests: JSON.stringify({
            "challenge" : [
                {
                    input: JSON.stringify(`solution(5,10,15)`),
                    output: JSON.stringify(`30`)
                },
                {
                    input: JSON.stringify(`solution(10,40,5)`),
                    output: JSON.stringify(`55`)
                },
                {
                    input: JSON.stringify(`solution(10,40,12)`),
                    output: JSON.stringify(`55`)
                }
            ]
        }),
        expectedStructure: '',
        expectedDesignPatterns: [],
        language: "js",
        isPublic: true
    })
    await challenge.save()
    const result = await request(app)
        .post(`/api/v1/compile/challengejs/${challenge.id}`)
        .set('Cookie', global.signin(user,'user'))
        .send({
            solution: JSON.stringify(`function solution(a,b,c){return(a+b+c)}`)
        })
        .expect(400)

})

it('returns any data type', async()=>{
    const user = new mongoose.Types.ObjectId()
    const challenge = new Challenge(jsDataTypesTest[0])
    await challenge.save()
    const result = await request(app)
        .post(`/api/v1/compile/challengejs/${challenge.id}`)
        .set('Cookie', global.signin(user,'user'))
        .send({
            solution: jsDataTypesTestSolutions[0]
        })
        .expect(200)
    expect(result.body.data.successfulTests).toEqual(JSON.parse(jsDataTypesTest[0].expectedOutputTests)["challenge"].length)
})

it('successfully hides arguments from errors', async()=>{
    const user = new mongoose.Types.ObjectId()
    const challenge = new Challenge({
        status: 'approved',
        startsAt: Date.now(),
        expiresAt: "2014-02-01T00:00:00",
        ownerId: new mongoose.Types.ObjectId(),
        expectedOutputTests: JSON.stringify({
            "challenge" : [
                {
                    input: JSON.stringify(`5,'a',15`),
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
        expectedStructure: '',
        expectedDesignPatterns: [],
        language: "js",
        isPublic: true
    })
    await challenge.save()
    const result = await request(app)
        .post(`/api/v1/compile/challengejs/${challenge.id}`)
        .set('Cookie', global.signin(user,'user'))
        .send({
            solution: JSON.stringify(`function solution(a,c){return(a+b+c)}`)
        })
        .expect(200)
    expect(result.body.success).toEqual(false);
    expect(result.body.compileError).not.toMatch(/(5,'a',15|30|10,40,5|55|10,40,12)/i)

})