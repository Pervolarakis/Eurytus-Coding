import {app} from './app';
import mongoose from 'mongoose';
import { natsWrapper } from './events/NatsWrapper';
import { CreateChallengeApprovedListener } from './events/CreateChallengeApprovedListener';
import { UpdateChallengeApprovedListener } from './events/UpdataChallengeApprovedListener';
import { DeleteChallengeApprovedListener } from './events/DeleteChallengeApprovedListener';
import { initializeDb } from './initializedb';

const start = async () =>{
    try{
        if(!process.env.JWT_KEY){
            throw new Error('No Jwt Env variable');
        }
        await natsWrapper.connect('eurytus', process.env.CLIENT_ID! || process.env.HOSTNAME!, 'http://nats-srv:4222')
        new CreateChallengeApprovedListener(natsWrapper.client).listen();
        new UpdateChallengeApprovedListener(natsWrapper.client).listen();
        new DeleteChallengeApprovedListener(natsWrapper.client).listen();
        await mongoose.connect('mongodb://challenges-mongo-srv:27017/challenges',{
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        })
        console.log("connected to db")
        initializeDb();
    }catch(err){
        console.log(err)
    }
    app.listen(4000, ()=>{
        console.log("listening on port 4000");
    })
}

start();
