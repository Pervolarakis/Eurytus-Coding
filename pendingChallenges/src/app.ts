import express from 'express';
import cookieSession from 'cookie-session';
import { currentUser } from './middlewares/currentUser';
import { ErrorHandler } from './middlewares/errorHandler';


const app = express();

app.use(express.json());

app.use(cookieSession({
    signed: false
}))

app.use(currentUser)




app.use(ErrorHandler);

export {app};