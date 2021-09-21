import express, {Request,Response,NextFunction} from 'express';
import { Challenge } from '../models/Challenge';
import {jsTemp} from '../templates/jsTemp';
import {node} from 'compile-run'
import { BasicCustomError, requireAuth } from '@eurytus/common';

const router = express.Router();

router.post('/api/v1/compile/challengejs/:id',requireAuth, async(req: Request, res: Response, next: NextFunction)=>{
    const challenge = await Challenge.findById(req.params.id);

    if(!challenge || challenge.status==='deleted'){
        return next(new BasicCustomError('This challenge doesnt exists', 400))
    }

    if(challenge.language!=='js'){
        return next(new BasicCustomError('This language is not supported for this test', 400))
    }

    const funct = JSON.parse(req.body.solution);

    const tests = JSON.parse(challenge?.tests!);

    let successfulTests = 0;

    let runningTests = []

    for(let i=0; i<tests["challenge"].length; i++){
        
        const currentChallenge = tests["challenge"][i];
    
        runningTests.push(new Promise((resolve, reject)=>node.runSource(jsTemp(JSON.parse(currentChallenge.input),funct))
            .then(result => {
                if(result.stderr){
                    console.log('compile mlkia')
                    reject(result.stderr)
                }
                let stdOut = result.stdout;
                // console.log(stdOut.trim().split(/\s|\"|\'/).join('') + ' : ' + JSON.parse(currentChallenge.output).trim().replaceAll(`"`,``).replaceAll(`'`,``).split(/\s/).join(''));
                if(stdOut.trim().split(/\s|\"|\'/).join('') == JSON.parse(currentChallenge.output).trim().replaceAll(`"`,``).replaceAll(`'`,``).split(/\s/).join('')){
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
        .catch(error => res.status(200).json({success: false, compileError: error}))
    

})

export {router as executeJSRouter}