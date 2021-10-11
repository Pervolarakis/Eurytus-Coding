import express, {Request,Response,NextFunction} from 'express';
import { Challenge } from '../models/Challenge';
import {cTemp} from '../templates/cTemp';
import {c} from 'compile-run'
import { BasicCustomError, requireAuth } from '@eurytus/common';

const router = express.Router();

router.post('/api/v1/compile/challengec/:id', requireAuth, async(req: Request, res: Response, next: NextFunction)=>{
    const challenge = await Challenge.findById(req.params.id);
    
    if(!challenge || challenge.status==='deleted'){
        return next(new BasicCustomError('This challenge doesnt exists', 400))
    }

    if(challenge.language !== "c"){
        return next(new BasicCustomError('This language is not supported for this test', 400))
    }

    const funct = JSON.parse(req.body.solution);

    const tests = JSON.parse(challenge?.expectedOutputTests!);
    
    let successfulTests = 0;

    let runningTests = []

    for(let i=0; i<tests["challenge"].length; i++){
        
        const currentChallenge = tests["challenge"][i];
        runningTests.push(c.runSource(cTemp(JSON.parse(currentChallenge.input),funct))
            .then(result => {
                // if(result.stderr){
                //     Promise.reject(result.stderr)
                // }
                if(result.stdout.trim()==JSON.parse(currentChallenge.output).trim().replaceAll(`"`,``)){
                    successfulTests++;
                }
            })
            .catch(err => {
                console.log(err);
            }));
    }
    Promise.all(runningTests)
        .then((result) => {
            console.log('pipikos')
            res.status(200).json({success: true, data: {totalTestsDone: tests["challenge"].length, successfulTests: successfulTests}})
        })
        .catch(error => {console.log('eixame thema');res.status(200).json({success: false, compileError: error})})
    

})

export {router as executeCRouter}