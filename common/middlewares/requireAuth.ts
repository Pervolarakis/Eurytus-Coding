import { UnauthenticatedError } from "../errors/UnauthenticatedError"
import {Request, Response, NextFunction} from 'express'

export const requireAuth = (req: Request,res: Response,next: NextFunction)=>{
    if(!req.currentUser){
        return next(new UnauthenticatedError())
    }
    next();
}