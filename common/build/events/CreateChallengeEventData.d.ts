import { Subjects } from './Subjects';
export interface CreateChallengeEventData {
    subject: Subjects.CreateChallenge;
    data: {
        id: string;
        tests: string;
        status: string;
        startsAt: Date;
        expiresAt: Date;
        availableLanguages: string[];
    };
}
