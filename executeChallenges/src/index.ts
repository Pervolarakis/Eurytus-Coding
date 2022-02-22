import mongoose from 'mongoose';
import { CreateChallengeListener } from './events/CreateChallengeListener';
import { natsWrapper } from './events/NatsWrapper';
import { UpdateChallengeListener } from './events/UpdateChallengeListener';
import { DeleteChallengeListener } from './events/DeleteChallengeListener';
import {app} from './app';
import { initializeDb } from './initializedb';

const start = async()=>{
    
    try{
        if(!process.env.JWT_KEY){
            throw new Error('No Jwt Env variable');
        }
        await natsWrapper.connect('eurytus', process.env.CLIENT_ID!, 'http://nats-srv:4222')
        new CreateChallengeListener(natsWrapper.client).listen();
        new UpdateChallengeListener(natsWrapper.client).listen();
        new DeleteChallengeListener(natsWrapper.client).listen();
        await mongoose.connect('mongodb://execute-challenges-mongo-srv:27017/challenges',{
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        })
        initializeDb()
        console.log("connected to db")
    }catch(err){
        console.log(err)
    }
    app.listen(4000, ()=>{
        console.log('listening on 4000')
    })
    
}

start();
