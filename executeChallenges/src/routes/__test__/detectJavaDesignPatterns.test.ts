import request from 'supertest';
import { app } from '../../app';

it('successfully detects all class names and interfaces', async()=>{
    const response = await request(app)
        .post('/api/v1/compile/getJavaStructure')
        .send({
            code: JSON.stringify(`class mlkia {

            }
            
            class mlkia2{
            
            }
            
            class mlkia2 implements{
            
            }
            
            class mlkia2 extends{
            
            }
            
            interface pipis {
            
            }
            
            interface pipis extends ee{
            
            }
            
            interface pipis2{
            
            }`)
        })
        .expect(200)
    console.log(response.body.data)
})