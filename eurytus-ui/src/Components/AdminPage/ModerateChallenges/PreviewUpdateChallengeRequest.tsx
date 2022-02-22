import { Tab } from "@headlessui/react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { axios } from "../../../Api/eurytusInstance";
import ChallengeDetails from "../../Challenges/PreviewChallenge/ChallengeDetails";
import InputOutputList from "../../Challenges/PreviewChallenge/InputOutputList";
import ClassBuilder from "../../ClassBuilder/ClassBuilder";
import Ide from "../../Ide/Ide";
import RequestReviewMessageModal from "../../Modals/RequestReviewMessageModal";
import { fetchedDataType, requestChallengeProperties } from "./ReviewRequestInterfaces";
import { BsCardText } from "react-icons/bs";
import { combineChallengeDataWithIncomingChanges, setChallengeStateAfterFetch } from "../ChallengeUtils/ChallengeUitls";
import { toast } from "react-toastify";

const PreviewUpdateChallengeRequest = () => {

    const {requestId} = useParams();
    let navigate = useNavigate();
    const [changes, setChanges] = useState<Partial<fetchedDataType>>()
    const [message, setMessage] = useState('');
    const [challengeAfterChanges, setChallengeAfterChanges] = useState<requestChallengeProperties>()
    const [challengeBeforeChanges, setChallengeBeforeChanges] = useState<requestChallengeProperties>()
    const [showModal, toggleShowModal] = useState(true)
    const [user, setUser] = useState<{userId: string, userEmail: string}>({userId: '', userEmail: ''})

    useEffect(()=>{
        axios.get(`/moderate/requests/${requestId}`)
            .then((res)=>{
                setChanges({...JSON.parse(res.data.data.data)})
                setMessage(res.data.data.message)
                setUser({userId: res.data.data.ownerId, userEmail: res.data.data.ownerEmail})
                // console.log(JSON.parse(res.data.data.data))
                axios.get(`/challenges/${res.data.data.challengeId}`)
                    .then((res)=>{
                        const oldChallengeData = res.data.data;
                        setChallengeBeforeChanges(setChallengeStateAfterFetch(oldChallengeData))
                    })
                    .catch(err=>toast.error(err.response?.data.error||'There was an error fetching challenge!'))
            })
            .catch(err=>toast.error(err.response?.data.error||'There was an error fetching requests!'))
    },[])

    useEffect(()=>{
        if(challengeBeforeChanges && changes && message){
            setChallengeAfterChanges(combineChallengeDataWithIncomingChanges(challengeBeforeChanges,changes))
        // console.log(challengeBeforeChanges)
        }
    },[challengeBeforeChanges, changes, message])

    const onApprove = () => {
        axios.post(`/moderate/approve/${requestId}`)
            .then((res)=>{
                toast.success('Update request approved!');
                navigate('/admin');
            })
            .catch((err)=>{toast.error(err.response?.data.error||'Could not approve update request!')})
    }

    const onDecline = () => {
        axios.delete(`/moderate/reject/${requestId}`)
            .then((res)=>{
                toast.success('Update request declined!');
                navigate('/admin');
            })
            .catch((err)=>{toast.error(err.response?.data.error||'Could not decline update request!')})
    }

    return (
        <div id='solvechallenge'>
            <RequestReviewMessageModal show={showModal} toggleShow={()=>toggleShowModal(false)} message={message} userId={user.userId} userEmail={user.userEmail}/>
            <div className='bg-black flex justify-between items-center h-12 p-4'>
                <h1 className="text-white text-2xl font-bold">Review Update Challenge</h1>
                <button onClick={()=>toggleShowModal(true)}>
                    <BsCardText color="white" size={40}/>
                </button>
                <div>
                    <button className="h-10 border border-red-600 w-40 text-2xl font-bold text-red-600 rounded-md" onClick={()=>onDecline()}>Decline</button>
                    <button className="h-10 bg-green-500 w-40 text-2xl font-bold text-white rounded-md ml-4" onClick={()=>onApprove()}>Approve</button>
                </div>
            </div>
            {(challengeAfterChanges && challengeBeforeChanges)?
                <Tab.Group>
                <Tab.List className="h-14 bg-white flex justify-between">
                    <Tab className={({ selected }) =>
                        selected ? 'border-b-4 border-secondary  flex-1 font-bold h-14' : 'flex-1 border-b-4 border-white h-14'
                    }>Details</Tab>
                    <Tab className={({ selected }) =>
                        selected ? 'border-b-4 border-secondary  flex-1 font-bold h-14' : 'flex-1 border-b-4 border-white h-14'
                    }>Template</Tab>
                    <Tab disabled={challengeAfterChanges.challengeDetails.language!=='java'} className={({ selected }) =>
                        selected ? 'border-b-4 border-secondary  flex-1 font-bold h-14' : 'flex-1 border-b-4 border-white h-14'
                    }>Structure</Tab>
                    <Tab className={({ selected }) =>
                        selected ? 'border-b-4 border-secondary  flex-1 font-bold h-14' : 'flex-1 border-b-4 border-white h-14'
                    }>Input Output</Tab>
                </Tab.List>
                <Tab.Panels className="h-full">
                    <Tab.Panel className="h-full overflow-y-hidden">
                        <div className="w-full h-full flex flex-row">
                            <div className="w-1/2 overflow-x-scroll">
                                <ChallengeDetails challengeDetails={challengeBeforeChanges.challengeDetails} updateField={()=>null}/>
                            </div>
                            <div className="w-1/2 overflow-x-scroll">
                                <ChallengeDetails challengeDetails={challengeAfterChanges.challengeDetails} updateField={()=>null}/>
                            </div>
                        </div>
                    </Tab.Panel>
                    <Tab.Panel className="h-full overflow-y-hidden">
                        <div className="h-full flex flex-row">
                            <Ide value={challengeBeforeChanges.template} changeValue={()=>null} language='java'/>
                            <Ide value={challengeAfterChanges.template} changeValue={()=>null} language='java'/>
                        </div>
                    </Tab.Panel>
                    <Tab.Panel className="h-full overflow-y-scroll">
                        <div className="w-full h-full flex flex-row">
                            <div className="w-1/2 overflow-x-scroll">
                                <ClassBuilder treeData={challengeBeforeChanges.classDiagram} setTreeData={()=>null}/>
                            </div>
                            <div className="w-1/2 overflow-x-scroll">
                                <ClassBuilder treeData={challengeAfterChanges.classDiagram} setTreeData={()=>null}/>
                            </div>
                        </div>
                    </Tab.Panel>
                    <Tab.Panel className="h-full overflow-y-scroll">
                        <div className="h-full flex flex-row">
                            <InputOutputList testList={challengeBeforeChanges.inputTests} setTestList={()=>null}/>
                            <InputOutputList testList={challengeAfterChanges.inputTests} setTestList={()=>null}/>

                        </div>
                    </Tab.Panel>
                </Tab.Panels>
            </Tab.Group>:null}
        </div>
    )
}

export default PreviewUpdateChallengeRequest;