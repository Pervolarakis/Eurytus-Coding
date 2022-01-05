import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { TreeItem } from "react-sortable-tree";
import { axios } from "../../Api/eurytusInstance";
import { requestChallengeProperties } from "../AdminPage/ModerateChallenges/ReviewRequestInterfaces";
import ChallengeDetails from "../Challenges/PreviewChallenge/ChallengeDetails";
import PreviewChallenge, { challengeTest, fieldType } from "../Challenges/PreviewChallenge/PreviewChallenge";

interface RequestProps {
    challengeId: string
    created_at: string
    kind: string
    message: string
    data?: string
    ownerId: string
    _id: string
}

const EditChallenge = () => {

    const {challengeId} = useParams();
    const [previousRequest, setPreviousRequest] = useState<Partial<RequestProps>>();
    const [challengeBeforeChanges, setChallengeBeforeChanges] = useState<requestChallengeProperties>()
    // const [template, setTemplate] = useState('')
    // const [classDiagram, setClassDiagram] = useState<TreeItem[]>([ 
    //     {
    //         blockType: "Base",
    //         expanded: true,
    //         children: []
        
    //     }
    // ])
    // const [inputTests, setInputTests] = useState<{"challenge": challengeTest[]}>({
    //     "challenge" : []
    // })

    // const [challengeDetails, setChallengeDetails] = useState<fieldType>({
    //     name: "",
    //     description: "",
    //     difficulty: 1,
    //     startsAt: new Date(),
    //     isPublic: false,
    //     expiresAt: new Date(),
    //     language: 'js',
    //     expectedDesignPatterns: [],
    // })

    // const [message, setMessage] = useState('ee');

    const updateField = (change: Partial<requestChallengeProperties>) => {
        console.log(typeof change)
        if(challengeBeforeChanges){
            const detailsCopy = {...challengeBeforeChanges, ...change};
            setChallengeBeforeChanges(detailsCopy)
        }
    }

    const updateChallengeDetails = (change: Partial<fieldType>) => {
        if(challengeBeforeChanges){
            const detailsCopy = {...challengeBeforeChanges.challengeDetails, ...change};
            console.log(detailsCopy)
            setChallengeBeforeChanges({...challengeBeforeChanges, challengeDetails: detailsCopy})
        }
    }


    useEffect(()=>{
        axios.get(`/moderate/getchallengelatestrequest/${challengeId}`)
            .then((res)=>{setPreviousRequest(res.data.data)})
            
        axios.get(`/challenges/${challengeId}`)
            .then((res)=>{
                const oldChallengeData = res.data.data;
                setChallengeBeforeChanges({
                    template: JSON.parse(oldChallengeData.template),
                    classDiagram: (oldChallengeData.expectedStructure.length>0?JSON.parse(oldChallengeData.expectedStructure.replaceAll('\\\"','\"')):[
                        {
                            blockType: "Base",
                            expanded: true,
                            children: []
                        
                        }
                    ]),
                    inputTests: JSON.parse(oldChallengeData.expectedOutputTests),
                    challengeDetails: {
                        name: oldChallengeData.name,
                        description: oldChallengeData.description,
                        difficulty: oldChallengeData.difficulty,
                        startsAt: new Date(oldChallengeData.startsAt),
                        isPublic: oldChallengeData.isPublic,
                        expiresAt: new Date(oldChallengeData.expiresAt),
                        language: oldChallengeData.language,
                        expectedDesignPatterns: oldChallengeData.expectedDesignPatterns,
                    }
                })        
            })  
    },[])
    
    const changeDataToLatestRequest = () => {

    }


    return(
        <div id='solvechallenge'>
            {previousRequest? previousRequest.kind==='delete'? <h1>last</h1> : null: null}
            {previousRequest? previousRequest.kind==='update'? <h1>Update</h1> : null: null}
            <div className='bg-black flex justify-between items-center h-12 p-4'>
                <h1 className="text-white text-2xl font-bold">Edit Challenge</h1>
                <button className="h-10 bg-yellow-300 w-40 text-2xl font-bold text-white rounded-lg" onClick={()=>null}>Submit</button>
            </div>
            {challengeBeforeChanges?<PreviewChallenge template={challengeBeforeChanges.template} message={(challengeBeforeChanges.message)?challengeBeforeChanges.message:''} setMessage={(val)=>updateField({message: val})} setTemplate={(val)=>updateField({template: val})} classDiagram={challengeBeforeChanges.classDiagram} setClassDiagram={(val)=>updateField({classDiagram: val})} challengeDetails={challengeBeforeChanges.challengeDetails} updateField={updateChallengeDetails} inputTests={challengeBeforeChanges.inputTests} setInputTests={(val)=>updateField({inputTests: val})}/>:null}
        </div>
    )
}

export default EditChallenge;