import { asyncHandler, BasicCustomError, requireAuth, YouDontOwnThisError } from '@eurytus/common';
import express, {Request, Response, NextFunction} from 'express';
import fs from 'fs';

const router = express.Router();

router.post('/api/v1/compile/getcode', requireAuth, asyncHandler(async(req: Request, res: Response, next: NextFunction)=>{
    const {fileRoute} = req.body;
    fs.readFile(fileRoute+((fileRoute.indexOf('java')>-1)?'/SimpleClass.java':''), 'utf8', (err,data)=>{
        if(err){
            console.log(err)
            return next(new BasicCustomError('Server error', 500));
        }
        const content = data;
        // console.log(content)
        const challengeOwnerId = content.slice(content.indexOf('/**Challenge owner: ')+'/**Challenge owner: '.length, content.indexOf('*/',content.indexOf('/**Challenge owner: ')+'/**Challenge owner: '.length));
        const solverId = content.slice(content.indexOf('/**Challenge solver: ')+'/**Challenge solver: '.length, content.indexOf('*/',content.indexOf('/**Challenge solver: ')+'/**Challenge solver: '.length));
        if( req.currentUser?.role==='admin' || req.currentUser?.id === challengeOwnerId || req.currentUser?.id === solverId ){
            const code = content.slice(content.indexOf('/**user code starts here*/')+'/**user code starts here*/'.length, content.indexOf('/**user code ends here*/'))
            res.setHeader('Content-type', 'text/plain');
            res.charset = 'UTF-8';
            res.write(code);
            res.end();
        }else{
            return next(new YouDontOwnThisError('file'))
        }
    })

}))

export {router as downloadSubmissionCode};

