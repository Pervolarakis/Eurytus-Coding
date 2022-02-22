import express, {Request,Response,NextFunction} from 'express';
import { Challenge } from '../models/Challenge';
import {javaTemp} from '../templates/javaTemp';
import {java} from '@eurytus/compile-run'
import { BasicCustomError, asyncHandler, requireAuth } from '@eurytus/common';
import { checkEquality } from '../templates/CheckEqualityLogic';
import { detectClassesMain, detectClassesLogic } from '../templates/ClassDiagramTemplate';
import { detectDesignPattern } from './designPatterns';
import { checkStructure } from './utils/checkProgramStructure';
import { compileOutputJava } from './interfaces/CompileOutputInterface';
import { convertStructureFormat } from './utils/convertStructureFormat';
import { SubmitChallengePublisher } from '../events/SubmitChallengePublisher';
import { natsWrapper } from '../events/NatsWrapper';

const router = express.Router();

router.post('/api/v1/compile/challengejava/:id',requireAuth, asyncHandler(async(req: Request, res: Response, next: NextFunction)=>{
    
    const challenge = await Challenge.findById(req.params.id);
    
    if(!challenge || challenge.status==='deleted'){
        return next(new BasicCustomError('This challenge doesnt exists', 400))
    }

    if(challenge.language !== "java"){
        return next(new BasicCustomError('This language is not supported for this test', 400))
    }

    const userFunction = JSON.parse(req.body.solution);
    // console.log(funct)
    
    let outPutFunctionCalls = '';  
    let checkEqualityLogic = ''; 
    let detectClassesMainLocal = ''; 
    let detectClassesLogicLocal = '';

    if(challenge?.expectedOutputTests!.length){
        const tests = JSON.parse(challenge?.expectedOutputTests!);
        outPutFunctionCalls = "int testsPassed = 0;\n"+tests["challenge"].map((el:any)=>{
            return "if(check.checkEquality("+JSON.parse(el.input)+","+JSON.parse(el.output)+")) testsPassed++;\n"
        }).join('')+`\nSystem.out.println(" \\"testsPassed\\":"+ testsPassed + ${(challenge.expectedStructure.length || challenge.expectedDesignPatterns.length)?"\",\"":"\"\""});`;
        checkEqualityLogic = checkEquality;
    }

    if(challenge.expectedStructure.length || challenge.expectedDesignPatterns.length){
        const str = userFunction.split(/\s|\"|\'/).join('');
        const regExp = /(?<=class|interface).*?(?=extends|{|implements)/g;
        const classAndInterfaceNames = str.match(regExp);
        detectClassesMainLocal = detectClassesMain("\"" + classAndInterfaceNames.join("\",\"") + "\"");
        detectClassesLogicLocal = detectClassesLogic;
    }

    // console.log(javaTemp(outPutFunctionCalls, userFunction, checkEqualityLogic, detectClassesMainLocal, detectClassesLogicLocal))
    new Promise<compileOutputJava>((resolve, reject)=>
        java.runSource(javaTemp(outPutFunctionCalls, userFunction, checkEqualityLogic, detectClassesMainLocal, detectClassesLogicLocal, challenge.ownerId, req.currentUser?.id!),{timeout: 4000, compileTimeout: 4000, stdoutLimit: 50000, stderrLimit: 50000 })
            .then(result => {
                if(result.stderr){
                    let formattedError = result.stderr;
                    if(challenge?.expectedOutputTests!.length){
                        const tests = JSON.parse(challenge?.expectedOutputTests!);
                        tests["challenge"].map((el:any)=>{
                            const inputRegexp = new RegExp(JSON.parse(el.input), 'g');
                            const outputRegexp = new RegExp(JSON.parse(el.output), 'g');
                            formattedError = formattedError.replace(inputRegexp, '***').replace(outputRegexp, '***');
                        });
                    }
                    // console.log(formattedError)
                    return reject({errorMessage: formattedError, file: result.file})
                }
                //console.log(javaTemp(JSON.parse(currentChallenge.input),funct))
                // console.log(result.stdout)
                const output = JSON.parse(result.stdout);
                // parseInt(result.stdout.trim().split(/\s/).join(''))
                return resolve({...output, file: result.file});
            })
            .catch(err => {
                console.log(err);
                return reject("Can't compile right now. The error is probably on our end.");
            }))
        .then((result) => {
            let designPatterns = {};
            if(challenge.expectedStructure.length || challenge.expectedDesignPatterns.length){
                if(challenge.expectedDesignPatterns){
                    challenge.expectedDesignPatterns.map((el,i)=>{
                        //@ts-ignore
                        if(detectDesignPattern[el](result.classDiagram)){
                            designPatterns = {...designPatterns, [el]: true}
                        }else{
                            designPatterns = {...designPatterns, [el]: false}
                        }
                    })
                }
            }
            let totalTestsDone = 0;
            let successfulTests = 0
            if(challenge?.expectedOutputTests!.length){
                const tests = JSON.parse(challenge?.expectedOutputTests!);
                totalTestsDone = tests["challenge"].length;
                successfulTests = result.testsPassed;
            }
            // console.log(result.classDiagram);

            const structureFound = (challenge.expectedStructure)?checkStructure(result.classDiagram, convertStructureFormat(challenge.expectedStructure)):null

            if(req.query.submit){
                new SubmitChallengePublisher(natsWrapper.client).publish({
                    userId: req.currentUser?.id!,
                    userEmail: req.currentUser?.email!,
                    language: challenge.language,
                    challengeId: challenge._id,
                    running: true,
                    completionDate: new Date().toISOString(), 
                    saveFileId: result.file,
                    challengeOwnerId: challenge.ownerId,
                    outputTestsPassedScore: (successfulTests/totalTestsDone) * 100,
                    requiredStructureFound: structureFound, 
                    designPatternsFound: (Object.keys(designPatterns).length)?designPatterns:null
                })
                // console.log(result);
            }
            res.status(200).json({success: true, data: {
                structure: structureFound,
                designPatterns: designPatterns,
                totalTestsDone: totalTestsDone,
                successfulTests: successfulTests}})
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

export {router as executeJavaRouter}