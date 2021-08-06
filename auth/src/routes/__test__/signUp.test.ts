import {app} from '../../app';
import request from 'supertest';

it('successfully signs up', async()=>{
    await request(app)
        .post('/api/v1/users/auth/signup')
        .send({
            email: 'test1234@gmail.com',
            password: '123456',
            firstName: 'John',
            lastName: 'Doe'
        })
        .expect(201)
})

it('fails if field is missing', async()=>{
    await request(app)
        .post('/api/v1/users/auth/signup')
        .send({
            email: 'test1234@gmail.com',
            password: '123456',
            lastName: 'Doe'
        })
        .expect(400)
})

it('fails if email already exists', async()=>{
    await request(app)
        .post('/api/v1/users/auth/signup')
        .send({
            email: 'test123@gmail.com',
            password: '123456',
            firstName: 'John',
            lastName: 'Doe'
        })
        .expect(400)
})

it('fails if email is not formatted correctly', async()=>{
    await request(app)
        .post('/api/v1/users/auth/signup')
        .send({
            email: 'test123gmail.com',
            password: '123456',
            firstName: 'John',
            lastName: 'Doe'
        })
        .expect(400)
})