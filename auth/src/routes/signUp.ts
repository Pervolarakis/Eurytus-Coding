import express, {Request, Response, NextFunction} from 'express';
import { BasicCustomError } from '../errors/BasicCustomError';
import { User } from '../models/UserModel';

const router = express.Router();

router.post('/api/v1/users/auth/signup', async (req: Request, res: Response, next: NextFunction)=>{
    
    const {email, password, firstName, lastName} = req.body;
    
    if(!email || !password || !firstName || !lastName){
        return next(new BasicCustomError('Invalid Data', 400))
    }

    const user = await User.findOne({email: email});

    if(user){
        return next(new BasicCustomError('User already exists', 400));
    }

    try{
        const user = new User({email,password,firstName, lastName});
        await user.save()

        const token = user.getSignedJwtToken()

        req.session={
            jwt: token
        }

        res.status(201).json({success: true, data: user});
    }catch{
        return next(new BasicCustomError('Error creating user', 400))
    }

})

export {router as signUpRouter}

