import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { TreeItem } from "react-sortable-tree";
import { axios } from "../../../Api/eurytusInstance";
import { requestChallengeProperties } from "../../AdminPage/ModerateChallenges/ReviewRequestInterfaces";
import ChallengeDetails from "../../Challenges/PreviewChallenge/ChallengeDetails";
import PreviewChallenge, { challengeTest, fieldType } from "../../Challenges/PreviewChallenge/PreviewChallenge";
import DeleteRequestExistsModal from "../../Modals/DeleteRequestExistsModal";
import EditChallengeExistsModal from "../../Modals/EditChallengeExistsModal";
import { checkChangedFields } from "./checkChangedFields";

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

    const navigate = useNavigate()
    const {challengeId} = useParams();
    const [previousRequest, setPreviousRequest] = useState<Partial<RequestProps>>();
    const [challengeBeforeChanges, setChallengeBeforeChanges] = useState<requestChallengeProperties>()
    const [showEditModal, toggleEditModal] = useState(true);
    const [initialChallenge, setInitialChallenge] = useState<requestChallengeProperties>()

    const updateField = (change: Partial<requestChallengeProperties>) => {
        if(challengeBeforeChanges){
            const detailsCopy = {...challengeBeforeChanges, ...change};
            setChallengeBeforeChanges(detailsCopy)
        }
    }

    const updateChallengeDetails = (change: Partial<fieldType>) => {
        if(challengeBeforeChanges){
            const detailsCopy = {...challengeBeforeChanges.challengeDetails, ...change};
            // console.log(detailsCopy)
            setChallengeBeforeChanges({...challengeBeforeChanges, challengeDetails: detailsCopy})
        }
    }

    const submitEditRequest = () => {
        axios.put(`/challenges/update/${challengeId}`,{
            ...checkChangedFields(initialChallenge!, challengeBeforeChanges!),
            ...(challengeBeforeChanges!.challengeDetails.isPublic? {message: "message"} : {})
        }).then((res)=>navigate('/profile'))
    }

    useEffect(()=>{
        axios.get(`/moderate/getchallengelatestrequest/${challengeId}`)
            .then((res)=>{setPreviousRequest(res.data.data)})
            
        axios.get(`/challenges/${challengeId}`)
            .then((res)=>{
                const oldChallengeData = res.data.data;
                setInitialChallenge({
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


    useEffect(()=>{
        setChallengeBeforeChanges(initialChallenge)
    },[initialChallenge])


    const changeDataToLatestRequest = () => {
        if(previousRequest){
            const prevRequestData = JSON.parse(previousRequest.data!);
            setChallengeBeforeChanges({
                template: (prevRequestData.template!) ? JSON.parse(prevRequestData.template!) : challengeBeforeChanges!.template,
                classDiagram: prevRequestData.expectedStructure? (prevRequestData.expectedStructure.length>0?JSON.parse(prevRequestData.expectedStructure.replaceAll('\\\"','\"')):[
                    {
                        blockType: "Base",
                        expanded: true,
                        children: []
                    
                    }
                ]): challengeBeforeChanges!.classDiagram,
                inputTests: (prevRequestData.expectedOutputTests)? JSON.parse(prevRequestData.expectedOutputTests) : challengeBeforeChanges!.inputTests,
                challengeDetails: {
                    name: prevRequestData.name || challengeBeforeChanges!.challengeDetails.name,
                    description: prevRequestData.description || challengeBeforeChanges!.challengeDetails.description,
                    difficulty: prevRequestData.difficulty || challengeBeforeChanges!.challengeDetails.difficulty,
                    startsAt: prevRequestData.startsAt? new Date(prevRequestData.startsAt) : new Date(challengeBeforeChanges!.challengeDetails.startsAt),
                    isPublic: prevRequestData.isPublic || challengeBeforeChanges!.challengeDetails.isPublic,
                    expiresAt: prevRequestData.expiresAt? new Date(prevRequestData.expiresAt) : new Date(challengeBeforeChanges!.challengeDetails.expiresAt),
                    language: prevRequestData.language || challengeBeforeChanges!.challengeDetails.language,
                    expectedDesignPatterns: prevRequestData.expectedDesignPatterns || challengeBeforeChanges!.challengeDetails.expectedDesignPatterns,
                },
            })
            toggleEditModal(false);
        }
    }


    return(
        <div id='solvechallenge'>
            {previousRequest? previousRequest.kind==='delete'? <DeleteRequestExistsModal/> : null: null}
            {previousRequest? previousRequest.kind==='update'? <EditChallengeExistsModal show={showEditModal} toggleShow={()=>toggleEditModal(false)} loadPendingRequest={()=>changeDataToLatestRequest()}/> : null: null}
            <div className='bg-black flex justify-between items-center h-12 p-4'>
                <h1 className="text-white text-2xl font-bold">Edit Challenge</h1>
                <button className="h-10 bg-yellow-300 w-40 text-2xl font-bold text-white rounded-lg" onClick={()=>submitEditRequest()}>Submit</button>
            </div>
            {challengeBeforeChanges?<PreviewChallenge template={challengeBeforeChanges.template} message={(challengeBeforeChanges.message)?challengeBeforeChanges.message:''} setMessage={(val)=>updateField({message: val})} setTemplate={(val)=>updateField({template: val})} classDiagram={challengeBeforeChanges.classDiagram} setClassDiagram={(val)=>updateField({classDiagram: val})} challengeDetails={challengeBeforeChanges.challengeDetails} updateField={updateChallengeDetails} inputTests={challengeBeforeChanges.inputTests} setInputTests={(val)=>updateField({inputTests: val})}/>:null}
        </div>
    )
}

export default EditChallenge;