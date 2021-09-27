import express, {Request,Response,NextFunction} from 'express';
import {detectJavaDesignPatternsTemp} from '../templates/detectJavaDesignPatternsTemp';
import {java} from 'compile-run'
import { BasicCustomError, requireAuth } from '@eurytus/common';

const router = express.Router();

router.post('/api/v1/compile/getJavaStructure', async(req: Request, res: Response, next: NextFunction)=>{
    
    const funct = JSON.parse(req.body.code);
    
    //(?<=class\\s).*(?=implements)|(?<=class\\s).*(?=extends)|(?<=class\\s).*(?={)|(?<=interface\\s).*(?=extends)|(?<=interface\\s).*(?={)
    //(?<=\\n|\\A)(?:public\\s)?(class|interface|enum)\s([^\\n\\s]*)
    
    const str = funct.split(/\s|\"|\'/).join('');
    const regExp = /(?<=class|interface).*?(?=extends|{|implements)/g;
    const classAndInterfaceNames = str.match(regExp);
    console.log(classAndInterfaceNames);
    let runningTests = [];
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

    for(let i=0; i<classAndInterfaceNames.length; i++){
        
        const currentClass = classAndInterfaceNames[i];
        //console.log(detectJavaDesignPatternsTemp(funct, currentClass));
        runningTests.push(new Promise((resolve, reject)=>java.runSource(detectJavaDesignPatternsTemp(funct, currentClass),{timeout: 4000, compileTimeout: 4000, stdoutLimit: 50000, stderrLimit: 50000 })
            .then(result => {
                if(result.stderr){
                    console.log('compile mlkia')
                    reject(result.stderr)
                }
                
                let stdOut = result.stdout;
                // console.log(stdOut);
                classesInfo.push(JSON.parse(stdOut));

                resolve('done');
            })
            .catch(err => {
                console.log(err);
                resolve('done');
            })));
    }
    Promise.all(runningTests)
        .then((result) => {
            res.status(200).json({success: true, data: classesInfo})
        })
        .catch(error => {res.status(200).json({success: false, compileError: error})})



})

export {router as detectJavaDesignPatternsRouter}