import {java} from 'compile-run';
import express, {Request, Response, NextFunction} from 'express';

const router = express.Router();

router.post('/api/v1/compile/java', async(req: Request, res: Response, next: NextFunction)=>{
    java.runSource(req.body.code)
        .then((result)=>{
            res.status(200).json({success: true, data: result})
        })
        .catch((err)=>{
            res.status(200).json({success: true, data: err})
        })
})

export {router as compileJavaRouter}