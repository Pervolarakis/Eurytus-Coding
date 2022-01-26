import { Subjects } from './Subjects';
export interface CreateHistoryEventData {
    subject: Subjects.CreateHistory;
    data: {
        userId: string;
        challengeId: string;
        challengeName: string;
        completionDate: string;
        saveFileId: string;
        language: string;
        outputTestsPassedScore: number | null;
        requiredStructureFound: boolean | null;
        designPatternsFound: string | null;
    };
}
