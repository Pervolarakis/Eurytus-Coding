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
    const tests = JSON.parse(challenge?.expectedOutputTests!);

    let successfulTests = 0;
    
    const final = ""+tests["challenge"].map((el:any)=>{
        return "if(check.checkEquality("+JSON.parse(el.input)+","+JSON.parse(el.output)+")) testsPassed++;\n"
    }).join('')+""; 

    // console.log(final);

    new Promise((resolve, reject)=>java.runSource(javaTemp(final ,funct),{timeout: 4000, compileTimeout: 4000 })
        .then(result => {
            if(result.stderr){
                let formattedError = result.stderr;
                tests["challenge"].map((el:any)=>{
                    formattedError = formattedError.replace(JSON.parse(el.input), '***').replace(JSON.parse(el.output), '***')
                });
                // console.log(formattedError)
                reject(formattedError)
            }
            //console.log(javaTemp(JSON.parse(currentChallenge.input),funct))
        
            let stdOut = result.stdout;
            successfulTests = parseInt(stdOut.trim().split(/\s/).join(''));
            resolve('done');
        })
        .catch(err => {
            console.log(err);
            resolve('done');
        }))
            .then((result) => {
            res.status(200).json({success: true, data: {totalTestsDone: tests["challenge"].length, successfulTests: successfulTests}})
            })
            .catch(error => {res.status(200).json({success: false, compileError: error})})

})

export {router as executeJavaRouter}