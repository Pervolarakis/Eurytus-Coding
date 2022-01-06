import { useEffect, useState } from "react";
import { BsCardText } from "react-icons/bs";
import { useParams } from "react-router-dom";
import { axios } from "../../../Api/eurytusInstance";
import PreviewChallenge  from "../../Challenges/PreviewChallenge/PreviewChallenge";
import BasicModal from "../../Modals/RequestReviewMessageModal";
import { setChallengeStateAfterFetch } from "../ChallengeUtils/ChallengeUitls";
import { fetchedDataType, requestChallengeProperties } from "./ReviewRequestInterfaces";


const PreviewCreateChallengeRequest = () => {

    const {requestId} = useParams();
    
    const [fetchedChallenge, setFetchedChallenge] = useState<requestChallengeProperties>()
    const [showModal, toggleShowModal] = useState(true)
    const [user, setUser] = useState('')

    useEffect(()=>{
        axios.get(`/moderate/requests/${requestId}`)
            .then((res)=>{
                const challengeData = JSON.parse(res.data.data.data) as fetchedDataType
                setUser(res.data.data.ownerId)
                setFetchedChallenge( setChallengeStateAfterFetch(challengeData, res.data.data.message) )
            })
    },[])

    return(
        <div id='solvechallenge'>
            <BasicModal show={showModal} toggleShow={()=>toggleShowModal(false)} message={(fetchedChallenge)?(fetchedChallenge.message)?fetchedChallenge.message:'':''} userId={user}/>
            <div className='bg-black flex justify-between items-center h-12 p-4'>
                <h1 className="text-white text-2xl font-bold">Review New Challenge</h1>
                <button onClick={()=>toggleShowModal(true)}>
                    <BsCardText color="white" size={40}/>
                </button>
                <div>
                    <button className="h-10 border border-red-600 w-40 text-2xl font-bold text-red-600 rounded-md" onClick={()=>null}>Decline</button>
                    <button className="h-10 bg-green-500 w-40 text-2xl font-bold text-white rounded-md ml-4" onClick={()=>null}>Approve</button>
                </div>
            </div>
            {fetchedChallenge?<PreviewChallenge message={''} setMessage={()=>null} template={fetchedChallenge.template} setTemplate={()=>null} classDiagram={fetchedChallenge.classDiagram} setClassDiagram={()=>null} challengeDetails={fetchedChallenge.challengeDetails} updateField={()=>null} inputTests={fetchedChallenge.inputTests} setInputTests={()=>null}/>:null}
        </div>
    )
}

export default PreviewCreateChallengeRequest;