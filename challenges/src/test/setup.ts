import {dumbChallenges} from './dumbChallenges';
import MongodbMemoryServer, { MongoMemoryServer } from 'mongodb-memory-server';
import {Challenge} from '../models/challengeModel';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken'

declare global {
    function signin(id: mongoose.Types.ObjectId, role: string): string[];
}

let mongo: MongoMemoryServer;

jest.mock('../events/NatsWrapper')

beforeAll(async()=>{
    process.env.JWT_KEY = 'abc'
    mongo = await MongoMemoryServer.create();
    const mongoURI = mongo.getUri();
    await mongoose.connect(mongoURI, {
        useUnifiedTopology: true,
        useNewUrlParser: true
    })
})

beforeEach(async()=>{
    jest.clearAllMocks();
    const collections = await mongoose.connection.db.collections();
    for(let collection of collections){
        await collection.deleteMany({})
    }
    for(let challenge of dumbChallenges){
        let challengeObject = new Challenge(challenge);
        await challengeObject.save();
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