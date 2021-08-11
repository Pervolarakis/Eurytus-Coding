import { Subjects } from './Subjects';

export interface UpdateChallengeEventData{
    subject: Subjects.DeleteChallenge;
    data: {
        id: string
    }
}