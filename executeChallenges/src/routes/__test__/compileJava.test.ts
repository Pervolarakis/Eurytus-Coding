import request from 'supertest';
import {app} from '../../app';

it('successfully compiles java code', async()=>{
    const result = await request(app)
        .post('/api/v1/compile/java')
        .send(JSON.parse(
            JSON.stringify({
                "code": `
                    import java.util.*;
                    import java.io.*;
                
                    public class SimpleClass {
                
                        public SimpleClass() {
                        }
                
                        public void solution(int a,int b,int c){System.out.println(a+b+c);}
                        
                        public static void main(String[] args) {
                            SimpleClass test = new SimpleClass();
                            test.solution(5,10,18);
                        }
                
                    }` 
            })
        ))
        .expect(200)
    expect(result.body.data.stdout.trim()).toEqual("33");
})

it('successfully compiles java code and throws error', async()=>{
    const result = await request(app)
        .post('/api/v1/compile/java')
        .send(JSON.parse(
            JSON.stringify({
                "code": `
                    import java.util.*;
                    import java.io.*;
                
                    public class SimpleClass {
                
                        public SimpleClass() {
                        }
                
                        public void solution(int a,int b,int c){System.out.println(ab+c);}
                        
                        public static void main(String[] args) {
                            SimpleClass test = new SimpleClass();
                            test.solution(5,10,18);
                        }
                
                    }` 
            })
        ))
        .expect(200)
    expect(result.body.data.stderr).not.toEqual('');

})