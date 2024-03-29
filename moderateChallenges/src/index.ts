import {app} from './app';
import mongoose from 'mongoose';
import { natsWrapper } from './events/NatsWrapper';
import { ChallengeNewRequestListener } from './events/ChallengeNewRequestListener';
import { initializeDb } from './initializedb';

const start = async () =>{
    try{
        await natsWrapper.connect('eurytus', process.env.CLIENT_ID! || process.env.HOSTNAME!, 'http://nats-srv:4222')
        new ChallengeNewRequestListener(natsWrapper.client).listen();
        if(!process.env.JWT_KEY){
            throw new Error('No Jwt Env variable');
        }
        await mongoose.connect('mongodb://moderate-challenges-mongo-srv:27017/pending',{
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        })
        console.log("connected to db")
        initializeDb()
    }catch(err){
        console.log(err)
    }
    app.listen(4000, ()=>{
        console.log("listening on port 4000");
    })
}

start();
