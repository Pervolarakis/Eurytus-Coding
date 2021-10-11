import request from 'supertest'
import {app} from '../../app';
import { Challenge } from '../../models/Challenge';
import mongoose from 'mongoose'
import {advancedJavaChallenges, advancedJavaChallengesSolutions} from './advancedJavaChallenges'
import {javaDataTypesTest, javaDataTypesTestSolutions} from './javaDataTypesTest';

jest.setTimeout(150000)

it('successfully runs tests', async()=>{
    const user = new mongoose.Types.ObjectId()
    const challenge = new Challenge({
        status: 'approved',
        startsAt: Date.now(),
        expiresAt: "2014-02-01T00:00:00",
        expectedOutputTests: JSON.stringify({
            "challenge" : [
                {
                    input: JSON.stringify(`new Solution().solution(5,10,15)`),
                    output: JSON.stringify(`30`)
                },
                {
                    input: JSON.stringify(`new Solution().solution(10,40,5)`),
                    output: JSON.stringify(`55`)
                }
            ]
        }),
        language: "java",
        structureTests: '',
        expectedDesignPatterns: []
    })
    await challenge.save()
    const result = await request(app)
        .post(`/api/v1/compile/challengejava/${challenge.id}`)
        .set('Cookie', global.signin(user,'user'))
        .send({
            solution: JSON.stringify(`class Solution { public int solution(int a,int b,int c){return(a+b+c);}}`)
        })
        .expect(200)
    expect(result.body.data.successfulTests).toEqual(result.body.data.totalTestsDone)

})

it('successfully runs tests 2', async()=>{
    const user = new mongoose.Types.ObjectId()
    const challenge = new Challenge({
        status: 'approved',
        startsAt: Date.now(),
        expiresAt: "2014-02-01T00:00:00",
        expectedOutputTests: JSON.stringify({
            "challenge" : [
                {
                    input: JSON.stringify(`new Solution().solution(5,10,15)`),
                    output: JSON.stringify(`30`)
                },
                {
                    input: JSON.stringify(`new Solution().solution(10,40,5)`),
                    output: JSON.stringify(`55`)
                },
                {
                    input: JSON.stringify(`new Solution().solution(10,40,12)`),
                    output: JSON.stringify(`55`)
                }
            ]
        }),
        language: "java",
        structureTests: '',
        expectedDesignPatterns: []
    })
    await challenge.save()
    const result = await request(app)
        .post(`/api/v1/compile/challengejava/${challenge.id}`)
        .set('Cookie', global.signin(user,'user'))
        .send({
            solution: JSON.stringify(`class Solution { public int solution(int a,int b,int c){return(a+b+c);}}`)
        })
        .expect(200)
    expect(result.body.data.successfulTests).toEqual(result.body.data.totalTestsDone-1)

})

it('throws error if it cant compile', async()=>{
    const user = new mongoose.Types.ObjectId()
    const challenge = new Challenge({
        status: 'approved',
        startsAt: Date.now(),
        expiresAt: "2014-02-01T00:00:00",
        expectedOutputTests: JSON.stringify({
            "challenge" : [
                {
                    input: JSON.stringify(`new Solution().solution(5,10,15)`),
                    output: JSON.stringify(`30`)
                },
                {
                    input: JSON.stringify(`new Solution().solution(10,40,5)`),
                    output: JSON.stringify(`55`)
                },
                {
                    input: JSON.stringify(`new Solution().solution(10,40,12)`),
                    output: JSON.stringify(`55`)
                }
            ]
        }),
        structureTests: '',
        expectedDesignPatterns: [],
        language: "java"
    })
    await challenge.save()
    const result = await request(app)
        .post(`/api/v1/compile/challengejava/${challenge.id}`)
        .set('Cookie', global.signin(user,'user'))
        .send({
            solution: JSON.stringify(`class Solution { public int solution(int a,int ,int c){return(a+b+c);}}`)
        })
        .expect(200)
        expect(result.body.success).toEqual(false)

})

it('fails if challenge doesnt support this language', async()=>{
    const user = new mongoose.Types.ObjectId()
    const challenge = new Challenge({
        status: 'approved',
        startsAt: Date.now(),
        expiresAt: "2014-02-01T00:00:00",
        expectedOutputTests: JSON.stringify({
            "challenge" : [
                {
                    input: JSON.stringify(`new Solution().solution(5,10,15)`),
                    output: JSON.stringify(`30`)
                },
                {
                    input: JSON.stringify(`new Solution().solution(10,40,5)`),
                    output: JSON.stringify(`55`)
                },
                {
                    input: JSON.stringify(`new Solution().solution(10,40,12)`),
                    output: JSON.stringify(`55`)
                }
            ]
        }),
        language: "js",
        structureTests: '',
        expectedDesignPatterns: []
    })
    await challenge.save()
    const result = await request(app)
        .post(`/api/v1/compile/challengejava/${challenge.id}`)
        .set('Cookie', global.signin(user,'user'))
        .send({
            solution: JSON.stringify(`class Solution { public int solution(int a,int b,int c){return(a+b+c);}}`)
        })
        .expect(400)
})

