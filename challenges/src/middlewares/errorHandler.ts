import {Request, Response, NextFunction} from 'express';
import { CustomErrorClass } from '../errors/CustomErrorClass';

export const ErrorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    if(err instanceof CustomErrorClass){
        res.status(err.errorCode).json({success: false, error: err.getFormatedMessage()});
        return next();
    }
    else{
        res.status(500).json({success: false, error: err.message})
        return next();
    }
    
}