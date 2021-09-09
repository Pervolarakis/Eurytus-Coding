import { ChallengeNewRequestEventData, Publisher, Subjects } from "@eurytus/common";

export class ChallengeNewRequestPublisher extends Publisher<ChallengeNewRequestEventData>{
    subject: Subjects.ChallengeNewRequest = Subjects.ChallengeNewRequest;
}