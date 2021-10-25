import express, {Request,Response,NextFunction} from 'express';
import { Challenge } from '../models/Challenge';
import {javaTemp} from '../templates/javaTemp';
import {java} from 'compile-run'
import { BasicCustomError, requireAuth } from '@eurytus/common';
import { checkEquality } from '../templates/CheckEqualityLogic';
import { detectClassesMain, detectClassesLogic } from '../templates/ClassDiagramTemplate';
import { detectDesignPattern } from './designPatterns';
import { checkStructure } from './__test__/checkProgramStructure';
import { compileOutput } from './interfaces/CompileOutputInterface';
import { convertStructureFormat } from './utils/convertStructureFormat';

const router = express.Router();

router.post('/api/v1/compile/challengejava/:id', async(req: Request, res: Response, next: NextFunction)=>{
    
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
    new Promise<compileOutput>((resolve, reject)=>
        java.runSource(javaTemp(outPutFunctionCalls, userFunction, checkEqualityLogic, detectClassesMainLocal, detectClassesLogicLocal),{timeout: 4000, compileTimeout: 4000, stdoutLimit: 50000, stderrLimit: 50000 })
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
                    return reject(formattedError)
                }
                //console.log(javaTemp(JSON.parse(currentChallenge.input),funct))
                // console.log(result.stdout)
                const output = JSON.parse(result.stdout);
                // parseInt(result.stdout.trim().split(/\s/).join(''))
                return resolve(output);
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
            // console.log(convertStructureFormat(challenge.expectedStructure));
            res.status(200).json({success: true, data: {
                structure: (challenge.expectedStructure)?checkStructure(result.classDiagram, convertStructureFormat(challenge.expectedStructure)):null,
                designPatterns: designPatterns,
                totalTestsDone: totalTestsDone,
                successfulTests: successfulTests}})
        })
        .catch(error => {res.status(200).json({success: false, compileError: error})})

})

export {router as executeJavaRouter}