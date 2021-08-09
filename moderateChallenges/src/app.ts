import express from 'express';
import cookieSession from 'cookie-session';
import { currentUser,ErrorHandler } from '@eurytus/common';
import { getAllRequestsRouter } from './routes/getAllRequests';


const app = express();

app.use(express.json());

app.use(cookieSession({
    signed: false
}))

app.use(currentUser)

app.use(getAllRequestsRouter);

app.use(ErrorHandler);

export {app};