import express from 'express';
import cookieSession from 'cookie-session';
import { currentUser,ErrorHandler } from '@eurytus/common';
import { getAllRequestsRouter } from './routes/getAllRequests';
import { approveRequestRouter } from './routes/approveRequest';
import { rejectRequestRouter } from './routes/rejectRequest';
import { getUserRequestsRouter } from './routes/getUserRequests';
import { cancelUserRequestRouter } from './routes/cancelUserRequest';
import { getRequestRouter } from './routes/getRequestById';
import { getLatestRequestByChallengeIdRouter } from './routes/getLatestRequestByChallengeId';

const app = express();

app.use(express.json());

app.use(cookieSession({
    signed: false
}))

app.use(currentUser)

app.use(getAllRequestsRouter);
app.use(approveRequestRouter);
app.use(rejectRequestRouter);
app.use(getUserRequestsRouter);
app.use(cancelUserRequestRouter);
app.use(getRequestRouter);
app.use(getLatestRequestByChallengeIdRouter);

app.use(ErrorHandler);

export {app};