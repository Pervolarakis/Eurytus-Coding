import {app} from './app';
import mongoose from 'mongoose';
import { initializeDb } from './initializedb';

const start = async () =>{
    try{
        if(!process.env.JWT_KEY){
            throw new Error('No Jwt Env variable');
        }
        await mongoose.connect('mongodb://auth-mongo-srv:27017/auth',{
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
