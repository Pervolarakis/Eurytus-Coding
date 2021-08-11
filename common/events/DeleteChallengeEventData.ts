import { Subjects } from './Subjects';

export interface DeleteChallengeEventData{
    subject: Subjects.DeleteChallenge;
    data: {
        id: string
    }
}