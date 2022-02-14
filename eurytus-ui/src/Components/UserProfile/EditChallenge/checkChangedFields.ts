import { requestChallengeProperties } from "../../AdminPage/ModerateChallenges/ReviewRequestInterfaces";

interface  destructuredDataType {
    id: string
    creatorId: string
    description: string
    difficulty: number
    expectedDesignPatterns: string[]
    expectedStructure: string
    expiresAt: string
    isPublic: string
    language: string
    name: string
    startsAt: number
    status: string
    template: string
    expectedOutputTests: string
}

export const checkChangedFields = (challengeBeforeChanges: requestChallengeProperties,challengeAfterChanges: requestChallengeProperties) => {


    const challengeBeforeChangesDestructured = {
        template: challengeBeforeChanges.template,
        classDiagram: challengeBeforeChanges.classDiagram,
        inputTests: challengeBeforeChanges.inputTests,
        ...challengeBeforeChanges.challengeDetails
    }
    
    const challengeAfterChangesDestructured = {
        template: challengeAfterChanges.template,
        classDiagram: challengeAfterChanges.classDiagram,
        inputTests: challengeAfterChanges.inputTests,
        ...challengeAfterChanges.challengeDetails
    }

    const changes: Partial<destructuredDataType> = {};

    const transformData = () => {
        if(challengeAfterChangesDestructured.classDiagram[0].children?.length!==0 && challengeAfterChangesDestructured.language!=='js'){
            return (JSON.stringify(challengeAfterChangesDestructured.classDiagram).replaceAll("\"[\\\"","[\\\"").replaceAll("\\\"]\"","\\\"]").replaceAll("\" ","\"").replaceAll(" \"","\"").replaceAll("\"[]\"","[]"));
        }else{
            return ''
        }
    }

    Object.keys(challengeBeforeChangesDestructured).map((el, index)=>{
        //@ts-ignore
        if(challengeBeforeChangesDestructured[el]!==challengeAfterChangesDestructured[el]){
            if(el==='classDiagram'){
                changes.expectedStructure = transformData()
            }else if(el==='isPublic'){
                changes.isPublic = (challengeAfterChangesDestructured.isPublic===true)? "true": "false"
            }else if(el==='template'){
                changes.template = JSON.stringify(challengeAfterChangesDestructured.template)
            }else if(el==='inputTests'){
                changes.expectedOutputTests = JSON.stringify({"challenge" : challengeAfterChangesDestructured.inputTests.challenge.filter((el)=>el.input!==JSON.stringify('')&&el.output!==JSON.stringify(''))})
            }else{
                //@ts-ignore
                changes[el] = challengeAfterChangesDestructured[el]
            }
        }
    })
    return changes;
}
