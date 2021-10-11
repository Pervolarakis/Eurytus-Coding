import { Subjects } from './Subjects';

export interface CreateHistoryEventData{
    subject: Subjects.CreateHistory;
    data: {
        userId: String,
        challengeId: String,
        challengeName: String,
        score: String
    }
    
}