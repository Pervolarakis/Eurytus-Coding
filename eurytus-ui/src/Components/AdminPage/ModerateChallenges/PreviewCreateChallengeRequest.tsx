import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { TreeItem } from "react-sortable-tree";
import { axios } from "../../../Api/eurytusInstance";
import PreviewChallenge, { challengeTest, fieldType } from "../../Challenges/PreviewChallenge/PreviewChallenge";

interface requestChallengeProperties {
    template: string;
    classDiagram: TreeItem[];
    inputTests: {"challenge": challengeTest[]}
    challengeDetails: fieldType
}

interface fetchedDataType {
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

const PreviewCreateChallengeRequest = () => {

    const {requestId} = useParams();
    
    const [fetchedChallenge, setFetchedChallenge] = useState<requestChallengeProperties>()


    useEffect(()=>{
        axios.get(`/moderate/requests/${requestId}`)
            .then((res)=>{
                const challengeData = JSON.parse(res.data.data.data) as fetchedDataType
                console.log(JSON.parse(challengeData.expectedStructure.replaceAll('\\"','\"')))
                setFetchedChallenge(
                    {
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
                            expectedDesignPatterns: challengeData.expectedDesignPatterns
                        }
                        
                    }
                )
            })
    },[])

    return(
        <div id='solvechallenge'>
            <div className='bg-black flex justify-between items-center h-12 p-4'>
                <h1 className="text-white text-2xl font-bold">Review New Challenge</h1>
                <div>
                    <button className="h-10 border border-red-600 w-40 text-2xl font-bold text-red-600 rounded-md" onClick={()=>null}>Decline</button>
                    <button className="h-10 bg-green-500 w-40 text-2xl font-bold text-white rounded-md ml-4" onClick={()=>null}>Approve</button>
                </div>
            </div>
            {fetchedChallenge?<PreviewChallenge template={fetchedChallenge.template} setTemplate={()=>null} classDiagram={fetchedChallenge.classDiagram} setClassDiagram={()=>null} challengeDetails={fetchedChallenge.challengeDetails} updateField={()=>null} inputTests={fetchedChallenge.inputTests} setInputTests={()=>null}/>:null}
        </div>
    )
}

export default PreviewCreateChallengeRequest;