import { Subjects } from './Subjects';

export interface CreateHistoryEventData{
    subject: Subjects.CreateHistory;
    data: {
        userId: string,
        challengeId: string,
        challengeName: string,
        completionDate: string,
        saveFileId: string,
        outputTestsPassedScore?: number,
        requiredStructureFound?: boolean,
        designPatternsFound?: string
    }
    
}