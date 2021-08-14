import { validationResult } from "express-validator";
import {Request, Response, NextFunction} from 'express'
import { BasicCustomError } from "../errors/BasicCustomError";

export const validateRequestSchema = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return next(new BasicCustomError(errors.array().toString(), 400))
    }
    next()
}