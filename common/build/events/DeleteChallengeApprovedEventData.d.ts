import { Subjects } from './Subjects';
export interface DeleteChallengeApproved {
    subject: Subjects.deleteChallengeApproved;
    data: {
        challengeId: number;
    };
}
