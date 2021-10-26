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
        expectedStructure: '[{"blockType":"Base","expanded":true,"children":[{"title":"Interface","className":"furnitureFactory","blockType":"interface","superClass":"","modifiers":[\"abstract interface\"],"expanded":true,"children":[{"title":"Method","blockType":"method","modifiers":[\"public\"],"parameters":"","returnType":"Furniture","name":"getFurniture"}]},{"title":"Class","blockType":"class","modifiers":[],"className":"factorySubClass","superClass":"","name":"","interfaces":"","expanded":true,"children":[{"title":"Implements","blockType":"implements","className":"furnitureFactory","expanded":true},{"title":"Method","blockType":"method","modifiers":[\"public\"],"parameters":"","returnType":"Furniture","name":"getFurniture"}]},{"title":"Interface","className":"Furniture","blockType":"interface","superClass":"","modifiers":[\"abstract interface\"]},{"title":"Class","blockType":"class","modifiers":[],"className":"Chair","superClass":"","name":"","interfaces":"","expanded":true,"children":[{"title":"Implements","blockType":"implements","className":"Furniture"}]}]}]',
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
    expect(result.body.data.structure).toEqual(false)
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
        expectedDesignPatterns: ['factory']
    })
    await challenge.save()
    const result = await request(app)
        .post(`/api/v1/compile/challengejava/${challenge.id}`)
        .set('Cookie', global.signin(user,'user'))
        .send({
            solution: JSON.stringify(`class Solution { public int solution(int a,int b,int c){return(a+b+c);}}`)
        })
        .expect(200)
    expect(result.body.data.designPatterns.factory).toEqual(false)
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
        expectedDesignPatterns: ['factory'],
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
        expectedStructure: '[{"blockType":"Base","expanded":true,"children":[{"title":"Class","blockType":"class","modifiers":[],"className":"TestEntity2","superClass":"TestEntitySuper","name":"","interfaces":"","expanded":true,"children":[{"title":"Implements","blockType":"implements","className":"TestInt"},{"title":"Field","blockType":"field","modifiers":[\"private\"],"type":"Map<String, Object>","name":"m"},{"title":"Field","blockType":"field","modifiers":[\"private static\"],"type":"TestEntity2","name":"peops","expanded":true},{"title":"Constructor","blockType":"constructor","parameters":"","modifiers":[\"public\"],"expanded":true,"children":[{"title":"Argument","name":"String","blockType":"argument","expanded":true},{"title":"Argument","name":"int[]","blockType":"argument"},{"title":"Argument","name":"Map<String, Object>","blockType":"argument"}]},{"title":"Method","blockType":"method","modifiers":[\"public\"],"parameters":"","returnType":"Map<String, Object>","name":"getM","expanded":true},{"title":"Method","blockType":"method","modifiers":[\"public\", \"static\"],"parameters":"","returnType":"void","name":"testMethod","expanded":true,"children":[{"title":"Argument","name":"int","blockType":"argument"},{"title":"Argument","name":"Integer","blockType":"argument"},{"title":"Argument","name":"String","blockType":"argument"}]}]}]}]',
        expectedDesignPatterns: []
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
})

it('successfully detects singleton', async()=>{
    const user = new mongoose.Types.ObjectId()
    const challenge = new Challenge({
        status: 'approved',
        startsAt: Date.now(),
        expiresAt: "2014-02-01T00:00:00",
        expectedOutputTests: '',
        language: "java",
        expectedStructure: '',
        expectedDesignPatterns: ['singleton', 'factory', 'observer']
    })
    await challenge.save()
    const response = await request(app)
        .post(`/api/v1/compile/challengejava/${challenge.id}`)
        .set('Cookie', global.signin(user,'user'))
        .send({
            solution: JSON.stringify(`class mlkia {
                class peops{
                    private int pepe=5;
                    private int getPepe(){
                        return pepe;
                    }
                }
            }
            
            abstract class mlkia2{
                
            }

            class Singleton{
                private static Singleton sngl;
                private Singleton(){

                }
                public static Singleton getSngl(){
                    return sngl;
                }
            }
            
            class mlkia3 implements pipis2{
            
            }
            
            class mlkia4 extends mlkia2{
            
            }
            
            interface pipis1 {
            
            }
            
            interface pipis extends pipis2{
            
            }
            
            interface pipis2{
            
            }`)
        })
        .expect(200)
    expect(response.body.data.designPatterns.singleton).toEqual(true)
    expect(response.body.data.designPatterns.factory).toEqual(false)
    expect(response.body.data.designPatterns.observer).toEqual(false)
})

