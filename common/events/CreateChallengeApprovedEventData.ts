import { Subjects } from './Subjects';

export interface CreateChallengeEventData{
    subject: Subjects.CreateChallengeApproved;
    data: {
        data: string
    }
}