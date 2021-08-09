import { Subjects } from './Subjects';
export interface UpdateChallengeApproved {
    subject: Subjects.updateChallengeApproved;
    data: {
        id: string;
        data: string;
    };
}
