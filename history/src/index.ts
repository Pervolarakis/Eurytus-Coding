import {app} from './app';
import mongoose from 'mongoose';
import { natsWrapper } from './events/NatsWrapper';
import { CreateHistoryListener } from './events/CreateHistoryListener';
const start = async () =>{
    try{
        await natsWrapper.connect('eurytus', process.env.CLIENT_ID!, 'http://nats-srv:4222')
        new CreateHistoryListener(natsWrapper.client).listen();
        if(!process.env.JWT_KEY){
            throw new Error('No Jwt Env variable');
        }
        await mongoose.connect('mongodb://history-mongo-srv:27017/history')
        console.log("connected to db")
    }catch(err){
        console.log(err)
    }
    app.listen(4000, ()=>{
        console.log("listening on port 4000");
    })
}

start();
