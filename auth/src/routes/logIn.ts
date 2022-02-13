import express from 'express';
import { asyncHandler, BasicCustomError, validateRequestSchema } from '@eurytus/common';
import { User } from '../models/UserModel';
import { loginSchema } from './requestSchemas/loginSchema';

const router = express.Router();

router.post('/api/v1/users/auth/login', loginSchema, validateRequestSchema, asyncHandler( async (req,res,next)=>{
    
    const {email, password} = req.body;

    const user = await User.findOne({email: email});

    if(!user){
        return next(new BasicCustomError('Invalid credentials',400))
    }

    const comparison = await user.matchPasswords(password);

    if(!comparison){
        return next(new BasicCustomError('Invalid credentials',400))
    }

    const token = user.getSignedJwtToken()

    req.session={
        jwt: token
    }

    res.status(200).json({success: true, data: user});

}))

export {router as signInRouter}