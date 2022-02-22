import {app} from '../../app';
import request from 'supertest';

it('successfully signs up', async()=>{
    await request(app)
        .post('/api/v1/users/auth/signup')
        .send({
            email: 'test1234@gmail.com',
            password: '123456',
            firstName: 'John',
            lastName: 'Doey'
        })
        .expect(201)
})

it('fails if field is missing', async()=>{
    const response = await request(app)
        .post('/api/v1/users/auth/signup')
        .send({
            email: 'test1234@gmail.com',
            password: '123456',
            lastName: 'Doeyy'
        })
        .expect(400)
    expect(response.body.error).toContainEqual({field: "firstName", message: "First name cant be empty"})
})

it('fails if email already exists', async()=>{
    const response = await request(app)
        .post('/api/v1/users/auth/signup')
        .send({
            email: 'test123@gmail.com',
            password: '123456',
            firstName: 'John',
            lastName: 'Doeyy'
        })
        .expect(400)
    expect(response.body.error).toEqual('User already exists with this email address')
})

it('fails if email is not formatted correctly', async()=>{
    const response = await request(app)
        .post('/api/v1/users/auth/signup')
        .send({
            email: 'test123gmail.com',
            password: '123456',
            firstName: 'John',
            lastName: 'Doeyy'
        })
        .expect(400)
        expect(response.body.error).toContainEqual({field: "email", message: "Invalid Email"})
})