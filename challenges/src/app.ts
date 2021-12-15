import express from 'express';
import cookieSession from 'cookie-session';
import { currentUser, ErrorHandler } from '@eurytus/common';
import { createChallengeRouter } from './routes/createChallenge';
import { getAllChallengesRouter } from './routes/getAllChallenges';
import { editChallengeRouter } from './routes/editChallenge';
import { deleteChallengeRouter } from './routes/deleteChallenge';
import { getUserChallengesRouter } from './routes/getUserChallenges';
import { getChallengeById } from './routes/getChallengeById';
import cors from 'cors'

const app = express();

app.use(cors({
    origin: ['http://eurytus.com:3000'],
    credentials: true }))

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
app.use(getChallengeById);

app.use(ErrorHandler);

export {app};