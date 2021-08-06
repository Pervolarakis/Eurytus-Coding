import {app} from '../../app';
import request from 'supertest';

it('successfully logs in', async()=>{
    await request(app)
        .post('/api/v1/users/auth/login')
        .send({
            email: 'test123@gmail.com',
            password: '123456'
        })
        .expect(200)
})

it('throws error if field is missing', async()=>{
    await request(app)
        .post('/api/v1/users/auth/login')
        .send({
            email: 'test123@gmail.com'
        })
        .expect(400)
})

it('throws error if password is wrong', async()=>{
    await request(app)
        .post('/api/v1/users/auth/login')
        .send({
            email: 'test123@gmail.com',
            password: '123459'
        })
        .expect(400)
})

it('throws error if user doesnt exist', async()=>{
    await request(app)
        .post('/api/v1/users/auth/login')
        .send({
            email: 'test523@gmail.com',
            password: '123459'
        })
        .expect(400)
})