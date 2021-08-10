import { DeleteChallengeApprovedEventData, Publisher, Subjects } from "@eurytus/common";

export class DeleteChallengeApprovedPublisher extends Publisher<DeleteChallengeApprovedEventData>{
    subject: Subjects.DeleteChallengeApproved = Subjects.DeleteChallengeApproved;
}