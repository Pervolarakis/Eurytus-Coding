import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { TreeItem } from "react-sortable-tree";
import { axios } from "../../../Api/eurytusInstance";
import { combineChallengeDataWithIncomingChanges, setChallengeStateAfterFetch } from "../../AdminPage/ChallengeUtils/ChallengeUitls";
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
                setInitialChallenge(setChallengeStateAfterFetch(oldChallengeData))       
            })  
    },[])


    useEffect(()=>{
        setChallengeBeforeChanges(initialChallenge)
    },[initialChallenge])


    const changeDataToLatestRequest = () => {
        if(previousRequest && challengeBeforeChanges){
            const prevRequestData = JSON.parse(previousRequest.data!);
            setChallengeBeforeChanges(combineChallengeDataWithIncomingChanges(challengeBeforeChanges, prevRequestData))
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