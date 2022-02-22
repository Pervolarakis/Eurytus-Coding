import express from 'express'
import { currentUser, ErrorHandler } from '@eurytus/common'
import cookieSession from 'cookie-session'
// import { executeCRouter } from './routes/executeChallengeC'
import { executeJavaRouter } from './routes/executeChallengeJava'
import { executeJSRouter } from './routes/executeChallengeJS'
import { compileCRouter } from './routes/compileC'
import { compileJSRouter } from './routes/compileJS'
import { compileJavaRouter } from './routes/compileJava'
import cors from 'cors'

const app = express();

app.use(cors({
    origin: ['http://eurytus.com:3000'],
    credentials: true }))

app.use(express.json())

app.use(cookieSession({
    signed: false
}))

app.use(currentUser);

//app.use(executeCRouter);
app.use(executeJavaRouter);
app.use(executeJSRouter);
app.use(compileCRouter);
app.use(compileJSRouter);
app.use(compileJavaRouter);

app.use(ErrorHandler);

export {app}