import { Subjects } from './Subjects';

export interface CreateChallengeEventData{
    subject: Subjects.createChallengeApproved;
    data: {
        data: string
    }
}