it('successfully detects factory', async()=>{
    const user = new mongoose.Types.ObjectId()
    const challenge = new Challenge({
        status: 'approved',
        startsAt: Date.now(),
        expiresAt: "2014-02-01T00:00:00",
        expectedOutputTests: '',
        language: "java",
        expectedStructure: '',
        expectedDesignPatterns: ['singleton', 'factory', 'observer']
    })
    await challenge.save()
    const response = await request(app)
        .post(`/api/v1/compile/challengejava/${challenge.id}`)
        .set('Cookie', global.signin(user,'user'))
        .send({
            solution: JSON.stringify(`
            class mlkia {
                class peops{
                    private int pepe=5;
                    private int getPepe(){
                        return pepe;
                    }
                }
            }
            
            abstract class Furniture{
                
            }

            class Chair extends Furniture{

            }
            
            interface furnitureFactory{
                public Furniture getFurniture();
            }
            
            class factorySubClass implements furnitureFactory{
                public Furniture getFurniture(){

                    return new Chair();
                }
            }
            
            `)
        })
        .expect(200)
    expect(response.body.data.designPatterns.factory).toEqual(true)
    expect(response.body.data.designPatterns.singleton).toEqual(false)
    expect(response.body.data.designPatterns.observer).toEqual(false)
})

it('successfully detects factory 2', async()=>{
    const user = new mongoose.Types.ObjectId()
    const challenge = new Challenge({
        status: 'approved',
        startsAt: Date.now(),
        expiresAt: "2014-02-01T00:00:00",
        expectedOutputTests: '',
        language: "java",
        expectedStructure: '[{"blockType":"Base","expanded":true,"children":[{"title":"Interface","className":"furnitureFactory","blockType":"interface","superClass":"","modifiers":[\"abstract interface\"],"expanded":true,"children":[{"title":"Method","blockType":"method","modifiers":[\"public\"],"parameters":"","returnType":"Furniture","name":"getFurniture"}]},{"title":"Class","blockType":"class","modifiers":[],"className":"factorySubClass","superClass":"","name":"","interfaces":"","expanded":true,"children":[{"title":"Implements","blockType":"implements","className":"furnitureFactory","expanded":true},{"title":"Method","blockType":"method","modifiers":[\"public\"],"parameters":"","returnType":"Furniture","name":"getFurniture"}]},{"title":"Interface","className":"Furniture","blockType":"interface","superClass":"","modifiers":[\"abstract interface\"]},{"title":"Class","blockType":"class","modifiers":[],"className":"Chair","superClass":"","name":"","interfaces":"","expanded":true,"children":[{"title":"Implements","blockType":"implements","className":"Furniture"}]}]}]',
        expectedDesignPatterns: ['factory', 'singleton']
    })
    await challenge.save()
    const response = await request(app)
        .post(`/api/v1/compile/challengejava/${challenge.id}`)
        .set('Cookie', global.signin(user,'user'))
        .send({
            solution: JSON.stringify(`
            class mlkia {
                class peops{
                    private int pepe=5;
                    private int getPepe(){
                        return pepe;
                    }
                }
            }
            
            interface Furniture{
                
            }

            class Chair implements Furniture{

            }
            
            interface furnitureFactory{
                public Furniture getFurniture();
            }
            
            class factorySubClass implements furnitureFactory{
                public Furniture getFurniture(){

                    return new Chair();
                }
            }
            
            `)
        })
        .expect(200)
    expect(response.body.data.structure).toEqual(true)
    expect(response.body.data.designPatterns.factory).toEqual(true)
    expect(response.body.data.designPatterns.singleton).toEqual(false)
    })

