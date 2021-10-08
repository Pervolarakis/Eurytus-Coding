import { Subjects } from './Subjects';

export interface CreateChallengeEventData{
    subject: Subjects.CreateChallenge;
    data: {
        id: string,
        expectedOutputTests: string;
        expectedStructure: string;
        expectedDesignPatterns: string[];
        status: string,
        startsAt: Date,
        expiresAt: Date,
        language: string
    }
}