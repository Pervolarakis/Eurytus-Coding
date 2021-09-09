import { Subjects } from './Subjects';
export interface DeleteChallengeApprovedEventData {
    subject: Subjects.DeleteChallengeApproved;
    data: {
        challengeId: string;
    };
}
