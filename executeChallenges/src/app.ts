import express from 'express'
import { currentUser, ErrorHandler } from '@eurytus/common'
import cookieSession from 'cookie-session'
import { executeCRouter } from './routes/executeChallengeC'
import { executeJavaRouter } from './routes/executeChallengeJava'
import { executeJSRouter } from './routes/executeChallengeJS'
import { compileCRouter } from './routes/compileC'

const app = express()

app.use(express.json())

app.use(cookieSession({
    signed: false
}))

app.use(currentUser);

app.use(executeCRouter);
app.use(executeJavaRouter);
app.use(executeJSRouter);
app.use(compileCRouter);

app.use(ErrorHandler);

export {app}