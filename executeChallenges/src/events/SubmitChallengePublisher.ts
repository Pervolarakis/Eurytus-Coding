import { CreateHistoryEventData, Publisher, Subjects } from "@eurytus/common";

export class SubmitChallengePublisher extends Publisher<CreateHistoryEventData>{
    subject: Subjects.CreateHistory = Subjects.CreateHistory;
}