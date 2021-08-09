import { DeleteChallengeApproved, Publisher, Subjects } from "@eurytus/common";

export class DeleteChallengeApprovedPublisher extends Publisher<DeleteChallengeApproved>{
    subject: Subjects.deleteChallengeApproved = Subjects.deleteChallengeApproved;
}