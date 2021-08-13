import { Subjects } from "./Subjects";
export interface ChallengeNewRequestEventData {
    subject: Subjects.ChallengeNewRequest;
    data: {
        kind: string;
        challengeId?: string;
        data?: string;
        message: string;
        ownerId: string;
        availableLanguages: string[];
    };
}
