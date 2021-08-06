import {Request, Response, NextFunction} from 'express';
import {BasicCustomError} from '../errors/BasicCustomError'

export const ErrorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    if(err instanceof BasicCustomError){
        res.status(err.errorCode).json({success: false, error: err.getFormatedMessage()});
        return next();
    }
    else{
        res.status(500).json({success: false, error: err.message})
        return next();
    }
    
}