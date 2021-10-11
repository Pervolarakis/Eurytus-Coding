import express, {Request,Response,NextFunction} from 'express';
import {detectJavaDesignPatternsTemp} from '../templates/detectJavaDesignPatternsTemp';
import {java} from 'compile-run'
import { BasicCustomError, requireAuth } from '@eurytus/common';
import { detectDesignPattern } from './designPatterns';
import { checkStructure } from './__test__/checkProgramStructure';
import { Challenge } from '../models/Challenge';

const router = express.Router();

router.post('/api/v1/compile/checkJavaStructure/:id', async(req: Request, res: Response, next: NextFunction)=>{
    
    // console.log(req.params.id);
    const challenge = await Challenge.findById(req.params.id);
    // console.log(challenge);
    if(!challenge || challenge.status==='deleted'){
        return next(new BasicCustomError('This challenge doesnt exists', 400))
    }

    if(challenge.language !== "java"){
        return next(new BasicCustomError('This language is not supported for this test', 400))
    }

    const funct = JSON.parse(req.body.solution);

    //(?<=class\\s).*(?=implements)|(?<=class\\s).*(?=extends)|(?<=class\\s).*(?={)|(?<=interface\\s).*(?=extends)|(?<=interface\\s).*(?={)
    //(?<=\\n|\\A)(?:public\\s)?(class|interface|enum)\s([^\\n\\s]*)
    
    const str = funct.split(/\s|\"|\'/).join('');
    const regExp = /(?<=class|interface).*?(?=extends|{|implements)/g;
    const classAndInterfaceNames = str.match(regExp);
    // console.log(classAndInterfaceNames);
    
    let classesInfo: {
            className: string,
            modifiers: string[],
            superClass: string,
            interfaces: string[],
            constructors: {
                modifiers: string[],
                parameters: string[]
            }[],
            methods: {
                name: string,
                modifiers: string[],
                returnType: string,
                parameters: string[],
                overrides: string|boolean
            }[],
            fields: {
                modifiers: string[],
                name: string,
                type: string
            }[]
        }[] = [];

    
        
    // console.log(detectJavaDesignPatternsTemp(funct, "\"" + classAndInterfaceNames.join("\",\"") + "\""));
    new Promise((resolve, reject)=>java.runSource(detectJavaDesignPatternsTemp(funct, "\"" + classAndInterfaceNames.join("\",\"") + "\""),{timeout: 4000, compileTimeout: 4000, stdoutLimit: 50000, stderrLimit: 50000 })
        .then(result => {
            if(result.stderr){
                console.log('compile mlkia')
                reject(result.stderr)
            }
            
            let stdOut = result.stdout;
            // console.log(stdOut);
            if(stdOut){
                classesInfo.push(...JSON.parse(stdOut));
            }
                
            resolve('done');
        })
        .catch(err => {
            console.log(err);
            resolve('done');
        }))
    .then((result) => {
        // console.log(classesInfo);
        // console.log(detectSingleton(classesInfo))
        // const sampleFromJSON = JSON.parse(`[{"className":"TestEntity2","modifiers":[],"superClass":"TestEntitySuper","interfaces":["TestInt"],"constructors":[{"modifiers":[\"public\"],"parameters":[\"String\",\"int[]\",\"Map<String, Object>\"]}],"methods":[{"modifiers":[\"public\"],"name":"getM","returnType":"Map<String, Object>","parameters":[]},{"modifiers":[\"public\", \"static\"],"name":"testMethod","returnType":"void","parameters":[\"int\",\"String\",\"Integer\"]}],"fields":[{"modifiers":[\"private\"],"name":"m","type":"Map<String, Object>"},{"modifiers":[\"private static\"],"name":"peops","type":"TestEntity2"}]}]`)
        // console.log('eftasa edo', challenge.structureTests);

        let designPatterns = {};
        let designPatternsFound = 0;
        if(challenge.expectedDesignPatterns){
            challenge.expectedDesignPatterns.map((el,i)=>{
                //@ts-ignore
                if(detectDesignPattern[el](classesInfo)){
                    designPatterns = {...designPatterns, [el]: true}
                    designPatternsFound++;
                }else{
                    designPatterns = {...designPatterns, [el]: false}
                }
                
            })
        }

        res.status(200).json({success: true, data: {
                                                    structure: (challenge.structureTests)?checkStructure(classesInfo, JSON.parse(challenge.structureTests)):null,
                                                    designPatterns: designPatterns
                                                }})
    })
    .catch(error => {res.status(200).json({success: false, compileError: error})})



})

export {router as detectJavaDesignPatternsRouter}