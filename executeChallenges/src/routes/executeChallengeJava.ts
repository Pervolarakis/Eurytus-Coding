import express, {Request,Response,NextFunction} from 'express';
import { Challenge } from '../models/Challenge';
import {javaTemp} from '../templates/javaTemp';
import {java} from 'compile-run'
import { BasicCustomError, requireAuth } from '@eurytus/common';

const router = express.Router();

router.post('/api/v1/compile/challengejava/:id', requireAuth, async(req: Request, res: Response, next: NextFunction)=>{
    const challenge = await Challenge.findById(req.params.id);

    if(!challenge || challenge.status==='deleted'){
        return next(new BasicCustomError('This challenge doesnt exists', 400))
    }

    if(challenge.language !== "java"){
        return next(new BasicCustomError('This language is not supported for this test', 400))
    }

    const funct = JSON.parse(req.body.solution);
    // console.log(funct)
    const tests = JSON.parse(challenge?.tests!);

    let successfulTests = 0;

    let runningTests = []
    
    for(let i=0; i<tests["challenge"].length; i++){
        
        const currentChallenge = tests["challenge"][i];
        runningTests.push(new Promise((resolve, reject)=>java.runSource(javaTemp(JSON.parse(currentChallenge.input),funct, JSON.parse(currentChallenge.output)))
            .then(result => {
                if(result.stderr){
                    console.log('compile mlkia')
                    reject(result.stderr)
                }
                //console.log(javaTemp(JSON.parse(currentChallenge.input),funct))
            
                let stdOut = result.stdout;
                // if(stdOut.indexOf('[')>-1){
                //     stdOut = stdOut.split(/\s/).join('');
                // }
                //console.log(stdOut.trim().split(/\s/).join('') + " : "+ JSON.parse(currentChallenge.output).trim().replaceAll(`"`,``).replaceAll(`'`,``).split(/\s/).join(''))
                if(stdOut.trim().split(/\s/).join('') == 'true'){
                    successfulTests++;
                }
                resolve('done');
            })
            .catch(err => {
                console.log(err);
                resolve('done');
            })));
    }
    Promise.all(runningTests)
        .then((result) => {
            res.status(200).json({success: true, data: {totalTestsDone: tests["challenge"].length, successfulTests: successfulTests}})
        })
        .catch(error => {res.status(200).json({success: false, compileError: error})})
    
    

})

export {router as executeJavaRouter}