import request from 'supertest';
import { app } from '../../app';

it('successfully detects all class names and interfaces', async()=>{
    const response = await request(app)
        .post('/api/v1/compile/getJavaStructure')
        .send({
            code: JSON.stringify(`class mlkia {

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
    console.log(response.body.data)
})

it('successfully detects all class names and interfaces 2', async()=>{
    const response = await request(app)
        .post('/api/v1/compile/getJavaStructure')
        .send({
            code: JSON.stringify(`class TestEntity2 extends TestEntitySuper implements TestInt{

                private Map<String, Object> m;
                private String str;
                private int num[];
                private TestEntity2 next;
            
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
    console.log(response.body.data)
})