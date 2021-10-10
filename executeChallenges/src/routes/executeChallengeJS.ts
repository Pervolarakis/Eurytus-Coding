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

    const tests = JSON.parse(challenge?.expectedOutputTests!);

    let successfulTests = 0;

    const final = ""+tests["challenge"].map((el:any)=>{
        return "if("+JSON.parse(el.input)+".toString().split(/\\s|\\\"|\\\'/).join('') == JSON.parse("+el.output.replaceAll(`'`,`\\"`)+").toString().replace(`\"`,``).replace(`'`,``).split(/\\s/).join('')) testsPassed++;\n"
    }).join('')+""; 

    // console.log(final)
    // console.log(jsTemp(final,funct));
    new Promise((resolve, reject)=>node.runSource(jsTemp(final,funct))
        .then(result => {
            if(result.stderr){
                console.log('compile mlkia')
                reject(result.stderr)
            }
            
            let stdOut = result.stdout;
            
            successfulTests = parseInt(stdOut.trim().split(/\s/).join(''));
            resolve('done');
        })
        .catch(err => {
            console.log(err);
            resolve('done');
        })).then((result) => {
        res.status(200).json({success: true, data: {totalTestsDone: tests["challenge"].length, successfulTests: successfulTests}})
    })
    .catch(error => res.status(200).json({success: false, compileError: error}))
    

})

export {router as executeJSRouter}


