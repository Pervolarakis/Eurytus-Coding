import {app} from './app';
import mongoose from 'mongoose';
import { natsWrapper } from './events/NatsWrapper';
import { ChallengeNewRequestListener } from './events/ChallengeNewRequestListener';

const start = async () =>{
    try{
        await natsWrapper.connect('eurytus', process.env.CLIENT_ID!, 'http://nats-srv:4222')
        new ChallengeNewRequestListener(natsWrapper.client).listen();
        if(!process.env.JWT_KEY){
            throw new Error('No Jwt Env variable');
        }
        // await mongoose.connect('mongodb://challenges-mongo-srv:27017/auth',{
        //     useNewUrlParser: true,
        //     useUnifiedTopology: true,
        //     useCreateIndex: true
        // })
        // console.log("connected to db")
    }catch(err){
        console.log(err)
    }
    // app.listen(4000, ()=>{
    //     console.log("listening on port 4000");
    // })
}

start();
