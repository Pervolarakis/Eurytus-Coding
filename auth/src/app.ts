import express from 'express';
import { signUpRouter } from './routes/signUp';
import { signInRouter } from './routes/logIn';
import { ErrorHandler } from '@eurytus/common';
import cookieSession from 'cookie-session';

const app = express();


app.set('trust poxy', 1);
app.use(cookieSession({
    signed: false
}))

app.use(express.json())

app.use(signUpRouter);
app.use(signInRouter);
app.use(ErrorHandler);


export {app};