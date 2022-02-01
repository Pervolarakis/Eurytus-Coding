import express from 'express';
import cookieSession from 'cookie-session';
import { currentUser,ErrorHandler } from '@eurytus/common';
import { userHistoryRouter } from './routes/getUserHistory';
import { getTestHistoryRouter } from './routes/getTestHistory';
import cors from 'cors';
import { getUserParticipants } from './routes/getUserChallengesParticipants';
import { getAllParticipants } from './routes/getAllChallengesParticipants';

const app = express();

app.use(cors({
    origin: ['http://eurytus.com:3000'],
    credentials: true }))

app.use(express.json());

app.use(cookieSession({
    signed: false
}))

app.use(currentUser)

app.use(getAllParticipants);
app.use(getUserParticipants);
app.use(userHistoryRouter);
app.use(getTestHistoryRouter);

app.use(ErrorHandler);

export {app};