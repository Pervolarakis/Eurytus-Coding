import {MongoMemoryServer} from 'mongodb-memory-server';
import mongoose from 'mongoose';
import { User } from '../models/UserModel';
import {dumbData} from './dumbData';
import 'jest';
import {app} from '../app';

let mongo: MongoMemoryServer;

beforeAll(async()=>{
    process.env.JWT_KEY='11234'
    mongo = await MongoMemoryServer.create();
    const mongoURI = mongo.getUri();
    await(mongoose.connect(mongoURI,{
        useNewUrlParser: true,
        useUnifiedTopology: true
    }))
});

beforeEach(async()=>{
    const collections = await mongoose.connection.db.collections();
    for(let collection of collections){
        await collection.deleteMany({});
    }
    for (let user of dumbData) {
        let userObject = new User(user)
        await userObject.save()
    }
});

afterAll(async () => {
    await mongo.stop();
    await mongoose.connection.close();
})