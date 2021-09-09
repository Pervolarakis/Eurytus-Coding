import { UpdateChallengeApprovedEventData, Publisher, Subjects } from "@eurytus/common";

export class UpdateChallengeApprovedPublisher extends Publisher<UpdateChallengeApprovedEventData>{
    subject: Subjects.UpdateChallengeApproved = Subjects.UpdateChallengeApproved;
}