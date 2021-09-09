import {dumbRequests} from './dumbRequests';
import { MongoMemoryServer } from 'mongodb-memory-server';
import {History} from '../models/History';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';

declare global {
    function signin(id: mongoose.Types.ObjectId, role: string): string[];
}

let mongo: MongoMemoryServer;

jest.mock('../events/NatsWrapper')

beforeAll(async()=>{
    process.env.JWT_KEY = 'abc'
    mongo = await MongoMemoryServer.create();
    const mongoURI = mongo.getUri();
    await mongoose.connect(mongoURI)
})

beforeEach(async()=>{
    jest.clearAllMocks();
    const collections = await mongoose.connection.db.collections();
    for(let collection of collections){
        await collection.deleteMany({})
    }
    for(let request of dumbRequests){
        let requestsObject = new History(request);
        await requestsObject.save();
    }
})

afterAll(async()=>{
    await mongo.stop();
    await mongoose.connection.close();
})

global.signin = (id: mongoose.Types.ObjectId, role: string) => {
    const payload = {
        id: id,
        email: 'test@gmail.com',
        role: role
    };

    const token = jwt.sign(payload, process.env.JWT_KEY!);

    const session = {jwt: token};

    const sessionJSON = JSON.stringify(session);

    const base64 = Buffer.from(sessionJSON).toString('base64');

    return [`express:sess=${base64}`]
}