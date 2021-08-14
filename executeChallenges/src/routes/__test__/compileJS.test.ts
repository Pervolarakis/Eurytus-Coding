import request from 'supertest';
import {app} from '../../app';

it('successfully compiles js code', async()=>{
    const result = await request(app)
        .post('/api/v1/compile/js')
        .send(JSON.parse(
            JSON.stringify({
                "code": `
                    function solution(a,b,c){console.log(a+b+c)}
                    solution(5,10,18)` 
            })
        ))
        .expect(200)
    expect(result.body.data.stdout.trim()).toEqual("33");
})

it('successfully compiles js code and throws error', async()=>{
    const result = await request(app)
        .post('/api/v1/compile/js')
        .send(JSON.parse(
            JSON.stringify({
                "code": `
                function solution(a,b,c){console.log(ab+c)}
                solution()` 
            })
        ))
        .expect(200)
    expect(result.body.data.stderr).not.toEqual('');
})