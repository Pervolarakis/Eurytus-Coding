import request from 'supertest'
import {app} from '../../app';
import { Challenge } from '../../models/Challenge';
import mongoose from 'mongoose'
import {advancedJavaChallenges, advancedJavaChallengesSolutions} from './advancedJavaChallenges'

jest.setTimeout(150000)

it('successfully runs tests', async()=>{
    const user = new mongoose.Types.ObjectId()
    const challenge = new Challenge({
        status: 'approved',
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
                }
            ]
        }),
        language: "java"
    })
    await challenge.save()
    const result = await request(app)
        .post(`/api/v1/compile/challengejava/${challenge.id}`)
        .set('Cookie', global.signin(user,'user'))
        .send({
            solution: JSON.stringify(`public int solution(int a,int b,int c){return(a+b+c);}`)
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
        language: "java"
    })
    await challenge.save()
    const result = await request(app)
        .post(`/api/v1/compile/challengejava/${challenge.id}`)
        .set('Cookie', global.signin(user,'user'))
        .send({
            solution: JSON.stringify(`public int solution(int a,int b,int c){return(a+b+c);}`)
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
        language: "java"
    })
    await challenge.save()
    const result = await request(app)
        .post(`/api/v1/compile/challengejava/${challenge.id}`)
        .set('Cookie', global.signin(user,'user'))
        .send({
            solution: JSON.stringify(`public int solution(int a,int ,int c){return(a+b+c);}`)
        })
        .expect(200)
    expect(result.body.data.successfulTests).toEqual(0)

})

it('fails if challenge doesnt support this language', async()=>{
    const user = new mongoose.Types.ObjectId()
    const challenge = new Challenge({
        status: 'approved',
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
        language: "js"
    })
    await challenge.save()
    const result = await request(app)
        .post(`/api/v1/compile/challengejava/${challenge.id}`)
        .set('Cookie', global.signin(user,'user'))
        .send({
            solution: JSON.stringify(`public int solution(int a,int b,int c){return(a+b+c);}`)
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
})

//note to fix this


// it('successfully runs tests with arrays', async()=>{
//     const challenge = new Challenge({
//         status: 'approved',
//         startsAt: Date.now(),
//         expiresAt: "2014-02-01T00:00:00",
//         tests: JSON.stringify({
//             "challenge" : [
//                 {
//                     input: "1, {5,10,15}",
//                     output: "10"
//                 },
//                 {
//                     input: "2, {10,40,5}",
//                     output: "5"
//                 }
//             ]
//         })
//     })
//     await challenge.save()
//     const result = await request(app)
//         .post(`/api/v1/compile/challengejava/${challenge.id}`)
//         .send({
//             solution: 'public void solution(int a,int[] b){System.out.print(b[a]);}'
//         })
//         .expect(200)
//     expect(result.body.data.successfulTests).toEqual(result.body.data.totalTestsDone)

// })