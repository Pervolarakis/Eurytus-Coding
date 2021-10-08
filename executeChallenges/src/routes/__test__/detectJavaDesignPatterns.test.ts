import request from 'supertest';
import { app } from '../../app';
import mongoose from 'mongoose';
import {Challenge} from '../../models/Challenge';

it('successfully detects all class names and interfaces', async()=>{
    const challenge = new Challenge({
        status: 'approved',
        startsAt: Date.now(),
        expiresAt: "2014-02-01T00:00:00",
        expectedOutputTests: '',
        language: "java",
        structureTests: '[{"className":"mlkia$peops","modifiers":[],"superClass":"","interfaces":[],"constructors":[],"methods":[{"modifiers":[\"private\"],"name":"getPepe","returnType":"int","parameters":[]}],"fields":[{"modifiers":[\"private\"],"name":"pepe","type":"int"}]},{"className":"mlkia","modifiers":[],"superClass":"","interfaces":[],"constructors":[],"methods":[],"fields":[]}]',
        expectedDesignPatterns: []
    })
    await challenge.save()
    const response = await request(app)
        .post(`/api/v1/compile/checkJavaStructure/${challenge.id}`)
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
    expect(response.body.data.structure).toEqual(true)
})

it('successfully detects all class names and interfaces 2', async()=>{
    const challenge = new Challenge({
        status: 'approved',
        startsAt: Date.now(),
        expiresAt: "2014-02-01T00:00:00",
        expectedOutputTests: '',
        language: "java",
        structureTests: '[{"className":"TestEntity2","modifiers":[],"superClass":"TestEntitySuper","interfaces":["TestInt"],"constructors":[{"modifiers":[\"public\"],"parameters":[\"String\",\"int[]\",\"Map<String,Object>\"]}],"methods":[{"modifiers":[\"public\"],"name":"getM","returnType":"Map<String, Object>","parameters":[]},{"modifiers":[\"public\", \"static\"],"name":"testMethod","returnType":"void","parameters":[\"int\",\"String\",\"Integer\"]}],"fields":[{"modifiers":[\"private\"],"name":"m","type":"Map<String, Object>"},{"modifiers":[\"private static\"],"name":"peops","type":"TestEntity2"}]}]',
        expectedDesignPatterns: []
    })
    await challenge.save()
    const response = await request(app)
        .post(`/api/v1/compile/checkJavaStructure/${challenge.id}`)
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
    const challenge = new Challenge({
        status: 'approved',
        startsAt: Date.now(),
        expiresAt: "2014-02-01T00:00:00",
        expectedOutputTests: '',
        language: "java",
        structureTests: '[{"className":"TestEntity2","modifiers":[],"superClass":"TestEntitySuper","interfaces":["TestInt"],"constructors":[{"modifiers":[\"public\"],"parameters":[\"String\",\"int[]\",\"Map<String, Object>\"]}],"methods":[{"modifiers":[\"public\"],"name":"getM","returnType":"Map<String, Object>","parameters":[]},{"modifiers":[\"public\", \"static\"],"name":"testMethod","returnType":"void","parameters":[\"int\",\"String\",\"Integer\"]}],"fields":[{"modifiers":[\"private\"],"name":"m","type":"Map<String, Object>"},{"modifiers":[\"private static\"],"name":"peops","type":"TestEntity2"}]}]',
        expectedDesignPatterns: ['singleton', 'factory', 'observer']
    })
    await challenge.save()
    const response = await request(app)
        .post(`/api/v1/compile/checkJavaStructure/${challenge.id}`)
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
    expect(response.body.data.structure).toEqual(false)
    expect(response.body.data.designPatterns.singleton).toEqual(true)
    expect(response.body.data.designPatterns.factory).toEqual(false)
    expect(response.body.data.designPatterns.observer).toEqual(false)
})

