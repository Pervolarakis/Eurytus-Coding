import request from "supertest";
import {app} from '../../app';

it('returns all public and approved requests', async()=>{
    const response = await request(app)
        .get('/api/v1/challenges/')
        .expect(200)
    expect(response.body.data).toHaveLength(4);
})

it('returns all public and approved requests for specific language', async()=>{
    const response = await request(app)
        .get('/api/v1/challenges?language=js')
        .expect(200)
    expect(response.body.data).toHaveLength(1);
})

it('returns all public and approved requests for specific language', async()=>{
    const response = await request(app)
        .get('/api/v1/challenges?language=pipiki')
        .expect(200)
    expect(response.body.data).toHaveLength(0);
})