import { useEffect, useState } from "react";
import { BsCardText } from "react-icons/bs";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { axios } from "../../../Api/eurytusInstance";
import PreviewChallenge  from "../../Challenges/PreviewChallenge/PreviewChallenge";
import RequestReviewMessageModal from "../../Modals/RequestReviewMessageModal";
import { setChallengeStateAfterFetch } from "../ChallengeUtils/ChallengeUitls";
import { fetchedDataType, requestChallengeProperties } from "./ReviewRequestInterfaces";


const PreviewCreateChallengeRequest = () => {

    const {requestId} = useParams();
    let navigate = useNavigate();
    const [fetchedChallenge, setFetchedChallenge] = useState<requestChallengeProperties>()
    const [showModal, toggleShowModal] = useState(true)
    const [user, setUser] = useState<{userId: string, userEmail: string}>({userId: '', userEmail: ''})

    useEffect(()=>{
        axios.get(`/moderate/requests/${requestId}`)
            .then((res)=>{
                const challengeData = JSON.parse(res.data.data.data) as fetchedDataType
                setUser({userId: res.data.data.ownerId, userEmail: res.data.data.ownerEmail})
                setFetchedChallenge( setChallengeStateAfterFetch(challengeData, res.data.data.message) )
            })
            .catch(err=>toast.error(err.response?.data.error||'There was an error fetching requests!'))
    },[])

    const onApprove = () => {
        axios.post(`/moderate/approve/${requestId}`)
            .then((res)=>{
                toast.success('Create request approved!');
                navigate('/admin');
            })
            .catch((err)=>{
                toast.error(err.response?.data.error||'Could not decline create request!')
            })
    }

    const onDecline = () => {
        axios.delete(`/moderate/reject/${requestId}`)
            .then((res)=>{
                toast.success('Create request declined!');
                navigate('/admin');
            })
            .catch((err)=>{toast.error(err.response?.data.error||'Could not decline create request!')})
    }

    return(
        <div id='solvechallenge'>
            <RequestReviewMessageModal show={showModal} toggleShow={()=>toggleShowModal(false)} message={(fetchedChallenge)?(fetchedChallenge.message)?fetchedChallenge.message:'':''} userId={user.userId} userEmail={user.userEmail}/>
            <div className='bg-black flex justify-between items-center h-12 p-4'>
                <h1 className="text-white text-2xl font-bold">Review New Challenge</h1>
                <button onClick={()=>toggleShowModal(true)}>
                    <BsCardText color="white" size={40}/>
                </button>
                <div>
                    <button className="h-10 border border-red-600 w-40 text-2xl font-bold text-red-600 rounded-md" onClick={()=>onDecline()}>Decline</button>
                    <button className="h-10 bg-green-500 w-40 text-2xl font-bold text-white rounded-md ml-4" onClick={()=>onApprove()}>Approve</button>
                </div>
            </div>
            {fetchedChallenge?<PreviewChallenge template={fetchedChallenge.template} setTemplate={()=>null} classDiagram={fetchedChallenge.classDiagram} setClassDiagram={()=>null} challengeDetails={fetchedChallenge.challengeDetails} updateField={()=>null} inputTests={fetchedChallenge.inputTests} setInputTests={()=>null}/>:null}
        </div>
    )
}

export default PreviewCreateChallengeRequest;