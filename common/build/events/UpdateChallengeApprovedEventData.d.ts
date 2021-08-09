import { Subjects } from './Subjects';
export interface UpdateChallengeApproved {
    subject: Subjects.updateChallengeApproved;
    data: {
        challengeId: string;
        data: string;
    };
}
