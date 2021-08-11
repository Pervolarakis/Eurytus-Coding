import {node,c,java} from 'compile-run';
import {cTemp} from './templates/cTemp';
import {jsTemp} from './templates/jsTemp';
import {javaTemp} from './templates/javaTemp'
import mongoose from 'mongoose';
import { CreateChallengeListener } from './events/CreateChallengeListener';
import { natsWrapper } from './events/NatsWrapper';
import { UpdateChallengeListener } from './events/UpdateChallengeListener';
import { DeleteChallengeListener } from './events/DeleteChallengeListener';

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
        console.log("connected to db")
    }catch(err){
        console.log(err)
    }
    
}

start();

//Java

// console.log(javaTemp('5,10,18','public void solution(int a,int b,int c){System.out.println(a+b+c);}'))

// let resultPromise = java.runSource(javaTemp('5,10,18','public void solution(int a,int b,int c){System.out.println(a+b+c);}'));
// resultPromise
//     .then(result => {
//         console.log(result);
//     })
//     .catch(err => {
//         console.log(err);
//     });

//JS

// console.log(jsTemp('5,10,16','function solution(a,b,c){console.log(a+b+c)}'))

// let resultPromise = node.runSource(jsTemp('5,10,16','function solution(a,b,c){console.log(a+b+c)}'));
// resultPromise
//     .then(result => {
//         console.log(result);
//     })
//     .catch(err => {
//         console.log(err);
//     });


//C

// console.log(cTemp('5, 10, 15','void solution(int a,int b, int c){int sum = a+b+c; printf("%d",sum);}'))

// let resultPromise1 = c.runSource(cTemp('5, 10, 15','void solution(int a,int b, int c){int sum = a+b+c; printf("%d",sum);}'));
// resultPromise1
//     .then(result => {
//         console.log(result);
//     })
//     .catch(err => {
//         console.log(err);
//     });

//Challenge Test

// const funct = 'function solution(a,b,c){console.log(a+b+c)}'

// for(let i=0; i<challenge1["challenge"].length; i++){

//     let resultPromise = node.runSource(jsTemp(challenge1["challenge"][i].input.toString(),funct));
//     resultPromise
//         .then(result => {
//             console.log(`===========TEST${i}============`)
//             console.log(result);
//             console.log(`========== RES: ${result.stdout}|||EXPECTED: ${challenge1["challenge"][i].output}`)
//         })
//         .catch(err => {
//             console.log(err);
//         });
// }
