import { asyncHandler, requireAuth } from '@eurytus/common';
import express, {Request, Response, NextFunction} from 'express';

const router = express.Router()

router.post('/api/v1/users/auth/logout', requireAuth, asyncHandler(async(req: Request, res: Response, next: NextFunction)=>{
    req.session = null;
    res.status(200).json({})
}))

export {router as signOutRouter}