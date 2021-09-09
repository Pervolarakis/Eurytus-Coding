import { CreateChallengeApprovedEventData, Publisher, Subjects } from "@eurytus/common";

export class CreateChallengeApprovedPublisher extends Publisher<CreateChallengeApprovedEventData>{
    subject: Subjects.CreateChallengeApproved = Subjects.CreateChallengeApproved;
}