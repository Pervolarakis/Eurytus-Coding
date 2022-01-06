import { fetchedDataType, requestChallengeProperties } from "../ModerateChallenges/ReviewRequestInterfaces";

export const setChallengeStateAfterFetch = (challengeData: fetchedDataType, message?: string): requestChallengeProperties => {
    return {
        template: JSON.parse(challengeData.template),
        classDiagram: (challengeData.expectedStructure.length>0?JSON.parse(challengeData.expectedStructure.replaceAll('\\\"','\"')):[
            {
                blockType: "Base",
                expanded: true,
                children: []
            
            }
        ]),
        inputTests: JSON.parse(challengeData.expectedOutputTests),
        challengeDetails: {
            name: challengeData.name,
            description: challengeData.description,
            difficulty: challengeData.difficulty,
            startsAt: new Date(challengeData.startsAt),
            isPublic: challengeData.isPublic,
            expiresAt: new Date(challengeData.expiresAt),
            language: challengeData.language,
            expectedDesignPatterns: challengeData.expectedDesignPatterns,
        },
        message: message
        
    }
}

export const combineChallengeDataWithIncomingChanges = (oldChallengeData: requestChallengeProperties, incomingChanges: Partial<fetchedDataType>) => {
    return {
        template: (incomingChanges.template!) ? JSON.parse(incomingChanges.template!) : oldChallengeData.template,
        classDiagram: incomingChanges.expectedStructure? (incomingChanges.expectedStructure.length>0?JSON.parse(incomingChanges.expectedStructure.replaceAll('\\\"','\"')):[
            {
                blockType: "Base",
                expanded: true,
                children: []
            
            }
        ]): oldChallengeData.classDiagram,
        inputTests: (incomingChanges.expectedOutputTests)? JSON.parse(incomingChanges.expectedOutputTests) : oldChallengeData.inputTests,
        challengeDetails: {
            name: incomingChanges.name || oldChallengeData.challengeDetails.name,
            description: incomingChanges.description || oldChallengeData.challengeDetails.description,
            difficulty: incomingChanges.difficulty || oldChallengeData.challengeDetails.difficulty,
            startsAt: incomingChanges.startsAt? new Date(incomingChanges.startsAt) : new Date(oldChallengeData.challengeDetails.startsAt),
            isPublic: incomingChanges.isPublic || oldChallengeData.challengeDetails.isPublic,
            expiresAt: incomingChanges.expiresAt? new Date(incomingChanges.expiresAt) : new Date(oldChallengeData.challengeDetails.expiresAt),
            language: incomingChanges.language || oldChallengeData.challengeDetails.language,
            expectedDesignPatterns: incomingChanges.expectedDesignPatterns || oldChallengeData.challengeDetails.expectedDesignPatterns,
        }
    }
}
