import { Subjects } from './Subjects';

export interface UpdateChallengeEventData{
    subject: Subjects.UpdateChallenge;
    data: {
        id: string,
        tests: string,
        status: string,
        startsAt: Date,
        expiresAt: Date,
        version: number,
        language: string
    }
}