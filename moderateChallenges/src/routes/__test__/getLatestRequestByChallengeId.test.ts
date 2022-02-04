import request from 'supertest';
import {app} from '../../app';
import { PendingRequest } from '../../models/PendingRequests';
import mongoose from 'mongoose';

it('successfully returns latest request for specific challenge', async()=>{
    const user = new mongoose.Types.ObjectId();
    const date = new Date();
    const challengeId = new mongoose.Types.ObjectId();
    date.setDate(date.getDate()+1)
    const date2 = new Date();
    date2.setDate(date2.getDate()+5)
    const request1 = new PendingRequest({
        kind: 'update',
        ownerId: user,
        challengeId: challengeId,
        data: JSON.stringify({
            name: "Multiply Challenge2",
            description: "Write a challenge that multiplies 99 numbers"
        }),
        message: 'update my challenge',
        created_at: date.toISOString(),
        ownerEmail: 'admin@gmail.com',
        challengeName: "Multiply Challenge2"
    })
    const request2 = new PendingRequest({
        kind: 'update',
        ownerId: user,
        challengeId: challengeId,
        data: JSON.stringify({
            name: "Multiply Challenge2",
            description: "Write a challenge that multiplies 160 numbers"
        }),
        message: 'update my challenge',
        created_at: new Date().toISOString(),
        ownerEmail: 'admin@gmail.com',
        challengeName: "Multiply Challenge2"
    })
    const request3 = new PendingRequest({
        kind: 'update',
        ownerId: user,
        challengeId: challengeId,
        data: JSON.stringify({
            name: "Multiply Challenge2",
            description: "Write a challenge that multiplies 667 numbers"
        }),
        message: 'update my challenge',
        created_at: date2.toISOString(),
        ownerEmail: 'admin@gmail.com',
        challengeName: "Multiply Challenge2"
    })
    request1.save();
    request2.save();
    request3.save();

    const result = await request(app)
        .get(`/api/v1/moderate/getchallengelatestrequest/${challengeId}`)
        .set('Cookie', global.signin(user, 'user'))
        .expect(200)
    expect(result.body.data).toEqual(
        
        expect.objectContaining({data: JSON.stringify({
            name: "Multiply Challenge2",
            description: "Write a challenge that multiplies 667 numbers"
        })})
        
    )

})

it('successfully returns latest request for specific challenge 2', async()=>{
    const user = new mongoose.Types.ObjectId();
    const date = new Date();
    const challengeId = new mongoose.Types.ObjectId();
    date.setDate(date.getDate()+1)
    const request1 = new PendingRequest({
        kind: 'update',
        ownerId: user,
        challengeId: challengeId,
        data: JSON.stringify({
            name: "Multiply Challenge2",
            description: "Write a challenge that multiplies 99 numbers"
        }),
        message: 'update my challenge',
        created_at: date.toISOString(),
        ownerEmail: 'admin@gmail.com',
        challengeName: "Multiply Challenge2"
    })
    const request2 = new PendingRequest({
        kind: 'update',
        ownerId: user,
        challengeId: challengeId,
        data: JSON.stringify({
            name: "Multiply Challenge2",
            description: "Write a challenge that multiplies 160 numbers"
        }),
        message: 'update my challenge',
        created_at: new Date().toISOString(),
        ownerEmail: 'admin@gmail.com',
        challengeName: "Multiply Challenge2"
    })
    const request3 = new PendingRequest({
        kind: 'update',
        ownerId: user,
        challengeId: challengeId,
        data: JSON.stringify({
            name: "Multiply Challenge2",
            description: "Write a challenge that multiplies 667 numbers"
        }),
        message: 'update my challenge',
        created_at: new Date().toISOString(),
        ownerEmail: 'admin@gmail.com',
        challengeName: "Multiply Challenge2"
    })
    request1.save();
    request2.save();
    request3.save();

    const result = await request(app)
        .get(`/api/v1/moderate/getchallengelatestrequest/${challengeId}`)
        .set('Cookie', global.signin(user, 'user'))
        .expect(200)
        expect(result.body.data).toEqual(
            expect.objectContaining({data: JSON.stringify({
                name: "Multiply Challenge2",
                description: "Write a challenge that multiplies 99 numbers"
            })
        })
        
    )

})
it('returns 400 if challenge doesnt exist', async()=>{
    const user = new mongoose.Types.ObjectId();
    const challengeId = new mongoose.Types.ObjectId();
    const result = await request(app)
        .get(`/api/v1/moderate/getchallengelatestrequest/${challengeId}`)
        .set('Cookie', global.signin(user, 'user'))
        .expect(400)
    
})

it('returns 400 if user doesnt own challenge', async()=>{
    const user = new mongoose.Types.ObjectId();
    const challengeId = new mongoose.Types.ObjectId();
    const request1 = new PendingRequest({
        kind: 'update',
        ownerId: new mongoose.Types.ObjectId(),
        challengeId: challengeId,
        data: JSON.stringify({
            name: "Multiply Challenge2",
            description: "Write a challenge that multiplies 160 numbers"
        }),
        message: 'update my challenge',
        created_at: new Date().toISOString(),
        ownerEmail: 'admin@gmail.com',
        challengeName: "Multiply Challenge2"
    })
    request1.save();
    const result = await request(app)
        .get(`/api/v1/moderate/getchallengelatestrequest/${challengeId}`)
        .set('Cookie', global.signin(user, 'user'))
        .expect(403)
    
})