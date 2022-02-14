import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { axios } from "../../../Api/eurytusInstance";
import { combineChallengeDataWithIncomingChanges, setChallengeStateAfterFetch } from "../../AdminPage/ChallengeUtils/ChallengeUitls";
import { requestChallengeProperties } from "../../AdminPage/ModerateChallenges/ReviewRequestInterfaces";
import PreviewChallenge, { fieldType } from "../../Challenges/PreviewChallenge/PreviewChallenge";
import DeleteRequestExistsModal from "../../Modals/DeleteRequestExistsModal";
import EditChallengeExistsModal from "../../Modals/EditChallengeExistsModal";
import SetRequestMessageModal from "../../Modals/SetRequestMessageModal";
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
    const [challenge, setChallenge] = useState<requestChallengeProperties>()
    const [showEditModal, toggleEditModal] = useState(true);
    const [initialChallenge, setInitialChallenge] = useState<requestChallengeProperties>()
    const [showRequestModal, toggleRequestModal] = useState(false);
    const [message, setMessage] = useState('')

    const updateField = (change: Partial<requestChallengeProperties>) => {
        if(challenge){
            const detailsCopy = {...challenge, ...change};
            setChallenge(detailsCopy)
        }
    }

    const updateChallengeDetails = (change: Partial<fieldType>) => {
        if(challenge){
            const detailsCopy = {...challenge.challengeDetails, ...change};
            // console.log(detailsCopy)
            setChallenge({...challenge, challengeDetails: detailsCopy})
        }
    }

    const submitEditRequest = () => {
        axios.put(`/challenges/update/${challengeId}`,{
            ...checkChangedFields(initialChallenge!, challenge!),
            ...(challenge!.challengeDetails.isPublic? {message: message} : {})
        }).then((res)=>{
            toast.success((challenge!.challengeDetails.isPublic===true)?'Request Submitted!':'Challenge Updated!');
            navigate('/profile')
        })
        .catch((err)=>{
            err.response.data.error.map((err:{message: string, field: string})=>
                toast.error(err.message)
            )
        })
    }

    useEffect(()=>{
        axios.get(`/moderate/getchallengelatestrequest/${challengeId}`)
            .then((res)=>{setPreviousRequest(res.data.data)})
            .catch(err=>toast.error(err.response?.data.error||'There was an error fetching challenge latest request!'))
        axios.get(`/challenges/${challengeId}`)
            .then((res)=>{
                const oldChallengeData = res.data.data;
                setInitialChallenge(setChallengeStateAfterFetch(oldChallengeData))       
            })  
            .catch(err=>toast.error(err.response?.data.error||'There was an error fetching challenge!'))
    },[])


    useEffect(()=>{
        setChallenge(initialChallenge)
    },[initialChallenge])


    const changeDataToLatestRequest = () => {
        if(previousRequest && challenge){
            const prevRequestData = JSON.parse(previousRequest.data!);
            setChallenge(combineChallengeDataWithIncomingChanges(challenge, prevRequestData))
            toggleEditModal(false);
        }
    }


    return(
        <div id='solvechallenge'>
            <SetRequestMessageModal show={showRequestModal} toggleShow={()=>toggleRequestModal(false)} submitRequest={()=>submitEditRequest()} message={message} setMessage={setMessage} />
            {previousRequest? previousRequest.kind==='delete'? <DeleteRequestExistsModal/> : null: null}
            {previousRequest? previousRequest.kind==='update'? <EditChallengeExistsModal show={showEditModal} toggleShow={()=>toggleEditModal(false)} loadPendingRequest={()=>changeDataToLatestRequest()}/> : null: null}
            <div className='bg-black flex justify-between items-center h-12 p-4'>
                <h1 className="text-white text-2xl font-bold">Edit Challenge</h1>
                <button className="h-10 bg-yellow-300 w-40 text-2xl font-bold text-white rounded-lg" onClick={challenge?.challengeDetails.isPublic?()=>toggleRequestModal(true):()=>submitEditRequest()}>Submit</button>
            </div>
            {challenge?<PreviewChallenge template={challenge.template} setTemplate={(val)=>updateField({template: val})} classDiagram={challenge.classDiagram} setClassDiagram={(val)=>updateField({classDiagram: val})} challengeDetails={challenge.challengeDetails} updateField={updateChallengeDetails} inputTests={challenge.inputTests} setInputTests={(val)=>updateField({inputTests: val})}/>:null}
        </div>
    )
}

export default EditChallenge;