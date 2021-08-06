import express from 'express';
import { BasicCustomError } from '../errors/BasicCustomError';
import { User } from '../models/UserModel';

const router = express.Router();

router.post('/api/v1/users/auth/login', async (req,res,next)=>{
    
    const {email, password} = req.body;

    if(!email || !password){
        return next(new BasicCustomError('Invalid crendentials',400))
    }

    const user = await User.findOne({email: email});

    if(!user){
        return next(new BasicCustomError('Invalid crendentials',400))
    }

    const comparison = await user.matchPasswords(password);

    if(!comparison){
        return next(new BasicCustomError('Invalid crendentials',400))
    }

    const token = user.getSignedJwtToken()

    req.session={
        jwt: token
    }

    res.status(200).json({success: true, data: user});

})

export {router as signInRouter}