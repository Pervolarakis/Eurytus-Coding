import express from 'express';
import { signUpRouter } from './routes/signUp';
import { signInRouter } from './routes/logIn';
import { currentUserRouter } from './routes/currentUser';
import { ErrorHandler } from '@eurytus/common';
import cookieSession from 'cookie-session';
import cors from 'cors'
import { signOutRouter } from './routes/logOut';

const app = express();

app.use(cors({
    origin: ['http://eurytus.com:3000'],
    credentials: true }))

app.set('trust poxy', 1);
app.use(cookieSession({
    signed: false,
}))

app.use(express.json())

app.use(currentUserRouter)
app.use(signUpRouter);
app.use(signInRouter);
app.use(signOutRouter);
app.use(ErrorHandler);


export {app};