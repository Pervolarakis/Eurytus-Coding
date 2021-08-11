import { CreateChallengeEventData, Publisher, Subjects } from "@eurytus/common";

export class CreateChallengePublisher extends Publisher<CreateChallengeEventData>{
    subject: Subjects.CreateChallenge = Subjects.CreateChallenge;
}