import { Subjects } from './Subjects';
export interface UpdateChallengeEventData {
    subject: Subjects.UpdateChallenge;
    data: {
        id: string;
    };
}