it('successfully detects factory', async()=>{
    const challenge = new Challenge({
        status: 'approved',
        startsAt: Date.now(),
        expiresAt: "2014-02-01T00:00:00",
        expectedOutputTests: '',
        language: "java",
        structureTests: '[{"className":"TestEntity2","modifiers":[],"superClass":"TestEntitySuper","interfaces":["TestInt"],"constructors":[{"modifiers":[\"public\"],"parameters":[\"String\",\"int[]\",\"Map<String, Object>\"]}],"methods":[{"modifiers":[\"public\"],"name":"getM","returnType":"Map<String, Object>","parameters":[]},{"modifiers":[\"public\", \"static\"],"name":"testMethod","returnType":"void","parameters":[\"int\",\"String\",\"Integer\"]}],"fields":[{"modifiers":[\"private\"],"name":"m","type":"Map<String, Object>"},{"modifiers":[\"private static\"],"name":"peops","type":"TestEntity2"}]}]',
        expectedDesignPatterns: ['singleton', 'factory', 'observer']
    })
    await challenge.save()
    const response = await request(app)
        .post(`/api/v1/compile/checkJavaStructure/${challenge.id}`)
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
    expect(response.body.data.structure).toEqual(false)
    expect(response.body.data.designPatterns.factory).toEqual(true)
    expect(response.body.data.designPatterns.singleton).toEqual(false)
    expect(response.body.data.designPatterns.observer).toEqual(false)
})

it('successfully detects factory 2', async()=>{
    const challenge = new Challenge({
        status: 'approved',
        startsAt: Date.now(),
        expiresAt: "2014-02-01T00:00:00",
        expectedOutputTests: '',
        language: "java",
        structureTests: '[{"className":"TestEntity2","modifiers":[],"superClass":"TestEntitySuper","interfaces":["TestInt"],"constructors":[{"modifiers":[\"public\"],"parameters":[\"String\",\"int[]\",\"Map<String, Object>\"]}],"methods":[{"modifiers":[\"public\"],"name":"getM","returnType":"Map<String, Object>","parameters":[]},{"modifiers":[\"public\", \"static\"],"name":"testMethod","returnType":"void","parameters":[\"int\",\"String\",\"Integer\"]}],"fields":[{"modifiers":[\"private\"],"name":"m","type":"Map<String, Object>"},{"modifiers":[\"private static\"],"name":"peops","type":"TestEntity2"}]}]',
        expectedDesignPatterns: ['factory', 'singleton']
    })
    await challenge.save()
    const response = await request(app)
        .post(`/api/v1/compile/checkJavaStructure/${challenge.id}`)
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
    expect(response.body.data.structure).toEqual(false)
    expect(response.body.data.designPatterns.factory).toEqual(true)
    expect(response.body.data.designPatterns.singleton).toEqual(false)
    })

it('successfully detects factory and singleton', async()=>{
    const challenge = new Challenge({
        status: 'approved',
        startsAt: Date.now(),
        expiresAt: "2014-02-01T00:00:00",
        expectedOutputTests: '',
        language: "java",
        structureTests: '[{"className":"Singleton","modifiers":[],"superClass":"","interfaces":[],"constructors":[{"modifiers":[\"private\"],"parameters":[]}],"methods":[{"modifiers":[\"public\", \"static\"],"name":"getSngl","returnType":"Singleton","parameters":[]}],"fields":[{"modifiers":[\"private static\"],"name":"sngl","type":"Singleton"}]}]',
        expectedDesignPatterns: ['factory', 'singleton']
    })
    await challenge.save()
    const response = await request(app)
        .post(`/api/v1/compile/checkJavaStructure/${challenge.id}`)
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
    const challenge = new Challenge({
        status: 'approved',
        startsAt: Date.now(),
        expiresAt: "2014-02-01T00:00:00",
        expectedOutputTests: '',
        language: "java",
        structureTests: '[{"className":"TestEntity2","modifiers":[],"superClass":"TestEntitySuper","interfaces":["TestInt"],"constructors":[{"modifiers":[\"public\"],"parameters":[\"String\",\"int[]\",\"Map<String, Object>\"]}],"methods":[{"modifiers":[\"public\"],"name":"getM","returnType":"Map<String, Object>","parameters":[]},{"modifiers":[\"public\", \"static\"],"name":"testMethod","returnType":"void","parameters":[\"int\",\"String\",\"Integer\"]}],"fields":[{"modifiers":[\"private\"],"name":"m","type":"Map<String, Object>"},{"modifiers":[\"private static\"],"name":"peops","type":"TestEntity2"}]}]',
        expectedDesignPatterns: ['singleton', 'factory', 'observer']
    })
    await challenge.save()
    const response = await request(app)
        .post(`/api/v1/compile/checkJavaStructure/${challenge.id}`)
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