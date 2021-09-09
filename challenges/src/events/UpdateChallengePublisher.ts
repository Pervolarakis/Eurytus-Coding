import { Publisher, Subjects, UpdateChallengeEventData } from "@eurytus/common";

export class UpdateChallengePublisher extends Publisher<UpdateChallengeEventData>{
    subject: Subjects.UpdateChallenge = Subjects.UpdateChallenge;
}