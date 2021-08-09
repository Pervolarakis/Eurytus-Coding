import { UpdateChallengeApproved, Publisher, Subjects } from "@eurytus/common";

export class UpdateChallengeApprovedPublisher extends Publisher<UpdateChallengeApproved>{
    subject: Subjects.updateChallengeApproved = Subjects.updateChallengeApproved;
}