it('successfully detects factory and singleton', async()=>{
    const user = new mongoose.Types.ObjectId()
    const challenge = new Challenge({
        status: 'approved',
        startsAt: Date.now(),
        expiresAt: "2014-02-01T00:00:00",
        expectedOutputTests: '',
        language: "java",
        expectedStructure: '[{"blockType":"Base","expanded":true,"children":[{"title":"Class","blockType":"class","modifiers":[],"className":"Singleton","superClass":"","name":"","interfaces":"","expanded":true,"children":[{"title":"Field","blockType":"field","modifiers":[\"private static\"],"type":"Singleton","name":"sngl"},{"title":"Constructor","blockType":"constructor","parameters":"","modifiers":[\"private\"],"expanded":true},{"title":"Method","blockType":"method","modifiers":[\"public\", \"static\"],"parameters":"","returnType":"Singleton","name":"getSngl"}]},{"title":"Class","blockType":"class","modifiers":[],"className":"factorySubClass","superClass":"","name":"","interfaces":"","expanded":true,"children":[{"title":"Implements","blockType":"implements","className":"furnitureFactory"},{"title":"Method","blockType":"method","modifiers":[\"public\"],"parameters":"","returnType":"Furniture","name":"getFurniture"}]}]}]',
        expectedDesignPatterns: ['factory', 'singleton']
    })
    await challenge.save()
    const response = await request(app)
        .post(`/api/v1/compile/challengejava/${challenge.id}`)
        .set('Cookie', global.signin(user,'user'))
        .send({
            solution: JSON.stringify(`
            class mlkia {
                class peops{
                    private int pepe=5;
                    private int getPepe(){
                        return pepe;
                    }
                }
            }
            
            interface Furniture{
                
            }

            class Chair implements Furniture{

            }
            
            interface furnitureFactory{
                public Furniture getFurniture();
            }
            
            class Singleton{
                private static Singleton sngl;
                private Singleton(){

                }
                public static Singleton getSngl(){
                    return sngl;
                }
            }

            class factorySubClass implements furnitureFactory{
                public Furniture getFurniture(){

                    return new Chair();
                }
            }
            
            `)
        })
        .expect(200)
    expect(response.body.data.structure).toEqual(true)
    expect(response.body.data.designPatterns.factory).toEqual(true)
    expect(response.body.data.designPatterns.singleton).toEqual(true)
})

it('successfully detects factory and singleton', async()=>{
    const user = new mongoose.Types.ObjectId()
    const challenge = new Challenge({
        status: 'approved',
        startsAt: Date.now(),
        expiresAt: "2014-02-01T00:00:00",
        expectedOutputTests: '',
        language: "java",
        expectedStructure: '[{"blockType":"Base","expanded":true,"children":[{"title":"Class","blockType":"class","modifiers":[],"className":"TestEntity2","superClass":"TestEntitySuper","name":"","interfaces":"","expanded":true,"children":[{"title":"Implements","blockType":"implements","className":"TestInt"},{"title":"Field","blockType":"field","modifiers":[\"private\"],"type":"Map<String, Object>","name":"m"},{"title":"Field","blockType":"field","modifiers":[\"private static\"],"type":"TestEntity2","name":"peops","expanded":true},{"title":"Constructor","blockType":"constructor","parameters":"","modifiers":[\"public\"],"expanded":true,"children":[{"title":"Argument","name":"String","blockType":"argument","expanded":true},{"title":"Argument","name":"int[]","blockType":"argument"},{"title":"Argument","name":"Map<String, Object>","blockType":"argument"}]},{"title":"Method","blockType":"method","modifiers":[\"public\"],"parameters":"","returnType":"Map<String, Object>","name":"getM","expanded":true},{"title":"Method","blockType":"method","modifiers":[\"public\", \"static\"],"parameters":"","returnType":"void","name":"testMethod","expanded":true,"children":[{"title":"Argument","name":"int","blockType":"argument"},{"title":"Argument","name":"Integer","blockType":"argument"},{"title":"Argument","name":"String","blockType":"argument"}]}]}]}]',
        expectedDesignPatterns: ['singleton', 'factory', 'observer']
    })
    await challenge.save()
    const response = await request(app)
        .post(`/api/v1/compile/challengejava/${challenge.id}`)
        .set('Cookie', global.signin(user,'user'))
        .send({
            solution: JSON.stringify(`
            class mlkia {
                class peops{
                    private int pepe=5;
                    private int getPepe(){
                        return pepe;
                    }
                }
            }
            
            interface Observer{
            }

            class Chair implements Observer{
                private Observable obs;
            }
            
            class Observable{
                private List<Observer> ls;
            }
            
            
            `)
        })
        .expect(200)
    expect(response.body.data.structure).toEqual(false)
    expect(response.body.data.designPatterns.factory).toEqual(false)
    expect(response.body.data.designPatterns.singleton).toEqual(false)
    expect(response.body.data.designPatterns.observer).toEqual(true)
})