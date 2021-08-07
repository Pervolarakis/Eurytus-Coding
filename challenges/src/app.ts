import express from 'express';
import cookieSession from 'cookie-session';
import { currentUser } from './middlewares/currentUser';
import { createChallengeRoute } from './routes/createChallenge';
import { getAllChallengesRouter } from './routes/getAllChallenges';

const app = express();

app.use(express.json());

app.use(cookieSession({
    signed: false
}))

app.use(currentUser)
app.use(createChallengeRoute);
app.use(getAllChallengesRouter);

export {app};