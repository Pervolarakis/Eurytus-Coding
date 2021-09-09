import { Subjects } from './Subjects';

export interface UpdateChallengeApprovedEventData{
    subject: Subjects.UpdateChallengeApproved;
    data: {
        challengeId: string,
        data: string
    }
}