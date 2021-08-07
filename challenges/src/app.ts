import express from 'express';
import cookieSession from 'cookie-session';
import { currentUser } from './middlewares/currentUser';
import { createChallengeRouter } from './routes/createChallenge';
import { getAllChallengesRouter } from './routes/getAllChallenges';
import { editChallengeRouter } from './routes/editChallenge';
import { ErrorHandler } from './middlewares/errorHandler';
import { deleteChallengeRouter } from './routes/deleteChallenge';

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

app.use(ErrorHandler);

export {app};