import { Subjects } from './Subjects';

export interface CreateHistoryEventData{
    subject: Subjects.CreateHistory;
    data: {
        userId: string,
        userEmail: string,
        challengeId: string,
        completionDate: string,
        saveFileId: string,
        language: string,
        outputTestsPassedScore: number | null,
        requiredStructureFound: boolean | null,
        designPatternsFound: {
            singleton?: boolean,
            factory?: boolean,
            observer?: boolean
        } | null
    }
    
}