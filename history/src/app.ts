import express from 'express';
import cookieSession from 'cookie-session';
import { currentUser,ErrorHandler } from '@eurytus/common';
import { userHistoryRouter } from './routes/getUserHistory';
import { getTestHistoryRouter } from './routes/getTestHistory';

const app = express();

app.use(express.json());

app.use(cookieSession({
    signed: false
}))

app.use(currentUser)

app.use(userHistoryRouter);
app.use(getTestHistoryRouter);

app.use(ErrorHandler);

export {app};