import express, {Request,Response,NextFunction} from 'express';
import { Challenge } from '../models/Challenge';
import {jsTemp} from '../templates/jsTemp';
import {node} from '@eurytus/compile-run'
import { BasicCustomError, requireAuth, asyncHandler } from '@eurytus/common';
import { compileOutputJs } from './interfaces/CompileOutputInterface';
import { SubmitChallengePublisher } from '../events/SubmitChallengePublisher';
import { natsWrapper } from '../events/NatsWrapper';

const router = express.Router();

router.post('/api/v1/compile/challengejs/:id',requireAuth, asyncHandler(async(req: Request, res: Response, next: NextFunction)=>{
    const challenge = await Challenge.findById(req.params.id);

    if(!challenge || challenge.status==='deleted'){
        return next(new BasicCustomError('This challenge doesnt exists', 400))
    }

    if(challenge.language!=='js'){
        return next(new BasicCustomError('This language is not supported for this test', 400))
    }

    const funct = JSON.parse(req.body.solution);

    const tests = JSON.parse(challenge?.expectedOutputTests!);

    const final = ""+tests["challenge"].map((el:any)=>{
        return "if("+JSON.parse(el.input)+".toString().split(/\\s|\\\"|\\\'/).join('') == JSON.parse("+el.output.replaceAll(`'`,`\\"`)+").toString().replace(`\"`,``).replace(`'`,``).split(/\\s/).join('')) testsPassed++;\n"
    }).join('')+""; 

    // console.log(final)
    // console.log(jsTemp(final,funct));
    new Promise<compileOutputJs>((resolve, reject)=>node.runSource(jsTemp(final, funct, challenge.ownerId, req.currentUser?.id!))
        .then(result => {
            if(result.stderr){
                let formattedError = result.stderr;
                tests["challenge"].map((el:any)=>{
                    const inputRegexp = new RegExp(JSON.parse(el.input), 'g');
                    const outputRegexp = new RegExp(JSON.parse(el.output), 'g');
                    formattedError = formattedError.replace(inputRegexp, '***').replace(outputRegexp, '***');
                });
                // console.log(formattedError)
                return reject({errorMessage: formattedError, file: result.file})
            }
            return resolve({successfulTests: parseInt(result.stdout.trim().split(/\s/).join('')), file: result.file!});
        })
        .catch(err => {
            console.log(err);
            reject("Can't compile right now. The error is probably on our end");
        })
        ).then((result) => {
            if(req.query.submit){
                new SubmitChallengePublisher(natsWrapper.client).publish({
                    userId: req.currentUser?.id!,
                    userEmail: req.currentUser?.email!,
                    language: challenge.language,
                    challengeId: challenge._id,
                    running: true,
                    challengeOwnerId: challenge.ownerId,
                    completionDate: new Date().toISOString(), 
                    saveFileId: result.file,
                    outputTestsPassedScore: (result.successfulTests/tests["challenge"].length)*100,
                    requiredStructureFound: null, 
                    designPatternsFound: null
                })
                // console.log(result);
            }
            res.status(200).json({success: true, data: {totalTestsDone: tests["challenge"].length, successfulTests: result.successfulTests}})
        })
    .catch(error => {
        if(req.query.submit){
            new SubmitChallengePublisher(natsWrapper.client).publish({
                userId: req.currentUser?.id!,
                userEmail: req.currentUser?.email!,
                language: challenge.language,
                challengeId: challenge._id,
                running: false,
                challengeOwnerId: challenge.ownerId,
                completionDate: new Date().toISOString(), 
                saveFileId: error.file,
                outputTestsPassedScore: null,
                requiredStructureFound: null, 
                designPatternsFound: null
            })
            // console.log(result);
        }
        res.status(200).json({success: false, compileError: error.errorMessage})
    })
    

}))

export {router as executeJSRouter}


