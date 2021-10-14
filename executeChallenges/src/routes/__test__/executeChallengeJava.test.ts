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
        expectedStructure: '',
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
        expectedStructure: '',
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
        expectedStructure: '',
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
        expectedStructure: '',
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
        expectedStructure: '',
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

it('successfully hides arguments from errors', async()=>{
    const user = new mongoose.Types.ObjectId()
    const challenge = new Challenge({
        status: 'approved',
        startsAt: Date.now(),
        expiresAt: "2014-02-01T00:00:00",
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
        language: "java"
    })
    await challenge.save()
    const result = await request(app)
        .post(`/api/v1/compile/challengejava/${challenge.id}`)
        .set('Cookie', global.signin(user,'user'))
        .send({
            solution: JSON.stringify(`class Solution { public int solution(int a,int b,int c){return(a+b+c);}}`)
        })
        .expect(200)
    expect(result.body.success).toEqual(false);
    expect(result.body.compileError).not.toMatch(/(5,'a',15|30|10,40,5|55|10,40,12)/i)

})

it('successfully detects all class names and interfaces 2', async()=>{
    const user = new mongoose.Types.ObjectId()
    const challenge = new Challenge({
        status: 'approved',
        startsAt: Date.now(),
        expiresAt: "2014-02-01T00:00:00",
        expectedOutputTests: '',
        language: "java",
        expectedStructure: '[{"className":"TestEntity2","modifiers":[],"superClass":"TestEntitySuper","interfaces":["TestInt"],"constructors":[{"modifiers":[\"public\"],"parameters":[\"String\",\"int[]\",\"Map<String,Object>\"]}],"methods":[{"modifiers":[\"public\"],"name":"getM","returnType":"Map<String, Object>","parameters":[]},{"modifiers":[\"public\", \"static\"],"name":"testMethod","returnType":"void","parameters":[\"int\",\"String\",\"Integer\"]}],"fields":[{"modifiers":[\"private\"],"name":"m","type":"Map<String, Object>"},{"modifiers":[\"private static\"],"name":"peops","type":"TestEntity2"}]}]',
        expectedDesignPatterns: ['singleton', 'factory']
    })
    await challenge.save()
    const response = await request(app)
        .post(`/api/v1/compile/challengejava/${challenge.id}`)
        .set('Cookie', global.signin(user,'user'))
        .send({
            solution: JSON.stringify(`class TestEntity2 extends TestEntitySuper implements TestInt{

                private Map<String, Object> m;
                private String str;
                private int num[];
                private TestEntity2 next;
                private static TestEntity2 peops;
            
                public TestEntity2(String strArg, int[] numArg, Map<String, Object> mArg){
                    this.str=strArg;
                    this.num=numArg;
                    this.m=mArg;
                }
            
                public TestEntity2(){
                }
            
                public void setNext(TestEntity2 next) {
                    this.next = next;
                }
            
                public Map<String, Object> getM() {
                    return m;
                }
            
                public String getStr() {
                    return str;
                }
            
                public int[] getNum() {
                    return num;
                }
            
                public TestEntity2 getNext() {
                    return next;
                }
            
                @Override
                public int getNumber() {
                    return 1;
                }
            
            
            
                public static void testMethod(int malaka, Integer mlk2, String pipi){}
            
                @Override
                public void returnShit2() {
                    System.out.println("shit2");
                }
            
                @Override
                public void returnShit() {
            
                }
            }
            
            abstract class TestEntitySuper implements TestInt2{
                public abstract int getNumber();
                public void getPipi(){
                    System.out.println("pipi");
                }
            }
            
            interface TestInt2{
                public void returnShit();
            }
            
            interface TestInt{
                public void returnShit2();
            }`)
        })
        .expect(200)
    expect(response.body.data.structure).toEqual(true)
    expect(response.body.data.designPatterns.singleton).toEqual(false)
    expect(response.body.data.designPatterns.factory).toEqual(false)
})