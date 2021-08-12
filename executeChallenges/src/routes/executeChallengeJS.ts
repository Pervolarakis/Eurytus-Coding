import express, {Request,Response,NextFunction} from 'express';
import { Challenge } from '../models/Challenge';
import {jsTemp} from '../templates/jsTemp';
import {node} from 'compile-run'

const router = express.Router();

router.post('/api/v1/compile/challengejs/:id', async(req: Request, res: Response, next: NextFunction)=>{
    const challenge = await Challenge.findById(req.params.id);

    //Challenge Test

    const funct = req.body.solution;

    const tests = JSON.parse(challenge?.tests!);

    let successfulTests = 0;

    let runningTests = []

    for(let i=0; i<tests["challenge"].length; i++){
        
        const currentChallenge = tests["challenge"][i];
    
        runningTests.push(node.runSource(jsTemp(currentChallenge.input,funct))
            .then(result => {
                if(result.stdout.trim()==currentChallenge.output){
                    successfulTests++;
                }
            })
            .catch(err => {
                console.log(err);
            }));
    }
    await Promise.all(runningTests)
    res.status(200).json({success: true, data: {totalTestsDone: tests["challenge"].length, successfulTests: successfulTests}})
    

})

export {router as executeJSRouter}