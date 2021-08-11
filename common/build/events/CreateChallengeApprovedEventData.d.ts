import { Subjects } from './Subjects';
export interface CreateChallengeApprovedEventData {
    subject: Subjects.CreateChallengeApproved;
    data: {
        data: string;
    };
}