it('compiles advanced java test', async()=>{
    const user = new mongoose.Types.ObjectId()
    const challenge = new Challenge(advancedJavaChallenges[0])
    await challenge.save()
    const result = await request(app)
        .post(`/api/v1/compile/challengejava/${challenge.id}`)
        .set('Cookie', global.signin(user,'user'))
        .send({
            solution: advancedJavaChallengesSolutions[0]
        })
        .expect(200)
        expect(result.body.data.successfulTests).toEqual(JSON.parse(advancedJavaChallenges[0].expectedOutputTests)["challenge"].length)
})

it('compiles advanced java test', async()=>{
    const user = new mongoose.Types.ObjectId()
    const challenge = new Challenge(advancedJavaChallenges[0])
    await challenge.save()
    const result = await request(app)
        .post(`/api/v1/compile/challengejava/${challenge.id}`)
        .set('Cookie', global.signin(user,'user'))
        .send({
            solution: advancedJavaChallengesSolutions[0]
        })
        .expect(200)
        expect(result.body.data.successfulTests).toEqual(JSON.parse(advancedJavaChallenges[0].expectedOutputTests)["challenge"].length)
})

it('compiles advanced java test2', async()=>{
    const user = new mongoose.Types.ObjectId()
    const challenge = new Challenge(advancedJavaChallenges[1])
    await challenge.save()
    const result = await request(app)
        .post(`/api/v1/compile/challengejava/${challenge.id}`)
        .set('Cookie', global.signin(user,'user'))
        .send({
            solution: advancedJavaChallengesSolutions[1]
        })
        .expect(200)
    expect(result.body.data.successfulTests).toEqual(JSON.parse(advancedJavaChallenges[1].expectedOutputTests)["challenge"].length)
})

it('fails if challenge is deleted', async()=>{
    const user = new mongoose.Types.ObjectId()
    const challenge = new Challenge({
        status: 'deleted',
        startsAt: Date.now(),
        expiresAt: "2014-02-01T00:00:00",
        expectedOutputTests: JSON.stringify({
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
        structureTests: '',
        expectedDesignPatterns: [],
        language: "java"
    })
    await challenge.save()
    const result = await request(app)
        .post(`/api/v1/compile/challengejava/${challenge.id}`)
        .set('Cookie', global.signin(user,'user'))
        .send({
            solution: JSON.stringify(`class Solution { public int solution(int a,int b,int c){return(a+b+c);}}`)
        })
        .expect(400)

})

it('returns arrays', async()=>{
    const user = new mongoose.Types.ObjectId()
    const challenge = new Challenge(javaDataTypesTest[0])
    await challenge.save()
    const result = await request(app)
        .post(`/api/v1/compile/challengejava/${challenge.id}`)
        .set('Cookie', global.signin(user,'user'))
        .send({
            solution: javaDataTypesTestSolutions[0]
        })
        .expect(200)
    expect(result.body.data.successfulTests).toEqual(JSON.parse(javaDataTypesTest[0].expectedOutputTests)["challenge"].length)
})

it('returns lists', async()=>{
    const user = new mongoose.Types.ObjectId()
    const challenge = new Challenge(javaDataTypesTest[2])
    await challenge.save()
    const result = await request(app)
        .post(`/api/v1/compile/challengejava/${challenge.id}`)
        .set('Cookie', global.signin(user,'user'))
        .send({
            solution: javaDataTypesTestSolutions[2]
        })
        .expect(200)
    expect(result.body.data.successfulTests).toEqual(JSON.parse(javaDataTypesTest[2].expectedOutputTests)["challenge"].length)
})

it('returns map', async()=>{
    const user = new mongoose.Types.ObjectId()
    const challenge = new Challenge(javaDataTypesTest[3])
    await challenge.save()
    const result = await request(app)
        .post(`/api/v1/compile/challengejava/${challenge.id}`)
        .set('Cookie', global.signin(user,'user'))
        .send({
            solution: javaDataTypesTestSolutions[3]
        })
        .expect(200)
    expect(result.body.data.successfulTests).toEqual(JSON.parse(javaDataTypesTest[3].expectedOutputTests)["challenge"].length)
})

