import { CreateChallengeEventData, Publisher, Subjects } from "@eurytus/common";

export class CreateChallengeApprovedPublisher extends Publisher<CreateChallengeEventData>{
    subject: Subjects.CreateChallengeApproved = Subjects.CreateChallengeApproved;
}