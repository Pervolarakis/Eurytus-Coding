import express, {Request, Response, NextFunction} from 'express';
import { asyncHandler, BasicCustomError, validateRequestSchema } from '@eurytus/common';
import { User } from '../models/UserModel';
import { signUpSchema } from './requestSchemas/signUpSchema';

const router = express.Router();

router.post('/api/v1/users/auth/signup', signUpSchema, validateRequestSchema, asyncHandler(async (req: Request, res: Response, next: NextFunction)=>{
    
    const {email, password, firstName, lastName} = req.body;
    
    const existingUser = await User.findOne({email: email});

    if(existingUser){
        return next(new BasicCustomError('User already exists with this email address', 400));
    }

    const user = new User({email, password, firstName, lastName});
    await user.save()

    const token = user.getSignedJwtToken()

    req.session={
        jwt: token
    }

    res.status(201).json({success: true, data: user});
    
}))

export {router as signUpRouter}

