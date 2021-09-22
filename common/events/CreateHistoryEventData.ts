import { Subjects } from './Subjects';

export interface CreateHistoryEventData{
    subject: Subjects.CreateHistory;
    data: {
        playerId: String,
        testId: String,
        testName: String,
        score: String
    }
    
}