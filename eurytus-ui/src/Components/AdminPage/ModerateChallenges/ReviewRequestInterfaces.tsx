import { TreeItem } from "react-sortable-tree";
import { challengeTest, fieldType } from "../../Challenges/PreviewChallenge/PreviewChallenge";

export interface requestChallengeProperties {
    _id?: string
    template: string;
    classDiagram: TreeItem[];
    inputTests: {"challenge": challengeTest[]}
    challengeDetails: fieldType
    message?: string
}

export interface fetchedDataType {
    id: string
    creatorId: string
    description: string
    difficulty: number
    expectedDesignPatterns: string[]
    expectedStructure: string
    expiresAt: string
    isPublic: boolean
    language: string
    name: string
    startsAt: number
    status: string
    template: string
    expectedOutputTests: string
}