import { Subjects } from './Subjects';

export interface CreateHistoryEventData{
    subject: Subjects.CreateHistory;
    data: {
        userId: String,
        challengetId: String,
        challengeName: String,
        score: String
    }
    
}