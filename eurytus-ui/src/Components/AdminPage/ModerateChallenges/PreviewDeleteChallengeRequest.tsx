import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { axios } from "../../../Api/eurytusInstance";
import PreviewChallenge  from "../../Challenges/PreviewChallenge/PreviewChallenge";
import RequestReviewMessageModal from "../../Modals/RequestReviewMessageModal";
import { requestChallengeProperties } from "./ReviewRequestInterfaces";
import { BsCardText } from "react-icons/bs";
import { setChallengeStateAfterFetch } from "../ChallengeUtils/ChallengeUitls";
import { toast } from "react-toastify";

const PreviewDeleteChallengeRequest = () => {

    const {requestId} = useParams();
    
    const [fetchedChallenge, setFetchedChallenge] = useState<requestChallengeProperties>()
    const [message, setMessage] = useState('')
    const [showModal, toggleShowModal] = useState(true)
    const [user, setUser] = useState<{userId: string, userEmail: string}>({userId: '', userEmail: ''})

    useEffect(()=>{
        axios.get(`/moderate/requests/${requestId}`)
            .then((res)=>{
                setUser({userId: res.data.data.ownerId, userEmail: res.data.data.ownerEmail})
                axios.get(`/challenges/${res.data.data.challengeId}`)
                    .then((res)=>{
                        const challengeData = res.data.data;
                        setFetchedChallenge(setChallengeStateAfterFetch(challengeData))
                    })
                    .catch(err=>toast.error(err.response?.data.error||'There was an error fetching challenge!'))
                setMessage(res.data.data.message)
            })
            .catch(err=>toast.error(err.response?.data.error||'There was an error fetching requests!'))
    },[])

    return(
        <div id='solvechallenge'>
            <RequestReviewMessageModal show={showModal} toggleShow={()=>toggleShowModal(false)} message={message} userId={user.userId} userEmail={user.userEmail}/>
            <div className='bg-black flex justify-between items-center h-12 p-4'>
                <h1 className="text-white text-2xl font-bold">Review Delete Challenge</h1>
                <button onClick={()=>toggleShowModal(true)}>
                    <BsCardText color="white" size={40}/>
                </button>
                <div>
                    <button className="h-10 border border-red-600 w-40 text-2xl font-bold text-red-600 rounded-md" onClick={()=>null}>Decline</button>
                    <button className="h-10 bg-green-500 w-40 text-2xl font-bold text-white rounded-md ml-4" onClick={()=>null}>Approve</button>
                </div>
            </div>
            {fetchedChallenge?<PreviewChallenge template={fetchedChallenge.template} setTemplate={()=>null} classDiagram={fetchedChallenge.classDiagram} setClassDiagram={()=>null} challengeDetails={fetchedChallenge.challengeDetails} updateField={()=>null} inputTests={fetchedChallenge.inputTests} setInputTests={()=>null}/>:null}
        </div>
    )
}

export default PreviewDeleteChallengeRequest;