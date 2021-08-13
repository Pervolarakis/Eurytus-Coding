import request from 'supertest'
import {app} from '../../app';
import { Challenge } from '../../models/Challenge';

jest.setTimeout(150000)

it('successfully runs tests', async()=>{
    const challenge = new Challenge({
        status: 'approved',
        startsAt: Date.now(),
        expiresAt: "2014-02-01T00:00:00",
        tests: JSON.stringify({
            "challenge" : [
                {
                    input: "5,10,15",
                    output: "30"
                },
                {
                    input: "10,40,5",
                    output: "55"
                }
            ]
        }),
        availableLanguages: ["c","js"]
    })
    await challenge.save()
    const result = await request(app)
        .post(`/api/v1/compile/challengec/${challenge.id}`)
        .send({
            solution: 'void solution(int a,int b, int c){int sum = a+b+c; printf("%d",sum);}'
        })
        .expect(200)
    expect(result.body.data.successfulTests).toEqual(result.body.data.totalTestsDone)

})

it('successfully runs tests 2', async()=>{
    const challenge = new Challenge({
        status: 'approved',
        startsAt: Date.now(),
        expiresAt: "2014-02-01T00:00:00",
        tests: JSON.stringify({
            "challenge" : [
                {
                    input: "5,10,15",
                    output: "30"
                },
                {
                    input: "10,40,5",
                    output: "55"
                },
                {
                    input: "10,40,12",
                    output: "55"
                }
            ]
        }),
        availableLanguages: ["java","c"]
    })
    await challenge.save()
    const result = await request(app)
        .post(`/api/v1/compile/challengec/${challenge.id}`)
        .send({
            solution: 'void solution(int a,int b, int c){int sum = a+b+c; printf("%d",sum);}'
        })
        .expect(200)
    expect(result.body.data.successfulTests).toEqual(result.body.data.totalTestsDone-1)

})

it('throws error if it cant compile', async()=>{
    const challenge = new Challenge({
        status: 'approved',
        startsAt: Date.now(),
        expiresAt: "2014-02-01T00:00:00",
        tests: JSON.stringify({
            "challenge" : [
                {
                    input: "5,10,15",
                    output: "30"
                },
                {
                    input: "10,40,5",
                    output: "55"
                },
                {
                    input: "10,40,12",
                    output: "55"
                }
            ]
        }),
        availableLanguages: ["c","js"]
    })
    await challenge.save()
    const result = await request(app)
        .post(`/api/v1/compile/challengec/${challenge.id}`)
        .send({
            solution: 'void solution(int a,int b, int c){int  = a+b+c; printf("%d",sum);}'
        })
        .expect(200)
    expect(result.body.data.successfulTests).toEqual(0)

})

it('fails if challenge doesnt support this language', async()=>{
    const challenge = new Challenge({
        status: 'approved',
        startsAt: Date.now(),
        expiresAt: "2014-02-01T00:00:00",
        tests: JSON.stringify({
            "challenge" : [
                {
                    input: "5,10,15",
                    output: "30"
                },
                {
                    input: "10,40,5",
                    output: "55"
                },
                {
                    input: "10,40,12",
                    output: "55"
                }
            ]
        }),
        availableLanguages: ["js"]
    })
    await challenge.save()
    const result = await request(app)
        .post(`/api/v1/compile/challengec/${challenge.id}`)
        .send({
            solution: 'void solution(int a,int b, int c){int sum = a+b+c; printf("%d",sum);}'
        })
        .expect(400)
})