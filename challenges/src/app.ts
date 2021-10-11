import express from 'express';
import cookieSession from 'cookie-session';
import { currentUser, ErrorHandler } from '@eurytus/common';
import { createChallengeRouter } from './routes/createChallenge';
import { getAllChallengesRouter } from './routes/getAllChallenges';
import { editChallengeRouter } from './routes/editChallenge';
import { deleteChallengeRouter } from './routes/deleteChallenge';
import { getUserChallengesRouter } from './routes/getUserChallenges';

const app = express();

app.use(express.json());

app.use(cookieSession({
    signed: false
}))

app.use(currentUser)
app.use(createChallengeRouter);
app.use(getAllChallengesRouter);
app.use(editChallengeRouter);
app.use(deleteChallengeRouter);
app.use(getUserChallengesRouter);

app.use(ErrorHandler);

export {app};