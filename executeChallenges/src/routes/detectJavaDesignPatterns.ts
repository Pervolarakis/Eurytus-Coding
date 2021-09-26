import express, {Request,Response,NextFunction} from 'express';
import {detectJavaDesignPatterns} from '../templates/detectJavaDesignPatternsTemp';
import {java} from 'compile-run'
import { BasicCustomError, requireAuth } from '@eurytus/common';

const router = express.Router();

router.post('/api/v1/compile/getJavaStructure', async(req: Request, res: Response, next: NextFunction)=>{
    
    const funct = JSON.parse(req.body.code);
    console.log(funct.trim().split(/\s|\"|\'/).join(''));
    //(?<=class\\s).*(?=implements)|(?<=class\\s).*(?=extends)|(?<=class\\s).*(?={)|(?<=interface\\s).*(?=extends)|(?<=interface\\s).*(?={)
    //(?<=\\n|\\A)(?:public\\s)?(class|interface|enum)\s([^\\n\\s]*)
    const regExp = new RegExp(`((?<=class|interface).*?(?=extends|{|implements))+`);
    console.log(regExp);
    const classAndInterfaceNames = funct.trim().split(/\s|\"|\'/).join('').match(regExp);
    console.log(classAndInterfaceNames);
    res.status(200).json({success: true, data: classAndInterfaceNames});


})

export {router as detectJavaDesignPatternsRouter}