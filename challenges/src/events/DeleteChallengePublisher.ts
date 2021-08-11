import { DeleteChallengeEventData, Publisher, Subjects } from "@eurytus/common";

export class DeleteChallengePublisher extends Publisher<DeleteChallengeEventData>{
    subject: Subjects.DeleteChallenge = Subjects.DeleteChallenge;
}