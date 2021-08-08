import { Subjects } from "./Subjects";
export interface ChallengeNewRequestEventData {
    subject: Subjects.ChallengeNewRequest;
    data: {
        kind: string;
        data: string;
    };
}
