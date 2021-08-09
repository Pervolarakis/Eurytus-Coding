import { Subjects } from "./Subjects";
export interface ChallengeNewRequestEventData {
    subject: Subjects.ChallengeNewRequest;
    data: {
        kind: string;
        id?: string;
        data?: string;
        message: string;
    };
}
