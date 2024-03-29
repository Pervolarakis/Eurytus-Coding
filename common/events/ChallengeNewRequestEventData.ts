import { Subjects } from "./Subjects";

export interface ChallengeNewRequestEventData{
    subject: Subjects.ChallengeNewRequest;
    data: {
        kind: string;
        challengeId?: string;
        data?: string;
        created_at: string;
        message: string;
        ownerId: string;
        challengeName: string;
        ownerEmail: string;
    }
}