import { Subjects } from './Subjects';
export interface UpdateChallengeEventData {
    subject: Subjects.UpdateChallenge;
    data: {
        id: string;
        expectedOutputTests: string;
        expectedStructure: string;
        expectedDesignPatterns: string[];
        status: string;
        startsAt: Date;
        expiresAt: Date;
        version: number;
        language: string;
    };
}
