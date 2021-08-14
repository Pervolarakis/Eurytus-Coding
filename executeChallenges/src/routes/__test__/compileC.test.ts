import request from 'supertest';
import {app} from '../../app';

it('successfully compiles c code', async()=>{
    const result = await request(app)
        .post('/api/v1/compile/c')
        .send(JSON.parse(
            JSON.stringify({
                "code": `#include <assert.h>
                #include <ctype.h>
                #include <locale.h>
                #include <math.h>
                #include <setjmp.h>
                #include <signal.h>
                #include <stdarg.h>
                #include <stdio.h>
                #include <stdlib.h>
                #include <string.h>
                #include <time.h>
                
                int main() {
                    printf("eeeeee");
                }` 
            })
        ))
        .expect(200)
    expect(result.body.data.stdout).toEqual("eeeeee");
})

it('successfully compiles c code and throws error', async()=>{
    const result = await request(app)
        .post('/api/v1/compile/c')
        .send(JSON.parse(
            JSON.stringify({
                "code": `#include <assert.h>
                #include <ctype.h>
                #include <locale.h>
                #include <math.h>
                #inclde <setjmp.h>
                #include <signal.h>
                #include <stdarg.h>
                #include <stdio.h>
                #include <stdlib.h>
                #include <string.h>
                #include <time.h>
                
                int main() {
                    printf("eeeeee");
                }` 
            })
        ))
        .expect(200)
    expect(result.body.data.stderr).not.toEqual('');
})